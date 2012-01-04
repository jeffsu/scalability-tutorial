backend app {
  .host = "127.0.0.1";
  .port = "3000";
}

sub vcl_recv {
  if (req.url ~ "^/assets") {
    unset req.http.cookie;
  }

  return(lookup);
}

sub vcl_fetch {
  if (beresp.status < 300) {
    if (req.url ~ "^/assets") {
      unset beresp.http.set-cookie;
      set beresp.ttl = 20m;
    } else {
      set beresp.ttl = 1s;
    }
    return(deliver);
  }
}


