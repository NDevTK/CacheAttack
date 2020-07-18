const fs = require('fs');
const fetch = require('node-fetch');

checkRules();

async function checkRules() {
  let r = await fetch("https://cache.ndev.tk/rules");
  let websites = await r.json();
  var output = [];
  await PromiseForeach(websites, async (website, index) => {
    let r = await fetch(website[0]);
    if(r.status !== 200) return
    output.push([website[0], website[1]]);
  });
  fs.writeFileSync('rules', JSON.stringify(output));
}

async function PromiseForeach(item, callback) {
  var jobs = [];
  item.forEach(x => jobs.push(callback(x)));
  await Promise.all(jobs);
}
