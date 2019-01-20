// Game entry point
const Engine = require('./core/engine.js');

var canvas;
var context;

var engine;
var renderer;
var prev = null;

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

	context.clearRect(0, 0, canvas.width, canvas.height);

	// display delta
	context.fillText("FPS: " + (1 / delta * 1000), 10, 50);

	// Update
	engine.update(delta);
	renderer.render(engine, context);

	window.requestAnimationFrame(update);
}

// start the game
function init(){
	canvas = document.getElementById('game');
	context = canvas.getContext("2d");
	context.font = "80px Georgia";
	engine = new Engine.Engine();
	renderer = new Engine.Renderer();

	engine.init();

	resize();
	window.addEventListener("resize", resize);
	window.requestAnimationFrame(update);
}

init();
