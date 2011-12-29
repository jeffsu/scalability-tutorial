!SLIDE
# Node.js - Fronting the stack #

  * authentication
  * permissions
  * throttling

!SLIDE
# Node.js - Proxy  #

    var proxy  = require('proxy');

    var server = proxy.createServer({ 
      remoteHost: "127.0.0.1", 
      remotePort: 3000 
    });

    proxy.listen(4000);

# Node.js - Middleware #

   var connect = require('connect');

   var server = connect(
     connect.logger()
   );
     
