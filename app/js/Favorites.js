var Favorites = function(){
  this.load();

  Utils.setupPassParent(this, 'setIsFavorite');
}

Favorites.prototype = {
  toggleFavorite: function(station){
    var key = this.getStationKey(station);
    if (this.favorites[key]){
      delete this.favorites[key];
    }
    else {
      this.favorites[key] = station;
    }
    this.setIsFavorite(station, !!this.favorites[key]);
    this.save();

  },
  isFavorite: function(station){
    return !!this.favorites[this.getStationKey(station)];
  },
  getFavorites: function(){
    var favorites = [];
    for (var key in this.favorites)
      favorites.push(this.favorites[key]);
    return favorites;
  },
  getStationKey: function(station){
    return station.server_name + station.description;
  },
  load: function(){
    if (window.localStorage.favorites)
      this.favorites = JSON.parse(window.localStorage.favorites);
    else
      this.favorites = {};
  },
  save: function(){
    window.localStorage.favorites = JSON.stringify(this.favorites);
  },
}
