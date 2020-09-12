# CacheAttack
A Timing attack on the browser to try to predict websites that have cached.  
Mobile devices may not work correctly.  
Discord: https://discord.gg/YFkmVZX

# Documentation
Add: `<script src="https://cache.ndev.tk/embed.js"></script>`  
Usage: `getWebsites().then(result => console.log(result)) // Returns array of supported cached websites`  
Callback: `getWebsites(website => console.info(website))`  

# Examples
https://cache.ndev.tk/ (Detects cached websites)  
https://cache.ndev.tk/Gender (Detects your Gender via Google Ad personalization cache)  
https://cache.ndev.tk/youtube (Detects your last viewed YouTube videos)  
