Introduction
============

This repo contains configuration examples for setting up a stack according to the architecture Jeff Su proposed in on the 
January 10th, 2012 LA High Scalability Meetup.  It is intended to be the bare minimum for setting up load balancing, throttling,
statistics tracking and caching in front of a web application.

Architecture
============

There are 4 basic principles behind this architecture.  1) Setting up easy load balancing and fault tolerance with haproxy 
2) Using varnish to cache both static and semi-dynamic requests 3) Using Node.js to handle some stateful business logic and
then proxy requests. 4) Using Redis to sync up Node.js servers

Installation
============

It is assumed that these are installed

  1. redis: [http://redis.io/download]
  1. Nodejs: [https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager]
  1. varnish: [https://www.varnish-cache.org/trac/wiki/Installation]
  1. haproxy 
  1. rails


If you want to run the app, it is recommended that you install rails via (rvm)[http://beginrescueend.com/rvm/install/].  Then run:

    rvm install 1.9.2
    rvm use 1.9.2
    gem install bundler
    bundle install 

Starting Up
===========

Do this in separate terminals:

    # start haproxy
    haproxy -f ./haproxy/haproxy.cfg

    # start varnish
    sudo varnishd -d -f ./varnish/default.vcl -a 127.0.0.1:4001
    # then type "start" <enter>

    # start Node
    Node nodejs/server.js
    
    # start rails
    cd app; rails s -p 3001

Architecture
============

HAProxy
-------

HAProxy is used to load balance every layer of the stack.  It will listen these ports:

  * 8000 public port
  * 5000 Node distributed port
  * 4000 caching distributed port
  * 3000 app distributed port

Each layer (except for the app) has a fallback option for availability.

Nodejs
------

Nodejs is a layer used for handling simple/global cases.  It is currently used for 
ip throttling, and ip/url statistics gathering, but could be used for things like
authentication, permissions and routing.

Varnish
-------

Varnish is the caching layer.  It scales very well and should be used wherever caching
is allowed.  

In the varnish config, there is a 1s cache time on all "dynamic" content.  This allows
us to utilize the caching against many concurrent requests while still maintaining dynamic-ish 
behavior.

Rails
-----

Rails is used as a highly agile but slow application layer.


Links
=====

  * http://localhost:8000/  home page through whole stack
  * http://localhost:8888/  haproxy stats page
  * http://localhost:5555/  Node stats page
  * http://localhost:5000/  (Node + varnish + app | app)
  * http://localhost:5001/  Node + varnish + app
  * http://localhost:4000/  (varnish + app | app)
  * http://localhost:4001/  varnish + app
  * http://localhost:3001/  app

