const fs = require('fs');
const fetch = require('node-fetch');

const cid_regex = /<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/([a-z0-9-_]*)">/i;
const thumbnail_regex = /<link rel="image_src" href="(https:\/\/yt3\.ggpht\.com\/a\/[a-z0-9-_]*)[a-z0-9-_=]*">/i;

getChannels();

async function getChannels() {
  var output = new Map(JSON.parse(fs.readFileSync('channels')));
  console.info("Fetching top channels");
  let channels = ["UC0ArlFuFYMpEewyRBzdLHiw","RootOfTheNull","UCgTNupxATBfWmfehv21ym-g","BlackHatOfficialYT","irongeek","DEFCONConference","UCa6eh7gCkpPo5XXUDfygQQA","Hak5Darren","SecurityWeeklyTV","UCJ2U9Dq9NckqHMbcUupgF0A","UClcE-kVhqyiHCcjYwcpfj9w","JackkTutorials","UC_bzikURwRp3Vdbl3VL959Q","NetworkChuck","UCsKK7UIiYqvK35aWrCCgUUA","sunstudiophotography","Computerphile","UCef0TWni8ghLcJphdmDBoxw","UC6xPeWVq6LpLqOYQ4I9hv_Q","elithecomputerguy","Secureninja","UCQN2DsjnYH60SFBIA6IkNwg","UC0ZTPkdxlAKf-V33tqXwi3Q"]
  channels = [...new Set(channels)];
  //channels.length = 5;
  console.info("Getting data from Youtube");
  await PromiseForeach(channels, async (channel, index) => {
    try {
    let r = await fetch("https://www.youtube.com/"+encodeURI(channel));
    if(r.status !== 200) return
    let result = await r.text();
    if(result.length === 0) return
    let cid = result.match(cid_regex)[1];
    let thumbnail = result.match(thumbnail_regex)[1];
    if(cid === undefined || thumbnail === undefined) return
    let url = thumbnail.concat("=s88-c-k-c0xffffffff-no-rj-mo");
    output.set(cid, thumbnail);
    } catch {}
  });
  console.info("Making file :D");
  fs.writeFileSync('channels', JSON.stringify([...output]));
}

async function PromiseForeach(item, callback) {
  var jobs = [];
  item.forEach(x => jobs.push(callback(x)));
  await Promise.all(jobs);
}
