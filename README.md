# SSL Grade (Chrome Extension)
Author: Christian Wolff <chris@connye.com>


## About
This extension downloads the Quality Rating of your SSL Connection from SSLLabs.com and displays an
icon matching the rating in the adress bar. This makes it easy to discover SSL problems on the sites you are visiting.

## Privacy
This extension itself does not collect any data but as it is querying a third party service:
``https://api.ssllabs.com/api/v2/analyze?host=<domain.tld>``
therefore it is possible that ssllabs.com is learning which domains you are visiting.

## TODOs:
 * Handling of domains where no result is in cache.
 * Caching of results instead of always query the api.
 * Configuration options:
   * Do not query automatically
   * Clear result cache
   * Cache results for <X> hours
 * Better icons?


## Sourcecode
The Project page of this extension could be found at github: https://github.com/wolffc/sslgrade-chrome
