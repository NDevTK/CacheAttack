// NDev 2019 https://github.com/NDevTK/CacheAttack
const cache_test = "https://ndev.tk/README.md?".concat(Math.random());

document.addEventListener('DOMContentLoaded', async _ => {
    setTimeout(async _ => {
            // Foreach website check if cached
            getWebsites().then(result => {
                result.forEach(displayName => {
                    addData(displayName);
                });
                if (dataTable.hidden === true) info.innerText = "No result found :(";
            });
    }, 150)
});

async function addData(displayName) {
    dataTable.hidden = false;
    info.hidden = true;
    data.insertRow(0).insertCell(0).innerText = displayName;
}
