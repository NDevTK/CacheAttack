// NDev 2020 https://github.com/NDevTK/CacheAttack

document.addEventListener('DOMContentLoaded', async _ => {
    setTimeout(async _ => {
            await getWebsites(displayName => addData(displayName));
            if (dataTable.hidden === true) info.innerText = "No result found :(";
    }, 150)
});

async function addData(displayName) {
    dataTable.hidden = false;
    info.hidden = true;
    data.insertRow(0).insertCell(0).innerText = displayName;
}

function clearTable() {
    var rowCount = dataTable.rows.length; while(--rowCount) dataTable.deleteRow(rowCount);
    dataTable.hidden = true;
    info.innerText = "Loading...";
}

function windowMode() {
    clearTable();
    initChecker();
    if(!navigator.userAgent.includes("Firefox") && !confirm("Warning: for chrome window mode will brake CacheAttack after the first run.")) return
    ifCached = ifCached_3;
    setTimeout(_ => {
        getWebsites(displayName => addData(displayName), true, false);
        if (dataTable.hidden === true) info.innerText = "No result found :(";
    }, 1000)    
}

function blocker() {
    initChecker();
    var domain = prompt("What domain to block?", "www.google.com");
    if(domain === null) return
    var url = "https://"+domain+"/"+Math.random()+Math.random();
    blockerFrame(url);
    if(navigator.userAgent.includes("Firefox")) return alert("Feature not supported on Firefox :(");
    ifCached = ifCached_3;
    setTimeout(_ => {
        block(url);
        ifrm.src = "https://ndev.tk/icon.webp";
    }, 1000) 
}

function YT() {
    clearTable();
    getVideos(displayName => addData(displayName));
}
