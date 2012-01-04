!SLIDE
# Node.js - Fronting the stack #

  * authentication
  * permissions
  * throttling

!SLIDE
# Node.js - WebServer #

!SLIDE
# Node.js - Proxy  #

    var proxy  = require('proxy');
    var server = proxy.createServer({ 
      remoteHost: "127.0.0.1", 
      remotePort: 3000 
    });

    proxy.listen(4000);

!SLIDE
# Node.js - Middleware #

    var connect = require('connect');
    var proxy   = require('proxy');

    var proxyServer = proxy.createPRoxy({ 
       remoteHost: "127.0.0.1", 
       remotePort: 3000 
     });
    
    var server = connect(
      proxy.middleware(proxyServer)
    );
     
!SLIDE
# Node.js - Throttling & Stats #

    var hook   = require('hook');
    var server = connect(
      hook.middleware.throttleIP(100, 'hour'),
      hook.middleware.countURL('hour'),
      proxy.middlware(proxyServer)
    );
