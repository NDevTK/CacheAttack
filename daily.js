const fs = require('fs');
const fetch = require('node-fetch');

getChannels();

async function getChannels() {
  let r = await fetch("https://cors.usercontent.ndev.tk/channels");
  let channels = await r.json();
  var output = [];
  for (channel of channels) {
    try {
    let r = await fetch("https://invidio.us/api/v1/search?type=channel&q="+encodeURI(channel));
    if(r.status !== 200) continue
    let result = await r.json();
    if(result.length === 0) continue
    let channelData = result[0];
    let url = channelData.authorThumbnails[0].url.replace("c0x00ffffff", "c0xffffffff");
    output.push([channelData.authorId, url]);
    } catch {
      console.log("Error parsing API: "+channel);
    }
  };
  fs.writeFileSync('channels', output);
}
