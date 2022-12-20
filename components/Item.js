class Item {
    constructor(name, x, y) {
        this.name = randomEffect();
        this.x = x;
        this.y = y;
    }
}

function randomEffect(){
    let rand = Math.random();
    if (rand < 0.5) {
        return "hp"
    }
    else return "Power"
}