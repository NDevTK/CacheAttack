
basicScan(["192.168.1.", "192.168.0."], addData);

async function Performance(ip){
  var img = new Image(0,0);
  img.hidden = true;
  img.src = "http://"+url;
  document.body.appendChild(img); 
  await wait(max);
  let data = img.complete;
  img.remove();
  return data;
}

async function ClassC(array, callback) {
    array.forEach(prefix => {
        for (var i = 1; i <= 255; i++) {
            callback(start + i)
        }
    })
}

async function addData(displayName) {
    dataTable.hidden = false;
    info.hidden = true;
    data.insertRow(0).insertCell(0).innerText = displayName;
}
