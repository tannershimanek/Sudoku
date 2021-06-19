
// https://gamedev.stackexchange.com/questions/56149/how-can-i-generate-sudoku-puzzles

// circular object references
// https://stackoverflow.com/questions/56352266/create-multiple-copies-of-an-array-in-javascript



// ---------------------------- MODEL ---------------------------- //
// data and functions that work with the data


let gameState = {
    'DIFFICULTIES' : { 'easy': 0, 'medium': 28, 'hard': 37 }, // num of blank spaces
    'difficulty': 0, // default to 0
    'gameOver' : true, // true when game is over
    'grid': [], // puzzle
    'solution' : [], // solution to puzzle
    'prevGameComplete': false // true if the players prev game was completed
};


function buildShuffledArray() {
    // returns a randomly generated array with no repeats
    let arr = new Array();
    for (let i = 0; i < 9; i++) {
        let randInt = Math.floor(Math.random() * 9) + 1;
        if (!arr.includes(randInt)) {
            arr.push(randInt);
        } else {
            i--;
        }
    }
    return arr;
}


function buildMatrix(arr) {
    // returns a matrix with 9 arrays following sudokus rules
    let matrix = [];
    matrix.push(arr);

    const fn = (row1) => {
        let newRow = [...row1];

        if (matrix.length === 3) {
            let initialRow = [...matrix[0]];
            let a = initialRow.splice(0, 1);
            initialRow.push(a[0]);
            matrix.push(initialRow);
        } else if (matrix.length === 6) {
            let initialRow = [...matrix[3]];
            let b = initialRow.splice(0, 1);
            initialRow.push(b[0]);
            matrix.push(initialRow);
        } else {
            let c = newRow.splice(0, 3);
            newRow.push(c[0], c[1], c[2]);
            matrix.push(newRow);
        }

        if (matrix.length != 9) {
            fn([...matrix[matrix.length - 1]]);
        }
    }

    fn([...arr]);
    return matrix;
}


function setPuzzleData() { 
    // sets 'grid' with random puzzle seed and selected 'difficulty'
    let randPuzzle = buildMatrix(buildShuffledArray());

    const rotate = matrix => {
        return matrix.map((row, i) =>
            row.map((val, j) => matrix[matrix.length - 1 - j][i]));
    };

    // TODO: Set number for number of rotate() calls
    setGrid(rotate([...randPuzzle]));
    setSolution(rotate([...randPuzzle]));
    setBlankCells(getDifficulty()); // set blank piece locations
}


function setBlankCells(numEmptyCells) {
    // find and set location of blank cells
    for (i = 0; i <= numEmptyCells; i++) {
        // create a random coordinate and set the coordinate to zero
        setBlankRow = Math.floor(Math.random() * 9);
        setBlankCol = Math.floor(Math.random() * 9);
        
        // prevent repeated cells
        gameState.grid[setBlankRow][setBlankCol] === 0 ? i-- 
                : gameState.grid[setBlankRow][setBlankCol] = 0;
    }
}


function setDifficulty(val) {
    if (val === 0 ) {
        gameState.difficulty = 0;
    } else {
        gameState.difficulty = gameState.DIFFICULTIES[val];
    }
}


function getDifficulty() {
    return gameState.difficulty;
}


function setGameOver(val) {
    gameState.gameOver = val;
}


function getGameOver() {
    return gameState.gameOver;
}


function getDifficulties() {
    return gameState.DIFFICULTIES;
}

function setSolution(val) {
    gameState.solution = val;
}


function getSolution() {
    return gameState.solution;
}


function setGrid(val) {
    gameState.grid = val;
}


function getGrid() {
    return gameState.grid;
}


function setPrevGameComplete(val) {
    gameState.prevGameComplete = val;
}


function getPrevGameComplete() {
    return gameState.prevGameComplete;
}


// ---------------------------- MODEL - END ----------------------------- //
