// NDev 2019 https://github.com/NDevTK/CacheAttack
const cache_test = "https://ndev.tk/README.md?".concat(Math.random());

document.addEventListener('DOMContentLoaded', async _ => {
    setTimeout(async _ => {
        // AbortController check
        await ifCached(cache_test).catch(_ => {});
        ifCached(cache_test).then(_ => info.innerText = "AbortController check failed").catch(async _ => {
            // Foreach website check if cached
            getWebsites().then(result => result.forEach(website => {
                addData(displayName);
            }))
            if (dataTable.hidden === true) info.innerText = "No result found :(";
        });
    }, 150)
});
