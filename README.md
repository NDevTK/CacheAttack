# CacheAttack
A Timing attack on the browser to try to predict websites that have cached.  

How to use?  (Its Recommended to have a delay before running getWebsites)  
Add: `<script src="https://cache.ndev.tk/embed.js"></script>`  
Usage: `getWebsites().then(result => console.log(result)) // Returns array of supported cached websites`
Callback: `getWebsites(website => console.info(website))`
