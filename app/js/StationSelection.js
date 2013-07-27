var StationSelection = function(){

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
}
StationSelection.prototype = {
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
      var div = this.makeStationDiv(station);
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
  makeStationDiv: function(station){
    var div = document.createElement('div');
    div.classList.add('station');

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
      toggleFavorite.classList.toggle('favorited');
      this.toggleFavorite(station);
    }.bind(this));

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
