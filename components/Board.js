const BOARD_SIZE =25
class Board {
    constructor() {
        this.board = [];
        this.boardSize = BOARD_SIZE;
        this.generateBoard();

        this.monsterCount = 0;
        this.itemCount = 0;
        this.player = new Player();
        this.setPlayer();
        this.monsters = [];
        this.items = [];

    }

    generateBoard() {
        for (let i = 0; i < this.boardSize; i++) {
            this.board.push([]);
            for (let j = 0; j < this.boardSize; j++) {
                this.board[i].push(null);
            }
        }
    }

    //setPlayer
    setPlayer() {
        this.board[this.player.x][this.player.y] = this.player;
    }


    addMonster() {
        let x = Math.floor(Math.random() * this.boardSize);
        let y = Math.floor(Math.random() * this.boardSize);
        let monster = new Monster(x, y);
        //check if there is already a monster at that location
        if (this.board[x][y] === null) {
            this.board[x][y] = monster;
            this.monsters.push(monster);
            this.monsterCount++;
        } else {
            this.addMonster();
        }

    }


    addItem(name) {
        let x = Math.floor(Math.random() * this.boardSize);
        let y = Math.floor(Math.random() * this.boardSize);
        let item = new Item(name, x, y);

        //check if there is already an item at that location
        if (this.board[x][y] === null) {
            this.board[x][y] = item;
            this.items.push(item);
            this.itemCount++;
        } else {
            this.addItem(name);
        }

    }


    printBoard() {
    
        for (let i = 0; i < this.boardSize; i++) {
            let row = "";
            for (let j = 0; j < this.boardSize; j++) {
                if (this.board[i][j] === null) {
                    if(i===this.boardSize-1 &&j===this.boardSize-1){
                        row+=" E ";
                    } 

                else{    
                    row += " - ";
                }
                } else if (this.board[i][j] instanceof Monster) {
                    row += " ? ";
                } else if (this.board[i][j] instanceof Player) {
                    row += " P ";
                } else if (this.board[i][j] instanceof Item) {
                    row += " ? ";   
                }   
                if(i===this.boardSize &&j===this.boardSize){
                    
                }
            }
            
            console.log(row);
        }
        
    }

    checkForMonster() {
        for (let i = 0; i < this.monsters.length; i++) {
            if (this.monsters[i].x === this.player.x && this.monsters[i].y === this.player.y) {
                return true;
            }
        }
        return false;
    }

    checkForItem() {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].x === this.player.x && this.items[i].y === this.player.y) {
                return true;
            }
        }
        return false;
    }

    battle(monster) {
        
        while (this.player.hp > 0 && monster.hp > 0) {
            this.player.battle(monster);
        }
        if (this.player.hp === 0) {
            console.log("You died!");
            return;
        }
    }

    gameLoop() {
        this.printBoard();
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            if (keyName === 'ArrowLeft' && this.player.y > 0) {
                this.board[this.player.x][this.player.y] = null;
                this.player.y--;
                this.setPlayer();
            } else if (keyName === 'ArrowRight' && this.player.y < this.boardSize - 1) {
                this.board[this.player.x][this.player.y] = null;
                this.player.y++;
                this.setPlayer();
            } else if (keyName === 'ArrowUp' && this.player.x > 0) {
                this.board[this.player.x][this.player.y] = null;
                this.player.x--;
                this.setPlayer();
            } else if (keyName === 'ArrowDown' && this.player.x < this.boardSize - 1) {
                this.board[this.player.x][this.player.y] = null;
                this.player.x++;
                this.setPlayer();
            } 
            let res=this.game();
            if(res===0){return;}

        });
    }


    game() {
        //clear the console every time the player moves
        console.clear();
        this.printBoard();

        if (this.checkForMonster()) {
            console.log("You encountered a monster!");
            for (let i = 0; i < this.monsters.length; i++) {
                if (this.monsters[i].x === this.player.x && this.monsters[i].y === this.player.y) {
                    this.battle(this.monsters[i]);

                    //remove the monster from the board and the array
                    this.board[this.monsters[i].x][this.monsters[i].y] = null;
                    this.monsters.splice(i, 1);
                    this.monsterCount--;
                }
            }
        }
        if (this.checkForItem()) {
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].x === this.player.x && this.items[i].y === this.player.y) {
                    if (this.items[i].name === "hp") {
                        console.log("You found 10 hp!");
                        if(this.player.hp===100){
                            console.log("hp is full");
                        }
                        else if ((this.player.hp + 10) > 100){
                            this.player.hp = 100;
                        }
                        else{
                        this.player.hp += 10;
                        console.log("Current hp : " + this.player.hp);
                        }
                        
                    }
                    if (this.items[i].name === "Power") {
                        this.player.power += 5;
                        console.log("You found 5 Power!");
                        console.log("Current power : " + this.player.power);
                    }

                    //remove the item from the board and the array
                    this.board[this.items[i].x][this.items[i].y] = null;
                    this.items.splice(i, 1);
                    this.itemCount--;
                }
            }
        }

        if (this.player.hp === 0) {
            console.log("You died!");
            return 0;
         
        }

        if (this.player.x === this.boardSize - 1 && this.player.y === this.boardSize - 1) {
            console.log("You won!\n");
            return 0 ; 
        
        }


    }


}
