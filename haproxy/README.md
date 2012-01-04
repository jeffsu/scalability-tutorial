Information
===========

    haproxy -f haproxy.cfg

Assumes you've installed haproxy and your stack is setup this way:

  1. node server on 5001
  1. varnish server on 4001
  1. app server on 3001

When running:

  1. haproxy listens to ports:
    1. 5000 - node layer
    1. 4000 - cache layer
    1. 3000 - app layer
  1. haproxy also sets up a stats page on 8888

