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
var gameFinished = false;

var canvas = document.getElementById('canvas');
// Set the canvas height and width
document.getElementById('canvas').setAttribute("width",cw)
document.getElementById('canvas').setAttribute("height",ch)
var context = canvas.getContext('2d');
// Add a mouse click listener to the canvas
canvas.addEventListener("click", getCursorPosition, false);


// Start a new game
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
   
    x = Math.min(x, cw * cellSize);
    y = Math.min(y, ch * cellSize);

    rowSelection = Math.floor(x/cellSize);
    columnSelection = Math.floor(y/cellSize);
    if(checkCellEmpty(rowSelection,columnSelection) && (!gameFinished)) {
	    moves.push(new move(rowSelection, columnSelection, players[1]));
	    
	    playerMsg();
	  	drawBoard();

	  	if(checkMatches()) {
	  		gameEnd('win');
	  	}
	  	else if (moves.length == rowNb*columnNb) {
  			gameEnd('draw');
	  	}	
	  	else {
			players.reverse();	  		
	  	}
    }
}

// Initialize the game
function gameInit() {
	moves = [];
	gameFinished = false;
	players = ['A','B'];
	drawBoard();
	playerMsg();
}

// Undo the last move
function undoMove() {
	moves.pop();
	players.reverse();
	playerMsg();
	drawBoard();
}

// Show player's turn
function playerMsg() {
	document.getElementById('outcome').innerHTML='Player '+players[0]+' your turn';
}

// Show the game outcome
function gameEnd(outcome) {
	if (outcome == 'win') {
		gameFinished = true;
		document.getElementById('outcome').innerHTML='Winner: Player '+players[0];
	}
	else {
		document.getElementById('outcome').innerHTML='Draw';		
	}
}

// Check if a cell on the board is empty
function checkCellEmpty(row,column) {
    for (var i = 0; i < moves.length; i++) {
    	if (moves[i].row === row && moves[i].column === column )
    		return false;   	
    }
    return true;
}

// Check 3 matches
function checkMatches() {
	for (var y = 0; y <= columnNb; y++) {
	    for (var x = 0; x <= rowNb; x++) {
	    	var m0 = getMove(x,y);
	    	var ml1 = getMove(x+1, y);
	    	var ml2 = getMove(x+2, y);  	
	    	var md1 = getMove(x+1, y+1);
	    	var md2 = getMove(x+2, y+2);
			var mdm1 = getMove(x-1, y-1);
	    	var mdm2 = getMove(x-2, y-2);	    	
	    	var mr1 = getMove(x, y+1);
	    	var mr2 = getMove(x, y+2);  	   
	    	if (m0.player === ml1.player && m0.player === ml2.player && m0 !== false && ml1 !== false && ml2 !== false)
	    		return true;
	    	if (m0.player === md1.player && m0.player === md2.player && m0 !== false && md1 !== false && md2 !== false)
	    		return true;
	    	if (m0.player === mr1.player && m0.player === mr2.player && m0 !== false && mr1 !== false && mr2 !== false)
	    		return true;  
	    	if (m0.player === mdm1.player && m0.player === mdm2.player && m0 !== false && mdm1 !== false && mdm2 !== false)
	    		return true;  	    				 	  		    	
	    }	
	 }
	 return false;
}    

// Get the move objectreturn piece object
function getMove(row,column) {
    for (var i = 0; i < moves.length; i++) {
    	var m = moves[i]; 
    	if( m.row == row && m.column == column)
    		return m; 
    }
    return false;
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


// Move class
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