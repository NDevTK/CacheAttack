/*jshint esversion: 8 */

// NDev 2020 https://github.com/NDevTK/CacheAttack

ClassC(["192.168.1.", "192.168.0.", "10.0.0."], Checker);

async function Checker(ip) {
    let state = await isAlive(ip);
    if(state) addData(ip); 
}

async function ClassC(array, callback) {
    array.forEach(prefix => {
        for (var i = 1; i <= 255; i++) {
            callback(prefix + i);
        }
    });
}

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function isAlive(ip) {
    try {
    var img = new Image(0, 0);
    img.hidden = true;
    img.src = "http://"+ip;
    document.body.appendChild(img);
    } catch(err) {}
    await wait(2000);
    let data = img.complete;
    img.remove();
    return data;
}

async function addData(ip) {
    dataTable.hidden = false;
    info.hidden = true;
    data.insertRow(0).insertCell(0).innerText = ip;
}
