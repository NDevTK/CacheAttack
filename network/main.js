ClassC(["192.168.1.", "192.168.0.", "10.0.0."], Checker);

async function Checker(ip) {
    try {
      fetch("http://".concat(ip), {mode: "no-cors"}).then(addData);
      fetch("https://".concat(ip), {mode: "no-cors"}).then(addData);
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
