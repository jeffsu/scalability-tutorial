!SLIDE small incremental
## Node.js - Fronting the stack #

**The Smart Proxy**

  * throttling
  * logging
  * statistics
  * DRY authentication

!SLIDE
## Node.js - As a Proxy

    var express = require('express');
    var proxy   = require('proxy');

    var proxyServer = proxy.createPRoxy({ 
       remoteHost: "127.0.0.1", 
       remotePort: 3000 
    });
    
    var server = express.createServer(
      proxy.middleware(proxyServer)
    );
    server.listen(8888)
     
!SLIDE small
## Node.js - Throttling & Stats 

    var express = require('express');
    var proxy   = require('proxy');
    var hook    = require('hook');

    var server = express.createServer(
      hook.middleware.throttleIP(100, 'hour'),
      hook.middleware.countURL('hour'),
      proxy.middlware(proxyServer)
    );

    server.get('/stats', function (req, res) { 
      res.send(hook.middleware.htmlTable()) 
    });

    server.listen(8888);
