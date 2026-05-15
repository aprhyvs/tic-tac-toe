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

  // probably wrap in a function soon, 
  // so it can be initialized for next games
  const playerTurn = document.getElementById("player-turn");
  const startGameBtn = document.getElementById("start-game");

  let mark;
  let turn;

  function returnMark() {
    if (turn == "player1") {
      mark = "X"
      return mark 
    }

    if (turn == "player2") {
      mark = "O"
      return mark 
    }
  } 

  function startGame() {
    const cells = document.querySelectorAll('.cell');
    mark = "O";
    turn = "player1"

    cells.forEach((element) => {
      element.dataset.marked = "false"
      element.textContent 
    })

    if (playerTurn.textContent) {
      console.log('new game, clear the board')

      // initial clear idea
      for (let row = 0, column = 0; row < 3; row++) {
        gameBoard[row].fill(null, 0);
      }
    }

    playerTurn.textContent = "player1"    
    cells.forEach((element) => element.addEventListener("click", () => {
      if (element.dataset.marked == "true") {
        console.warn(`element is marked, it's ${element.textContent}.`)
        console.log(element)
        return;
      } else {
        element.dataset.marked = "true"
        changeBoard(element.dataset.row, element.dataset.column, returnMark())
      }
    }));
  }

  const displayBoard = () => { 
    const cells = document.querySelectorAll('.cell');
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
  }

  startGameBtn.addEventListener("click", () => {
    const gameBoardEl = document.getElementById('game-board');
    const cells = document.querySelectorAll('.cell');

    // remove old gameBoard cells
    if (cells.length > 0) {
      cells.forEach(element => element.remove())
    }

    // create new gameBoard cells
    for (let i = 0, row = 0, column = 0; i < 9; i++, column++) {
      if (column > 2) {
        row++
        column = 0
      }
      const newCell = document.createElement("div")
      newCell.classList.add('cell')
      newCell.setAttribute('data-row', row)
      newCell.setAttribute('data-column', column)
      newCell.setAttribute('data-marked', false)
      gameBoardEl.appendChild(newCell)
    }

    startGame()
    displayBoard()
  });

  function changeTurn() {
    if (turn == "player1") {
      turn = "player2"
      return "player2"
    } 

    if (turn == "player2") {
      turn = "player1"
      return "player1"
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

      gameBoard[row][column] = change

      displayBoard();
      checkWinCondition();
      playerTurn.textContent = changeTurn()
      console.log(turn)

    } catch (error) {
      console.error(error)
      return;
    }
  }

  return { gameBoard, displayBoard, changeBoard, startGame }
})();

// 2. your players are stored in objects.
const players = {
  player1: createPlayer("Joe"),
  player2: createPlayer("Mama")
}

// 3. probably want an object to control the flow of the game.
const gameFlow = {

}
