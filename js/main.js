// Game entry point
const Engine = require('./core/engine.js');
const Input = require("./core/input.js");

var canvas;
var context;

var engine;
var renderer;
var inputDevice;
var prev = null;

var counter = 0;

// resize window
function resize(){
	canvas.width = window.innerWidth - 20;
	canvas.height = window.innerHeight - 20;
	context.scale((window.innerWidth - 20) / 600, (window.innerHeight - 20) / 400);
}

// main game loop
function update(curr){
	if(!prev) prev = curr;
	var delta = curr - prev;
		prev = curr;

	// Update
	engine.update(delta);

	// draw to canvas
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillText("FPS: " + (1 / delta * 1000), 10, 50);
	context.fillText("up: " + inputDevice.upDown, 10, 80);
	renderer.render(engine, context);

	window.requestAnimationFrame(update);
}

// start the game
function init(){
	canvas = document.getElementById('game');
	context = canvas.getContext("2d");
	context.font = "80px Georgia";

	inputDevice = new Input.KeyboardDevice();
	engine = new Engine.Engine(inputDevice);
	renderer = new Engine.Renderer();

	engine.init();

	resize();
	window.addEventListener("resize", resize);

	window.requestAnimationFrame(update);
}

init();
