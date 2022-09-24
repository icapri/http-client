/**
 * Represents all the of HTTP headers.
 */
export type HttpHeaders =
  | 'Accept'
  | 'Accept-CH'
  | 'Accept-CH-Lifetime' // Deprecated!
  | 'Accept-Charset'
  | 'Accept-Encoding'
  | 'Accept-Language'
  | 'Accept-Patch'
  | 'Accept-Post'
  | 'Accept-Ranges'
  | 'Access-Control-Allow-Credentials'
  | 'Access-Control-Allow-Headers'
  | 'Access-Control-Allow-Methods'
  | 'Access-Control-Allow-Origin'
  | 'Access-Control-Expose-Headers'
  | 'Access-Control-Max-Age'
  | 'Access-Control-Request-Headers'
  | 'Access-Control-Request-Method'
  | 'Age'
  | 'Allow'
  | 'Alt-Svc'
  | 'Authorization'
  | 'Cache-Control'
  | 'Clear-Site-Data'
  | 'Connection'
  | 'Content-Disposition'
  | 'Content-DPR' // Deprecated!
  | 'Content-Encoding'
  | 'Content-Language'
  | 'Content-Length'
  | 'Content-Location'
  | 'Content-Range'
  | 'Content-Security-Policy'
  | 'Content-Security-Policy-Report-Only'
  | 'Content-Type'
  | 'Cookie'
  | 'Cross-Origin-Embedder-Policy'
  | 'Cross-Origin-Opener-Policy'
  | 'Cross-Origin-Resource-Policy'
  | 'Date'
  | 'Device-Memory' // Experimental!
  | 'Digest'
  | 'DNT' // Deprecated!
  | 'Downlink' // Experimental!
  | 'DPR' // Deprecated!
  | 'Early-Data' // Experimental
  | 'ECT' // Experimental
  | 'ETag'
  | 'Expect'
  | 'Expect-CT'
  | 'Expires'
  | 'Feature-Policy'
  | 'Forwarded'
  | 'From'
  | 'Host'
  | 'If-Match'
  | 'If-Modified-Since'
  | 'If-None-Match'
  | 'If-Range'
  | 'If-Unmodified-Since'
  | 'Keep-Alive'
  | 'Large-Allocation' // Deprecated!
  | 'Last-Modified'
  | 'Link'
  | 'Location'
  | 'Max-Forwards'
  | 'NEL' // Experimental!
  | 'Origin'
  | 'Pragma' // Deprecated!
  | 'Proxy-Authenticate'
  | 'Proxy-Authorization'
  | 'Range'
  | 'Referrer'
  | 'Referrer-Policy'
  | 'Retry-After'
  | 'RTT' // Experimental!
  | 'Save-Data' // Experimental!
  | 'Sec-CH-UA' // Experimental!
  | 'Sec-CH-UA-Arch' // Experimental!
  | 'Sec-CH-UA-Bitness' // Experimental!
  | 'Sec-CH-UA-Full-Version' // Deprecated!
  | 'Sec-CH-UA-Full-Version-List' // Experimental!
  | 'Sec-CH-UA-Mobile' // Experimental!
  | 'Sec-CH-UA-Model' // Experimental!
  | 'Sec-CH-UA-Platform' // Experimental!
  | 'Sec-CH-UA-Platform-Version' // Experimental!
  | 'Sec-Fetch-Dest'
  | 'Sec-Fetch-Mode'
  | 'Sec-Fetch-Site'
  | 'Sec-Fetch-User'
  | 'Sec-GPC' // Experimental!
  | 'Sec-WebSocket-Accept'
  | 'Server'
  | 'Server-Timing'
  | 'Service-Worker-Navigation-Preload'
  | 'Set-Cookie'
  | 'SourceMap'
  | 'Strict-Transport-Security'
  | 'TE'
  | 'Timing-Allow-Origin'
  | 'Tk' // Deprecated!
  | 'Trailer'
  | 'Transfer-Encoding'
  | 'Upgrade'
  | 'Upgrade-Insecure-Requests'
  | 'User-Agent'
  | 'Vary'
  | 'Via'
  | 'Viewport-Width' // Deprecated!
  | 'Want-Digest'
  | 'Warning' // Deprecated!
  | 'Width' // Deprecated!
  | 'WWW-Authenticate'
  | 'X-Content-Type-Options'
  | 'X-DNS-Prefetch-Control' // Experimental!
  | 'X-Forwarded-For' // Experimental!
  | 'X-Forwarded-Host' // Experimental!
  | 'X-Forwarded-Proto' // Experimental!
  | 'X-Frame-Options'
  | 'X-XSS-Protection'; // Experimental!
