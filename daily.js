const fs = require('fs');
const fetch = require('node-fetch');

getChannels();

async function getChannels() {
  let r = await fetch("https://cors.usercontent.ndev.tk/channels");
  let channels = await r.json();
  for (channel of channels) {
    let r = await fetch("https://invidio.us/api/v1/search?type=channel&q="+encodeURI(channel));
    if(r.status !== 200) continue
    let result = await r.json();
    let channelData = result[0];
    let url = channelData.authorThumbnails[0].url.replace("c0x00ffffff", "c0xffffffff");
    output.push([channelData.authorId, url]);
  };
  fs.writeFileSync('channels', output);
}
