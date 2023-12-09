//Player factory
const Player = (sign) => {
    const getSign = () => sign;

    return { getSign };
};

//Gameboard factory
const Gameboard = () => {
    const board = ['', '', '', '', '', '', '', '', ''];
    const cells = document.querySelectorAll('[data-cell');

    const updateBoard = () => {
        cells.forEach((cell, index) => {
            cell.addEventListener("click", setSign(index));
        });    
    };

    const resetBoard = () => {
        board.fill('');
        updateBoard();
    };
    
    return { board, cells, updateBoard, resetBoard }; 
};

const gameboard = Gameboard();


//Game factory
const GameController = () => {
    const playerX = Player("X");
    const playerY = Player("O");
    let currentPlayer = playerX;
}

