var StationSelection = function(favorites){

  this.favorites = favorites;
  this.stations = new Stations();

  this.dom = {};
  this.dom.searchInput = document.querySelector('.header-search input');
  Utils.onEnter(this.dom.searchInput, this.search.bind(this));

  this.dom.mainSearch = document.querySelector('.main-search');
  this.dom.mainGenres = document.querySelector('.main-genres');
  this.dom.mainFavorites = document.querySelector('.main-favorites');

  this.dom.genresBack = document.querySelector('.main-genres .back');
  Utils.onButtonTap(this.dom.genresBack, function(){
    this.setViewCategories(this.dom.mainGenres, window.genresData);
  }.bind(this));

  this.setViewCategories(this.dom.mainGenres, window.genresData);

  Utils.setupPassParent(this, 'selectStation');
  Utils.setupPassParent(this, 'toggleFavorite');

  this.refreshFavorites();

}
StationSelection.prototype = {
  refreshFavorites: function(){
    this.setViewStations(this.dom.mainFavorites, this.favorites.getFavorites());
  },
  setIsFavorite: function(station, isFavorite){
    var stations = document.querySelectorAll('.station');
    var str = JSON.stringify(station);
    var foundInFavorites = false;
    for (var i = 0; i < stations.length; i++){
      var stationDiv = stations[i];
      var divStation = stationDiv.getAttribute('data-station');
      if (str === divStation){
        if (stationDiv.getAttribute('data-view-class').indexOf('main-favorites') !== -1)
          foundInFavorites = true;
        var favoriteDiv = stationDiv.querySelector('.toggleFavorite');
        if (isFavorite)
          favoriteDiv.classList.add('favorited')
        else
          favoriteDiv.classList.remove('favorited')
      }
    }
    if (isFavorite && !foundInFavorites){
      var div = this.makeStationDiv(this.dom.mainFavorites, station);
      var items = this.dom.mainFavorites.querySelector('.items');
      items.appendChild(div);
    }
  },
  search: function(){
    var search = this.dom.searchInput.value;
    var matches = this.stations.search(search);
    this.setViewStations(this.dom.mainSearch, matches);
  },
  setViewStations: function(view, stations){
    var items = view.querySelector('.items');
    if (view.querySelector('.title'))
      view.classList.add('hastitle');
    else
      view.classList.remove('hastitle');
    Utils.empty(items);
    for (var i = 0; i < stations.length; i++){
      var station = stations[i];
      var div = this.makeStationDiv(view, station);
      items.appendChild(div);
    }
    items.scrollTop = 0;
  },
  setViewCategories: function(view, categories){
    var items = view.querySelector('.items');
    var title = view.querySelector('.title');
    title.classList.add('hidden');
    view.classList.remove('hastitle');
    Utils.empty(items);
    for (var i = 0; i < categories.length; i++){
      var category = categories[i];
      var div = this.makeCategoryDiv(view, category);
      items.appendChild(div);
    }
    items.scrollTop = 0;
  },
  makeStationDiv: function(view, station){
    var div = document.createElement('div');
    div.classList.add('station');
    div.setAttribute('data-station', JSON.stringify(station));
    div.setAttribute('data-view-class', view.classList);

    var content = document.createElement('div');
    content.classList.add('tappable');
    content.classList.add('content');
    div.appendChild(content);
    Utils.onButtonTap(content, function(){
      this.selectStation(station);
    }.bind(this));

    var title = document.createElement('div');
    title.classList.add('title');
    title.innerHTML = station.server_name;
    content.appendChild(title);

    var listeners = document.createElement('div');
    listeners.classList.add('listeners');
    listeners.innerHTML = station.listeners + ' listeners';
    content.appendChild(listeners);

    var description = document.createElement('div');
    description.classList.add('description');
    description.innerHTML = station.description;
    content.appendChild(description);

    var toggleFavorite = document.createElement('div');
    toggleFavorite.classList.add('toggleFavorite');
    div.appendChild(toggleFavorite);
    Utils.onButtonTap(toggleFavorite, function(){
      this.toggleFavorite(station);
    }.bind(this));
    if (this.favorites.isFavorite(station))
      toggleFavorite.classList.add('favorited');

    return div;
  },
  makeCategoryDiv: function(view, category){
    var div = document.createElement('div');
    div.classList.add('category');
    div.classList.add('tappable');

    var title = document.createElement('div');
    title.classList.add('title');
    title.innerHTML = category[0];
    div.appendChild(title);

    Utils.onButtonTap(div, function(){
      var title = view.querySelector('.title');
      title.classList.remove('hidden');

      var titletext = title.querySelector('.text');
      titletext.innerHTML = category[0];
      this.setViewStations(view, this.stations.search(category));
    }.bind(this));

    return div;
  }
}
