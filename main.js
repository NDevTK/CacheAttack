// NDev 2019 https://github.com/NDevTK/CacheAttack
const max = 10;
const cache_test = "https://ndev.tk/README.md?".concat(Math.random());
const favicon = "https://cache.ndev.tk/favicon.ico";

async function getRules() {
let req = await fetch("https://cache.ndev.tk/rules")
let body = await req.json();
return new Map(body);
}

document.addEventListener('DOMContentLoaded', _ => {
    setTimeout(async _ => {
            var Websites await = getRules();
            // AbortController check
            await ifCached(cache_test).catch(_ => {});
            ifCached(cache_test).then(_ => info.innerText = "AbortController check failed").catch(async _ => {
                // Foreach website check if cached
                for (let website of Websites) {
                    await Checker(website[1], website[0]);
                }
                if (dataTable.hidden === true) info.innerText = "No result found :(";
            });
    }, 150)
});

async function addData(displayName) {
    dataTable.hidden = false;
    info.hidden = true;
    data.insertRow(0).insertCell(0).innerText = displayName;
}

// Add website to table if cached
async function Checker(displayName, url) {
  await ifCached(url).then(_ => addData(displayName)).catch(_ => {});
}

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
