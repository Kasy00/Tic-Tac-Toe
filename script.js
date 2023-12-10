//Player factory
const Player = (sign) => {
    const getSign = () => sign;

    return { getSign };
};

const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const cells = document.querySelectorAll('[data-cell]');
    const winningMessageText = document.querySelector('[data-win-message-text]')
    const winningMessage = document.querySelector('.win-message');

    cells.forEach((cell, index) =>{
        cell.addEventListener("click", () => {
            GameController.makeMove(index);
        }, { once: true });
    });

    const updateBoard = () => {
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    const setSign = ((index, sign) => {
        if(board[index] === ''){
            board[index] = sign;
            if(GameController.checkForWinner(board)){
                winningMessageText.innerText = `${sign === "X" ? "X's" : "O's"} Wins!`;
                updateBoard();
                winningMessage.classList.add('show');
  
            }
            else if(board.every(cell => cell !== '')){
                winningMessageText.innerText = `Draw!`;
                updateBoard();
                winningMessage.classList.add('show');
            }
            else{
                GameController.changeTurn();
                updateBoard();
            }       
        }


    });

    const resetBoard = () => {
        board.fill('');
        updateBoard();
        winningMessage.classList.remove('show');
        cells.forEach((cell, index) => {
            cell.removeEventListener("click", () => {
                GameController.makeMove(index);
            });
        });
        cells.forEach((cell, index) =>{
            cell.addEventListener("click", () => {
                GameController.makeMove(index);
            }, { once: true });
        });
    };
    
    return { board, cells, updateBoard, resetBoard, setSign }; 
})();

const GameController = (() => {
    const changeTurnDisplay = document.getElementById('change-turn');
    const restartBtns = document.querySelectorAll('.restart-button');

    Gameboard.updateBoard();
    const playerX = Player("X");
    const playerY = Player("O");
    let currentPlayer = playerX;

    changeTurnDisplay.textContent = "X's turn!"
    const makeMove = (index) => {
        Gameboard.setSign(index, currentPlayer.getSign());
        Gameboard.updateBoard();
    };

    const checkForWinner = (board) => {
        const WINNING_COMBINATIONS = 
        [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => board[index] === currentPlayer.getSign())
        });
    };

    const changeTurn = () => {
        currentPlayer = (currentPlayer === playerX) ? playerY : playerX;
        currentPlayer === playerX ? changeTurnDisplay.textContent = "X's turn!" : changeTurnDisplay.textContent = "O's turn!";
    }

    restartBtns.forEach(button =>{
        button.addEventListener("click", (e) => {
            Gameboard.resetBoard();
            currentPlayer = playerX;
            changeTurnDisplay.textContent = "X's turn!";
        });
    });



    return { makeMove, checkForWinner, changeTurn, currentPlayer};
})();


