// Game entry point

// do something simple for now
var canvas = document.getElementById('game');
var context = canvas.getContext("2d");
context.font = "80px Georgia";

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
	context.fillText("Hello friends!: " + delta, 10, 50);
	
	window.requestAnimationFrame(update);
}

// start the game
function init(){
	resize();
	window.addEventListener("resize", resize);
	window.requestAnimationFrame(update);
}

init();