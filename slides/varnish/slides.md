!SLIDE smbullets
## Varnish - Caching Proxy

**Don't Repeat Yourself**

  * HTTP Caching
  * expressive C-like configuration
  * very very very fast

<img src="batarang.jpg" style="position: absolute; bottom: -100px; right: 250px; z-index: -1" />

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
<img src="varnish.jpg" style="margin-left: 200px" />
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
        set beresp.ttl = 20m;
        return(deliver);
      }
    }

!SLIDE
## Varnish - Semi Dynamic

    sub vcl_fetch {
      if (beresp.status < 300) {
        if (req.url ~ "^/static") {
          unset beresp.http.set-cookie;
          set beresp.ttl = 20m;
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
  * ESI: Edge Side Includes
  * load balancing/health checking

!SLIDE
<img src="/image/summary/arch.png" style="position: absolute; top: 0px; left: 200px; " />


