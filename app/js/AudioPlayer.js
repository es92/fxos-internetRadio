var AudioPlayer = function(){
  this.audioPlayer = document.getElementById('audioPlayer');

  Utils.setupPassParent(this, 'playing');
  Utils.setupPassParent(this, 'paused');
  Utils.setupPassParent(this, 'ended');
  Utils.setupPassParent(this, 'waiting');
  Utils.setupPassParent(this, 'notWaiting');
  Utils.setupPassParent(this, 'error');

  this.audioPlayer.addEventListener('play', this.playing);
  this.audioPlayer.addEventListener('pause', this.paused);
  this.audioPlayer.addEventListener('ended', this.ended);
  this.audioPlayer.addEventListener('waiting', this.waiting);
  this.audioPlayer.addEventListener('canplaythrough', this.notWaiting);
  this.audioPlayer.addEventListener('error', this.error);
}

AudioPlayer.prototype = {
  load: function(link){
    this.audioPlayer.removeAttribute('src');
    this.audioPlayer.load();
    this.audioPlayer.mozAudioChannelType = 'content';
    this.audioPlayer.src = link;
    this.audioPlayer.load();
  },
  play: function(){
    this.audioPlayer.play();
  },
  togglePlay: function(){
    if (this.audioPlayer.paused){
      this.play();
    }
    else {
      this.pause();
    }
  },
  pause: function(){
    this.audioPlayer.pause();
  }
}
