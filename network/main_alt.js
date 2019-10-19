ClassC(["192.168.1.", "192.168.0.", "10.0.0."], Checker);

async function Checker(ip) {
    try {
      let v1 = "http://".concat(ip);
      let v2 = "https://".concat(ip);
      fetch(v1, {mode: "no-cors"}).then(_ => addData(v1));
      fetch(v2, {mode: "no-cors"}).then(_ => addData(v2));
    } catch(err) {}
}

async function ClassC(array, callback) {
    array.forEach(prefix => {
        for (var i = 1; i <= 255; i++) {
            callback(prefix + i)
        }
    })
}

async function addData(ip) {
    dataTable.hidden = false;
    info.hidden = true;
    data.insertRow(0).insertCell(0).innerText = ip;
}
