class Monster {
    constructor(x, y) {
        this.name = "Monster";
        this.hp = Math.floor(Math.random() * 20);
        this.power = Math.floor(Math.random() * 20);
        this.x = x;
        this.y = y;

    }

    getHealth() {
        return `${this.name}'s health is now ${this.hp}!`;
    }

    isAlive() {
        return this.hp !== 0;
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

    printStats() {
        console.log(`Name: ${this.name}\nHealth: ${this.hp}\nStrength: ${this.power}`);
    }

}
