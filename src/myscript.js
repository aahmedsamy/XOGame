var player1 = prompt("Player One: Enter your name, you will be X");
var player1Color = 'rgb(0, 0, 250)';
var player1Score = 0;
var player2 = prompt("Player Two: Enter your name, you will be O");
var player2Color = 'rgb(255, 0, 0)';
var player2Score = 0;
var gameOn = true;
var counterOfFilledCells = 0;
var winnerColor = 'rgb(67, 255, 162)';
var counter = 1;
var table = $('table tr');

//monitoring
function reportWin(rowNum, colNum) {
    console.log("You won starting at this row, col");
    console.log("here "+ rowNum + ", " + colNum);
}

//fill the chosen cell with the player color
function putLetter(rowIndex, colIndex, letter) {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').text('');
}


// return cell's letter
function returnLetter(rowIndex, colIndex) {

    if(rowIndex >= 0 && rowIndex < 3 && colIndex >=0 && colIndex < 3) return table.eq(rowIndex).find('td').eq(colIndex).find('button').text();
    else return undefined;
}


//check if there is a winner
function letterMatchCheck(one, two, three) {
    return (one === two && one === three && one !== '' && one !== undefined)
}


function horizontalWinCheck() {

    for(var row = 0 ; row < 3 ; row++)
    {
        for(var col = 0 ; col < 3 ; col++)
        {
            if(letterMatchCheck(returnLetter(row, col), returnLetter(row, col+1), returnLetter(row, col + 2)))
            {
                // changeColor(row, col, winnerColor);
                // changeColor(row, col + 1, winnerColor);
                // changeColor(row, col + 2, winnerColor);

                console.log("horizontal");
                reportWin(row,col);
                return true;
            }
        }
    }
    return false;
}

function verticalWinCheck() {
    for(var row = 0 ; row < 3 ; row++)
    {
        for(var col = 0 ; col < 3 ; col++)
        {
            if(letterMatchCheck(returnLetter(row, col), returnLetter(row + 1, col), returnLetter(row + 2, col)))
            {
                // changeColor(row, col, winnerColor);
                // changeColor(row + 1, col, winnerColor);
                // changeColor(row + 2, col, winnerColor);
                console.log("vertical");
                reportWin(row,col);
                return true;
            }
        }
    }
    return false;
}



function diagonalWinCheck() {
    for(var row = 0 ; row < 3 ; row++)
    {
        for(var col = 0 ; col < 3 ; col++)
        {
            if(letterMatchCheck(returnLetter(row, col), returnLetter(row + 1, col + 1), returnLetter(row + 2, col + 2)))
            {
                //changeColor(row, col, winnerColor);
                //changeColor(row + 1, col + 1, winnerColor);
                //changeColor(row + 2, col + 2, winnerColor);
                console.log("Diagonal +1");
                reportWin(row,col);
                return true;
            }
            else if(letterMatchCheck(returnLetter(row, col), returnLetter(row - 1, col + 1), returnLetter(row - 2, col + 2)))
            {
                //changeColor(row, col, winnerColor);
                //changeColor(row - 1, col + 1, winnerColor);
                //changeColor(row - 2, col + 2, winnerColor);
                console.log("Diagonal -1");
                reportWin(row,col);
                return true;
            }
        }
    }
    return false;
}

var currentPlayer = 1;
var currentName = player1;
var currentLetter ="X";
var currentColor = player1Color;

function cleanGrid()
{
    counterOfFilledCells = 0;
    for(var row = 0 ; row < 3 ; row++)
    {
        for(var col = 0 ; col < 3 ; col++)
        {
            putLetter(row, col, '');
        }
    }
    if(counter % 2 !== 0)
    {
        currentPlayer = 1;
        currentName = player1;
        currentLetter = 'X';
        currentColor = player1Color;
        $('#player1').css({border : "2px solid blue"});
        $('#player2').css({border : "2px solid white"});
    }
    else
    {
        currentPlayer = 2;
        currentName = player2;
        currentLetter = 'O';
        currentColor = player2Color;
        $('#player2').css({border : "2px solid red"});
        $('#player1').css({border : "2px solid white"});
    }
    counter++;
}



$('#turn').text(player1+": it is your turn");
$('#player1').text(player1+ ": "+player1Score);
$('#player2').text(player2+ ": "+player2Score);




$('.board button').on('click', function () {


    var letter=$(this).text();
    console.log(letter);
    counterOfFilledCells++;

    if(gameOn == false){} // disabling the grid
    else if(letter === 'X' || letter === 'O')
    {
        alert("This cell isn't empty");
    }
    else
    {

        $(this).text(currentLetter);
        $(this).css('color', currentColor);
        var letter=$(this).text();
        console.log(letter + "  shit");
        if(horizontalWinCheck()|| verticalWinCheck() || diagonalWinCheck())
        {
            gameOn = false;
            if(currentPlayer === 1)
            {
                player1Score++;
            }
            else
            {
                player2Score++;
            }
            $('#player1').text(player1+ ": "+player1Score);
            $('#player2').text(player2+ ": "+player2Score);
            if(player1Score > player2Score)
            {
                $('#player1').css('color', 'green');
                $('#player2').css('color','red');
            }
            else if(player1Score < player2Score)
            {
                $('#player1').css('color','red');
                $('#player2').css('color','green');
            }
            else
            {
                   $('#player1').css('color', 'black');
                   $('#player2').css('color','black');
            }
            alert(currentName+" Won this round!");
    }
    else
    {
            if(counterOfFilledCells === 9)
            {
                 alert("Draw");
                 gameOn = false;
            }
        if(currentPlayer === 1)
        {
            $('#player2').css({border : "2px solid red"});
            $('#player1').css({border : "2px solid white"});
            currentName = player2;
            currentColor = player2Color;
            currentPlayer = 2;
            currentLetter = 'O';
        }
        else
        {
            $('#player1').css({border : "2px solid blue"});
            $('#player2').css({border : "2px solid white"});
            currentName = player1;
            currentPlayer = 1;
            currentColor = player1Color;
            currentLetter = 'X';
        }
        $('#turn').text(currentName+": it is your turn.");
    }
    }

})


$('#reset').click( function () {
     cleanGrid();
     gameOn = true;
})




































