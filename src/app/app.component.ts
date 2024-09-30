import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let key = parseInt(event.key);
    if (
      this.activeCol != null &&
      this.activeRow != null &&
      key >= 1 &&
      key <= 9 &&
      this.isValid(this.sudoku, this.activeRow, this.activeCol, key)
    ) {
      this.sudoku[this.activeRow][this.activeCol] = key;
      this.activeRow = null;
      this.activeCol = null;
    }
  }
  activeRow: number | null = null;
  activeCol: number | null = null;
  sudoku: (number | null)[][] = [];

  activate(row: number, col: number) {
    this.activeRow = row;
    this.activeCol = col;
    console.log(row, col, this.sudoku[row][col]);
  }

  fill() {
    this.sudoku = [
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
  }

  isValid(
    sudoku: (number | null)[][],
    row: number,
    col: number,
    value: number
  ): boolean {
    for (let i = 0; i < 9; i++) {
      const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const n = 3 * Math.floor(col / 3) + (i % 3);
      if (
        sudoku[row][i] == value ||
        sudoku[i][col] == value ||
        sudoku[m][n] == value
      ) {
        return false;
      }
    }
    return true;
  }

  solve(sudoku: (number | null)[][], row: number, column: number): boolean {
    if (row == 9) {
      return true;
    } else if (column == 9) {
      return this.solve(sudoku, row + 1, 0);
    } else if (sudoku[row][column] != null)
      return this.solve(sudoku, row, column + 1);
    else {
      for (let i = 1; i < 10; i++) {
        if (this.isValid(sudoku, row, column, i)) {
          sudoku[row][column] = i;
          if (this.solve(sudoku, row, column + 1)) {
            return true;
          } else {
            sudoku[row][column] = null;
          }
        }
      }
      return false;
    }
  }

  constructor() {
    this.sudoku = [
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
    ];
  }
}
