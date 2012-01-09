
// proxy (slightly modified from https://github.com/killfill/node-simple-proxy
var proxy = require('./proxy');

// web framework
var express = require('express');

// throttling and stats
var hook  = require('hook');
var redis = require('redis').createClient();

// configuration
var IP_LIMIT      = 100000;
var MAIN_PORT     = 5001;
var STATS_PORT    = 5555;
var PROXY_HOST    = "127.0.0.1";
var PROXY_PORT    = 4000;
var SYNC_INTERVAL = 5000; // 5 secs

// setup proxy backend
var proxyServer = require('./proxy').createProxy({
  remoteHost: PROXY_HOST, 
  remotePort: PROXY_PORT 
});

// setup proxy server
express.createServer(
  function (req, res, next) { console.log(req.url); next() },
  hook.middleware.throttleIP(IP_LIMIT, 'hour'),
  hook.middleware.countIP('day'),
  hook.middleware.countURL('day'),
  proxy.middleware(proxyServer)
).listen(MAIN_PORT);

// sync counters every SYNC_INTERVAL milliseconds through redis
setInterval(function() { hook.middleware.sync(redis); }, SYNC_INTERVAL);

// setup stats server
var stats = express.createServer();
stats.get('/', function (req, res, next) {
  res.render('stats.jade', { data: hook.middleware.htmlTable() });
});

stats.listen(STATS_PORT);
console.log("listening on " + MAIN_PORT + " for proxy and " + STATS_PORT + " for stats");
