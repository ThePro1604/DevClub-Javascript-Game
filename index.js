
    function addMonsters(board){
    for(let i=0 ;i<15;i++){
        board.addMonster();
    }

    }

    function addItems(board){
    board.addItem("hp");
    board.addItem("power");
    board.addItem("hp");
    board.addItem("power");
    board.addItem("hp");
    board.addItem("hp");
    board.addItem("power");
    board.addItem("hp");
    board.addItem("power");
    board.addItem("hp");
    }
    
function startGame(){
    const board=new Board();
    addMonsters(board);
    addItems(board);
    board.gameLoop();
}
startGame();




