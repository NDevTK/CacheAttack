# Disclaimer
This done before cache partitioning was added to chrome.
No longer maintained.

# CacheAttack
A Timing attack on the browser to try to predict websites that have cached.  
Mobile devices may not work correctly.  
Discord: https://discord.gg/YFkmVZX

# More XS Leaks
https://github.com/xsleaks/wiki

# Documentation
Add: `<iframe id="cacheattack" src="https://cache.ndev.tk/embed.html" style="width:0;height:0;border:0; border:none;"></iframe>`   
Usage: `cacheattack.contentWindow.postMessage(null, 'https://cache.ndev.tk/embed.html'); // An array can be used instead of null for custom urls`  
Callback: `onmessage = e => console.log(e.data)`  

# Examples
https://cache.ndev.tk/ (Detects cached websites)  
https://cache.ndev.tk/Gender (Detects your Gender via Google Ad personalization cache)  
https://cache.ndev.tk/youtube (Detects your last viewed YouTube videos)  
