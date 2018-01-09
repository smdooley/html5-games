function MusicNote(time, line) {
    this.time = time;
    this.line = line;
}

function Dot(distance, line) {
    this.distance = distance;
    this.line = line;
    this.missed = false;
}

// a global object variable to store all game scope variable.
var audiogame = {};

// toggle the game between play mode and record mode.
audiogame.isRecordMode = false;

// an array to store all music notes data.
audiogame.musicNotes = [];

//audiogame.leveldata = "1.583,2;2.005,3;2.456,2;2.938,1;3.479,2;3.992,3;4.383,2;4.503,1;5.527,3;5.919,2;6.039,1;7.002,2;7.544,3;8.025,2;8.507,3;8.959,2;9.983,3;10.224,2;10.465,1;10.706,2;11.007,3;11.582,3;11.793,2;12.064,1;13.027,2;13.481,3;13.964,2;14.416,3;14.897,2;16.072,3;16.403,2;16.553,1;17.488,3;17.94,2;18.09,1;18.994,1;19.385,2;19.536,3;19.897,2;20.047,3;20.379,2;20.529,3;20.89,2;21.011,3;21.974,3;22.215,2;22.486,2;22.968,1;23.449,2;24.021,3;24.533,2;25.014,1;25.466,2;26.008,3;26.551,3;27.003,2;28.027,3;28.147,2;28.298,1;28.93,2;30.014,3;30.135,2;30.496,1;31.069,2;31.46,3;31.551,2;31.942,3;32.063,2;32.394,3;32.545,2;32.876,3;32.996,2;33.989,3;34.381,2;34.502,1;35.436,3;35.887,2;36.068,1;37.031,1;37.272,2;37.513,3;37.995,2;38.507,1;39.019,2;39.952,3;40.042,2;40.223,1;40.946,2;41.7,3;42.092,2;42.183,1;42.545,2;43.057,3;43.418,2;43.539,1;43.961,3;44.082,2;44.383,3;44.535,2;44.836,3;45.017,2;46.01,3;46.372,2;46.522,1;47.456,3;47.877,2;48.028,1;49.021,1;49.263,2;49.504,3;49.775,2;50.016,3;50.287,2;50.498,1;50.769,2;51.04,3;51.281,2;51.522,3;51.793,1;52.034,2;52.275,3;52.516,2;52.756,3;52.997,2;53.238,1;53.479,2;53.756,3;53.997,2;54.238,3;54.512,2;54.753,1;54.993,2;55.264,3;55.505,2;55.746,3;55.987,2;56.258,1;56.529,2;56.77,3;57.041,2;57.251,1;57.522,2;57.764,1;58.004,2;58.245,3;58.487,2;58.758,1;58.999,3;59.269,2;59.541,1;59.751,2;59.993,3;60.264,2;60.505,1;60.806,2;61.227,3;61.408,2;61.619,1;61.83,2;62.041,3;62.251,2;62.492,1;62.763,2;63.034,2;63.305,3;63.516,2;63.787,1;64.028,2;64.269,3;64.48,2;64.811,1;65.172,2;65.413,2;65.443,1;65.714,2;65.955,3;66.197,2;66.468,3;66.739,2;66.98,3;67.251,2;67.491,1;67.732,2;68.003,3;68.214,2;68.485,3;68.756,1;68.969,2;69.24,3;69.481,2;69.752,1;69.993,2;70.234,3;70.505,1;70.746,3;70.987,1;71.258,2;71.499,3;71.773,2;72.015,1;72.255,2;72.83,2;73.613,3;73.823,2;74.064,1;74.275,2;74.516,3;74.787,2;74.997,1;75.239,2;75.48,3;75.752,2;76.023,1;76.023,3;76.264,2;76.505,2;76.746,1;76.746,3;76.987,2;77.258,2;77.499,1;77.499,3;77.981,2;78.282,1;78.282,3;78.553,2;78.764,2;79.005,1;79.276,2;79.517,3;79.727,2;79.998,1;80.241,2;80.512,1;80.752,3;80.993,2;81.264,1;81.505,3;81.745,1;82.287,2;82.498,3;82.77,3;83.01,2;83.282,1;83.493,3;83.794,2;84.065,1;84.276,2;84.487,3;84.788,2;85.089,1;85.33,2;85.76,1;86.242,2;86.753,3;87.265,2;87.747,1;88.229,2;88.741,3;89.283,2;89.734,1;90.186,2;91.059,3;91.239,2;91.48,1;91.751,2;91.992,3;92.263,2;92.534,1;92.805,2;92.986,3;93.257,2;93.498,3;93.739,1;93.98,3;94.251,2;94.492,3;94.763,1;94.763,3;95.124,2;95.696,1;95.696,3;96.238,2;96.78,1;97.232,2;97.743,3;99.971,3;100.363,2;100.483,1;101.446,3;101.928,2;102.048,1;102.952,1;103.373,2;103.915,1;104.367,2;104.909,1;105.451,2;106.024,3;106.235,2;106.506,3;106.747,2;106.988,1;107.229,2;107.5,3;107.741,2;108.042,1;108.493,3;109.005,2;109.427,1;109.969,2;110.481,3;110.992,2;111.896,3;112.016,2;112.197,1;112.347,2;112.92,3;113.462,3;113.914,2;114.004,1;114.486,2;114.998,3;115.359,2;115.51,1;115.901,2;116.022,1;116.353,2;116.474,1;116.835,2;116.955,1;117.437,2;118.009,3;118.4,2;118.491,1;119.455,3;119.878,2;119.998,1;";
audiogame.leveldata = "1.592,3;1.984,2;2.466,1;2.949,2;4.022,3;4.443,2;4.594,1;5.498,3;5.92,2;6.04,1;7.034,2;7.395,3;7.968,2;8.45,1;8.962,2;10.018,3;10.258,2;10.44,2;10.711,1;10.977,2;11.556,3;12.008,1;13.588,3;14.013,2;14.495,1;14.946,2;16.003,3;16.395,2;16.546,1;17.48,3;17.85,2;18.001,1;19.026,2;19.508,3;19.96,2;20.412,1;20.955,2;22.01,3;22.252,2;22.432,2;22.673,1;23.518,3;23.788,2;24.029,1;25.024,3;25.506,2;26.019,1;26.531,2;27.043,3;28.038,3;28.52,2;28.972,1;29.454,2;29.967,3;30.51,2;31.022,3;31.474,2;31.956,3;32.408,2;32.89,3;33.433,2;34.006,3;34.398,2;34.518,1;35.453,3;35.875,2;36.026,1;37.111,2;37.504,3;38.016,1;38.529,3;38.981,2;39.524,3;40.007,2;40.459,1;40.971,2;41.483,3;41.936,2;42.448,1;42.992,2;43.444,3;43.956,2;44.378,3;44.92,2;45.945,3;46.337,2;46.488,1;47.513,3;47.875,2;47.995,1;49.141,2;49.533,3;50.045,2;50.557,1;51.039,2;51.521,3;52.004,2;52.486,1;52.998,2;53.481,3;53.993,2;54.505,1;54.988,2;55.44,3;55.952,2;56.434,3;56.916,2;57.429,1;57.911,2;58.454,3;58.966,2;59.539,3;60.051,2;61.256,3;61.739,2;62.222,1;62.704,2;63.216,3;63.699,2;64.212,1;64.755,2;65.267,3;65.749,2;66.261,3;66.743,2;67.256,3;67.738,2;68.251,1;68.764,2;69.247,3;69.729,2;70.271,3;70.753,2;71.265,1;71.717,2;72.289,3;73.223,3;73.736,2;74.249,1;74.731,2;75.274,3;75.756,2;76.268,3;76.78,2;77.262,3;77.744,2;78.257,3;78.77,2;79.252,1;79.765,2;80.277,3;80.729,2;81.241,1;81.754,2;82.266,3;82.779,3;83.261,2;83.744,1;84.256,2;84.799,3;85.643,3;86.276,2;86.758,3;87.24,2;87.722,3;88.236,2;88.778,1;89.26,2;89.773,3;90.256,2;90.708,1;91.191,2;91.763,3;92.216,2;92.729,3;93.241,2;93.753,1;94.235,3;94.748,3;95.29,2;95.742,3;96.224,2;96.827,3;97.671,3;98.334,3;98.906,3;100.022,3;100.444,2;100.564,1;101.468,3;101.859,2;102.01,1;102.975,2;103.367,3;103.518,2;103.88,3;104.031,2;104.393,3;104.544,2;104.905,3;105.057,2;105.961,3;106.205,2;106.416,2;106.657,1;106.928,2;107.169,3;107.441,2;107.712,1;107.984,3;108.527,2;109.009,1;109.401,2;109.521,3;110.034,2;110.546,3;111.029,2;111.964,3;112.084,2;112.265,1;112.416,2;112.988,3;113.501,3;113.892,2;114.043,1;114.525,2;115.037,3;115.399,2;115.55,1;115.852,3;116.002,2;116.365,3;116.485,2;116.847,3;116.998,2;117.963,3;118.354,2;118.506,1;119.503,3;119.865,2;120.015,1;";
audiogame.leveldata = "0,113;1.493,3;1.917,2;2.381,3;2.949,2;3.917,3;4.349,2;4.477,1;5.461,3;5.813,2;5.925,1;6.222,113;6.997,1;7.373,2;7.485,3;7.813,2;7.885,3;8.301,2;8.397,3;8.845,2;8.941,3;10.046,3;10.269,2;10.462,2;10.725,1;10.933,2;11.165,3;11.469,3;11.677,2;11.965,1;12.421,3;12.949,3;13.237,2;13.471,1;13.854,3;13.989,2;14.406,3;14.589,2;14.965,3;15.094,2;16.005,3;16.317,2;16.485,1;17.493,3;17.845,2;17.997,1;19.069,1;19.389,2;19.509,3;19.797,2;19.925,3;20.277,2;20.405,3;20.749,2;20.901,3;22.085,3;22.277,2;22.429,2;22.64,1;22.877,2;23.133,3;23.421,3;23.669,2;23.941,1;24.445,3;24.949,2;25.469,3;25.925,2;26.461,1;26.957,2;27.997,3;28.101,2;28.245,1;28.389,2;28.949,3;29.453,3;29.861,2;29.973,3;30.445,1;30.957,2;31.349,3;31.485,2;31.829,3;31.957,2;32.333,3;32.437,2;32.766,3;32.925,2;33.981,3;34.341,2;34.437,1;35.469,3;35.797,2;35.941,1;37.093,2;37.453,3;37.925,2;38.469,1;38.997,2;39.925,3;40.101,2;40.245,2;40.333,2;40.437,1;40.925,2;41.485,3;41.797,2;41.909,1;42.429,2;42.957,1;43.325,2;43.453,3;43.861,3;43.981,2;44.317,3;44.461,2;44.869,3;45.013,2;45.949,3;46.365,2;46.485,1;47.389,3;47.733,2;47.877,1;49.069,3;49.245,2;49.447,1;49.669,2;49.973,3;50.229,2;50.501,1;50.749,2;51.021,3;51.255,2;51.517,1;51.758,2;51.997,3;52.221,2;52.477,1;52.717,2;52.957,3;53.197,2;53.445,1;53.693,2;53.909,3;54.182,2;54.417,1;54.694,2;54.941,3;55.213,2;55.462,1;55.701,2;55.949,3;56.197,2;56.446,1;56.693,2;56.949,3;57.222,2;57.462,1;57.725,2;57.965,3;58.222,2;58.493,1;58.741,2;58.989,3;59.277,2;59.517,3;59.749,2;59.983,1;60.277,2;61.013,3;61.261,2;61.437,1;61.709,2;61.957,3;62.221,2;62.461,1;62.725,2;62.957,3;63.213,2;63.437,1;63.717,2;63.965,3;64.221,2;64.461,1;64.733,2;64.973,3;65.229,2;65.469,1;65.695,2;65.935,3;66.173,2;66.445,1;66.702,2;66.965,3;67.214,2;67.461,1;67.757,2;67.991,3;68.245,2;68.477,1;68.749,2;68.983,3;69.253,2;69.485,1;69.733,2;69.981,3;70.221,2;70.455,1;70.701,2;70.943,3;71.205,2;71.437,1;71.718,2;71.941,3;72.253,2;73.037,3;73.262,2;73.501,1;73.727,2;73.973,3;74.229,2;74.469,3;74.701,2;74.957,1;75.229,3;75.486,2;75.725,3;76.013,3;76.223,2;76.501,1;76.733,3;76.959,2;77.189,3;77.477,3;77.669,2;77.941,1;78.197,3;78.461,2;78.725,1;78.965,3;79.237,2;79.462,1;79.717,2;79.981,3;80.213,2;80.469,1;80.734,3;80.989,2;81.245,1;81.478,2;81.725,1;81.997,3;82.229,2;82.494,1;82.749,2;82.997,3;83.261,2;83.485,1;83.757,3;83.997,2;84.229,1;84.701,3;85.269,3;85.501,2;85.685,1;85.925,3;86.221,2;86.509,3;86.717,2;86.997,1;87.229,2;87.477,3;87.742,2;87.997,3;88.245,2;88.469,1;88.75,3;88.976,2;89.213,3;89.501,3;89.725,1;89.989,2;90.229,3;90.47,2;90.725,3;91.005,3;91.221,2;91.478,1;91.709,2;91.974,3;92.222,2;92.453,1;92.733,2;92.989,3;93.245,2;93.486,1;93.757,2;93.989,3;94.253,2;94.485,1;94.758,2;95.013,3;95.237,2;95.501,3;95.725,1;96.021,2;96.269,3;96.726,2;97.35,3;97.717,2;97.853,1;98.293,3;98.381,2;99.925,3;100.317,2;100.429,1;101.405,3;101.773,2;101.917,1;102.965,1;103.317,2;103.461,3;103.853,2;104.005,3;104.381,2;104.533,3;104.821,2;104.973,3;106.022,3;106.229,2;106.447,2;106.669,1;106.933,2;107.182,3;107.453,2;107.677,1;107.973,3;108.477,2;108.941,3;109.309,2;110.029,1;110.469,2;110.941,3;111.933,3;112.061,2;112.221,1;112.373,2;112.925,3;113.429,3;113.781,2;113.925,1;114.445,2;114.957,1;115.293,2;115.437,3;115.813,1;115.973,2;116.309,1;116.477,2;116.829,1;116.973,2;117.91,3;118.333,2;118.469,1;119.461,3;119.805,2;119.941,1;"

// the visual dots drawn on the canvas.
audiogame.dots = [];
audiogame.startingTime = 0;

audiogame.totalDotsCount = 0;
audiogame.totalSuccessCount = 0;

// an array to store successful state of last 5 notes.
audiogame.successDots = [true, true, true, true, true];

audiogame.dotImage = new Image();

var index = 0;

function setupLevelData() {
    var notes = audiogame.leveldata.split(";");

    // store the total number of dots
    audiogame.totalDotsCount = notes.length;

    for (var i in notes) {
        var note = notes[i].split(",");
        var time = parseFloat(note[0]);
        var line = parseInt(note[1]);
        var musicNote = new MusicNote(time, line);
        audiogame.musicNotes.push(musicNote);
    }
}

function startGame() {
    // starting game		
    var date = new Date();
    audiogame.startingTime = date.getTime();
    setTimeout(playMusic, 3550);
}

// init function when the DOM is ready
$(function () {
    // get the refereences of melody and base audio element.
    audiogame.melody = document.getElementById("melody");
    $(audiogame.melody).bind('ended', onMelodyEnded);
    audiogame.base = document.getElementById("base");
    audiogame.buttonOverSound = document.getElementById("buttonover");
    audiogame.buttonOverSound.volume = .3;
    audiogame.buttonActiveSound = document.getElementById("buttonactive");
    audiogame.buttonActiveSound.volume = .3;

    // load the dot image
    audiogame.dotImage.src = "/content/chaptersix/images/dot.png";

    // listen the button event that links to #game
    $("a[href='#game']").hover(function () {
        audiogame.buttonOverSound.currentTime = 0;
        audiogame.buttonOverSound.play();
    }, function () {
        audiogame.buttonOverSound.pause();
    });

    $("a[href='#game']").click(function () {
        audiogame.buttonActiveSound.currentTime = 0;
        audiogame.buttonActiveSound.play();

        $("#game-scene").addClass('show-scene');

        startGame();

        return false;
    });

    // keydown
    $(document).keydown(function (e) {
        var line = e.which - 73;
        $('#hit-line-' + line).removeClass('hide');
        $('#hit-line-' + line).addClass('show');

        if (audiogame.isRecordMode) {
            // print the stored music notes data when press ";" (186)
            if (e.which == 186) {
                var musicNotesString = "";
                for (var i in audiogame.musicNotes) {
                    musicNotesString += audiogame.musicNotes[i].time + "," + audiogame.musicNotes[i].line + ";";
                }
                console.log(musicNotesString);
            }

            var currentTime = parseInt(audiogame.melody.currentTime * 1000) / 1000;
            var note = new MusicNote(currentTime, e.which - 73);
            audiogame.musicNotes.push(note);
        }
        else {
            // our target is J(74), K(75), L(76)
            var hitLine = e.which - 73;

            // check if hit a music note dot
            for (var i in audiogame.dots) {
                if (hitLine == audiogame.dots[i].line && Math.abs(audiogame.dots[i].distance) < 20) {
                    // remove the hit dot from the dots array
                    audiogame.dots.splice(i, 1);

                    // add a success to the success array
                    audiogame.successDots.push(true);

                    // keep the success array in excatly 5 elements
                    audiogame.successDots = audiogame.successDots.splice(1, 5);

                    // increase the total success count
                    audiogame.totalSuccessCount++;
                }
            }
        }
    });
    $(document).keyup(function (e) {
        var line = e.which - 73;
        $('#hit-line-' + line).removeClass('show');
        $('#hit-line-' + line).addClass('hide');
    });

    if (!audiogame.isRecordMode) {
        setupLevelData();
    }

    drawBackground();

    setInterval(gameloop, 30);
});

function drawBackground() {
    var game = document.getElementById("game-background-canvas");
    var ctx = game.getContext('2d');

    ctx.lineWidth = 10;
    ctx.strokeStyle = "#000";

    // draw the three lines
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2 - 100, 50);
    ctx.lineTo(ctx.canvas.width / 2 - 100, ctx.canvas.height - 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2, 50);
    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height - 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2 + 100, 50);
    ctx.lineTo(ctx.canvas.width / 2 + 100, ctx.canvas.height - 50);
    ctx.stroke();

    // draw the horizontal line
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2 - 150, ctx.canvas.height - 80);
    ctx.lineTo(ctx.canvas.width / 2 + 150, ctx.canvas.height - 80);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(50,50,50,.8)";
    ctx.stroke();
}

function playMusic() {
    // play both the melody and base
    audiogame.melody.play();
    audiogame.base.play();
}

// logic that run every 30ms.
function gameloop() {
    var game = document.getElementById("game-canvas");
    var ctx = game.getContext('2d');


    if (!audiogame.isRecordMode) {
        // check missed dots
        for (var i in audiogame.dots) {
            if (!audiogame.dots[i].missed && audiogame.dots[i].distance < -10) {
                audiogame.dots[i].missed = true;

                // add a fail to the success array
                audiogame.successDots.push(false);

                // keep the success array in excatly 5 elements
                audiogame.successDots = audiogame.successDots.splice(1, 5);
            }

            // remove missed dots after moved to the bottom
            if (audiogame.dots[i].distance < -100) {
                audiogame.dots.splice(i, 1);
            }
        }

        // show new dots
        // if the game is started
        if (audiogame.startingTime != 0) {
            for (var i in audiogame.musicNotes) {
                var date = new Date();
                var elapsedTime = (date.getTime() - audiogame.startingTime) / 1000;
                var note = audiogame.musicNotes[i];

                var timeDiff = note.time - elapsedTime;
                if (timeDiff >= 0 && timeDiff <= .03) {
                    var dot = new Dot(ctx.canvas.height - 150, note.line);
                    audiogame.dots.push(dot);
                }
            }
        }

        // get how many success we made in last 5 notes
        var successCount = 0;
        for (var i in audiogame.successDots) {
            if (audiogame.successDots[i]) {
                successCount++;
            }
        }

        // calculate the percentage of the success in last 5 music dots
        var successPercent = successCount / 5;

        // prevent the successPercent to exceed range(fail safe)
        if (successPercent > 1) successPercent = 1;
        if (successPercent < 0) successPercent = 0;

        // change the volume of the melody according to the success percentange
        audiogame.melody.volume = successPercent;


        // move the dots
        for (var i in audiogame.dots) {
            audiogame.dots[i].distance -= 2.5;
        }
    }


    // only clear the dirty area, that is the middle area
    ctx.clearRect(ctx.canvas.width / 2 - 200, 0, 400, ctx.canvas.height);


    // draw the music note dots
    for (var i in audiogame.dots) {

        // prepare the radial gradients fill style		
        var circle_gradient = ctx.createRadialGradient(-3, -3, 1, 0, 0, 20);
        circle_gradient.addColorStop(0, "#fff");
        circle_gradient.addColorStop(1, "#cc0");
        ctx.fillStyle = circle_gradient;

        // draw the path
        //console.log(ctx.canvas.height-80-audiogame.dots[i].distance);
        ctx.save();
        var x = ctx.canvas.width / 2 - 100
        if (audiogame.dots[i].line == 2) {
            x = ctx.canvas.width / 2;
        }
        else if (audiogame.dots[i].line == 3) {
            x = ctx.canvas.width / 2 + 100;
        }
        ctx.translate(x, ctx.canvas.height - 80 - audiogame.dots[i].distance);
        //ctx.scale(1, 0.75);
        ctx.drawImage(audiogame.dotImage, -audiogame.dotImage.width / 2, -audiogame.dotImage.height / 2);
        /*		ctx.beginPath();
                ctx.arc(0, 0, 20, 0, Math.PI*2, true); 
                ctx.closePath();*/

        // actually fill the dot path
        ctx.fill();
        ctx.restore();
    }

}

function onMelodyEnded() {
    console.log('song ended');
    console.log('success percent: ', audiogame.totalSuccessCount / audiogame.totalDotsCount);
}