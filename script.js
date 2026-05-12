function createPlayer (name) {
  let points = 0;

  const addPoint = () => { points++ }
  const getPoint = () => { return points }

  return { name, addPoint, getPoint }
}

const board = (() => {
  // 1. store the gameboard as an array inside of a Gameboard object
  const gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
    // ['X','O','X'],
    // ['O','O','X'],
    // ['O','X','O']
  ]

  const checkWinCondition = () => {
    // if player wins by rows
    function checkIfEqualRows(array) {
      if (array.every((element) => element === null)){
        return false;
      }

      return array.every((element) => element === array[0])
    }

    if (
      checkIfEqualRows(gameBoard[0]) || 
      checkIfEqualRows(gameBoard[1]) || 
      checkIfEqualRows(gameBoard[2])
    ) {
      console.log("you win by rows!")
    }

    // if player wins by columns
    function checkIfEqualColumns(array, i, j, column) {
      if (array[i][column] === null || array[j][column] === null || array[2][column] === null) {
        console.log("column isn't complete. check the other column")
        return;
      } 
      
      if (array[i][column] === array[j][column]) {
        console.log(`${array[i][column]} and ${array[j][column]}`)
        console.log("true")
        j++
        if (array[i][column] === array[j][column]){
          console.log(`${array[i][column]} and ${array[j][column]}`)
          console.log("true, all columns check. win")
          return true
        } else {
          console.log(`${array[i][column]} and ${array[j][column]}`)
          console.log("first check was true, but second is false, check next column")
          return false
        }   
      } else {
        console.log(`${array[i][column]} and ${array[j][column]} = false, check next column`)
        return false
      }
    }

    if (
      checkIfEqualColumns(gameBoard, 0, 1, 0) || 
      checkIfEqualColumns(gameBoard, 0, 1, 1) || 
      checkIfEqualColumns(gameBoard, 0, 1, 2)
    ) {
      console.log("you win by columns!")
    }

    // if player wins by diagonal 
    function checkIfEqualDiagonals(array) {
      if (array[1][1] === null) {
        return false;
      } 

      if (array[0][0] === array[1][1] && array[2][2] === array[1][1]) {
        return true
      }

      if (array[0][2] === array[1][1] && array[2][0] === array[1][1]) {
        return true
      }

      return false
    }

    if (checkIfEqualDiagonals(gameBoard)) {
      console.log("you win by diagonals")
    }

    // helper to check if board is full 
    function checkFull(array){
      if (array.every((element) => typeof element === 'string')){
        return true;
      } else {
        return false;
      }
    }

    function checkForDraw(){
      if ((!checkIfEqualRows(gameBoard[0]) && checkFull(gameBoard[0])) &&
          (!checkIfEqualRows(gameBoard[1]) && checkFull(gameBoard[1])) &&
          (!checkIfEqualRows(gameBoard[2]) && checkFull(gameBoard[2]))
          ) {
        return true;
      }
    }

    if (checkForDraw()) {
      console.log("it's a draw.");
    }
  }

  const changeCell = () => {
    
  }

  const displayBoard = () => {
    const cells = document.querySelectorAll('.cell')
    
    let mark = "O"
    function returnMark() {
      if (mark == "O") {
        mark = "X"
        return "X"
      }

      if (mark == "X") {
        mark = "O"
        return "O"
      }
    } 

    for ( let row of gameBoard) {
      console.log(row);
    } 

    for (let i = 0, row = 0, column = 0; i < 9; i++, column++) {
      if (column > 2) {
        row++
        column = 0
      }
      cells[i].textContent = gameBoard[row][column]
    }

    // probably use two data attributes so i can properly use changeBoard()
    // and a function something that toggles between "X" and "O".
    cells.forEach((element) => element.addEventListener("click", () => {
      changeBoard(element.dataset.row, element.dataset.column, returnMark())
    }));
  }

  const changeBoard = (row, column, change) => {
    try {

      if (row >= 3) {
        throw new ReferenceError("That's outside the bounds of row!")
      } 
      
      if (column >= 3) {
        throw new ReferenceError("That's outside the bounds of column!")
      }

      const cellToChange = gameBoard[row][column]
      if (typeof cellToChange == 'string') {
        console.warn(`this is already marked. its ${cellToChange}.`)
        return;
      }

      gameBoard[row][column] = change
    } catch (error) {
      console.error(error)
      return;
    } finally {
      displayBoard();
      checkWinCondition();
    }
  }

  return { gameBoard, displayBoard, changeBoard, }
})();

// 2. your players are stored in objects.
const players = {
  player1: createPlayer("Joe"),
  player2: createPlayer("Mama")
}

// 3. probably want an object to control the flow of the game.
const gameFlow = {

}

// Focus on getting a working game in the console first.
board.displayBoard()
