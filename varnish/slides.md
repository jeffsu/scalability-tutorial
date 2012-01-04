!SLIDE 
# Varnish - HTTP Acceleration #

  * FAST
  * expressive C-like configuration
  * tons of middleware features...

!SLIDE
# Varnish - Proxy #

    backend rails {
      .host = "127.0.0.1";
      .port = "3000";
    }

    sub vcl_recv {
      unset req.http.cookie;
      return(lookup);
    }


!SLIDE small
# Varnish - Smarter config

    sub vcl_recv {
      if (req.request == "GET") {
        unset req.http.cookie;
        return(lookup);
      }

      return(pass);
    }

!SLIDE small
# Varnish - Configuration Hooks

  * recieve: lookup or pass
  * lookup: hit or miss
  * fetch
  * deliver

!SLIDE 
# Varnish - Fetch Example

    sub vcl_fetch {
      if (beresp.status < 300) {
        unset beresp.http.set-cookie;
        set beresp.ttl = 20s;
        return(deliver);
      }
    }

!SLIDE
# Varnish - Features #

  * graceful caching
  * ESI
  * load balancing/health checking
  * ACLs

