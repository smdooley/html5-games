var App = App || {};

App.BootState = {
  init: function() {
    console.log('BootState', 'init');
  },
  preload: function() {

  },
  create: function() {
    this.state.start('Preload');
  }
};
