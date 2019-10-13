const BlockCache = true;
var urls = [
'https://www.microsoft.com/favicon.ico',
'https://github.com/favicon.ico',
'https://discordapp.com/assets/07dca80a102d4149e9736d4b162cff6f.ico',
'https://www.yahoo.com/favicon.ico',
'https://outlook.live.com/owa/favicon.ico',
'https://www.flickr.com/favicon.ico',
'https://stackoverflow.com/favicon.ico',
'https://facebook.com/favicon.ico',
'https://twitter.com/favicon.ico',
'https://ndev.tk/favicon.ico',
'https://www.bing.com/favicon.ico',
'https://en.wikipedia.org/favicon.ico',
'https://www.reddit.com/favicon.ico',
'https://www.youtube.com/favicon.ico',
'https://store.steampowered.com/favicon.ico',
'https://mail.google.com/favicon.ico'
];

function is304(res) {
  if (res.encodedBodySize > 0 &&
      res.transferSize > 0 &&
      res.transferSize < res.encodedBodySize) {
    return true;
  }
  return null;
}

setTimeout(START, 50);
async function START() { 
  urls.forEach(insert_image);
  isCached = await isPageCached();
  if(isCached && BlockCache) {
    dataTable.hidden = true;
    removeCache.hidden = false;
    return
  }
  dataTable.hidden = false;
  setTimeout(() => {
  performance.getEntriesByType("resource").forEach(res => {
    if(urls.includes(res.name)) Main(res);
  });
  }, 500);
}

async function addData(url) {
    let host = new URL(url).host;
    data.insertRow(0).insertCell(0).innerText = host;
}

async function Main(res) {
  let isCached = isCacheHit(res);
  if(isCached) addData(res.name);
}

async function insert_image(img_url){
  var img = new Image(16, 16);
  img.alt = "Website icon";
  img.src = img_url;
  var src = document.getElementById("icons");
  src.appendChild(img);
}

function isCacheHit(res) {
if(is304(res)) return true;
if (res.transferSize > 0) return false;
if (res.decodedBodySize > 0) return true;
return res.duration < 30;
}

async function isPageCached() {
  if(is304(performance.getEntriesByType("navigation")[0])) return true;
  return (performance.getEntriesByType("navigation")[0].transferSize === 0);
}
