function App(){
  this.viewSwitcher = new ViewSwitcher();
  this.stationSelection = new StationSelection();

  this.viewSwitcher.setView('genres');

  this.stationSelection.onselectStation = function(station){
    console.log('ss', station);
  }.bind(this);

  this.stationSelection.ontoggleFavorite = function(station){
    console.log('tf', station);
  }.bind(this);

}

App.prototype = {

}

window.addEventListener('load', function(){ new App(); });
