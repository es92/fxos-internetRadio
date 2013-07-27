var stations = require('./stations-filtered.json');

stations.directory.entry.forEach(function(x){ return x.listeners = parseInt(x.listeners); });

var tags = { };

stations.directory.entry.forEach(function(station){
  for (var i = 0; i < station.tags.length; i++){
    var tag = station.tags[i];
    if (tag in tags){
      tags[tag] += station.listeners || 1;
    }
    else {
      tags[tag] = station.listeners || 1;
    }
  }
});

var tagsArray = [];
for (tag in tags){
  tagsArray.push({
    tag: tag,
    score: tags[tag]
  });
}

tagsArray.sort(function(a, b){
  if (a.score < b.score)
    return -1;
  else if (a.score > b.score)
    return 1;
  else 
    return 0;
});

console.log(tagsArray);
