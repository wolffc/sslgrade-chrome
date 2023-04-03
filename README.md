# TLS Grade (Browser Extension)
## About
This extension downloads the Quality Rating of your TLS Connection from SSLLabs.com and displays an icon matching the rating in the adress bar.

This makes it easy to discover TLS configuration problems on the sites you are visiting.

Currently only supports Google Chrome and other Chromium based browsers.

### Grading

SSLLabs uses [A+ for best and F for worst](https://github.com/ssllabs/research/wiki/SSL-Server-Rating-Guide), with [special cases T and M](https://blog.qualys.com/product-tech/2014/06/17/ssl-labs-new-grades-for-trust-t-and-mismatch-m-issues).

## Privacy
This extension itself does not collect any data, but as it is querying a third party service:
`https://api.ssllabs.com/api/v2/analyze?host=<domain.tld>`
therefore it is possible that ssllabs.com is learning which domains you are visiting.

## TODOs:
 * Handling of domains where no result is in cache.
 * Caching of results instead of always query the api.
 * Configuration options:
   * Do not query automatically
   * Clear result cache
   * Cache results for <X> hours
 * Better icons?


## Source code
Project page can be found on GitHub: https://github.com/C0rn3j/TLSGrade

Forked from: https://github.com/wolffc/sslgrade-chrome
