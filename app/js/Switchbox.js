var Switchbox = function(switchbox){
  this.switchbox = switchbox;
  this.active = null;
}

Switchbox.prototype = {
  setActive: function(elem){
    if (this.active)
      this.active.classList.remove('active');
    elem.classList.add('active');
    this.active = elem;
  }
}
