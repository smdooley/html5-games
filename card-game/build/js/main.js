var App = App || {};

App.game = new Phaser.Game(370, 400, Phaser.AUTO);

App.game.state.add('BootState', App.BootState);
App.game.state.add('PreloadState', App.PreloadState);
App.game.state.add('GameState', App.GameState);

App.game.state.start('BootState');
