!SLIDE
## Redis as cache-store

Memcache alternative

    SET <key> <data>
    GET <key>

!SLIDE
## Redis for pubsub

Logging, events

    SUBSCRIBE mychannel

    PUBLISH mychannel Hello

!SLIDE
## Redis for lists

Process queues, object relationships

    LPUSH mylist a
    LPUSH mylist b

    LINDEX mylist 0 # returns 'a'
