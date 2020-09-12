async function getHistory() {
	var ads = open("https://m.youtube.com/feed/history/?app=m");
	setTimeout(async _  => ads.close(), 3000);
	setTimeout(async _  => {
		clearTable();
		var result = await getVideos();
	}, 3500);
}

function Video1(id) {
	return "https://i.ytimg.com/vi_webp/"+id+"/mqdefault.webp";
}

function Video2(id) {
	return "https://i.ytimg.com/vi/"+id+"/mqdefault.jpg";
}

async function addData(item) {
    dataTable.hidden = false;
    let cell = data.insertRow(0).insertCell(0);
    cell.innerText = item[1] + "  ";
    let img = document.createElement('img');
    img.src = item[0];
    img.setAttribute("width", "100rem");
    img.alt=item[1];
    cell.appendChild(img);
}

function clearTable() {
    var rowCount = dataTable.rows.length; while(--rowCount) dataTable.deleteRow(rowCount);
    dataTable.hidden = true;
    info.innerText = "Loading...";
    info.hidden = false;
}

async function getVideos() {
  let r = await fetch("https://cache.ndev.tk/channels");
  let channels = await r.json();
  await YTCrawler(channels);
  info.hidden = true;
}

async function YTCrawler(channels) {
  var checks = []
  for (var channel of channels) {
    checks.push([channel[1].concat("=s88-c-k-c0xffffffff-no-rj-mo"), channel[0]]);
  }
  var cached_channels = await getWebsites(null, checks);
  for (var channel of cached_channels) {
    let r = await fetch("https://invidio.us/api/v1/channels/"+encodeURI(channel[1])+"/videos");
    let channelData = await r.json();
    addData([channel[0], channelData[0].author]);
    if(channelData.error) continue
    var videos = [];
    for (var video of channelData) {
	    videos.push([Video1(video.videoId), video.title]);
	    videos.push([Video2(video.videoId), video.title]);
     };
     var cached_videos = await getWebsites(null, videos);
     cached_videos.map(addData);
  }
}
