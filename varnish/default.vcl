backend app {
  .host = "127.0.0.1";
  .port = "3001";
}

sub vcl_recv {
  if (req.request != "GET") {
    return(pass);
  }

  if (req.url ~ "^/assets") {
    unset req.http.cookie;
    return(lookup);
  }

  return(lookup);
}

sub vcl_hash {
  hash_data(req.http.cookie);
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


