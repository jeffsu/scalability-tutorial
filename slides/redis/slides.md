!SLIDE
## Redis - Swiss Army Knife

**King of "Others"**

  * memcache++
  * sharding, master/slave, persistent
  * data strctures: strings, hashes, lists, sorted lists
  * pub/sub

!SLIDE
## Redis as cache-store

Memcache alternative

    SET <key> <data>
    GET <key>

!SLIDE
## Redis - PubSub

Logging, events

    SUBSCRIBE mychannel

    PUBLISH mychannel Hello

!SLIDE
## Redis - Lists

Process queues, object relationships

    LPUSH mylist a
    LPUSH mylist b

    LINDEX mylist 0 # returns 'a'
