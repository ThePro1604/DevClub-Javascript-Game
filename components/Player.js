class Player {
    constructor() {
        this.hp = 100;
        this.name = prompt("enter player name: ");
        this.power = 50;
        this.x = 0;
        this.y = 0;

    }


    getHealth() {
        return `${this.name}'s health is now ${this.hp}!`;
    }

    updateHealth(hp) {
        this.hp -= hp;
        if (this.hp < 0) {
            this.hp = 0;
        }
    }

    attack(opponent) {
        console.log(`${this.name} attacked ${opponent.name}!`);
        opponent.updateHealth(this.power);
    }

    battle(monster) {
        //battle till player or monster dead. 
        while (this.hp > 0 && monster.hp > 0) {
            this.attack(monster);
            monster.attack(this);
            console.log(this.getHealth());
            console.log(monster.getHealth());

        }

        this.printStats();
        if (this.hp === 0) {
            console.log("You lost!");
        } else {
            console.log("You won the battle!");
        }
    }

    printStats() {
        console.log(`Name: ${this.name}\nHealth: ${this.hp}\nPower: ${this.power}`);
    }
}