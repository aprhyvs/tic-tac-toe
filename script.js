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
    function winByRows(array) {
      if (array.every((element) => element === null)){
        console.log(false)
        return;
      }

      return array.every((element) => element === array[0])
    }

    if (
      winByRows(gameBoard[0]) || 
      winByRows(gameBoard[1]) || 
      winByRows(gameBoard[2])
    ) {
      console.log("you win by rows!")
    }
  }

  const displayBoard = () => {
    for ( let row of gameBoard) {
      console.log(row);
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
