function ViewSwitcher(){
  this.dom = {};
  this.dom.switcherbox = new Switchbox(document.querySelector('#mainbox-switcher'));
  this.dom.headerbox = new Switchbox(document.querySelector('#headerbox'));
  this.dom.mainbox = new Switchbox(document.querySelector('#mainbox'));

  this.dom.mainboxSwitcher = document.querySelector('#mainbox-switcher');
  Utils.onButtonTap(this.dom.mainboxSwitcher, this.toggleSwitcher.bind(this));

  this.dom.mainboxSwitchers = document.querySelector('#mainbox-switchers');

  this.dom.switcherSearch = document.querySelector('#mainbox-switchers .search');
  this.dom.switcherGenres = document.querySelector('#mainbox-switchers .genres');
  this.dom.switcherFavorites = document.querySelector('#mainbox-switchers .favorites');
  Utils.onButtonTap(this.dom.switcherSearch, function(){ this.activateSwitcher('search'); }.bind(this));
  Utils.onButtonTap(this.dom.switcherGenres, function(){ this.activateSwitcher('genres'); }.bind(this));
  Utils.onButtonTap(this.dom.switcherFavorites, function(){ this.activateSwitcher('favorites'); }.bind(this));

  this.dom.contentOverlay = document.querySelector('#contentOverlay');
  Utils.onButtonTap(this.dom.contentOverlay, this.toggleSwitcher.bind(this));
}

ViewSwitcher.prototype = {
  setView: function(view){
    this.dom.switcherbox.setActive(document.querySelector('.switcher-' + view));
    this.dom.headerbox.setActive(document.querySelector('.header-' + view));
    this.dom.mainbox.setActive(document.querySelector('.main-' + view));
    var active = document.querySelector('#mainbox-switchers .active');
    if (active)
      active.classList.remove('active');
    document.querySelector('#mainbox-switchers .' + view).classList.add('active');
  },
  toggleSwitcher: function(){
    this.dom.mainboxSwitchers.classList.toggle('hidden');
    this.dom.mainboxSwitcher.classList.toggle('hide');
    this.dom.contentOverlay.classList.toggle('hidden');
  },
  activateSwitcher: function(view){
    this.toggleSwitcher();
    this.setView(view);
  }
}
