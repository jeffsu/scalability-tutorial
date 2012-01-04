var http = require('http')
  , util = require('util')
  , events = require('events')
  , url = require('url');

function Proxy(opts) {
  events.EventEmitter.call(this);
  this.config = opts || {};
};

Proxy.prototype = new events.EventEmitter;

Proxy.prototype._requestOpts = function(req) {
  var parsedUrl = url.parse(req.url);
  var opts = { 
      host: this.config.remoteHost || parsedUrl.hostname
    , port: this.config.remotePort || parsedUrl.port || 80
    , method: req.method
    , path: req.url
    , headers: req.headers
  }
  opts.headers['x-forwarded-for'] = req.connection.remoteAddress;
  return opts;
}

Proxy.prototype.handleRequest = function(req, res, state, errorCb) {

  var self = this;

  if (typeof state == 'function') {
    cb = state;
    state = {};
  }

  //In the state hash, you can put info about the state of the proxy operation.
  //Its present in all events
  state = state || {};

  var requestOpts  = this._requestOpts(req);
  var proxyReq = http.request(requestOpts);

  this.emit('start', { 
      req: req
    , res: res
    , proxyReq: proxyReq
    , requestOpts: requestOpts
    }, state);

  req.on('end', function() {
    self.emit('request', {
        req: req
      , res: res
      , proxyReq: proxyReq
      , requestOpts: requestOpts
    }, state);
  });

  proxyReq.on('response', function(proxyRes) {

    //Pump the response of the server to the client
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    util.pump(proxyRes, res);

    self.emit('response', {
        req: req
      , res: res
      , proxyReq: proxyReq
      , proxyRes: proxyRes
      }, state);

  });

  proxyReq.on('error', function(err) {

    res.writeHeader(503);
    res.end();

    /*
    self.emit('error', {
        req: req
      , res: res
      , proxyReq: proxyReq
      , error: err
      , returnedError: {
            code: 503
          , desc: http.STATUS_CODES[503]
  }
      }, state);
      */
      errorCb && errorCb(err);
  });

  //Pump data from the client to the server
  util.pump(req, proxyReq);
}

exports.createProxy = function(opts) {
  return new Proxy(opts);
}

exports.createServer = function(opts) {
  var proxy = exports.createProxy(opts);
  return http.createServer(function(req, res) {
    proxy.handleRequest(req, res);
  });
}

exports.middleware = function(proxy) {
  proxy = proxy || exports.createProxy();

  return function(req, res, next) {
    proxy.handleRequest(req, res, function(err) {
      return next(new Error(err));
    });
  }

}

exports._class = Proxy;
