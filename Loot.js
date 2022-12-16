const lootTypes = [
    "health",
    "attack",
    "defence",
]

// random loot type selector
function chooseLootType() {
    const randomNum = Math.floor(Math.random() * lootTypes.length);
    return (lootTypes[randomNum])
}

// generate all the loot spots on the board with question mark to mark it
function lootGenerator(loots) {
    for (let cell of loots){
        const passive = document.getElementById(cell);
        passive.setAttribute("class", cell+"-loot");
        passive.style.backgroundImage = "url(" + '"' + "./assets/flooring/Qmark.png" + '"' + ")";
        passive.style.backgroundSize= "contain";
        passive.style.backgroundRepeat= "no-repeat";
        passive.style.backgroundPosition= "50% 50%";
    }
}

function lootData(previous, current){
    let lootUpdate;
    const gameLog = document.getElementsByClassName("game-log");
    const currentCell = document.getElementById(`cell-${current[0]}-${current[1]}`);
    const lootType = chooseLootType();
    const gameDataForStorage = JSON.parse(window.sessionStorage.getItem("GameLog"));

    // updates the class name to be alerted that the following cell as already been taken
    currentCell.setAttribute("class", "used-loot");

    //creates health type loot which gives a random amount of HP between 1-15
    if (lootType === "health"){
        currentCell.setAttribute("class", "used-loot-health");
        // currentCell.style.backgroundImage = "url(" + '"' + "./assets/loot/potion3.png" + '"' + ")";
        let health = Number(window.sessionStorage.getItem('health'));
        let randomNum = Math.floor(Math.random() * 14);
        randomNum = randomNum + 1;
        window.sessionStorage.setItem('health', String((randomNum + health)));
        document.getElementById("player-health").innerHTML = window.sessionStorage.getItem('health');
        lootUpdate = document.createElement("p");
        lootUpdate.innerHTML = `You Found A Health Potion! You Earned ${randomNum} Health Points!`
        lootUpdate.style.fontSize = "15px";
    }

    //creates attack type loot which gives a random amount of attack bonus between 1-5
    if (lootType === "attack"){
        // currentCell.style.backgroundImage = "url(" + '"' + "./assets/loot/potion5.png" + '"' + ")";
        currentCell.setAttribute("class", "used-loot-attack");
        let attack = Number(window.sessionStorage.getItem('attack'));
        let randomNum = Math.floor(Math.random() * 4);
        randomNum = randomNum + 1;
        window.sessionStorage.setItem('attack', String((randomNum + attack)));
        document.getElementById("player-attack").innerHTML = window.sessionStorage.getItem('attack');
        lootUpdate = document.createElement("p");
        lootUpdate.innerHTML = `You Found A Attack Potion! You Earned ${randomNum} Attack Points!`
        lootUpdate.style.fontSize = "15px";
    }

    //creates defence type loot which gives a random amount of defence bonus between 1-5
    if (lootType === "defence"){
        // currentCell.style.backgroundImage = "url(" + '"' + "./assets/loot/potion2.png" + '"' + ")";
        currentCell.setAttribute("class", "used-loot-defence");
        let defence = Number(window.sessionStorage.getItem('defence'));
        let randomNum = Math.floor(Math.random() * 4);
        randomNum = randomNum + 1;
        window.sessionStorage.setItem('defence', String((randomNum + defence)));
        document.getElementById("player-defence").innerHTML = window.sessionStorage.getItem('defence');
        lootUpdate = document.createElement("p");
        lootUpdate.innerHTML = `You Found A Defence Potion! You Earned ${randomNum} Defence Points!`
        lootUpdate.style.fontSize = "15px";
    }
    // adds the correct msg into the game log
    gameLog[0].insertBefore(lootUpdate, gameLog[0].firstChild);
    gameDataForStorage.unshift(lootUpdate.innerHTML);
    window.sessionStorage.setItem('GameLog', JSON.stringify(gameDataForStorage));

    saveBoard()
}

// adds back the cell image after player moved from the cell
function recoverLoot(previous) {
    const conditions = ["door", "key", "defence", "attack", "health"];
    let previousCell = document.getElementById(`cell-${previous[0]}-${previous[1]}`);
    const isIncluded = conditions.some(el => (previousCell.className).includes(el));

    if ((previousCell.className).includes("health")) {
        previousCell.style.backgroundImage = "url(" + '"' + "./assets/loot/potion3.png" + '"' + ")";
    }
    if ((previousCell.className).includes("attack")) {
        previousCell.style.backgroundImage = "url(" + '"' + "./assets/loot/potion5.png" + '"' + ")";
    }
    if ((previousCell.className).includes("defence")) {
        previousCell.style.backgroundImage = "url(" + '"' + "./assets/loot/potion2.png" + '"' + ")";
    }
    if ((previousCell.className).includes("key")) {
        previousCell.style.backgroundImage = "url(" + '"' + "./assets/loot/key.png" + '"' + ")";
    }
    if ((previousCell.className).includes("door")) {
        previousCell.style.backgroundImage = "url(" + '"' + "./assets/loot/door.png" + '"' + ")";
    }
    if (isIncluded) {
        previousCell.style.backgroundSize = "contain";
        previousCell.style.backgroundRepeat = "no-repeat";
        previousCell.style.backgroundPosition = "50% 50%";
    }

    saveBoard()
}

// generating the key locations on the board
function keysGenerator(keys){
    for (let cell of keys){
        let key = document.getElementById(cell);
        key.setAttribute("class", cell+"-key");
        key.style.backgroundImage = "url(" + '"' + "./assets/flooring/Qmark.png" + '"' + ")";
        key.style.backgroundSize= "contain";
        key.style.backgroundRepeat= "no-repeat";
        key.style.backgroundPosition= "50% 50%";
    }

}

function keyData(previous, current) {
    let keyUpdate;
    let endDoor;
    const gameLog = document.getElementsByClassName("game-log");
    const currentCell = document.getElementById(`cell-${current[0]}-${current[1]}`);
    const gameDataForStorage = JSON.parse(window.sessionStorage.getItem("GameLog"));
    // checks if the cell is the one with the door
    if ((currentCell.className).includes("door")) {
        // checks if the player already found a key (enters if he does and win) and resets the game
        if (window.sessionStorage.getItem('key') === "Found"){
            endDoor = document.createElement("p");
            endDoor.innerHTML = `You Have Won The Game`;
            endDoor.style.fontSize = "15px";
            endDoor.style.fontWeight = "bold";
            gameLog[0].insertBefore(endDoor, gameLog[0].firstChild);
            gameDataForStorage.unshift(endDoor.innerHTML);
            window.sessionStorage.removeItem("tableData");
            window.sessionStorage.setItem("inDoor", "True")
            setTimeout(function(){
                window.sessionStorage.clear();
                location.reload();
            }, 4000)
        }
        // if the player missing a key returns a message in the game log
        else {
            endDoor = document.createElement("p");
            endDoor.innerHTML = `You Are Missing A Key!`;
            endDoor.style.fontSize = "15px";
            endDoor.style.fontWeight = "bold";
            gameLog[0].insertBefore(endDoor, gameLog[0].firstChild);
        }
    }
    //if the cell is not a door handles a key cell
    else {
        currentCell.setAttribute("class", "used-key");
        currentCell.style.backgroundImage = "url(" + '"' + "./assets/loot/key.png" + '"' + ")";
        window.sessionStorage.setItem('key', "Found");
        document.getElementById("player-keys").innerHTML = window.sessionStorage.getItem('key');
        keyUpdate = document.createElement("p");
        keyUpdate.innerHTML = `You Found A Key!!`;
        keyUpdate.style.fontSize = "15px";
        keyUpdate.style.fontWeight = "bold";
        gameLog[0].insertBefore(keyUpdate, gameLog[0].firstChild);

        gameDataForStorage.unshift(keyUpdate.innerHTML);
        window.sessionStorage.setItem('GameLog', JSON.stringify(gameDataForStorage));
    }
    saveBoard()
}
