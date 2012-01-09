!SLIDE 
## Redis - Silver Bullet?

**Memcached++**

<img class="bottom-corner-img" src="/image/redis/silver-bullet.jpg" />

!SLIDE 
## Redis - Replication

Replicate master

    slaveof 10.0.1.3 6379

!SLIDE 
## Redis - Persistence 

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

!SLIDE
## Redis - Publish/Subscribe

    client2> PUBLISH user-changed 123

!SLIDE
## Redis - Publish/Subscribe

    client1> SUBSCRIBE user-changed
      "123"
