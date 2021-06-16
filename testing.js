
// https://gamedev.stackexchange.com/questions/56149/how-can-i-generate-sudoku-puzzles

// circular object references
// https://stackoverflow.com/questions/56352266/create-multiple-copies-of-an-array-in-javascript

const buildShuffledArray = () => {
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


let row = buildShuffledArray();

function buildMatrix(arr) {
    let matrix = new Array();
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
        } 
        else {
            let c = newRow.splice(0, 3);
            newRow.push(c[0], c[1], c[2]);
            matrix.push(newRow);
            // matrix.push([0]);
        }
        if (matrix.length != 9) {
            fn([...matrix[matrix.length - 1]]);
        }
    }

    fn([...arr]);
    console.log(matrix);
    return matrix;
}

function buildMatrix1(row) {
    let matrix = [];
    matrix.push(row);

    row2 = [...row];
    a = row2.splice(0, 3);
    row2.push(a[0], a[1], a[2]);
    matrix.push(row2);

    row3 = [...row2];
    a = row3.splice(0, 3);
    row3.push(a[0], a[1], a[2]);
    matrix.push(row3);

    row4 = [...row];
    a = row4.splice(0, 1);
    row4.push(a[0]);
    matrix.push(row4);

    row5 = [...row4];
    a = row5.splice(0, 3);
    row5.push(a[0], a[1], a[2]);
    matrix.push(row5);

    row6 = [...row5];
    a = row6.splice(0, 3);
    row6.push(a[0], a[1], a[2]);
    matrix.push(row6);

    row7 = [...row4];
    a = row7.splice(0, 1);
    row7.push(a[0]);
    matrix.push(row7);

    row8 = [...row7];
    a = row8.splice(0, 3);
    row8.push(a[0], a[1], a[2]);
    matrix.push(row8);

    row9 =[...row8];
    a = row9.splice(0, 3);
    row9.push(a[0], a[1], a[2]);
    matrix.push(row9);

    console.log(matrix);

    // ------------------------------ //

    // let row2 = [...row];
    // let row3 = [...row2];
    // let row4 = [...row3];
    // let row5 = [...row4];
    // let row6 = [...row5];
    // let row7 = [...row6];
    // let row8 = [...row7];
    // let row9 = [...row8];

    // matrix.push(row2);
    // matrix.push(row3);
    // matrix.push(row4);
    // matrix.push(row5);
    // matrix.push(row6);
    // matrix.push(row7);
    // matrix.push(row8);
    // matrix.push(row9);


    // for (let i = 1; i <= 8; i++) {
    //     a = matrix[i].splice(0, 3);
    //     matrix[i].push(a[0], a[1], a[2]);
    //     console.log(matrix[i])
    // }
    // console.log(matrix);
}


buildMatrix(row);

// zz = [...row];

// console.log(zz)

// let numbers = [1, 2, 3];
// let numbersCopy = [];

// for (i = 0; i < 5; i++) {  
//     numbersCopy[i] = [...numbers];
// }

// numbersCopy[0].pop();
// numbersCopy[2].pop();
// numbersCopy[2].push(4,5);

// console.log(numbersCopy);