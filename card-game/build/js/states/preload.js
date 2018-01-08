var App = App || {};

App.PreloadState = {
  init: function() {
    console.log('PreloadState', 'init');
  },
  preload: function() {
    this.load.spritesheet('deck', 'assets/images/deck.png', 25, 25, 3, 1, 2);
  },
  create: function() {
    this.state.start('Game');
  }
};
