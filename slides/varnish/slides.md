!SLIDE smbullets
## Varnish - HTTP Acceleration

**Don't Repeat Yourself**

  * HTTP Accelerator
  * FAST
  * expressive C-like configuration

!SLIDE
## Varnish - Proxy

    backend app {
      .host = "127.0.0.1";
      .port = "3000";
    }

    sub vcl_recv {
      return(pass);
    }


!SLIDE small
## Varnish - Smarter config

<div style="height: 200px; width: 150px;">
<img src="varnish.png" style="margin-left: 200px" />
</div>

    sub vcl_recv {
      if (req.url ~ "^/static") {
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

!SLIDE
## Varnish - Semi Dynamic

    sub vcl_fetch {
      if (beresp.status < 300) {
        if (req.url ~ "^/assets") {
          unset beresp.http.set-cookie;
          set beresp.ttl = 20s;
          return(deliver);
        } else {
          set beresp.ttl = 1s;
          return(deliver);
        }
      }
    }


!SLIDE smbullets
## Varnish - Other Features

  * graceful caching
  * ESI
  * load balancing/health checking
  * ACLs

