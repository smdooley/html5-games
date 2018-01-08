var App = App || {};

App.PreloadState = {
  init: function() {
    console.log('PreloadState', 'init');
  },
  preload: function() {
    this.load.spritesheet('deck', 'assets/images/deck.png', 80, 120, 53);
  },
  create: function() {
    this.state.start('GameState');
  }
};
