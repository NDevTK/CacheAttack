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
Websites.forEach(Checker);

async function addData(displayName) {
    dataTable.hidden = false;
    info.hidden = true;
    data.insertRow(0).insertCell(0).innerText = displayName;
}

async function Checker(displayName, url) {
  ifCached(url).then(_ => addData(displayName)).catch(_ => {});
}

async function ifCached(url){
  var cotroller = new AbortController;
  var signal = cotroller.signal;
  let timeout = await setTimeout(_ => {
    cotroller.abort();
    throw "Timeout";
  }, max);
  await fetch(url, {mode: "no-cors", signal});
  clearTimeout(timeout);
  return;
}
