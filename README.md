# This Repository UNMAINTAINED and  Longer in Development.
the following warings apply:
- not maintained, no future development at this time
- known securty issue see below,
- use at your own risk

# Known Securtiy isses at time of Archiving 2026-09-23

### Dependency jquery 	Version >= 1.12.3 < 3.0.0 	Upgrade to ~> 3.0.0
- CVE-2015-9251 Moderate severity
- CVE-2019-11358 Moderate severity

### Dependency braces 	Version < 3.0.3 	Upgrade to ~> 3.0.3
- CVE-2024-4068 High severity

### Dependency webpack 	Version >= 5.0.0-alpha.0 < 5.94.0 	Upgrade to ~> 5.94.0
- CVE-2025-68157 Low severity
- CVE-2025-68458 Low severity
- CVE-2024-43788 Moderate severity

### Dependency serialize-javascript 	Version >= 6.0.0 < 6.0.2 	Upgrade to ~> 6.0.2
- GHSA-5c6j-r48x-rmvq High severity
- CVE-2024-11831 Moderate severity
- CVE-2026-34043 Moderate severity

### Dependency picomatch 	Version < 2.3.2 	Upgrade to ~> 2.3.2
- CVE-2026-33672 Moderate severity

###  Dependency browserslist 	Version <= 4.28.6 	Upgrade to ~> 4.28.7
- CVE-2026-73088 High severity


# TLS Grade (Browser Extension)
## About
This extension downloads the Quality Rating of your TLS Connection from SSLLabs.com and displays an icon matching the rating in the adress bar.

This makes it easy to discover TLS configuration problems on the sites you are visiting.

Currently only supports Google Chrome and other Chromium based browsers.

### Grading

SSLLabs uses [A+ for best and F for worst](https://github.com/ssllabs/research/wiki/SSL-Server-Rating-Guide), with [special cases T and M](https://blog.qualys.com/product-tech/2014/06/17/ssl-labs-new-grades-for-trust-t-and-mismatch-m-issues).

## Privacy
This extension itself does not collect any data, but as it is querying a third party service:
`https://api.ssllabs.com/api/v3/analyze?host=<domain.tld>`
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

## Developer instructions

Run the following to build the JS from the TS and pack the extension for Firefox and Chromium based browsers as a ZIP.

```bash
# Install dependencies
npm install

# Compile the TS into JS
npm run build

# Test on Firefox
web-ext run

# Build for Chromium(-based)
ln -sf manifest-chromium.json manifest.json && web-ext build

# Build for Firefox
ln -sf manifest-firefox.json manifest.json && web-ext build
```
