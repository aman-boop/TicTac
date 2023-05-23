const start = document.getElementById('start');
const cpu = document.getElementById('cpu');

start.addEventListener('click',function(){
    let value = 'true'
    window.location.href = 'TicTacToe/board.html?value='+value;
});

cpu.addEventListener('click',function(){
    let value = 'false';
    window.location.href = 'TicTacToe/board.html?value='+value;
});