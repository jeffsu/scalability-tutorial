!SLIDE smbullets
## Varnish - HTTP Acceleration

  * HTTP Accelerator
  * FAST
  * expressive C-like configuration

!SLIDE
## Varnish - Proxy

    backend rails {
      .host = "127.0.0.1";
      .port = "3000";
    }

    sub vcl_recv {
      unset req.http.cookie;
      return(lookup);
    }


!SLIDE small
## Varnish - Smarter config

    sub vcl_recv {
      if (req.request == "GET") {
        unset req.http.cookie;
        return(lookup);
      }

      return(pass);
    }

!SLIDE 
## Varnish - Fetch Example

After backend has been fetched

    sub vcl_fetch {
      if (beresp.status < 300) {
        unset beresp.http.set-cookie;
        set beresp.ttl = 20s;
        return(deliver);
      }
    }

!SLIDE smbullets
## Varnish - Other Features

  * graceful caching
  * ESI
  * load balancing/health checking
  * ACLs

