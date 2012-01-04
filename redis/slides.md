!SLIDE

# Redis!!! #

  * memcache++
  * key/value store
  * pub/sub
  * lists
  * silverbullet?
  *
!SLIDE
# Redis - as memcache #

    set hello "world"
    get hello
      "world"

!SLIDE
# Redis - hashes

    hset users:1 first Aaron
    hset users:1 last  Crow
    hset users:2 first Jeff
    hset users:1 last  Su
    hget users:1 first
      "Aaron"

