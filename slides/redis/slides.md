!SLIDE
# Redis


*"If you aren't using redis, you're probably doing something wrong."*

Boris Shimanovsky 

(Director of Engineering at Factual)

<img src="robin.jpg" style="position: absolute; left: 0; top: 0; z-index: -1; width: 100%; opacity: 0.5;" />

!SLIDE 
# Redis

**NoSQL?**

!SLIDE 
# Redis

**Memcached++**


!SLIDE 
## Redis 

**Replication**

    slaveof 10.0.1.3 6379

**Persistence**

Save every 60 seconds or after 1000 keys have changed

    save 60 1000

!SLIDE smbullets
## Redis - Data Types

  * strings 
  * hashes 
  * lists
  * sorted lists

!SLIDE 
## Redis - Publish/Subscribe

    client1> SUBSCRIBE user-changed
    client2> PUBLISH user-changed 123
    client1> "123"

