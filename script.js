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
                winningMessageText.innerText = `${GameController.currentPlayer === GameController.playerX ? "X's" : "O's"} Wins!`;

                winningMessage.classList.add('show');
            }
            
            updateBoard();
        }
        else return;
    });

    const resetBoard = () => {
        console.log('jestem');
        board.fill('');
        updateBoard();
        winningMessage.classList.remove('show');
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
        currentPlayer = (currentPlayer === playerX) ? playerY : playerX;
        changeTurn();
    };

    const changeTurn = () => {
        currentPlayer === playerX ? changeTurnDisplay.textContent = "X's turn!" : changeTurnDisplay.textContent = "O's turn!";
    }

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

    restartBtns.forEach(button =>{
        button.addEventListener("click", Gameboard.resetBoard);
    });



    return { makeMove, checkForWinner};
})();


