!SLIDE small smbullets
## HAProxy - Load Balancing Proxy

**Scalability + Availability**
 
  * proxying (tcp, http)
  * load balancing
  * routing

<img src="belt.jpg" style="position: absolute; bottom: 100px; right: 100px;" />
  

!SLIDE
## HAProxy - Proxying
<img src="simple-proxy.png" />

    frontend http-in
      bind *:80
      use_backend app

    backend app
      server app localhost:3000


!SLIDE smbullets
## HAProxy - Load Balancing Algorithms

  * roundrobin (no affinity)
  * source 
  * url_param - query param /todos?user=123
  * uri - /users/123
  * cookie

!SLIDE
## HAProxy - Load Balancing
<img src="load-balancing.jpg" />

    backend app
      balance roundrobin
      server app1 127.0.0.1:3001
      server app2 127.0.0.1:3002


!SLIDE smbullets
## HAProxy - Health Checking

  * httpchk: http request for health check
  * inter: time between checks 
  * fall: n failures till down'd
  * rise: n successes till up'd
  * backup: for emergency

<img class="bottom-corner-img" src="/image/haproxy/health.jpg" />

!SLIDE small
## HAProxy - Health Checking
<img src="backup.jpg" />

    backend cache
      option httpchk GET /health-check

      server cache 127.0.0.1:4000 check inter 5s fall 1 rise 2
      server app1  127.0.0.1:3001 check inter 5s fall 1 rise 2 backup

!SLIDE
## HAProxy - Routing

Use caching layer for all javascript files

    frontend http-in
      bind *:80
      acl is_cache url_beg /assets/
      acl is_javascript url_beg /javascripts/

      use_backend cache if is_cache
      use_backend cache if is_javascript

      default_backend app

!SLIDE
<img src="/image/summary/arch.png" style="position: absolute; top: 0px; left: 200px; " />


