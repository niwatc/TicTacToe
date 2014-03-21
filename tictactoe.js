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

var players = ['A','B'];
var moves = [];

var canvas = document.getElementById('canvas');
// Set the canvas height and width
document.getElementById('canvas').setAttribute("width",cw)
document.getElementById('canvas').setAttribute("height",ch)
var context = canvas.getContext('2d');
// Add a mouse click listener to the canvas
canvas.addEventListener("click", getCursorPosition, false);



drawBoard();


// Get mouse position on the board
function getCursorPosition(e) {
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
	    x = e.pageX;
	    y = e.pageY;
    }
    else {
	    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
	    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
   
    x = Math.min(x, cw * cellSize);
    y = Math.min(y, ch * cellSize);

    rowSelection = Math.floor(x/cellSize);
    columnSelection = Math.floor(y/cellSize);
    if(checkCellEmpty(rowSelection,columnSelection)) {
	    moves.push(new move(rowSelection, columnSelection, players[1]));
	    players.reverse();
	  	drawBoard();	
    }

    // var move1 = new move(rowSelection, columnSelection, player);
    //drawMove(move1);
    //moves.push(move1);
  	
}

// Check if a cell on the board is empty
function checkCellEmpty(row,column) {
    for (var i = 0; i < moves.length; i++) {
    	if (moves[i].row === row && moves[i].column === column )
    		return false;   	
    }
    return true;
}


// Draw the board
function drawBoard(){	
	// Draw the board cells
	for (var y = 0; y <= columnNb; y++) {
	    for (var x = 0; x <= rowNb; x++) {
	    	// console.log(x + ' ' + y);
	    	drawRect(x, y)    	
	    }	
	 }

	 // Draw the moves on the board
    for (var i = 0; i < moves.length; i++) {
    	drawMove(moves[i]);	    	
    }

}


// Draw cell rectangles
function drawRect(x, y) {
	context.beginPath();
	context.rect(x*cellSize, y*cellSize, x+cellSize, y+cellSize);
	context.fillStyle = 'lightgrey';
	context.fill();
	context.strokeStyle = '#000';
	context.stroke();	
}



function move(row, column, player) {
    this.row = row;
    this.column = column;
    this.player = player;
}


// Draw the move on the board
function drawMove(move) {
	var padding = 10; // space between the circle and the cells border
	var radius = cellSize/2-padding;
	context.beginPath();
	context.arc( (move.row+0.5)*cellSize, (move.column+0.5) * cellSize, radius, 0, 2 * Math.PI, false);
	if (move.player == 'A')
		context.fillStyle = "green";
	else 
		context.fillStyle = "orange";
	context.fill();
	context.lineWidth = 2;
	context.stroke();   
}