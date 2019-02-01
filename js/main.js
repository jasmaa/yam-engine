// Game entry point
const Engine = require('./core/engine.js');
const Input = require('./core/input.js');

var canvas;
var context;

var engine;
var renderer;
var inputDevice;
var prev = null;

const screenDim = {'w':640, 'h':360};

/**
 * Resize canvas without keeping ratio
 * @return {[type]} [description]
 */
function resize(){
	canvas.width = window.innerWidth - 20;
	canvas.height = window.innerHeight - 20;
	context.scale((window.innerWidth - 20) / screenDim.w, (window.innerHeight - 20) / screenDim.h);
}

/**
 * Main game loop
 * @param  {[type]} curr Current time
 * @return {[type]}      [description]
 */
function update(curr){
	if(!prev) prev = curr;
	var delta = curr - prev;
	prev = curr;

	// Update
	engine.update(delta);

	// draw to canvas
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillText("FPS: " + (1 / delta * 1000), 10, 50);
	context.fillText(engine.camera.position.x, 10, 80);
	renderer.render(engine, context);

	window.requestAnimationFrame(update);
}

/**
 * Initiate game
 * @return {[type]} [description]
 */
function init(){
	canvas = document.getElementById('game');
	context = canvas.getContext("2d");
	context.font = "80px Georgia";

	inputDevice = new Input.KeyboardDevice();
	engine = new Engine.Engine(inputDevice, screenDim);
	renderer = new Engine.Renderer(engine.camera);

	engine.init();

	// Resize
	resize();
	window.addEventListener("resize", resize);

	// Enter game loop
	window.requestAnimationFrame(update);
}

// Start the game
init();
