/*****************
Tic Tac Toe Game
by Niwat Charoenloet

******************/

/* Game variables */
var cellSize = 100;  // in pixels
var rowNb = 3;
var columnNb = 3;
var cw = rowNb*cellSize;
var ch = columnNb*cellSize;

var canvas = document.getElementById('canvas');
// Set the canvas height and width
document.getElementById('canvas').setAttribute("width",cw)
document.getElementById('canvas').setAttribute("height",ch)
var context = canvas.getContext('2d');


drawBoard();


// Draw the board
function drawBoard(){	
	// Draw the board cells
	for (var y = 0; y <= columnNb; y++) {
	    for (var x = 0; x <= rowNb; x++) {
	    	// console.log(x + ' ' + y);
	    	drawRect(x, y)    	
	    }	
	 }
}


// Draw cell rectangles
function drawRect(x, y) {
	context.beginPath();
	context.rect(x*cellSize, y*cellSize, x+cellSize, y+cellSize);
	context.fillStyle = 'lightgrey';
	context.fill();
	context.strokeStyle = '#003300';
	context.stroke();	
}