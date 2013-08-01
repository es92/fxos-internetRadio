function App(){

  this.favorites = new Favorites();

  this.viewSwitcher = new ViewSwitcher();
  this.stationSelection = new StationSelection(this.favorites);

  this.nowPlaying = new NowPlaying(this.favorites);

  this.viewSwitcher.setView('genres');

  this.stationSelection.onselectStation = this.nowPlaying.setStation.bind(this.nowPlaying);

  this.stationSelection.ontoggleFavorite = this.favorites.toggleFavorite.bind(this.favorites);
  this.nowPlaying.ontoggleFavorite = this.favorites.toggleFavorite.bind(this.favorites);

  this.favorites.onsetIsFavorite = function(station, isFavorite){
    this.nowPlaying.setIsFavorite(station, isFavorite);
    this.stationSelection.setIsFavorite(station, isFavorite);
  }.bind(this);
}

App.prototype = {

}

window.addEventListener('load', function(){ new App(); });
