var stations = require('./stations-filtered.json');

stations.directory.entry.forEach(function(x){ return x.listeners = parseInt(x.listeners); });

stations.directory.entry.sort(function(a, b){
  if (a.listeners < b.listeners)
    return -1;
  else if (a.listeners > b.listeners)
    return 1;
  else
    return 0;
});

stations.directory.entry.forEach(function(station){
  console.log(station.listeners, station.server_name, station.tags);
});

console.log(stations.directory.entry.length)

