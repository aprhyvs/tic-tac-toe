function createPlayer (name) {
  let points = 0;

  const addPoint = () => { points++ }
  const getPoint = () => { return points }

  return { name, addPoint, getPoint }
}

const players = {
  player1: createPlayer("Joe"),
  player2: createPlayer("Mama")
}

players.player1.points = 69 // points is a private variable.
console.log(players.player1)
console.log(players.player1.getPoint())
console.log(players.player1.points)

const gameFlow = {

}

// 2. store the gameboard as an array inside of a Gameboard object
/*
  const gameBoard = {
    board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
  }
*/

const board = (() => {
  const gameBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

  const displayController = () => { 
    for ( let row of gameBoard ) {
      const rowString = row.join(' ');
      console.log(rowString);
    }
  }

  return { displayController }
})();