/*****************
Tic Tac Toe Game
by Niwat Charoenloet

******************/

/* Game variables */
var cellSize = 100;  // Cell width and height in pixels
var rowNb = 3; // Number of row of the board
var columnNb = 3; // Number of columns of the board
var cw = rowNb*cellSize;
var ch = columnNb*cellSize;
var players = ['A','B'];
var moves = {}; // Store all the moves of the players, ie : {move11: 'A', move10: 'B', ...}
var gameFinished = false; // Game status


// Get the canvas object
var canvas = document.getElementById('canvas');
// Set the canvas height and width
document.getElementById('canvas').setAttribute("width",cw)
document.getElementById('canvas').setAttribute("height",ch)
var context = canvas.getContext('2d');
// Add a mouse click listener to the canvas
canvas.addEventListener("click", getCursorPosition, false);

// Start a new game on load
gameInit();

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

    // Calculate the cell row and colum
    x = Math.min(x, cw * cellSize);
    y = Math.min(y, ch * cellSize);
    rowSelection = Math.floor(x/cellSize);
    columnSelection = Math.floor(y/cellSize);

    // If cell is empty and game not finished, add a new 'move' to the object 'moves'
    if(moves.hasOwnProperty("move"+rowSelection+columnSelection) === false && !gameFinished) {
    	moves['move'+rowSelection+columnSelection] = players[0];
    	players.reverse();	// Inverse players array so it is the next player turn
    	playerMsg(); // Show message on board
    	drawBoard(); // Redraw the board
    }

}

// Initialize the game
function gameInit() {
	moves = {};
	gameFinished = false;
	players = ['A','B'];
	drawBoard();
	playerMsg();
}

// Undo the last move
function undoMove() {
	// Delete the last added move
	delete moves[Object.keys(moves)[Object.keys(moves).length - 1]];
	players.reverse();
	gameFinished = false;
	playerMsg();
	drawBoard();
}

// Show player's turn
function playerMsg() {
	document.getElementById('message').innerHTML='Player '+players[0]+' your turn';
}

// Show the game outcome
function gameEnd(outcome) {
	var msg;
	gameFinished = true;
	if (outcome == 'win') {
		players.reverse(); 			
		msg = 'Winner: Player '+players[0];
	}
	else {
		msg ='Draw';		
	}
	document.getElementById('message').innerHTML=msg;		
}

// Draw the board
function drawBoard(){	
	// Draw the board cells
	var e = 0; // Count empty cell
	for (var y = 0; y < columnNb; y++) {
	    for (var x = 0; x < rowNb; x++) {
	    	drawRect(x, y)    
	    	// Check for 3 matches on row, column and diagonals
	    	if(moves.hasOwnProperty('move'+x+y)) {
	    			drawMove(x,y,moves['move'+x+y])
	    			var m = moves['move'+x+y];
	    			if(m == moves['move'+(x+1)+y] && m == moves['move'+(x+2)+y])
	    				gameEnd('win');
	    			if(m == moves['move'+x+(y+1)] && m == moves['move'+x+(y+2)])
	    				gameEnd('win');
	    			if(m == moves['move'+(x+1)+(y+1)] && m == moves['move'+(x+2)+(y+2)])
	    				gameEnd('win');
	    			if(m == moves['move'+(x-1)+(y+1)] && m == moves['move'+(x-2)+(y+2)])
	    				gameEnd('win');	    			
	    	}
	    	else {
	  			e++;
	    	}	    	
	    }	
	 }
	 // No more draw cells 
	 if (e == 0 && !gameFinished)
 		gameEnd('draw');	
}


// Draw cell rectangles
function drawRect(x, y) {
	context.beginPath();
	context.rect(x*cellSize, y*cellSize, x+cellSize, y+cellSize);
	context.fillStyle = 'lightgrey';
	context.fill();
	context.strokeStyle = 'black';
	context.stroke();	
}


// Draw the move on the board
function drawMove(x,y,player) {
	var padding = 10; // space between the circle and the cells border
	var radius = cellSize/2-padding;
	context.beginPath();
	context.arc( (x+0.5)*cellSize, (y+0.5) * cellSize, radius, 0, 2 * Math.PI, false);
	if (player == 'A')
		context.fillStyle = "green";
	else 
		context.fillStyle = "orange";
	context.fill();
	context.lineWidth = 2;
	context.stroke();   
}