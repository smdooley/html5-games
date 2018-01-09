var matchingGame = {};

matchingGame.deck = [
    'cardAK', 'cardAK',
    'cardAK', 'cardAK',
    'cardAK', 'cardAK',
    'cardBK', 'cardBK',
    'cardBQ', 'cardBQ',
    'cardBJ', 'cardBJ',
];

matchingGame.savingObject = {};

// an array to store the current deck
matchingGame.savingObject.deck = [];

// an array to store which card is removed by storing their index
matchingGame.savingObject.removedCards = [];

// store the counting elapsed time
matchingGame.savingObject.currentElapsedTime = 0;

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
    // add each removed card into the array which stores what cards have been removed
    $('.card-removed').each(function (index, element) {
        matchingGame.savingObject.removedCards.push($(element).data('card-index'));
        $(element).remove();
    });

    // check if all cards are removed and show game over
    if ($('.card').length === 0) {
        gameOver();
    }
}

function gameOver() {
    // stop the timer
    clearInterval(matchingGame.timer);

    // displayed the elapsed time in the game over popup
    $('.score').html($('#elapsed-time').html());

    // load the saved last score and save time from local storage
    var lastScore = localStorage.getItem('last-score');

    // check if there is no saved record
    var lastScoreObj = JSON.parse(lastScore);
    if (lastScoreObj === null) {
        // create an empty record if there is no saved record
        lastScoreObj = { "savedTime": "no record", "score": 0 };
    }

    var lastElapsedTime = lastScoreObj.score;

    // convert the elapsed seconds into minute:second format
    // calculate the minutes and seconds from elapsed time
    var minute = Math.floor(lastElapsedTime / 60);
    var second = lastElapsedTime % 60;

    // add padding 0 if minute and second is less then 10
    if (minute < 10) minute = "0" + minute;
    if (second < 10) second = "0" + second;

    // display the last elapsed time in game over popup
    $('.last-score').html(minute + ':' + second);

    // display the saved time of last score
    var savedTime = lastScoreObj.savedTime;
    $('.saved-time').html(savedTime);

    // check if new record
    if (lastElapsedTime === 0 || matchingGame.elapsedTime < lastElapsedTime) {
        $('.ribbon').removeClass('hide');
    }

    // get the current datetime
    var currentTime = new Date();
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    // add padding 0 to minutes and seconds if less then 10
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;

    // format saved time
    var now = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;

    // construct the object of datetime and game score
    var obj = { 'savedTime': now, 'score': matchingGame.elapsedTime };

    // save the score into local storage
    localStorage.setItem('last-score', JSON.stringify(obj));

    // show the game over popup
    $('#popup').removeClass('hide');

    // clear any saved saving object
    localStorage.removeItem('savingObject');
}

function countTimer() {
    // increment elapsed time
    matchingGame.elapsedTime++;

    // save the current elapsed time into the saving object
    matchingGame.savingObject.currentElapsedTime = matchingGame.elapsedTime;

    // calculate the minutes and seconds from elapsed time
    var minute = Math.floor(matchingGame.elapsedTime / 60);
    var second = matchingGame.elapsedTime % 60;

    // add padding 0 if minute and second is less then 10
    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;

    // display the elapsed time
    $('#elapsed-time').html(minute + ':' + second);

    // save the game progress
    saveSavingObject();
}

function saveSavingObject() {
    // save the encoded saving object into local storage
    localStorage['savingObject'] = JSON.stringify(matchingGame.savingObject);
}

function savedSavingObject() {
    // returns the saved saving object from local storage
    var savingObject = localStorage['savingObject'];
    if (savingObject !== undefined) {
        savingObject = JSON.parse(savingObject);
    }
    return savingObject;
}

$(function () {

    // shuffle the deck
    matchingGame.deck.sort(shuffle);

    // re-create the saved deck
    var savedObject = savedSavingObject();
    if (savedObject !== undefined) {
        matchingGame.deck = savedObject.deck;
    }

    // copy the deck into the saving object
    matchingGame.savingObject.deck = matchingGame.deck.slice();

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

        // embed the pattern data into the DOM element
        $(this).attr('data-pattern', pattern);

        // save the index into the DOM element, so we know which is the next card
        $(this).attr('data-card-index', index);

        // visually apply the pattern on the card's back face
        $(element).find('.back').addClass(pattern);

        // embed the pattern data into the DOM element
        $(element).attr('data-pattern', pattern);

        // listen for the click event on each card
        $(element).on('click', selectCard);
    });

    // remove cards that were removed in the savedObject
    if (savedObject !== undefined) {
        matchingGame.savingObject.removedCards = savedObject.removedCards;

        // find and remove the removed cards
        for (var i in matchingGame.savingObject.removedCards) {
            $('.card[data-card-index=' + matchingGame.savingObject.removedCards[i] + ']').remove();
        }
    }

    // reset the elapsed time to 0
    matchingGame.elapsedTime = 0;

    // restore the saved elapsed time
    if (savedObject !== undefined) {
        matchingGame.elapsedTime = savedObject.currentElapsedTime;
        matchingGame.savingObject.currentElapsedTime = savedObject.currentElapsedTime;
    }

    // start the timer
    matchingGame.timer = setInterval(countTimer, 1000);
});