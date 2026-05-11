function createPlayer (name) {
  let points = 0;

  const addPoint = () => { points++ }
  const getPoint = () => { return points }

  return { name, addPoint, getPoint }
}

const board = (() => {
  // 1. store the gameboard as an array inside of a Gameboard object
  const gameBoard = [
    // [null, null, null],
    // [null, null, null],
    // [null, null, null]
    ['X','O','X'],
    ['O','O','X'],
    ['O','X','O']
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
      if ((!winByRows(gameBoard[0]) && checkFull(gameBoard[0])) &&
          (!winByRows(gameBoard[1]) && checkFull(gameBoard[1])) &&
          (!winByRows(gameBoard[2]) && checkFull(gameBoard[2]))
          ) {
        return true;
      }
    }

    if (checkForDraw()) {
      console.log("it's a draw.");
    }
  }

  const displayBoard = () => {
    const cells = document.querySelectorAll('.cell')
    for ( let row of gameBoard) {
      console.log(row);
    } 

    for (let i = 0, j = 0, k = 0; i < 9; i++, k++) {
      if (k > 2) {
        j++
        k = 0
      }
      cells[i].textContent = gameBoard[j][k]
    }
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
