// JavaScript logic for tic-tac-toe game
const cells = document.querySelectorAll('.cell');
const winner = document.getElementById('winner');
const name = document.getElementById('h2').children;
const reset = document.getElementById('reset');
const back = document.getElementById('back');
const winLine = document.getElementById('winLine');
const getcell = document.getElementById('getcell');
const getValue = new URLSearchParams(window.location.search);
import { generateMove } from './cpu.js';
//////////////////////////////////////////
let draws = 0;
let index;
let whichPlayer = true;
let gameState = false;
export let withPlayer = getValue.get('value');
export let emptyCells = [];
let lineColor;
let box;
let backColor;

(function() {
    if (withPlayer=='false') {
    name[0].innerHTML = 'Player';
    name[1].innerHTML = 'Cpu';
    } else {
        name[0].innerHTML = 'Player_1';
        name[1].innerHTML = 'Player_2';
    }
    highlightCurrentPlayer();
})();

function highlightCurrentPlayer() {
    if (whichPlayer) {
        name[0].id = 'current';
        name[1].id = 'notCurrent';
    } else {
        name[1].id = 'current';
        name[0].id = 'notCurrent';
    }
}

function cellClickHandler() {
    if (gameState) {
        return;
    }
    if (whichPlayer && this.innerHTML == '') {
        this.innerHTML = 'X';
        this.removeEventListener('click', cellClickHandler);
        draws++;
        whichPlayer = false;
        check();
        highlightCurrentPlayer();
    } else if (withPlayer == 'true') {
        this.innerHTML = 'O';
        this.removeEventListener('click', cellClickHandler);
        draws++;
        whichPlayer = true;
        check();
        highlightCurrentPlayer();
    }

    if (withPlayer == 'false' && gameState == false && whichPlayer == false) {
        cpuTurn();
        check();
        draws++;
        whichPlayer = true;
        highlightCurrentPlayer();
    }
    
}

function cpuTurn() {
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML == '') {
            emptyCells.push(i);
            //alert('from i '+i)
        }
    }
    //alert('emoty cells '+emptyCells);
    index = generateMove();
    //alert(index);
    setTimeout(function() {
        cells[index].innerHTML = 'O';
        emptyCells = [];
    }, 500);
    return;
}

reset.addEventListener('click', function() {
    winner.className = 'winnerInitial-state';
    gameState = false;
    whichPlayer = true;
    winLine.style.display = 'none';
    draws = 0;
    highlightCurrentPlayer();
    cells.forEach(resetBoard => {
        resetBoard.innerHTML = '';
        resetBoard.id = 'PlayesInitial';
        resetBoard.addEventListener('click', cellClickHandler);
    });
});

back.addEventListener('click', function() {
    history.back();
});

function check() {
    const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        const cellA = cells[a].innerHTML;
        const cellB = cells[b].innerHTML;
        const cellC = cells[c].innerHTML;
      //  alert(cellA === 'O' && cellB === 'O' && cellC === 'O')
        if (cellA === 'X' && cellB === 'X' && cellC === 'X') {
            winner.innerHTML = `${name[0].innerHTML} wins!`;
            winner.className = 'winnerTarget-state';
            cells[a].id = 'Player_1';
            cells[b].id = 'Player_1';
            cells[c].id = 'Player_1';
            lineColor = '#FF0404';
            box = `box-shadow: 0px 0px 4px 1px ${lineColor};`;
            backColor = `background-color: ${lineColor};`;
            showLine(winningCombinations);
            gameState = true;
            return;
        } else if (cellA === 'O' && cellB === 'O' && cellC === 'O') {
            //alert();
            winner.innerHTML = `${name[1].innerHTML} wins!`;
            winner.className = 'winnerTarget-state';
            cells[a].id = 'Player_2';
            cells[b].id = 'Player_2';
            cells[c].id = 'Player_2';
            lineColor = '#04A6FF';
            box = `box-shadow: 0px 0px 4px 1px ${lineColor};`;
            backColor = `background-color: ${lineColor};`;
            showLine(winningCombinations);
            gameState = true;
            return;
        }
    }

    if (draws === 9) {
        winner.innerHTML = 'Draw!';
        winner.className = 'winnerTarget-state';
    }
}

function showLine(winningCombinations) {
    const lineCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];
    for (const indexes of lineCombinations) {
        const [A, B, C] = indexes;
        const a = cells[A].innerHTML;
        const b = cells[B].innerHTML;
        const c = cells[C].innerHTML;
        ///////////////////////////////////////////////////////////////////
        if (a === 'X' && b === 'X' && c === 'X' || a === 'O' && b === 'O' && c === 'O') {
            if (A == 0 && B == 1 && C == 2) {
                winLine.style.cssText = `top:1.78cm;width:8cm;display:block;border-color:${lineColor};${box};${backColor};`;
            } else if (A == 3 && B == 4 && C == 5) {
                winLine.style.cssText = `top:5.34cm;width:8cm;display:block;border-color:${lineColor};${box};${backColor};`;
            } else if (A == 6 && B == 7 && C == 8) {
                winLine.style.cssText = `top:8.9cm;width:8cm;display:block;border-color:${lineColor};${box};${backColor};`;
            } else if (A == 0 && B == 3 && C == 6) {
                winLine.style.cssText = `top:5.4;right:4.1cm;width:8cm;transform:rotate(90deg);display:block;border-color:${lineColor};${box};${backColor};`;
            } else if (A == 1 && B == 4 && C == 7) {
                winLine.style.cssText = `top:5.4cm;right:2.5pc;width:8cm;transform:rotate(90deg);display:block;border-color:${lineColor};${box};${backColor};`;
            } else if (A == 2 && B == 5 && C == 8) {
                winLine.style.cssText = `top:5.4cm;left:4.11cm;width:8cm;transform:rotate(90deg);display:block;border-color:${lineColor};${box};${backColor};`;
            } else if (A == 0 && B == 4 && C == 8) {
                winLine.style.cssText = `top:5.2cm;left:0cm;width:10.3cm;transform:rotate(50deg);display:block;border-color:${lineColor};${box};${backColor};`;
            } else if (A == 2 && B == 4 && C == 6) {
                winLine.style.cssText = `top:5.2;left:0cm;width:10.3cm;transform:rotate(-50deg);display:block;border-color:${lineColor};${box};${backColor};`;
            }
        }
    }
}

// Attach event listeners to cells
cells.forEach(cell => {
    cell.addEventListener('click', cellClickHandler);
});