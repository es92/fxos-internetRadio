function Stations(){
  this.stations = window.stationsData;
}

Stations.prototype = {
  search: function(search){
    var matches = [];
    if (search === '')
      return matches;
    for (var i = 0; i < this.stations.directory.entry.length; i++){
      var station = this.stations.directory.entry[i];
      var match = false;
      if (typeof search == 'string'){
        match = match || this.stationMatch(station, search);
      }
      else {
        for (var j = 0; j < search.length; j++){
          var subsearch = search[j];
          if (subsearch.indexOf(' ') === -1){
            match = match || this.stationMatch(station, subsearch);
          }
          else {
            match = match || subsearch.split(' ').map(function(s){ return this.stationMatch(station, s); }.bind(this)).reduce(function(a, b){ return a && b; });
          }
        }
      }
      if (match)
        matches.push(station);
    }
    matches.sort(this.sortByListeners);
    return matches;
  },
  stationMatch: function(station, search){
    var match = false;
    match = match || station.server_name[0].toLowerCase().indexOf(search) != -1;
    match = match || (station.description && station.description.toLowerCase().indexOf(search) != -1);
    match = match || (station.tags && station.tags.indexOf(search) != -1);
    return match;
  },
  sortByListeners: function(a, b){
    if (a.listeners < b.listeners)
      return 1;
    else if (b.listeners < a.listeners)
      return -1;
    else
      return 0;
  }
}
