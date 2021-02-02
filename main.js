const gameboard = document.querySelector(".gameboard");
const colInput = document.querySelector(".colInput");
const rowInput = document.querySelector(".rowInput");
const submitButton = document.querySelector(".submitButton");

let minefield = [];

let rows = 5;
let cols = 5;

const userPicks = (e) => {
  e.preventDefault();
  // set cols variable
  // set rows variable
  // creates new minefield based on these values
  // minesweaper gets made, replacing the old one
  cols = colInput.value;
  rows = rowInput.value;
  createMinefield(cols, rows);
  minesweaper(minefield);
};

const createMinefield = (cols, rows) => {
  minefield = [];
  console.log(cols, rows);
  const possibleCells = ["*", ""];
  for (let i = 0; i < rows; i++) {
    minefield.push([
      possibleCells[Math.floor(Math.random() * possibleCells.length)],
    ]);
    // console.log(minefield);
    for (let k = 0; k < cols - 1; k++) {
      minefield[i].push(
        possibleCells[Math.floor(Math.random() * possibleCells.length)]
      );
    }
  }
};

createMinefield(cols, rows);

const minesweaper = (minefield) => {
  gameboard.innerHTML = "";
  const getCellInfo = (row, col) => {
    if (row < 0 || col < 0) return 0;
    if (row >= minefield.length) return 0;
    if (col >= minefield[row].length) return 0;

    if (minefield[row][col] === "*") {
      return 1;
    } else {
      return 0;
    }
  };

  for (let row = 0; row < minefield.length; row++) {
    let line = "";
    for (let col = 0; col < minefield[row].length; col++) {
      if (getCellInfo(row, col) === 1) {
        line += "*";
      } else {
        let mines = 0;

        // Top left, Top, Top right
        mines += getCellInfo(row - 1, col - 1);
        mines += getCellInfo(row - 1, col);
        mines += getCellInfo(row - 1, col + 1);

        // left, right
        mines += getCellInfo(row, col - 1);
        mines += getCellInfo(row, col + 1);

        // bot left, bot, bot right
        mines += getCellInfo(row + 1, col - 1);
        mines += getCellInfo(row + 1, col);
        mines += getCellInfo(row + 1, col + 1);

        line += mines;
      }
    }
    const element = document.createElement("p");
    element.innerText = line;
    gameboard.appendChild(element);
  }
};

minesweaper(minefield);

submitButton.addEventListener("click", userPicks);

// location.reload();
