var canvas = CE.defines("main-canvas")
    .extend(Input)
    .ready(function () {
        canvas.Scene.call("MyScene");
    });

canvas.Scene.New({
    name: "MyScene", // Obligatory
    materials: {
        images: {
            "bus": "/content/canvasengine/img/bus.png"
        }
    },
    called: function (stage) {
        this.bus = this.createElement();
        stage.append(this.bus);
    },
    preload: function (stage, pourcent, material) {
        this.bus.drawImage("bus");
    },
    ready: function (stage, params) {
        //this.bus = this.createElement();
        //this.bus.drawImage("bus");
        //stage.append(this.bus);

        canvas.Input.keyDown(Input.A);
    },
    render: function (stage) {

        if (canvas.Input.isPressed(Input.A)) {
            console.log('A is pressed');
        }

        stage.refresh();
    },
    exit: function (stage) {

    }
});