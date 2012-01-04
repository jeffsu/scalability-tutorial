!SLIDE 
# HAProxy #

  * proxying
  * load balancing
  * health checking
  * routing
  
!SLIDE
HAProxy - Proxying
------------------

    frontend http-in
      bind *:80
      use_backend app

    backend app
      server rails-app1 localhost:3000

!SLIDE
HAProxy - Load Balancing
------------------------

roundrobin, source, url_param, uri

    backend app
      balance roundrobin
      server rails1 localhost:3000
      server rails2 localhost:3001
   
!SLIDE small
HAProxy - Health Checking
-------------------------

inter, fall, rise, backup, httpchk

    backend cache
      option httpchk GET /health-check

      server cache 127.0.0.1:4000 check inter 5s fall 1 rise 2
      server rails 127.0.0.1:3001 check inter 5s fall 1 rise 2 backup

!SLIDE

HAProxy - Routing
-----------------

Use caching layer for all javascript files

    frontend http-in
      bind *:80
      acl is_cache url_beg /javascripts/
      use_backend cache if is_cache
      default_backend app
