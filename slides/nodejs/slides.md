!SLIDE small incremental
## Node.js - Smart Proxy#

**Fronting the stack**

  * statistics
  * throttling
  * logging
  * authentication

<img src="hook.jpg" height="300px" width="280px"/>

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

!SLIDE  smbullets
## Node.js - Factual Open Source Projects

  * hook - statistics & throttling
  * mochiscript - Javascript Dessert
 
*Syntax*

    class Person {
      function say(msg) {
        alert(msg);
      }
    }

    var person = new Person();
    person.say("hello");

!SLIDE
<img src="/image/summary/arch.png" style="position: absolute; top: 0px; left: 200px; " />


