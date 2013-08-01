var NowPlaying = function(favorites){

  this.favorites = favorites;

  this.dom = {};
  this.dom.nowPlaying = document.querySelector('#nowplaying');
  this.dom.title = this.dom.nowPlaying.querySelector('.title');
  this.dom.toggleFavorite = this.dom.nowPlaying.querySelector('.toggleFavorite');
  this.dom.control = this.dom.nowPlaying.querySelector('.control');

  this.audioPlayer = new AudioPlayer();
  Utils.setupPassParent(this, 'playing');
  Utils.setupPassParent(this, 'paused');
  Utils.setupPassParent(this, 'ended');
  Utils.setupPassParent(this, 'waiting');
  Utils.setupPassParent(this, 'notWaiting');

  Utils.setupPassParent(this, 'toggleFavorite');

  this.audioPlayer.onplaying = this.setPlaying.bind(this);
  this.audioPlayer.onpaused = this.setPaused.bind(this);
  this.audioPlayer.onwaiting = this.setBuffering.bind(this);
  this.audioPlayer.onnotWaiting = this.setNotBuffering.bind(this);
  this.audioPlayer.onerror = this.error.bind(this);

  this.currentStation = null;

  Utils.onButtonTap(this.dom.control, this.audioPlayer.togglePlay.bind(this.audioPlayer));
  Utils.onButtonTap(this.dom.toggleFavorite, function(){
    if (this.currentStation !== null){
      this.toggleFavorite(this.currentStation);
    }
  }.bind(this));

}

NowPlaying.prototype = {
  setStation: function(station){
    this.currentStation = station;
    var title = station.server_name;
    this.dom.nowPlaying.classList.remove('hidden');
    this.dom.title.innerHTML = title;
    this.audioPlayer.load(station.listen_url);
    this.audioPlayer.play();
    if (this.favorites.isFavorite(station))
      this.dom.toggleFavorite.classList.add('favorited');
    else
      this.dom.toggleFavorite.classList.remove('favorited');
  },
  setPlaying: function(){
    this.dom.control.classList.add('paused');
    this.dom.control.classList.remove('buffering');
  },
  setPaused: function(){
    this.dom.control.classList.remove('paused');
  },
  setBuffering: function(){
    this.dom.control.classList.add('buffering');
  },
  setNotBuffering: function(){
    this.dom.control.classList.remove('buffering');
  },
  error: function(){
    if (window.navigator.onLine)
      alert('unable to play station');
    else
      alert('unable to play station: no network connection');
    this.dom.nowPlaying.classList.add('hidden');
  },
  setIsFavorite: function(station, isFavorite){
    if (station === this.currentStation){
      if (isFavorite)
        this.dom.toggleFavorite.classList.add('favorited')
      else
        this.dom.toggleFavorite.classList.remove('favorited')
    }
  }
}
