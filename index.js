let sudoku = [
    [null, 2, null, 3, 4, null, null, null, 1],
    [8, 5, null, null, 2, null, null, 4, null],
    [null, null, 3, null, null, 1, 2, 5, 6],
    
    [null, null, null, null, 3, null, 7, 6, null],
    [null, null, 4, 1, 6, null, 5, 9, null],
    [6, 8, null, 4, null, null, null, null, null],
    
    [5, null, 8, null, null, 3, null, null, null],
    [1, 9, 7, 2, 5, 4, null, null, null],
    [null, 4, 2, null, null, 7, 9, 1, null],
];

function isValid(sudoku, row, col, value) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (sudoku[row][i] == value || sudoku[i][col] == value || sudoku[m][n] == value) {
          return false;
        }
    }
    return true;
}

function solve(sudoku, row, column){
    if(row == 9){
        console.log(sudoku.map(row => row.join()))
        return true;
    }
    else if(column == 9){
        return solve(sudoku, row+1, 0);
    }
    else if(sudoku[row][column] != null)
        return solve(sudoku, row, column+1);
    else{
        for(let i = 1; i < 10; i++){
            if(isValid(sudoku, row, column, i)){
                sudoku[row][column] = i; 
                if(solve(sudoku, row, column+1)){
                    return true;
                } else{
                    sudoku[row][column] = null;
                }
            }
        }
        return false;
    }
}

solve(sudoku, 0, 0);