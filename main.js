// NDev 2020 https://github.com/NDevTK/CacheAttack

document.addEventListener('DOMContentLoaded', async _ => {
    setTimeout(async _ => {
            await getWebsites(displayName => addData(displayName));
            await getVideos(displayName => addData(displayName));
            if (dataTable.hidden === true) info.innerText = "No result found :(";
    }, 150)
});

async function addData(displayName) {
    dataTable.hidden = false;
    info.hidden = true;
    data.insertRow(0).insertCell(0).innerText = displayName;
}

async function windowMode() {
    initChecker();
    ifCached = ifCached_3;
    await getWebsites(displayName => addData(displayName), true, false);
    //await getVideos(displayName => addData(displayName), true, false);
}
