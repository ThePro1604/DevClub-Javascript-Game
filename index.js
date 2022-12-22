
function addMonsters(board){
    for(let i=0 ;i<15;i++){
        board.addMonster();
    }
}

function addItems(board){
    for(let i=0 ;i<15;i++){
        board.addItem();
    }
}
    
function startGame(){
    const board=new Board();
    addMonsters(board);
    addItems(board);
    board.gameLoop();
}
startGame();




