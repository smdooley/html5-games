var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83
};

var paddleA, paddleB, movement;
var pingpong = {
    paddleA: '',
    paddleB: '',
    scoreA: 0,
    scoreB: 0,
    movement: 5,
    pressedKeys: [],
    ball: {
        speed: 5,
        x: 150,
        y: 100,
        directionX: 1,
        directionY: 1
    },
    gameOver: false
};

$(function () {
    
    pingpong.paddleA = $('#paddleA');
    pingpong.paddleB = $('#paddleB');

    // set interval to call gameloop every X milliseconds
    pingpong.timer = setInterval(gameloop, 30);

    $(document).keydown(function (e) {
        pingpong.pressedKeys[e.which] = true;
    });

    $(document).keyup(function (e) {
        pingpong.pressedKeys[e.which] = false;
    });
});

function gameloop() {
    if (!pingpong.gameOver) {
        moveBall();
        movePaddles();
        gameOver();
    }
}

function gameOver() {
    var message = '';

    if (pingpong.scoreA >= 10) {
        pingpong.gameOver = true;
        message = "Player 1 wins!"
    }

    if (pingpong.scoreB >= 10) {
        pingpong.gameOver = true;
        message = "Player 2 wins!"
    }

    if (pingpong.gameOver) {
        $('#gameover .message').html(message);
    }
}

function moveBall() {
    var playgroundHeight = parseInt($('#playground').height());
    var playgroundWidth = parseInt($('#playground').width());
    var ball = pingpong.ball;

    // check playground boundary

    // check bottom edge
    if (ball.y + ball.speed * ball.directionY > playgroundHeight) {
        ball.directionY = -1;
    }

    // check top edge
    if (ball.y + ball.speed * ball.directionY < 0) {
        ball.directionY = 1;
    }

    // check right edge
    if (ball.x + ball.speed * ball.directionX > playgroundWidth) {

        // paddle B lost
        pingpong.scoreA++;
        $('#scoreA').html(pingpong.scoreA);

        // reset the ball
        ball.x = 250;
        ball.y = 100;

        $('#ball').css({
            'left': ball.x,
            'top': ball.y
        });

        ball.directionX = -1;
    }

    // check left edge
    if (ball.x + ball.speed * ball.directionX < 0) {

        // paddle A lost
        pingpong.scoreB++;
        $('#scoreB').html(pingpong.scoreB);

        // reset the ball
        ball.x = 150;
        ball.y = 100;

        $('#ball').css({
            'left': ball.x,
            'top': ball.y
        });

        ball.directionX = 1;
    }

    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;

    // check the moving paddle

    // left paddle check
    var paddleAX = parseInt(pingpong.paddleA.css('left')) + parseInt(pingpong.paddleA.css('width'));
    var paddleAYBottom = parseInt(pingpong.paddleA.css('top')) + parseInt(pingpong.paddleA.css('height'));
    var paddleAYTop = parseInt(pingpong.paddleA.css('top'));

    if (ball.x + ball.speed * ball.directionX < paddleAX) {
        if (
            (ball.y + ball.speed * ball.directionY <= paddleAYBottom) &&
            (ball.y + ball.speed * ball.directionY >= paddleAYTop)
        ) {
            ball.directionX = 1;
        }
    }

    // check right paddle
    var paddleBX = parseInt(pingpong.paddleB.css('left'));
    var paddleBYBottom = parseInt(pingpong.paddleB.css('top')) + parseInt(pingpong.paddleB.css('height'));
    var paddleBYTop = parseInt(pingpong.paddleB.css('top')) - 20;

    if (ball.x + ball.speed * ball.directionX >= paddleBX) {
        if (
            (ball.y + ball.speed * ball.directionY <= paddleBYBottom) &&
            (ball.y + ball.speed * ball.directionY >= paddleBYTop)
        ) {
            ball.directionX = -1;
        }
    }

    // move the ball
    $('#ball').css({
        'left': ball.x,
        'top': ball.y
    });
}

function movePaddles() {
    // custom timer to continuously check if a key is pressed

    // arrow up
    if (pingpong.pressedKeys[KEY.UP]) {
        // move paddle B up
        var top = parseInt(pingpong.paddleB.css('top'));
        pingpong.paddleB.css('top', top - 5);
    }

    // arrow down
    if (pingpong.pressedKeys[KEY.DOWN]) {
        // move paddle B down
        var top = parseInt(pingpong.paddleB.css('top'));
        pingpong.paddleB.css('top', top + 5);
    }

    // W
    if (pingpong.pressedKeys[KEY.W]) {
        // move paddle A up
        var top = parseInt(pingpong.paddleA.css('top'));
        pingpong.paddleA.css('top', top - 5);
    }

    // W
    if (pingpong.pressedKeys[KEY.S]) {
        // move paddle A down
        var top = parseInt(pingpong.paddleA.css('top'));
        pingpong.paddleA.css('top', top + 5);
    }
}