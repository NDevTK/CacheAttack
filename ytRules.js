const fs = require('fs');
const fetch = require('node-fetch');

getChannels();

async function getChannels() {
  var channels = [...new Map(JSON.parse(fs.readFileSync('channels'))).keys()];
  var output = new Map();
  console.info("Fetching top channels");
  //channels.length = 5;
  for (channel of channels) {
  let r = await fetch("https://invidio.us/api/v1/channels/"+encodeURI(channel));
  let data = await r.json();
  output.set(channel, data.authorThumbnails[0].url.replace("s32", "s400"));
  }
  console.info("Making file :D");
  fs.writeFileSync('channels', JSON.stringify([...output]));
}
