const lootList = [
    "./assets/loot/loot1.png",
    "./assets/loot/loot2.png",
    "./assets/loot/potion1.png",
    "./assets/loot/potion2.png",
    "./assets/loot/potion3.png",
    "./assets/loot/potion4.png",
];

const lootTypes = [
    "health",
    "attack",
    "defence",
]

function chooseLoot() {
    let randomNum = Math.floor(Math.random() * lootList.length);
    return (lootList[randomNum])
}

function chooseLootType() {
    let randomNum = Math.floor(Math.random() * lootTypes.length);
    return (lootTypes[randomNum])
}

function lootGenerator(loots) {
    for (let cell of loots){
        let passive = document.getElementById(cell);
        passive.setAttribute("class", cell+"-loot");
        // passive.style.backgroundImage = "url(" + '"' + chooseLoot() + '"' + ")";
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
    currentCell.setAttribute("class", "used-loot");
    let lootType = chooseLootType();
    const gameDataForStorage = JSON.parse(window.sessionStorage.getItem("GameLog"));

    if (lootType === "health"){
        currentCell.style.backgroundImage = "url(" + '"' + "./assets/loot/potion3.png" + '"' + ")";
        let health = Number(window.sessionStorage.getItem('health'));
        let randomNum = Math.floor(Math.random() * 14);
        randomNum = randomNum + 1;
        window.sessionStorage.setItem('health', String((randomNum + health)));
        // console.log(window.sessionStorage.getItem('health'));
        document.getElementById("player-health").innerHTML = window.sessionStorage.getItem('health');
        lootUpdate = document.createElement("p");
        lootUpdate.innerHTML = `You Found A Health Potion! You Earned ${randomNum} Health Points!`
        lootUpdate.style.fontSize = "15px";
    }

    if (lootType === "attack"){
        currentCell.style.backgroundImage = "url(" + '"' + "./assets/loot/potion5.png" + '"' + ")";
        let attack = Number(window.sessionStorage.getItem('attack'));
        let randomNum = Math.floor(Math.random() * 4);
        randomNum = randomNum + 1;
        window.sessionStorage.setItem('attack', String((randomNum + attack)));
        // console.log(window.sessionStorage.getItem('attack'));
        document.getElementById("player-attack").innerHTML = window.sessionStorage.getItem('attack');
        lootUpdate = document.createElement("p");
        lootUpdate.innerHTML = `You Found A Attack Potion! You Earned ${randomNum} Attack Points!`
        lootUpdate.style.fontSize = "15px";
    }

    if (lootType === "defence"){
        currentCell.style.backgroundImage = "url(" + '"' + "./assets/loot/potion2.png" + '"' + ")";
        let defence = Number(window.sessionStorage.getItem('defence'));
        let randomNum = Math.floor(Math.random() * 4);
        randomNum = randomNum + 1;
        window.sessionStorage.setItem('defence', String((randomNum + defence)));
        // console.log(window.sessionStorage.getItem('defence'));
        document.getElementById("player-defence").innerHTML = window.sessionStorage.getItem('defence');
        lootUpdate = document.createElement("p");
        lootUpdate.innerHTML = `You Found A Defence Potion! You Earned ${randomNum} Defence Points!`
        lootUpdate.style.fontSize = "15px";
    }
    gameLog[0].insertBefore(lootUpdate, gameLog[0].firstChild);

    gameDataForStorage.unshift(lootUpdate.innerHTML);
    window.sessionStorage.setItem('GameLog', JSON.stringify(gameDataForStorage));
    console.log(gameDataForStorage)

    saveBoard()
}
