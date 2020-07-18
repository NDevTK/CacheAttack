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
    ifCached = ifCached_3;
    setTimeout(_ => {
        getWebsites(displayName => addData(displayName), true, false);
        if (dataTable.hidden === true) info.innerText = "No result found :(";
    }, 1000)    
}

function YT() {
    clearTable();
    getVideos(displayName => addData(displayName));
}
