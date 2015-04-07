# SSL Grade (Chrome Extension)

Author: Christian Wolff <chris@connye.com>


## About

this extension downloads the Quality Rating of your SSL Connection from SSLLabs.com. and displays an 
icon matching the rating in the adress bar. this makes it easyly to discover SSL problems on the sites your visiting.

## Privacy
This extension itself does not Collect Any Data. but as it is queryinig an third party Service:
``https://api.ssllabs.com/api/v2/analyze?host=<domain.tld>``
therefor it is possible that ssllabs.com is learning which domains you are visiting.

## TODOs:
 * Handling of Domains Where no Result is in Cache.
 * Caching of Results instead of always query the api.
 * configurtation Options: 
   * Do Not query Automatically
   * Clear Result Cache 
   * Cache Results for <X> Hours
 * Better Icons?


## Sourcecode
the Project page of this extension could be found at github: https://github.com/wolffc/sslgrade-chrome