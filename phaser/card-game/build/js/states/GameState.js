var App = App || {};

App.GameState = {
  init: function() {
    this.CARD_WIDTH = 80;
    this.CARD_HEIGHT = 120;
    this.CARD_SPACING = 10;
    this.FLIP_SPEED = 200;
    this.FLIP_ZOOM = 1.2;
    this.FRAME_DEFAULT = 52;
    this.GRID_ROWS = 4;
    this.GRID_COLUMNS = 3;

    this.deck = [10,12,24,36,38,50,10,12,24,36,38,50];
  },
  create: function() {
    this.cards = this.add.group();

    this.shuffle(this.deck);
    this.deal();

    this.selectedCards = [];
  },
  update: function() {

  },
  shuffle: function(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
  },
  deal: function() {
    var count, i, j, card;

    for(i =0; i < this.deck.length; i++) {
      card = this.add.sprite(
        (this.CARD_WIDTH + this.CARD_SPACING) * (i % 4) + this.CARD_SPACING + this.CARD_WIDTH / 2,
        (this.CARD_HEIGHT + this.CARD_SPACING) * Math.floor(i / 4) + this.CARD_SPACING + this.CARD_HEIGHT / 2,
        'deck'
      );

      card.anchor.set(0.5);

      card.frame = this.FRAME_DEFAULT;
      card.inputEnabled = true;
      card.events.onInputDown.add(this.selectCard, this);

      card.data.flipped = false;
      card.data.isFlipping = false;
      card.data.pattern = this.deck[i];

      this.cards.add(card);
    }
  },
  selectCard: function(card) {
    this.selectedCard = card;

    if(this.selectedCard.data.flipped || this.selectedCard.data.isFlipping) return;

    this.selectedCard.data.isFlipping = true;

    // turn selected card face up

    // first tween: we raise and flip the card
    var flipTween = this.game.add.tween(this.selectedCard.scale).to({
      x: 0,
      y: this.FLIP_ZOOM
    }, this.FLIP_SPEED / 2, Phaser.Easing.Linear.None);

    // once the card is flipped, we change its frame and call the second tween
    flipTween.onComplete.add(function(){
        this.selectedCard.frame = this.selectedCard.data.pattern;
        backFlipTween.start();
    }, this);

    // second tween: we complete the flip and lower the card
    var backFlipTween = this.game.add.tween(this.selectedCard.scale).to({
        x: 1,
        y: 1
    }, this.FLIP_SPEED / 2, Phaser.Easing.Linear.None);

    // once the card has been placed down on the table, we can flip it again
    backFlipTween.onComplete.add(function(){
        this.selectedCard.data.isFlipping = false;
        this.selectedCard.data.flipped = true;

        this.selectedCards.push(this.selectedCard);

        if(this.selectedCards.length == 2) {
          this.game.time.events.add(Phaser.Timer.SECOND * 1, this.checkPattern, this);
        }
    }, this);

    flipTween.start();
  },
  checkPattern: function() {

    if(this.matchPattern(this.selectedCards)) {

      // remove selected cards
      this.selectedCards.forEach(function(card){
        card.kill();
      }, this);

      // TODO increment score
      this.gameOver();
    }
    else {
      // turn selected cards face down
      this.selectedCards.forEach(function(card){
        // first tween: we raise and flip the card
        var flipTween = this.game.add.tween(card.scale).to({
          x: 0,
          y: this.FLIP_ZOOM
        }, this.FLIP_SPEED / 2, Phaser.Easing.Linear.None);

        // once the card is flipped, we change its frame and call the second tween
        flipTween.onComplete.add(function(){
            card.frame = this.FRAME_DEFAULT;
            backFlipTween.start();
        }, this);

        // second tween: we complete the flip and lower the card
        var backFlipTween = this.game.add.tween(card.scale).to({
            x: 1,
            y: 1,
        }, this.FLIP_SPEED / 2, Phaser.Easing.Linear.None);

        // once the card has been placed down on the table, we can flip it again
        backFlipTween.onComplete.add(function(){
            card.data.isFlipping = false;
            card.data.flipped = false;
        }, this);

        flipTween.start();

      }, this);
    }

    // clear selected cards
    this.selectedCards.length = 0;
  },
  matchPattern: function(selectedCards) {
    return (selectedCards[0].data.pattern === selectedCards[1].data.pattern);
  },
  gameOver: function() {
    if(this.cards.countLiving() === 0) {
      console.log('Congratulations');
    }
  }
};
