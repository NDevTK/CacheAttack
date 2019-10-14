const BlockCache = true;
const max = 30;
Websites = new Map();
Websites.set('https://www.microsoft.com/favicon.ico?v2', "Microsoft")
.set("https://github.com/manifest.json", "Github")
.set("https://discordapp.com/assets/07dca80a102d4149e9736d4b162cff6f.ico", "Discord")
.set("https://s.yimg.com/rz/l/favicon.ico", "Yahoo")
.set("https://outlook.live.com/owa/favicon.ico", "Outlook")
.set("https://combo.staticflickr.com/pw/favicon.ico", "Flicker")
.set("https://static.xx.fbcdn.net/rsrc.php/yo/r/iRmz9lCMBD2.ico", "Facebook")
.set("https://twitter.com/manifest.json", "Twitter")
.set("https://ndev.tk/favicon.ico", "NVDev")
.set("https://www.bing.com/sa/simg/bing_p_rr_teal_min.ico", "Bing")
.set("https://www.redditstatic.com/desktop2x/img/banner/redditor@2x.png", "Reddit")
.set("https://youtube.com/manifest.json", "Youtube")
.set("https://store.steampowered.com/favicon.ico", "Steam")
.set("https://ssl.gstatic.com/ui/v1/icons/mail/images/favicon5.ico", "Google mail")
.set("https://www.gstatic.com/images/branding/googlemic/2x/googlemic_color_24dp.png", "Google")
.set("https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico?v=4f32ecc8f43d", "Stack Overflow")
.set("https://cdn.sstatic.net/Sites/security/img/favicon.ico?v=7585a77d4575", "Information Security Stack Exchange")
.set("https://cdn.sstatic.net/Sites/codereview/img/logo.svg?v=0dfb1294dc6e0", "Code Review Stack Exchange")
.set("https://cdn.sstatic.net/Sites/superuser/img/favicon.ico?v=29b26120d2c5", "Super User")
.set("https://static-global-s-msn-com.akamaized.net/hp-neu/sc/2b/a5ea21.ico", "MSN")
.set("https://www.torproject.org/static/images/favicon/favicon.ico", "Tor Project")
.set("https://duckduckgo.com/favicon.ico", "DuckDuckGo")
.set("https://secure.skypeassets.com/apollo/2.1.1477/images/icons/favicon.ico", "Skype")
.set("https://www.amazon.com/favicon.ico", "Amazon")
.set("https://pages.ebay.com/favicon.ico", "ebay")

function is304(res) { // Requires CORS
  if (res.encodedBodySize > 0 &&
      res.transferSize > 0 &&
      res.transferSize < res.encodedBodySize) {
    return true;
  }
  return null;
}

setTimeout(START, 50);
async function START() { 
  isCached = await isPageCached();
  if(isCached && BlockCache) {
    info.innerText = "Please remove your cache!";
    return
  }
  Websites.forEach(Main);
  if(dataTable.hidden === true) {
    info.innerText = "No results found :(";
  }
}

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function addData(displayName) {
    dataTable.hidden = false;
    info.hidden = true;
    data.insertRow(0).insertCell(0).innerText = displayName;
}

async function Main(displayName, url) {
  let res = await Performance(url);
  if(res.encodedBodySize === undefined) return
  let isCached = isCacheHit(res);
  if(isCached) addData(displayName);
}

async function Performance(url){
  var img = new Image(0,0);
  img.hidden = true;
  img.src = url;
  document.body.appendChild(img); 
  await wait(max);
  let data = performance.getEntriesByName(url)[0];
  img.remove();
  return data;
}

function isCacheHit(res) {
if(is304(res)) return true;
if (res.transferSize > 0) return false;
if (res.decodedBodySize > 0) return true;
return res.duration < max;
}

async function isPageCached() {
  if(is304(performance.getEntriesByType("navigation")[0])) return true;
  return (performance.getEntriesByType("navigation")[0].transferSize === 0);
}
