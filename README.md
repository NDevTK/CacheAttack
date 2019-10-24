# CacheAttack
A Timing attack on the browser to try to predict websites that have cached.  
API: Fetch AbortController  
Credit: https://itnext.io/how-you-can-abort-fetch-request-on-a-flight-830a639b9b92

How to use?  (Its Recommended to have a delay before running getWebsites)  
Add: `<script src="https://cache.ndev.tk/embed.js"></script>`  
Usage: `getWebsites().then(result => console.log(result)) // Returns array of supported cached websites`
