function createPlayer (name) {
  let points = 0;

  const addPoint = () => { points++ }
  const getPoint = () => { return points }

  return { name, addPoint, getPoint }
}

const board = (() => {
  // 1. store the gameboard as an array inside of a Gameboard object
  const gameBoard = {
      board: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] 
  }
  
  const displayBoard = () => {
    for ( let row of gameBoard.board ) {
      const rowString = row.join(' ');
      console.log(rowString);
    } 
  }

  const changeBoard = (row, column, change) => {
    //check if cell has been changed
    const cellToChange = gameBoard.board[row][column]
    if (typeof cellToChange == 'string') {
      console.log(`this is already marked. its ${cellToChange}.`)
      return;
    }

    gameBoard.board[row][column] = change

    displayBoard()
  }

  return { displayBoard, changeBoard }
})();

// 2. your players are stored in objects.
const players = {
  player1: createPlayer("Joe"),
  player2: createPlayer("Mama")
}

// 3. probably want an object to control the flow of the game.
const gameFlow = {

}