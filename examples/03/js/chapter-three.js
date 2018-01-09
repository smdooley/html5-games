var matchingGame = {};
matchingGame.deck = [
    'cardAK', 'cardAK',
    'cardAK', 'cardAK',
    'cardAK', 'cardAK',
    'cardBK', 'cardBK',
    'cardBQ', 'cardBQ',
    'cardBJ', 'cardBJ',
];

function shuffle() {
    return 0.5 - Math.random();
}

function selectCard() {

    // do nothing if there are already two cards flipped
    if ($('.card-flipped').size() > 1) {
        return;
    }

    $(this).addClass('card-flipped');

    // check the pattern of both flipped cards 0.7s later
    if ($('.card-flipped').size() == 2) {
        setTimeout(checkPattern, 700);
    }
}

function checkPattern() {
    if (isMatchPattern()) {
        $('.card-flipped').removeClass('card-flipped').addClass('card-removed');
        $('.card-removed').bind('webkitTransitionEnd', removeTookCards);
    } else {
        $('.card-flipped').removeClass('card-flipped');
    }
}

function isMatchPattern() {
    var cards = $('.card-flipped');
    var firstPattern = $(cards[0]).data('pattern');
    var secondPattern = $(cards[1]).data('pattern');
    return (firstPattern == secondPattern);
}

function removeTookCards() {
    $('.card-removed').remove();
    gameOver();
}

function gameOver() {
    var cards = $('#cards').children('.card').length;
    if (cards === 0) {
        $('<h4></h4>', {
            'class': 'alert alert-success',
            'text': 'You Won!'
        })
        .appendTo('body');
    }
}

$(function () {

    // shuffle the deck
    matchingGame.deck.sort(shuffle);

    // clone 12 copies of the card
    for (var i = 0; i < 11; i++) {
        $('.card:first-child').clone().appendTo('#cards');
    }

    // initialize each card's position
    $('#cards').children().each(function (index, element) {
        // align the cards 4x3
        $(element).css({
            'top': ($(element).height() + 20) * Math.floor(index / 4),
            'left': ($(element).width() + 20) * (index % 4)
        });

        // get a pattern from the shuffled deck
        var pattern = matchingGame.deck.pop();

        // visually apply the pattern on the card's back face
        $(element).find('.back').addClass(pattern);

        // embed the pattern data into the DOM element
        $(element).attr('data-pattern', pattern);

        // listen for the click event on each card
        $(element).on('click', selectCard);
    });
});