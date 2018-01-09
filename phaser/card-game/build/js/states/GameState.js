var App = App || {};

App.GameState = {
  init: function() {
    this.CARD_WIDTH = 80;
    this.CARD_HEIGHT = 120;
    this.CARD_SPACING = 10;

    // this.deck = [
    //   { frame: 10, pattern: 'SJ' },
    //   { frame: 11, pattern: 'SQ' },
    //   { frame: 12, pattern: 'SK' },
    //   { frame: 23, pattern: 'HJ' },
    //   { frame: 24, pattern: 'HQ' },
    //   { frame: 25, pattern: 'HK' },
    //   { frame: 36, pattern: 'CJ' },
    //   { frame: 37, pattern: 'CQ' },
    //   { frame: 38, pattern: 'CK' },
    //   { frame: 49, pattern: 'DJ' },
    //   { frame: 50, pattern: 'DQ' },
    //   { frame: 51, pattern: 'DK' }
    // ];

    //this.deck = [10,11,12,13,24,25,36,37,38,49,50,51];
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

        card.frame = this.deck[count];
        card.inputEnabled = true;
        card.events.onInputDown.add(this.selectCard, this);

        card.data.flipped = false;
        card.data.pattern = this.deck[count];

        this.cards.add(card);

        count++;
      }
    }
  },
  selectCard: function(card) {
    card.data.flipped = true;

    // this.selectedCards.push(card);
    //
    // if(this.selectedCards.length == 2) {
    //   setTimeout(this.checkPattern, 500);
    // }

    //setTimeout(this.checkPattern, 500);
    this.checkPattern();
  },
  checkPattern: function() {
    var selectedCards = [];

    this.cards.forEachAlive(function(card) {
      if(card.data.flipped) {
        selectedCards.push(card);
      }
    }, this);

    if(selectedCards.length !== 2) return;

    if(this.matchPattern(selectedCards)) {
      this.cards.forEachAlive(function(card) {
        if(card.data.flipped) {
          card.kill();
        };
      }, this);
    }
    else {
      this.cards.forEachAlive(function(card) {
        card.data.flipped = false;
      }, this);
    }
  },
  matchPattern: function(selectedCards) {
    console.log('selectedCards[0].data.pattern', selectedCards[0].data.pattern);
    console.log('selectedCards[1].data.pattern', selectedCards[1].data.pattern);

    return (selectedCards[0].data.pattern === selectedCards[1].data.pattern);
  }
};
