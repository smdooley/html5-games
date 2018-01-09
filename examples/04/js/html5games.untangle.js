var untangleGame = {
    circles: [],
    thinLineThickness: 1,
    boldLineThickness: 5,
    lines: [],
    currentLevel: 0,
    levels: [
        {
            "level": 0,
            "circles": [
                { "x": 400, "y": 156 },
                { "x": 381, "y": 241 },
                { "x": 84, "y": 233 },
                { "x": 88, "y": 73 }
            ],
            "relationship": {
                "0": { "connectedPoints": [1, 2] },
                "1": { "connectedPoints": [0, 3] },
                "2": { "connectedPoints": [0, 3] },
                "3": { "connectedPoints": [1, 2] }
            }
        },
        {
            "level": 1,
            "circles": [
                { "x": 401, "y": 73 },
                { "x": 400, "y": 240 },
                { "x": 88, "y": 241 },
                { "x": 84, "y": 72 }
            ],
            "relationship": {
                "0": { "connectedPoints": [1, 2, 3] },
                "1": { "connectedPoints": [0, 2, 3] },
                "2": { "connectedPoints": [0, 1, 3] },
                "3": { "connectedPoints": [0, 1, 2] }
            }
        },
        {
            "level": 2,
            "circles": [
                { "x": 92, "y": 85 },
                { "x": 253, "y": 13 },
                { "x": 393, "y": 86 },
                { "x": 390, "y": 214 },
                { "x": 248, "y": 275 },
                { "x": 95, "y": 216 }
            ],
            "relationship": {
                "0": { "connectedPoints": [2, 3, 4] },
                "1": { "connectedPoints": [3, 5] },
                "2": { "connectedPoints": [0, 4, 5] },
                "3": { "connectedPoints": [0, 1, 5] },
                "4": { "connectedPoints": [0, 2] },
                "5": { "connectedPoints": [1, 2, 3] }
            }
        }
    ]
};

function clear(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
}

function Line(startPoint, endPoint, thickness) {
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.thickness = thickness;
}

function drawLine(ctx, x1, y1, x2, y2, thickness) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = '#cfc';
    ctx.stroke();
}

function drawCircle(ctx, x, y, radius) {
    ctx.fillStyle = 'rgba(200, 200, 100, .9)';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function connectCircles() {
    //// connect the circles to each other with lines
    //untangleGame.lines.length = 0;
    //for (var i = 0; i < untangleGame.circles.length; i++) {
    //    var startPoint = untangleGame.circles[i];
    //    for (var j = 0; j < i; j++) {
    //        var endPoint = untangleGame.circles[j];
    //        untangleGame.lines.push(new Line(startPoint, endPoint, untangleGame.thinLineThickness));
    //    }
    //}

    // setup all the lines based on the circles relationship
    var level = untangleGame.levels[untangleGame.currentLevel];
    untangleGame.lines.length = 0;
    for (var i in level.relationship) {
        var connectedPoints = level.relationship[i].connectedPoints;
        var startPoint = untangleGame.circles[i];
        for (var j in connectedPoints) {
            var endPoint = untangleGame.circles[connectedPoints[j]];
            // TODO missing line thickness parameter
            untangleGame.lines.push(new Line(startPoint, endPoint, untangleGame.thinLineThickness));
        }
    }
}

function gameloop() {
    // get the reference of the canvas element and the drawing context.
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');

    // clear the canvas before re-drawing.
    clear(ctx);

    // draw all remembered line
    for (var i = 0; i < untangleGame.lines.length; i++) {
        var line = untangleGame.lines[i];
        var startPoint = line.startPoint;
        var endPoint = line.endPoint;
        var thickness = line.thickness;
        drawLine(ctx, startPoint.x, startPoint.y, endPoint.x, endPoint.y, thickness);
    }

    // draw all remembered circles
    for (var i = 0; i < untangleGame.circles.length; i++) {
        var circle = untangleGame.circles[i];
        drawCircle(ctx, circle.x, circle.y, circle.radius);
    }
}

function isIntersect(line1, line2) {
    // convert line1 to general form of line: Ax + By = C
    var a1 = line1.endPoint.y - line1.startPoint.y;
    var b1 = line1.startPoint.x - line1.endPoint.x;
    var c1 = a1 * line1.startPoint.x + b1 * line1.startPoint.y;

    // convert line2 to general form of line: Ax + By = C
    var a2 = line2.endPoint.y - line2.startPoint.y;
    var b2 = line2.startPoint.x - line2.endPoint.x;
    var c2 = a2 * line2.startPoint.x + b2 * line2.startPoint.y;

    // calculate the intersection point
    var d = a1 * b2 - a2 * b1;

    // parallel when d is 0
    if (d === 0) {
        return false;
    } else {
        var x = (b2 * c1 - b1 * c2) / d;
        var y = (a1 * c2 - a2 * c1) / d;

        // check if the interception point is on both line segments
        if(
            (isInBetween(line1.startPoint.x, x, line1.endPoint.x) || isInBetween(line1.startPoint.y, y, line1.endPoint.y)) &&
            (isInBetween(line2.startPoint.x, x, line2.endPoint.x) || isInBetween(line2.startPoint.y, y, line2.endPoint.y))
        ) {
            return true;
        }
    }
}

// return true if B is between A and C
// we exclude the result when A === B or B === C
function isInBetween(a, b, c) {
    // return false if B is almost equal to A or C
    // this is to eliminate some floating point when two values are equal to each other but different with 0.00000...0001
    if (Math.abs(a - b) < 0.000001 || Math.abs(b - c) < 0.000001) {
        return false;
    }

    // true when B is in between A and C
    return (a < b && b < c) || (c < b && b < a);
}

function updateLineIntersection() {
    // checking lines intersection and bold those lines
    for (var i = 0; i < untangleGame.lines.length; i++) {
        for (var j = 0; j < i; j++) {
            var line1 = untangleGame.lines[i];
            var line2 = untangleGame.lines[j];

            // we check if two lines are intersected and bold the line if they are
            if (isIntersect(line1, line2)) {
                line1.thickness = untangleGame.boldLineThickness;
                line2.thickness = untangleGame.boldLineThickness;
            }
        }
    }
}

function setupCurrentLevel() {
    untangleGame.circles = [];
    var level = untangleGame.levels[untangleGame.currentLevel];
    for (var i = 0; i < level.circles.length; i++) {
        untangleGame.circles.push(new Circle(level.circles[i].x, level.circles[i].y, 10));
    }
    // setup line data after setting up the circles
    connectCircles();
    updateLineIntersection();
}

function checkLevelCompleteness() {
    if ($('#progress').html() === '100') {
        if (untangleGame.currentLevel + 1 < untangleGame.levels.length) {
            untangleGame.currentLevel++;
        }
        setupCurrentLevel();
    }
}

function updateLevelProgress() {
    // check the untangle level progress
    var progress = 0;
    for (var i = 0; i < untangleGame.lines.length; i++) {
        console.log(untangleGame.lines[i].thickness + ' === ' + untangleGame.thinLineThickness);
        if (untangleGame.lines[i].thickness === untangleGame.thinLineThickness) {
            progress++;
        }
    }

    // display level progress percentage
    var progressPercentage = Math.floor(progress / untangleGame.lines.length * 100);
    $('#progress').html(progressPercentage);

    // display the current level
    $('#level').html(untangleGame.currentLevel);
}

$(function () {
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');

    var circleRadius = 10;

    var width = canvas.width;
    var height = canvas.height;

    //// random 5 circles
    //var circlesCount = 5;
    //for (var i = 0; i < circlesCount; i++) {
    //    var x = Math.random() * width;
    //    var y = Math.random() * height;
    //    drawCircle(ctx, x, y, circleRadius);
    //    untangleGame.circles.push(new Circle(x, y, circleRadius));
    //}
    //connectCircles();
    //updateLineIntersection();

    setupCurrentLevel();

    // Add Mouse Event Listener to canvas
    // we find if the mouse down position is on any circle 
    // and set that circle as target dragging circle.
    $('#game').mousedown(function (e) {
        var canvasPosition = $(this).offset();
        //var mouseX = e.layerX || 0;
        //var mouseY = e.layerY || 0;

        //if (e.layerX || e.layerX === 0) {
        //    mouseX = e.layerX;
        //    mouseY = e.layerY;
        //} else {
        //    mouseX = e.offsetX;
        //    mouseY = e.offsetY;
        //}

        var mouseX = e.offsetX === null ? e.layerX : e.offsetX;
        var mouseY = e.offsetY === null ? e.layerY : e.offsetY;

        for (var i = 0; i < untangleGame.circles.length; i++) {
            var circleX = untangleGame.circles[i].x;
            var circleY = untangleGame.circles[i].y;
            var radius = untangleGame.circles[i].radius;

            // use point-in-circle formula to check if clicking on a circle
            // That is to check the distance between the center point of the circle and the mouse position. The mouse clicks on the circle when the distance is less than the circle radius.
            // Distance = (x2-x1)2 + (y2-y1)2
            if (Math.pow(mouseX - circleX, 2) + Math.pow(mouseY - circleY, 2) < Math.pow(radius, 2)) {
                untangleGame.targetCircle = i;
                break;
            }
        }
    });

    // we move the target dragging circle when the mouse is moving
    $('#game').mousemove(function (e) {
        if (untangleGame.targetCircle != undefined) {
            var canvasPosition = $(this).offset();
            var mouseX = e.offsetX === null ? e.layerX : e.offsetX; //e.layerX || 0;
            var mouseY = e.offsetY === null ? e.layerY : e.offsetY; //e.layerY || 0;
            var radius = untangleGame.circles[untangleGame.targetCircle].radius;

            untangleGame.circles[untangleGame.targetCircle] = new Circle(mouseX, mouseY, radius);

            connectCircles();
            updateLineIntersection();
            updateLevelProgress();
        }
    });

    // We clear the dragging circle data when mouse is up
    $('#game').mouseup(function (e) {
        untangleGame.targetCircle = undefined;

        // on every mouse up, check if the untangle puzzle is solved
        checkLevelCompleteness();
    });

    // setup an interval to loop the game loop
    setInterval(gameloop, 30);
});