// --------------------------- CONTROLLER ---------------------------- //

let startTime;
let elapsedTime = 0;
let timerInterval;

let user = document.getElementById('user');
let timestamp = document.getElementById('timeStamp');

let startButton = document.getElementById('start_game');
let newGameButton = document.getElementById('new_game');
let difficulties = document.getElementsByTagName('select');
let logout = document.getElementById('logout');

startButton.onclick = () => { startGame() };
newGameButton.onclick = () => { newGame() };

for (let i = 0; i < difficulties.length; i++) {
    difficulties[i].addEventListener('change', function() {
        this.value !== '0' ? gameDifficulty(this.value) : alert('Please Select a Difficulty');
    });
}

logout.addEventListener('click', () => {
    localStorage.clear();
    user.innerHTML = localStorage.username;
    timestamp.innerHTML = localStorage.timestamp;

    // window.location.href="login.html";
});

// window.addEventListener('load', () => {
//     let isValid = localStorage.isvalid;
    
//     // check if login information is valid and update dom
//     if (isValid === 'valid') {
//         user.innerHTML = localStorage.username;
//         timestamp.innerHTML = localStorage.timestamp; // TODO: FORMAT
//     } else {
//         window.location.href="login.html";
//     }

// });


function gameDifficulty(index) {
    setDifficulty(index);
    if (getGameOver() === false) { newGame() };
    console.log('difficulty', getDifficulty('index'));
    document.getElementById('stopwatch').style.color = 'black';
    document.getElementById('start_game').style.display = 'block';
    if (elapsedTime !== 0) resetTimer();
}


function buildGameGrid(len, width) {
    // build the puzzle table
    let table = document.getElementById("game_grid");
    console.log(table); // remove later

    // clear table data
    table.innerHTML = '';

    // build the outer shell of the table
    const newTable = document.createElement('table');
    const newTableBody = document.createElement('tbody');
    table.insertAdjacentElement('afterbegin', newTable);
    newTable.insertAdjacentElement('afterbegin', newTableBody);

    // create table rows
    for (let row = 0; row < len; row++) {
        const newTableRow = document.createElement('tr');

        // create table columns
        for (let col = 0; col < width; col++) {
            const newTableCol = document.createElement('td');
            newTableRow.appendChild(newTableCol);
            newTableCol.appendChild(updateCells(row, col));
            newTableCol.setAttribute('id', `c${row}${col}`);

            // setAttribute of every 3rd row
            if (row != 0 && row % 3 == 0) {
                newTableCol.setAttribute('class', 'border-top');
            }
            // setAttribute of every 3rd col
            if (col != 0 && col % 3 == 0) {
                newTableCol.setAttribute('class', 'border-left');
            }
            // check for corner pieces
            if  ((col != 0 && col % 3 == 0) && (row != 0 && row % 3 == 0)) {
                newTableCol.setAttribute('class', 'border-left border-top');
            }
        }
        newTableBody.appendChild(newTableRow);
    }
}


function updateCells(row, col) {
    // get table data and display cells properly
    const puzzle = getGrid();

    if (puzzle[row][col] != 0) {
        let given = document.createTextNode(puzzle[row][col]);
        return given
    } else {
        let elementInput = document.createElement('input');
        elementInput.setAttribute('type', 'other');
        elementInput.setAttribute('maxlength', '1');
        return elementInput;
    }
}


function displayTime(txt) {
    // diplay the timer with innerHTML
    document.getElementById('stopwatch').innerHTML = txt;
}


function formatTime(time) {
    // format time to a pretty string
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
  
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
  
    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");
  
    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}


function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      displayTime(formatTime(elapsedTime));
    }, 10);
  }


function stopTimer() {
    // stops the game timer
    clearInterval(timerInterval);
}


function resetTimer() {
    // resets the stopwatch and displayed time
    clearInterval(timerInterval);
    displayTime("00:00:00");
    elapsedTime = 0;
}


function updatePrevTime() {
    let finalTimeLocation = document.getElementById('final-time');
    let prevTimeLocationToast = document.getElementById('prev-time-1');
    let prevTimeLocation = document.getElementById('prev-time-2');
    
    // set time in local storage
    localStorage.setItem('currentTime', formatTime(elapsedTime));
    finalTimeLocation.innerHTML = '';
    finalTimeLocation.innerHTML = localStorage.currentTime;

    prevTimeLocationToast.innerHTML = '';
    prevTimeLocationToast.innerHTML = localStorage.prevTime;

    prevTimeLocation.innerHTML = '';
    prevTimeLocation.innerHTML = localStorage.prevTime;
    prevTimeLocation.style.color = '#daa520';
}


function showToast() {
    // show a popup when the player wins the game
    let tst= document.getElementById('toast');
    let playAgain = document.getElementById('play-again');

    playAgain.addEventListener('click', () => {
        tst.className = tst.className.replace("show", "");
        newGame();
    });

    // set time in local storage
    updatePrevTime();
    tst.className = 'show';
}


function checkIfPlayerWon(row, col, value) {
    getGrid()[row][col] = value;
    
    if (getGrid().toString() === getSolution().toString()) {
        stopTimer();
        document.getElementById('stopwatch').style.color = 'crimson';
        showToast();
        let aud = document.getElementsByTagName('audio');
        aud[0].onchange = new Audio('../assets/victoryff.swf.mp3').play();
        
        setPrevGameComplete(true);
    }

    console.log(row, col, value, getSolution()[row][col]);
}


function displaySolution() {
    // displays solution to the dom for grading
    let solutionLocation = document.getElementById('solution-data');
    solutionLocation.innerHTML = '';
    solutionLocation.innerHTML = `[${gameState.solution[0]}]<br>[${gameState.solution[1]}]<br>[${gameState.solution[2]}]<br>[${gameState.solution[3]}]<br>[${gameState.solution[4]}]<br>[${gameState.solution[5]}]<br>[${gameState.solution[6]}]<br>[${gameState.solution[7]}]<br>[${gameState.solution[8]}]`;
}


function startGame() {
    // start the game and set gameState to false
    getGameJSON();
    setGameOver(false);
    setPuzzleData();
    buildGameGrid(9,9);
    console.log(getSolution());
    if (elapsedTime !== 0) resetTimer();
    startTimer();
    document.getElementById('new_game').style.display = 'block';
    document.getElementById('start_game').style.display = 'none';
    document.getElementById('stopwatch').style.color = 'black';

    let cells = document.getElementsByTagName('td');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('keyup', function() {
            checkIfPlayerWon(this.parentNode.rowIndex, this.cellIndex, this.firstChild.value);
        });

        cells[i].addEventListener('click', function() {
            let cellClass = this.classList;
            let col = this.cellIndex;
            let row = this.parentNode.rowIndex;
            let inputValue = this.firstChild.value;

            // change the color value when the user selects a cell
            cellClass.contains('highlight') ? cellClass.remove('highlight') : cellClass.add('highlight');

            // update the cell data div
            if (this.innerHTML === '<input type="other" maxlength="1">') {
                document.getElementById('row-coordinate').innerHTML = row + 1;
                document.getElementById('col-coordinate').innerHTML = col + 1;
                document.getElementById('row-col-value').innerHTML = inputValue || 'None';
            } else {
                // this.innerHTML != 0 ? this.innerHTML = 0 : this.innerHTML = getSolution()[row][col];
                document.getElementById('row-coordinate').innerHTML = row + 1;
                document.getElementById('col-coordinate').innerHTML = col + 1;
                document.getElementById('row-col-value').innerHTML = this.innerHTML;
            }
        });
    }
    // shows solution for grading
    displaySolution();
}


function newGame() {
    // reset the game and state
    setGameOver(true);
    setSolution([]);
    setGrid([]);
    document.getElementById('game_grid').innerHTML = '';
    document.getElementById('start_game').style.display = 'none';
    document.getElementById('new_game').style.display = 'none';
    document.getElementById('stopwatch').style.color = 'crimson';
    document.getElementById('start_game').style.display = 'block';
    document.getElementById('row-coordinate').innerHTML = '';
    document.getElementById('col-coordinate').innerHTML = '';
    document.getElementById('row-col-value').innerHTML = '';
    stopTimer();
    if (getPrevGameComplete) { localStorage.setItem('prevTime', formatTime(elapsedTime)) };
    // displayGameState('game reset...');
}


function displayGameState(val) {
    console.log(val);
    console.log('--- LIVE GAME STATE BELOW ---');
    console.log('getDifficulties', getDifficulties());
    console.log('getDifficulty', getDifficulty());
    console.log('getGameOver', getGameOver());
    console.log('getSolution', getSolution());
    console.log('getGrid', getGrid());
    console.log('--- --- --- --- --- --- ---');

    document.getElementById('state').innerHTML = 'Live gameState is found in the console..<br>click the new game button to end the <br>game and change the state.';
}


function getGameJSON() {
    let request = new XMLHttpRequest();
    request.open("GET", "../game.json", false);
    console.log('../game.json');
    request.send(null);

    if (request.status != 200) {
        alert("Request failed " + request.status + ": " + request.statusText);
        return;
    }

    let jsondoc = JSON.parse(request.responseText);
    console.log(jsondoc);
    displayTime(jsondoc.time);

    let jsondata = document.getElementById('json-data');
    jsondata.innerHTML = '';

    let difficulty = document.createElement('p');
    let grid = document.createElement('p');
    let solution = document.createElement('p');

    jsondata.appendChild(difficulty).innerHTML = `difficulty: ${jsondoc.difficulty}`;
    jsondata.appendChild(grid).innerHTML = `grid: <br><br>[${jsondoc.grid[0]}]<br>[${jsondoc.grid[1]}]<br>[${jsondoc.grid[2]}]<br>[${jsondoc.grid[3]}]<br>[${jsondoc.grid[4]}]<br>[${jsondoc.grid[5]}]<br>[${jsondoc.grid[6]}]<br>[${jsondoc.grid[7]}]<br>[${jsondoc.grid[8]}]`;
    jsondata.appendChild(solution).innerHTML = `solution: <br><br>[${jsondoc.solution[0]}]<br>[${jsondoc.solution[1]}]<br>[${jsondoc.solution[2]}]<br>[${jsondoc.solution[3]}]<br>[${jsondoc.solution[4]}]<br>[${jsondoc.solution[5]}]<br>[${jsondoc.solution[6]}]<br>[${jsondoc.solution[7]}]<br>[${jsondoc.solution[8]}]`;

    // setSolution(jsondoc.solution);
    // setGrid(jsondoc.grid);
    // setDifficulty(jsondoc.difficulty);
    // buildGameGrid(9,9);
    // startTimer();
    // displayTime(jsondoc.time);
}




// ------------------ CONTROLLER - END ------------------ //



















// [
//     [0,0,6,2,0,4,0,1,9],
//     [0,0,0,7,5,0,6,0,0],
//     [0,4,9,0,0,0,3,0,5],
//     [0,0,0,0,0,2,0,0,7],
//     [9,7,0,5,0,6,0,8,2],
//     [4,0,0,8,0,0,0,0,0],
//     [5,0,3,0,0,0,4,7,0],
//     [0,0,7,0,1,5,0,0,0],
//     [1,6,0,7,0,2,9,0,0]]