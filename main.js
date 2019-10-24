// NDev 2019 https://github.com/NDevTK/CacheAttack
const max = 10;
const cache_test = "https://ndev.tk/README.md?".concat(Math.random());
Websites = new Map();
Websites.set('https://www.microsoft.com/favicon.ico?v2', "Microsoft")
.set("https://github.com/manifest.json", "Github")
.set("https://discordapp.com/assets/07dca80a102d4149e9736d4b162cff6f.ico", "Discord")
.set("https://s.yimg.com/rz/l/favicon.ico", "Yahoo")
.set("https://outlook.live.com/owa/favicon.ico", "Outlook")
.set("https://assets.nflxext.com/ffe/siteui/fonts/netflix-sans/v3/NetflixSans_W_Rg.woff2", "Netflix")
.set("https://static-exp1.licdn.com/sc/h/3usjoqttpyv7mplawrjzi58bw", "Linkedin")
.set("https://ae01.alicdn.com/wimg/monitor/start-render.png", "Aliexpress")
.set("https://img.alicdn.com/tfs/TB14dANRXXXXXbdXXXXXXXXXXXX-1190-100.jpg", "tmall")
.set("https://mat1.gtimg.com/pingjs/ext2020/qqindex2018/dist/img/qq_logo_2x.png", "Tencent QQ")
.set("https://statics.itc.cn/web/static/images/pic/preload.png", "sohu")
.set("https://vk.com/images/upload.gif", "VK")
.set("https://misc.360buyimg.com/mtd/pc/index_2019/1.0.0/fonts/b07c9855bd807ccc9d825cb0392c6ef8.woff", "JD.com")
.set("https://web.whatsapp.com/img/favicon_c5088e888c97ad440a61d247596f88e5.png", "WhatsApp")
.set("https://m.media-amazon.com/images/G/01/IMDb/icon/play-button._CB318667375_.png", "IMDb")
.set("https://static.wikia.nocookie.net/qube-assets/f2/3774/favicons/manifest.json?v=d9a57b8614c168b95e3af1ca2aaa88285d207e80", "Fandom")
.set("https://protonvpn.com/assets/img/site.webmanifest", "ProtonVPN")
.set("https://sponsor.ajay.app/static/favicons/site.webmanifest", "SponsorBlock")
.set("https://q-cf.bstatic.com/static/fonts/booking-iconset-original/29bca18dce5a8e111855e31314a9b1d750ea9beb.woff2", "Booking.com")
.set("https://nav.files.bbci.co.uk/orbit/3.0.0-703.e93321ed/font/BBCReithSans_W_Rg.woff2", "BBC")
.set("https://s.pinimg.com/images/favicon_red_192.png", "Pinterest")
.set("https://qsf.fs.quoracdn.net/-3-images.logo.icon_q_symbol_red_bg.svg-26-eafba0bcaf699ede.svg", "Quora")
.set("https://www.accuweather.com/images/logos/accuweather.svg", "AccuWeather")
.set("https://ok.ru/res/i/video/play32@2x.png", "ok.ru")
.set("https://protonmail.com/fonts/fontawesome-webfont.woff2", "ProtonMail")
.set("https://news.ycombinator.com/grayarrow.gif", "Hacker News")
.set("https://s1.hdslb.com/bfs/static/jinkela/home/asserts/ic_launcher.png", "Bilibili")
.set("https://yastatic.net/s3/home/fonts/ys/1/text-regular.woff2", "Yandex")
.set("https://www.producthunt.com/manifest.json", "Product Hunt")
.set("https://s.pstatic.net/static/www/img/uit/2019/sp_search.svg", "NAVER")
.set("https://r.mradx.net/img/F8/125832.png", "mail.ru")
.set("https://gtms03.alicdn.com/tps/i3/TB1OMhvIVXXXXbsXVXXD1MBIXXX-190-80.png", "Taobao")
.set("https://glyph.medium.com/font/d8659c9/3k-4f_4h-6bt_6bv-6c3_6c5-6c7_6ca-6cb_6ce-6ch_6cj-6cl_6cn-nvnj/marat-sans-400-normal.woff", "Medium")
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
