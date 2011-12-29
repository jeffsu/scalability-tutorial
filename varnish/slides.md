!SLIDE 
# Varnish - HTTP Acceleration #

  * FAST
  * expressive C-like configuration
  * tons of middleware features...

!SLIDE
# Varnish - Proxy #

    backend rails {
      .host = "127.0.0.1";
      .port = 3000;
    }

    sub vcl_recv {
      unset req.http.cookie;
      lookup;
    }


!SLIDE small
# Varnish - Smarter config

    sub vcl_recv {
      if (req.request == "GET") {
        unset req.http.cookie;
        lookup;
      }

      pass;
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
      unset obj.http.set-cookie;
      set obj.ttl = 12h;
 
      if (obj.status >= 300) {
        pass;
      }
 
      deliver;
    }

!SLIDE
# Varnish - Features #

  * graceful caching
  * ESI
  * load balancing/health checking
  * ACLs

