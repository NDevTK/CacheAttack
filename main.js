/*jshint esversion: 8 */

// NDev 2020 https://github.com/NDevTK/CacheAttack

document.addEventListener('DOMContentLoaded', async _ => {
    setTimeout(async _ => {
            clearTable();
            await getWebsites(displayName => addData(displayName));
            loaded();
    }, 150);
});

async function addData(displayName) {
    dataTable.hidden = false;
    data.insertRow(0).insertCell(0).innerText = displayName[1];
}

function loaded() {
    if (dataTable.hidden === true) {
        info.innerText = "No result found :(";
    } else {
        info.hidden = true;
    }
}

function clearTable() {
    var rowCount = dataTable.rows.length; while(--rowCount) dataTable.deleteRow(rowCount);
    dataTable.hidden = true;
    info.innerText = "Loading...";
    info.hidden = false;
}

async function windowMode() {
    if(!navigator.userAgent.includes("Firefox") && !confirm("Warning: for chrome window mode will brake CacheAttack after the first run.")) return;
    clearTable();
    initChecker();
    ifCached = ifCached_window;
    setTimeout(async _ => {
        let results = await getWebsites(addData, null, false);
        loaded();
    }, 1000);
}

async function domainRule(domain) {
    var rules = await getRules();
    for (let rule of rules) {
        if(new URL(rule).host === domain) {
            return rule;
        }
    }
    return "https://" + domain + "/favicon.ico";
}

async function blocker() {
    var domain = prompt("What domain to block?", "www.google.com");
    if (domain === null) return;
    domain = domain.toLocaleLowerCase();
    initChecker();
    var url = await domainRule(domain);
    blockerFrame(url);
    if (navigator.userAgent.includes("Firefox")) return alert("Feature not supported on Firefox :(");
    ifCached = ifCached_window;
    setTimeout(_=> {
        block(url);
        ifrm.src = "https://ndev.tk/icon.webp";
    }, 1000);
}
