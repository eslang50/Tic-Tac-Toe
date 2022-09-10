const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const fill = (index, move) => {
    if(index > board.length) return;
    board[index] = move;
  }

  const getField = (index) => {
    if(index > board.length) return;
    return board[index];
  }

  const reset = () => {
    for(let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  }

  return { fill, reset, getField}

})();

const player = (move) => {
  this.move = move;

  const getMove = () => {
    return move;
  }

  return { getMove };
}

const displayController = (() => {
  const elements = document.querySelectorAll(".field");
  const button = document.getElementById("restart");
  const msg = document.getElementById("message");

  elements.forEach((field) => 
  field.addEventListener("click", (e) => {
    if( gameController.getIsOver() || e.target.textContent !== "") return;
    gameController.playRound(parseInt(e.target.dataset.index));
    console.log(e.target.dataset.index);
    fillBoard();
  }));

  button.addEventListener("click", (e) => {
    gameBoard.reset();
    gameController.reset();
    fillBoard();
    message("Player X's turn")
  })

  const fillBoard = () => {
    for(let i = 0; i < elements.length; i++) {
      elements[i].textContent = gameBoard.getField(i);
      
    }
  }

  const message = (message) => {
    msg.textContent = message;
  }

  const resultMsg = (winner) => {
    if(winner == "Draw")
      msg.textContent = "It's a draw!"
    else {
      msg.textContent = `${winner} is the winner!`
    }
  }

  return { message, resultMsg}

})();

const gameController = (() => {
  const player1 = player("X");
  const player2 = player("O");
  let round = 1;
  let isOver = false;

  const playRound = (index) => {
    gameBoard.fill(index, getCurrentMove());
    if(winCon(index)) {
      displayController.resultMsg(getCurrentMove());
      isOver = true;
      return;
    }
    if(round === 9) {
      displayController.resultMsg("Draw")
      isOver = true;
      return;
    }
    round++;
    displayController.message(`Player ${getCurrentMove()}'s turn`);
    
  };

  const getCurrentMove = () => {
    return round % 2 == 1 ? player1.getMove() : player2.getMove();
  };

  const winCon = (index) => {
    const conditions = [
      [0,1,2],
      [0,4,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [3,4,5],
      [6,7,8],
      [2,4,6],
    ]
  

  return conditions
    .filter((combination) => combination.includes(index))
    .some((possibleCombination) =>
      possibleCombination.every(
        (index) => gameBoard.getField(index) == getCurrentMove() 
      )
    );
    
  };

  const getIsOver = () => {
    return isOver;
  }

  const reset = () => {
    round = 1;
    isOver = false
  };

  return { playRound, getIsOver, reset }

})();