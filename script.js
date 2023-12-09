//Player factory
const Player = (sign) => {
    const getSign = () => sign;

    return { getSign };
};

const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const cells = document.querySelectorAll('[data-cell]');

    cells.forEach((cell, index) =>{
        cell.addEventListener("click", (e) => {
            GameController.makeMove(index);
        });
    });

    const updateBoard = () => {
        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });    
    };

    const setSign = ((index, sign) => {
        board[index] = sign;

        updateBoard();
    });

    const resetBoard = () => {
        board.fill('');
        updateBoard();
    };
    
    return { board, cells, updateBoard, resetBoard, setSign }; 
})();

const GameController = (() => {
    Gameboard.updateBoard();
    const playerX = Player("X");
    const playerY = Player("O");
    let currentPlayer = playerX;

    const makeMove = (index) => {
        Gameboard.setSign(index, currentPlayer.getSign());
        currentPlayer = (currentPlayer === playerX) ? playerY : playerX;
    }



    return { makeMove };
})();


