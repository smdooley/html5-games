var App = App || {};

App.GameState = {
  init: function() {
    this.CARD_WIDTH = 80;
    this.CARD_HEIGHT = 120;
    this.CARD_SPACING = 10;
    this.FLIP_SPEED = 200;
    this.FLIP_ZOOM = 1.2;

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

    count = 0;
    for(i = 0; i < 4; i++) {
      for(j = 0; j < 3; j++) {
        card = this.add.sprite(
          this.CARD_SPACING + i * (this.CARD_WIDTH + this.CARD_SPACING),
          this.CARD_SPACING + j * (this.CARD_HEIGHT + this.CARD_SPACING),
          'deck'
        );

        card.anchor.set(0.5);

        card.frame = 52; //this.deck[count];
        card.inputEnabled = true;
        card.events.onInputDown.add(this.selectCard, this);

        card.data.flipped = false;
        card.data.isFlipping = false;
        card.data.pattern = this.deck[count];

        this.cards.add(card);

        count++;
      }
    }
  },
  selectCard: function(card) {
    this.selectedCard = card;

    if(this.selectedCard.data.flipped || this.selectedCard.data.isFlipping) return;

    this.selectedCard.data.flipped = true;
    this.selectedCard.data.isFlipping = true;

    this.selectedCards.push(this.selectedCard);

    // first tween: we raise and flip the card
    this.flipTween = this.game.add.tween(this.selectedCard.scale).to({
      x: 0,
      y: this.FLIP_ZOOM
    }, this.FLIP_SPEED / 2, Phaser.Easing.Linear.None);

    // once the card is flipped, we change its frame and call the second tween
    this.flipTween.onComplete.add(function(){
        console.log('flipTween.onComplete', this.selectedCard.frame);
        this.selectedCard.frame = this.selectedCard.data.pattern;
        this.backFlipTween.start();
    }, this);

    // second tween: we complete the flip and lower the card
    this.backFlipTween = this.game.add.tween(this.selectedCard.scale).to({
        x: 1,
        y: 1
    }, this.FLIP_SPEED / 2, Phaser.Easing.Linear.None);

    // once the card has been placed down on the table, we can flip it again
    this.backFlipTween.onComplete.add(function(){
        this.selectedCard.isFlipping = false;
    }, this);

    this.flipTween.start();

    if(this.selectedCards.length == 2) {
      this.game.time.events.add(Phaser.Timer.SECOND * 1, this.checkPattern, this);
    }
  },
  checkPattern: function() {
    if(this.matchPattern(this.selectedCards)) {
      // TODO remove cards
      this.selectedCards.forEach(function(card){
        card.kill();
      }, this);

      // TODO increment score
    }
    else {
      this.cards.forEachAlive(function(card) {
        card.data.flipped = false;
      }, this);
    }

    // TODO clear selected cards
    this.selectedCards.length = 0;
  },
  // checkPattern: function() {
  //   var selectedCards = [];
  //
  //   this.cards.forEachAlive(function(card) {
  //     if(card.data.flipped) {
  //       selectedCards.push(card);
  //     }
  //   }, this);
  //
  //   if(selectedCards.length !== 2) return;
  //
  //   if(this.matchPattern(selectedCards)) {
  //     this.cards.forEachAlive(function(card) {
  //       if(card.data.flipped) {
  //         card.kill();
  //       };
  //     }, this);
  //   }
  //   else {
  //     this.cards.forEachAlive(function(card) {
  //       card.data.flipped = false;
  //     }, this);
  //   }
  // },
  matchPattern: function(selectedCards) {
    return (selectedCards[0].data.pattern === selectedCards[1].data.pattern);
  }
};
