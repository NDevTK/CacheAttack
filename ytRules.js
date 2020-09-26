const fs = require('fs');
const fetch = require('node-fetch');

const cid_regex = /<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/([a-z0-9-_]*)">/i;
const thumbnail_regex = /<link rel="image_src" href="(https:\/\/yt3\.ggpht\.com\/a\/[a-z0-9-_]*)[a-z0-9-_=]*">/i;

getChannels();

async function getChannels() {
  var output = new Map(JSON.parse(fs.readFileSync('channels')));
  console.info("Fetching top channels");
  let channels = ["c/tseriesmusic","c/netdmuzik","c/elreinoinfantil","c/kondzillas","c/bhojpuriwave","c/justinbiebervebo","c/ed-sheeran","c/filmigaane","c/gmmgrammyofficialblogspot2014","c/yrf","c/spinninrecords","c/worldstarhiphop","c/loolookids","c/sonymusicindia","c/ozuna","c/cancionesdelagranjaoficial","c/ultramusic","c/nickyjamtv","c/t-seriesapnapunjab","c/grammygoldofficial","c/brunomars","c/blackpinkofficial","c/rajshri","c/gaanesuneansune","c/bighitlabels","c/daddyyankee","c/-trapnation","c/mariliamendoncareal","c/fueledbyramen","c/tseriesoldisgold","c/coldplay","c/adityamusic","c/rotanaaudio","c/genierock","c/wizkhalifa","c/jypentertainment","c/bouncepatrolkidstv","c/atlanticrecords","c/marshmello-music","c/badbunnypr","c/toycantando","c/wavemusicbhojpuri","c/adeles","c/selenagomezvevi","c/alanwalkermusic","c/linkin-park","c/pitbullvevi","c/henriqueejuliano","c/musicalrmastv1","c/nocopyrightsounds","c/shawnmendes-vevo","c/officialpdy","c/worldwiderecordsbhojpuri","c/popsvnpage","c/avicii-vevo","c/geetmp3","c/hearthismusictv","c/drakevev","c/doctruyencotichbhmedia","c/gusttavolimaoficial","c/charlieputh","c/lizosmusic","c/catmusic","c/jasonderulo","c/stonemusicent","c/samsmithvevo","c/whitehillmusic","c/rsfriends","c/codiscos","c/nbayoungboy","c/wesleysafadao","c/sonotek","c/jorgeemateus","c/kontorrecords","c/popchartbusters","c/skrillex","c/dualipa","c/picapicaoficial","c/rizanovauz","c/xxxtentacion","c/boyceaveenue","c/oreinoinfantil","c/warnermusicitalia","c/dopelyrics","c/saregamamusic","c/karameeshchannel","c/patatipatatabr","c/mkmusic","c/demilovatovevi","c/fitdancetv","c/piso21music","c/thinkmusicindia","c/anittas","c/pollproduction","c/teamfilmsbhojpuri","c/cantececopiitralala","c/planetaofficial","c/delrecordsoficial","c/nattinatasha","c/desimusicfactory","c/hamaarbhojpuri","c/martingarrix","c/redhotchilipeppers","c/paulolondra","c/ceylinhofficial","c/bollywoodclassics","c/warnermusiclatina","c/ello","c/officialtrapcity","c/rotonmusictv","c/elcanaldeplimplim","c/zeemusicrewind","c/katiecutiekidstv","c/singkingkaraoke","c/awakenings","c/tseriesregional","c/mundobita","c/pinarecords","c/dokuzsekizmuzikyapim","c/anandaudio","c/flowlamovie","c/legomartin","c/lilpump","c/rockrecordstaipei","c/mtzmanuelturizo","c/grmdaily","c/disneychannellavevo","c/jassrecords","c/morharyanvi","c/starscasablanca","c/anuelaa","c/luan-santana","c/syrebralvibes","c/inna","c/rhinoentertainment","c/thuynga"]
  channels = [...new Set(channels)];
  //channels.length = 5;
  console.info("Getting data from Youtube");
  await PromiseForeach(channels, async (channel, index) => {
    try {
    let r = await fetch("https://www.youtube.com/"+encodeURI(channel));
    if(r.status !== 200) return
    let result = await r.text();
    if(result.length === 0) return
    let cid = result.match(cid_regex)[1];
    let thumbnail = result.match(thumbnail_regex)[1];
    if(cid === undefined || thumbnail === undefined) return
    let url = thumbnail.concat("=s88-c-k-c0xffffffff-no-rj-mo");
    output.set(cid, thumbnail);
    } catch {}
  });
  console.info("Making file :D");
  fs.writeFileSync('channels', JSON.stringify([...output]));
}

async function PromiseForeach(item, callback) {
  var jobs = [];
  item.forEach(x => jobs.push(callback(x)));
  await Promise.all(jobs);
}
