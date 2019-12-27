Sanity = true;

async function getRules() {
    let req = await fetch("https://cache.ndev.tk/files/rules");
    let body = await req.json();
    return body;
}

document.addEventListener('DOMContentLoaded', async (event) => {
	await wait(1000)
	getRules().then(rules => {
		FileChecker(rules, Found);
	});
	EvalDrives();
});

async function Found(file) {
	if(file === "NOOB/SanityCheck.txt" || file === "NOOB/SanityCheck.dat") {
		Sanity = false;
		alert("SanityCheck failed");
	}
    addData(file);
}

async function FileChecker(array, callback) {
	for (let index = 0; index < array.length; index++) {
		let state = await isLocal(array[index]);
		if(state && Sanity) Found(array[index]);
	}
}

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function EvalDrives() {
	for (i = 0; i < 26; i++) {
		var letter = (i+10).toString(36).toUpperCase();
		let state = await isLocal("", letter, 2.2, 3.5);
		if(state && Sanity) FoundDrive(letter);
	}
}

async function isLocal(file, drive = "C", min = 1.7, max = 30) {
	    var state = false;
		var start = "";
        if (!Sanity) return
        try {
            img = new Image(0, 0);
            img.onerror = _ => {
                let time = performance.now() - start;
                if (time > min && time < max) state = true;
            }
        start = performance.now();
        img.src = "file:///" + drive + ":/" + file;
        } catch (err) {}
		await wait(100);
		return state
}

async function addData(file) {
    dataTable.hidden = false;
    data.insertRow(0).insertCell(0).innerText = file;
}

async function FoundDrive(file) {
    dataTable2.hidden = false;
    data2.insertRow(0).insertCell(0).innerText = file;
}
