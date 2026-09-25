# Disclaimer
This done before cache partitioning was added to chrome.  
No longer maintained.

# CacheAttack
A Timing attack on the browser to try to predict websites that have cached.  
Mobile devices may not work correctly.  

# More XS Leaks
https://github.com/xsleaks/wiki

# Documentation
Add: `<iframe id="cacheattack" src="https://ndevtk.github.io/CacheAttack/embed.html" style="width:0;height:0;border:0; border:none;"></iframe>`   
Usage: `cacheattack.contentWindow.postMessage(null, 'https://ndevtk.github.io/CacheAttack/embed.html'); // An array can be used instead of null for custom urls`  
Callback: `onmessage = e => console.log(e.data)`  

# Examples
https://ndevtk.github.io/CacheAttack/ (Detects cached websites)  
https://ndevtk.github.io/CacheAttack/Gender (Detects your Gender via Google Ad personalization cache)  
https://ndevtk.github.io/CacheAttack/youtube (Detects your last viewed YouTube videos)  
