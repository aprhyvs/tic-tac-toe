function createPlayer (name) {
  let points = 0;

  const addPoint = () => { 
    points++ 
  }

  const getPoint = () => { return points }

  const resetPoint = () => { points = 0 }

  return { name, addPoint, getPoint, resetPoint }
}

const board = (() => {
  // 1. store the gameboard as an array inside of a Gameboard object
  const gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]

  function getGameBoard(){
    return gameBoard
  }

  const changeCell = (row, column, change) => {
    try {

      if (row >= 3) {
        throw new ReferenceError("That's outside the bounds of row!")
      } 
      
      if (column >= 3) {
        throw new ReferenceError("That's outside the bounds of column!")
      }

      gameBoard[row][column] = change

      displayController.displayBoard();
      gameFlow.checkWinCondition();
      gameFlow.checkDrawCondition();

      displayController.playerTurn.textContent = gameFlow.changeTurn()
    } catch (error) {
      console.error(error)
      return;
    }
  }

  return { getGameBoard, changeCell }
})();

// 3. probably want an object to control the flow of the game.
const gameFlow = (() => {
  // 2. your players are stored in objects.
  const players = {
    player1: createPlayer("Onest"),
    player2: createPlayer("Twond")
  }

  function createNewPlayers(player1Name, player2Name) {
    players.player1 = createPlayer(player1Name)
    players.player2 = createPlayer(player2Name)
  }

  function getPlayerPoint(player) {
    if (player == "player1") {
      return players.player1.getPoint();
    } else if (player == "player2") {
      return players.player2.getPoint();
    } else {
      console.error(`use only player1 or player2 as arguments.`)
    }
  }

  let player1Name;
  let player2Name;

  let mark;
  let turn;

  function setPlayerNames() {
    //player 1 header textcontent
    player1Name = players.player1.name 
    displayController.player1NameEl.textContent = player1Name

    //player 2 header textcontent
    player2Name = players.player2.name 
    displayController.player2NameEl.textContent = player2Name
  }

  function startGame() {
    setPlayerNames();
    const cells = document.querySelectorAll('.cell');
    playerWinnerEl.textContent = ""
    turn = player1Name

    displayController.playerTurn.textContent = player1Name

    cells.forEach((element) => element.addEventListener("click", () => {
      if (element.dataset.marked == "true") {
        console.warn(`element is marked, it's ${element.textContent}.`)
        console.log(element)
        return;
      } else {
        element.dataset.marked = "true"
        board.changeCell(element.dataset.row, element.dataset.column, gameFlow.returnMark())
      }
    }));
  }

  function changeTurn() {
    if (turn == player1Name) {
      turn = player2Name
      return player2Name
    } 

    if (turn == player2Name) {
      turn = player1Name
      return player1Name
    }
  }

  function returnMark() {
    if (turn == player1Name) {
      mark = "X"
      return mark 
    }

    if (turn == player2Name) {
      mark = "O"
      return mark 
    }
  } 

  function checkIfEqualRows(array) {
    if (array.every((element) => element === null)){
      return false;
    }

    if (array.every((element) => element === array[0])) {
      return array[0]
    } else {
      return false;
    }
  }

  function checkIfEqualColumn(array, i, j, column) {
    if (array[i][column] === null || array[j][column] === null || array[2][column] === null) {
      return false;
    } 
    
    if (array[i][column] === array[j][column]) {
      j++
      if (array[i][column] === array[j][column]){
        return array[i][column]
      } else {
        return false
      }   
    } else {
      return false
    }
  }

  function checkIfEqualDiagonals(array) {
    if (array[1][1] === null) {
      return false;
    } 

    if (array[0][0] === array[1][1] && array[2][2] === array[1][1]) {
      return array[1][1]
    }

    if (array[0][2] === array[1][1] && array[2][0] === array[1][1]) {
      return array[1][1]
    }

    return false
  }

  function checkFull(array){
    if (array.every((element) => typeof element === 'string')){
      return true;
    } else {
      return false;
    }
  }

  function disableButtons() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((element) => element.disabled = true);
  }

  const playerWinnerEl = document.getElementById("player-winner");
  function checkWinCondition() {
    const currentBoard = board.getGameBoard()

    // check if one of the rows are equal
    if (
      checkIfEqualRows(currentBoard[0]) ||
      checkIfEqualRows(currentBoard[1]) || 
      checkIfEqualRows(currentBoard[2])
    ) {
      // loop through currentBoard to identify who won
      function thePlayerWonByRows() {
        let i = 0;
        do {
          if (!checkIfEqualRows(currentBoard[i])) {
            i += 1;
          } else {
            return checkIfEqualRows(currentBoard[i])
          }
        } while (!checkIfEqualRows(currentBoard[i]))
      }

      if (thePlayerWonByRows() === 'X') {
        players.player1.addPoint()
        displayController.player1ScoreEl.textContent = players.player1.getPoint()
        playerWinnerEl.textContent = `${players.player1.name} is the winner`
      } else {
        players.player2.addPoint()
        displayController.player2ScoreEl.textContent = players.player2.getPoint()
        playerWinnerEl.textContent = `${players.player2.name} is the winner`
      }

      disableButtons()
 
      return true
    }

    if (
      checkIfEqualColumn(currentBoard, 0, 1, 0) || 
      checkIfEqualColumn(currentBoard, 0, 1, 1) || 
      checkIfEqualColumn(currentBoard, 0, 1, 2)
    ) {
      function thePlayerWonByColumns() {
        let i = 0;
        console.log(i)
        do {
          if (!checkIfEqualColumn(currentBoard, 0, 1, i)) {
            i++;
            console.log(i)
          } 

          if (checkIfEqualColumn(currentBoard, 0, 1, i) === 'X' ||
              checkIfEqualColumn(currentBoard, 0, 1, i) === 'O') {
            return checkIfEqualColumn(currentBoard, 0, 1, i)
          }
        } while (!checkIfEqualColumn(currentBoard, 0, 1, i))
      }

      if (thePlayerWonByColumns() === 'X') {
        players.player1.addPoint()
        displayController.player1ScoreEl.textContent = players.player1.getPoint()
        playerWinnerEl.textContent = `${players.player1.name} is the winner`
      } else if (thePlayerWonByColumns() === 'O') {
        players.player2.addPoint()
        displayController.player2ScoreEl.textContent = players.player2.getPoint()
        playerWinnerEl.textContent = `${players.player2.name} is the winner`
      }

      disableButtons()

      return true
    }

    if (checkIfEqualDiagonals(currentBoard)) {
      const thePlayerWonByDiagonals = checkIfEqualDiagonals(currentBoard)

      if ( thePlayerWonByDiagonals == 'X') {
        players.player1.addPoint()
        displayController.player1ScoreEl.textContent = players.player1.getPoint()
        playerWinnerEl.textContent = `${players.player1.name} is the winner`
      } else {
        players.player2.addPoint()
        displayController.player2ScoreEl.textContent = players.player2.getPoint()
        playerWinnerEl.textContent = `${players.player2.name} is the winner`
      }

      disableButtons()

      return true
    }

    return false
  }

  function checkDrawCondition() {
    const currentBoard = board.getGameBoard()
    if (checkFull(currentBoard[0]) && checkFull(currentBoard[1]) && checkFull(currentBoard[2])) {
      if (
        !checkIfEqualRows(currentBoard[0]) &&
        !checkIfEqualRows(currentBoard[1]) &&
        !checkIfEqualRows(currentBoard[2]) &&
        !checkIfEqualColumn(currentBoard, 0, 1, 0) &&
        !checkIfEqualColumn(currentBoard, 0, 1, 1) &&
        !checkIfEqualColumn(currentBoard, 0, 1, 2) &&
        !checkIfEqualDiagonals(currentBoard)
      ) {
        console.log("it's a draw.")
        playerWinnerEl.textContent = `it's a draw!`
        disableButtons()
      }
    }
  }

  return { checkWinCondition, checkDrawCondition, startGame, returnMark, changeTurn, setPlayerNames, getPlayerPoint, createNewPlayers }
})();

const displayController = (() => {
  // probably wrap in a function soon, 
  // so it can be initialized for next games
  const playerTurn = document.getElementById("player-turn");
  const startGameBtn = document.getElementById("start-game");

  //player 1 header textcontent
  const player1NameEl = document.getElementById("player1-name");
  const player1ScoreEl = document.getElementById("player1-score");
  player1ScoreEl.textContent = gameFlow.getPlayerPoint("player1")

  //player 2 header textcontent
  const player2NameEl = document.getElementById("player2-name");
  const player2ScoreEl = document.getElementById("player2-score");
  player2ScoreEl.textContent = gameFlow.getPlayerPoint("player2")

  // creates the tic-tac-toe board
  function renderBoard() {
    startGameBtn.textContent = "Restart Game";
    const gameBoardEl = document.getElementById('game-board');
    const oldGameBoardCells = document.querySelectorAll('.cell');

    if (oldGameBoardCells.length > 0) {
      oldGameBoardCells.forEach(element => element.remove())
    }

    // clear the gameBoard array
    for (let row = 0, column = 0; row < 3; row++) {
      board.getGameBoard()[row].fill(null, 0);
    }

    // create new gameBoard cells
    for (let i = 0, row = 0, column = 0; i < 9; i++, column++) {
      if (column > 2) {
        row++
        column = 0
      }
      const newCell = document.createElement("button")
      newCell.classList.add('cell')
      newCell.setAttribute('data-row', row)
      newCell.setAttribute('data-column', column)
      newCell.setAttribute('data-marked', false)
      gameBoardEl.appendChild(newCell)
    }
  }

  // displays what the content of each cell are
  const displayBoard = () => { 
    const cells = document.querySelectorAll('.cell');
    for ( let row of board.getGameBoard()) {
      console.log(row);
    } 

    for (let i = 0, row = 0, column = 0; i < 9; i++, column++) {
      if (column > 2) {
        row++
        column = 0
      }
      cells[i].textContent = board.getGameBoard()[row][column]
    }
  }

  function initDOMBoard() {
    renderBoard();
    gameFlow.startGame();
    displayController.displayBoard();
  }

  startGameBtn.addEventListener("click", initDOMBoard);

  return { displayBoard, renderBoard, initDOMBoard, playerTurn, player1NameEl, player1ScoreEl, player2NameEl, player2ScoreEl }
})();

const changeNameForm = (() => {
  // open form for changeName
  const changeNameModal = document.getElementById('add-name-modal');
  const openChangeNameModalBtn = document.getElementById('open-change-name');

  openChangeNameModalBtn.addEventListener("click", () => {
    changeNameModal.showModal()
  });

  const closeChangeNameModalBtn = document.getElementById('close-modal')
  closeChangeNameModalBtn.addEventListener("click", () => {
    changeNameModal.close()
  });

  // changeName form handling
  const changeNameForm = document.getElementById('name-form');

  changeNameForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const player1NameInput = document.querySelector('[name="player1"]').value
    const player2NameInput = document.querySelector('[name="player2"]').value

    gameFlow.createNewPlayers(player1NameInput, player2NameInput)

    displayController.player1ScoreEl.textContent = gameFlow.getPlayerPoint("player1")
    displayController.player2ScoreEl.textContent = gameFlow.getPlayerPoint("player2")

    gameFlow.setPlayerNames()

    changeNameModal.close();

    displayController.initDOMBoard()
  });
})();