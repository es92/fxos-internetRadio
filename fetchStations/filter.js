var fs = require('fs');

var stationsplus = require('./stations-plus.json');

var byName = {};

stationsplus.directory.entry = stationsplus.directory.entry.filter(function(station){ return station.listeners !== undefined });

stationsplus.directory.entry.forEach(function(station){
  
  station.listeners = parseInt(station.listeners); 
  
  station.tags = station.genre[0].split(' ').filter(function(s){ return s.length > 1; });
  delete station.genre;
});

stationsplus.directory.entry.forEach(function(station){
  if (byName[station.server_name]){
    byName[station.server_name].listeners = Math.max(byName[station.server_name].listeners, station.listeners);
  }
  else {
    byName[station.server_name] = station;
  }
});

var stations = {
  directory: {
    entry: []
  }
};

for (var name in byName){
  var station = byName[name];
  stations.directory.entry.push(station);
}


fs.writeFileSync("stations-filtered.json", JSON.stringify(stations));
