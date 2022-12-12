class SudokuSolver {
  validate(puzzleString) {
    return !/[^1-9.]/g.test(puzzleString) && puzzleString.length == 81;
  }
  charToNum(char) {
    let validChar = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9 };
    return validChar[char.toUpperCase()];
  }
  checkRowPlacement(puzzleString, row, column, value) {
    let grid = this.stringToGrid(puzzleString);
    row = this.charToNum(row);
    if (grid[row - 1][column - 1] == value) {
      return true;
    }
    if (grid[row - 1][column - 1] !== 0) {
      return false;
    }
    for (let i = 0; i < 9; i++) {
      if (grid[row - 1][i] == value) {
        return false;
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let grid = this.stringToGrid(puzzleString);
    row = this.charToNum(row);
    if (grid[row - 1][column - 1] == value) {
      return true;
    }
    if (grid[row - 1][column - 1] !== 0) {
      return false;
    }
    for (let i = 0; i < 9; i++) {
      if (grid[i][column - 1] == value) {
        return false;
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, col, value) {
    let grid = this.stringToGrid(puzzleString);
    row = this.charToNum(row);
    if (grid[row - 1][col - 1] == value) {
      return true;
    }
    if (grid[row - 1][col - 1] !== 0) {
      return false;
    }
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[startRow + i][startCol + j] == value) {
          return false;
        }
      }
    }
    return true;
  }

  solveSuduko(grid, row, col) {
    if (row == 9 - 1 && col == 9) return grid;

    if (col == 9) {
      row++;
      col = 0;
    }

    if (grid[row][col] != 0) {
      return this.solveSuduko(grid, row, col + 1);
    }

    for (let num = 1; num < 10; num++) {
      if (this.isSafe(grid, row, col, num)) {
        grid[row][col] = num;

        if (this.solveSuduko(grid, row, col + 1)) return grid;
      }

      grid[row][col] = 0;
    }

    return false;
  }

  isSafe(grid, row, col, num) {
    for (let x = 0; x <= 8; x++) {
      if (grid[row][x] == num) return false;
    }
    for (let x = 0; x <= 8; x++) {
      if (grid[x][col] == num) return false;
    }
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[startRow + i][startCol + j] == num) {
          return false;
        }
      }
    }
    return true;
  }

  stringToGrid(puzzleString) {
    let grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    let row = -1;
    let col = 0;
    for (let i = 0; i < puzzleString.length; i++) {
      row = Math.floor(i / 9);
      col = i % 9;
      grid[row][col] = puzzleString[i] === "." ? 0 : +puzzleString[i];
    }
    return grid;
  }

  gridToString(grid) {
    return grid.flat().join("");
  }

  solve(puzzleString) {
    if (!this.validate(puzzleString)) {
      return false;
    }
    let grid = this.stringToGrid(puzzleString);
    let solved = this.solveSuduko(grid, 0, 0);
    if (!solved) {
      return false;
    }
    let solution = this.gridToString(solved);
    return solution;
  }
}

module.exports = SudokuSolver;
