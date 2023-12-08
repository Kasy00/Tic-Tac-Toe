//Player factory
const Player = (sign) => {
    const getSign = () => sign;

    return { getSign };
}

const setSign = (e) => {
    const cell = e.target;
    cell.innerHTML = "X";
}

//Gameboard factory
const Gameboard = () => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const cells = document.querySelectorAll('[data-cell]');
    cells.forEach(cell => {
        cell.addEventListener("click", setSign);
    });

    const playerX = Player('X');
    const playerY = Player('O');
    let activePlayer = playerX;

    return { board, cells }; 
}

const gameboard = Gameboard();


