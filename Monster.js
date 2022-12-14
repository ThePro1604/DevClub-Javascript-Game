const monsterList = [
    "./assets/monsters/monster1.jpeg",
    "./assets/monsters/monster2.jpeg",
    "./assets/monsters/monster3.jpeg",
    "./assets/monsters/monster4.jpeg",
    "./assets/monsters/monster5.jpeg",
    "./assets/monsters/monster6.jpeg",
];

// random monster chooser
function chooseMonster() {
    let randomNum = Math.floor(Math.random() * monsterList.length);
    return (monsterList[randomNum])
}

// generate all the monster spots on the map with a question mark
function monsterGenerator(monsters) {
    for (let cell of monsters){
        let hostile = document.getElementById(cell);
        hostile.setAttribute("class", cell+"-monster");
        hostile.style.backgroundImage = "url(" + '"' + "./assets/flooring/Qmark.png" + '"' + ")";

        hostile.style.backgroundSize= "contain";
        hostile.style.backgroundRepeat= "no-repeat";
        hostile.style.backgroundPosition= "50% 50%";
    }
}

// in charge of the monster data creation
function monsterData(previous, current){
    const currentCell = document.getElementById(`cell-${current[0]}-${current[1]}`);
    const monsterType = chooseMonster();
    const special = document.getElementById("attack-two")

    //decides monster health between 30-50
    let randomNum = Math.floor(Math.random() * 30);
    randomNum = randomNum + 30;
    let monsterHealth = randomNum;

    //decides monster attack between 5-10
    randomNum = Math.floor(Math.random() * 5);
    randomNum = randomNum + 5;
    let monsterAttack = randomNum;

    //adds the current monster health and attack to the storage for easy access
    window.sessionStorage.setItem('MonsterHealth', String(monsterHealth));
    window.sessionStorage.setItem('MonsterAttack', String(monsterAttack));

    //updates the html values in the game board
    currentCell.style.backgroundImage = "url(" + '"' + monsterType + '"' + ")";
    document.getElementById("monster-health-battle").innerHTML = window.sessionStorage.getItem('MonsterHealth');
    document.getElementById("player-health-battle").innerHTML = window.sessionStorage.getItem('health');

    if (`cell-${current[0]}-${current[1]}-monster` === currentCell.className) {
        if (window.sessionStorage.getItem('SpecialCount') === "0") {
            special.style.opacity = "0";
            special.style.pointerEvents = "none";
        }
            popupModalFight()
        currentCell.setAttribute("class", "MonsterDefeated");
    }
}

function battleManager(multiplier) {
    const special = document.getElementById("attack-two")
    const normal = document.getElementById("attack-one")
    const fightUpdates = document.getElementById("result-message");
    special.style.opacity = "0";
    normal.style.opacity = "0";
    special.style.pointerEvents = "none";
    normal.style.pointerEvents = "none";

    if (multiplier === 2) {
        window.sessionStorage.setItem('SpecialCount', String(Number(window.sessionStorage.getItem('SpecialCount')) - 1));
        document.getElementById("special-counter").innerHTML = window.sessionStorage.getItem('SpecialCount');
    }
    //if the player has more than 0 health (meaning he's still alive)
    if (Number(window.sessionStorage.getItem("health")) > 0) {
        setTimeout(function () {
            playerMove(multiplier);
        }, 1000)
        setTimeout(function () {
            // if the monster dies
            if (Number(window.sessionStorage.getItem("MonsterHealth")) <= 0) {
                monsterLost()
            }
        }, 2000)
    }
    setTimeout(function () {
        //if the monster has more than 0 health (meaning it's still alive)
        if (Number(window.sessionStorage.getItem("MonsterHealth")) > 0) {
            monsterMove();
            setTimeout(function () {
                // if the player dies (write he dies and resets the game)
                if (Number(window.sessionStorage.getItem("health")) <= 0) {
                    playerLost();
                }
            }, 1000)
        }
    }, 2000)

    setTimeout(function () {
        if (window.sessionStorage.getItem('SpecialCount') === "0") {
            special.style.opacity = "0";
            special.style.pointerEvents = "none";
            normal.style.opacity = "1";
            normal.style.pointerEvents = "auto";

        }
        else {
            special.style.opacity = "1";
            normal.style.opacity = "1";
            special.style.pointerEvents = "auto";
            normal.style.pointerEvents = "auto";
        }
        fightUpdates.innerHTML = "Pick Your Next Move!";
        saveBoard()

    }, 3000)
}

function playerMove(multiplier) {
    const fightUpdates = document.getElementById("result-message");
    const turns = document.getElementById("turns");
    let randomNum = Math.floor(Math.random() * 3);
    const playerAttack = Number(window.sessionStorage.getItem('attack')) - randomNum;
    const monsterHealth = Number(window.sessionStorage.getItem('MonsterHealth'));

    turns.innerHTML = "It's Now The Monster's turn";
    fightUpdates.innerHTML = `The Monster Received <strong style="font-size: 23px">${Number(playerAttack) * multiplier}</strong> Point Of Damage`;
    window.sessionStorage.setItem('MonsterHealth', String(Number(monsterHealth) - Number(playerAttack) * multiplier));
    document.getElementById("monster-health-battle").innerHTML = window.sessionStorage.getItem('MonsterHealth');
}

function monsterMove() {
    const turns = document.getElementById("turns");
    const fightUpdates = document.getElementById("result-message");

    let randomNum = Math.floor(Math.random() * 5);
    randomNum = randomNum + 5;
    const monsterAttack = randomNum;
    const playerHealth = Number(window.sessionStorage.getItem("health"));
    const playerDefence = Number(window.sessionStorage.getItem('defence'));

    turns.innerHTML = "It's Now Your Turn";
    let defence = (monsterAttack * playerDefence) / 100
    let attackAfterDefence = monsterAttack - defence
    fightUpdates.innerHTML = `You Received <strong style="font-size: 23px">${attackAfterDefence.toFixed(0)}</strong> Points Of Damage`
    window.sessionStorage.setItem('health', String((playerHealth - attackAfterDefence).toFixed(2)))
    document.getElementById("player-health-battle").innerHTML = window.sessionStorage.getItem('health');
}

function playerLost() {
    let ResultUpdate = document.getElementById("result-message");
    ResultUpdate.innerHTML = `You Lost!`
    ResultUpdate.style.fontSize = "30px";
    ResultUpdate.style.fontWeight = "bold";
    ResultUpdate.style.display = "block";

    setTimeout(function () {
        window.sessionStorage.clear();
        location.reload();
    }, 1000)
}

function monsterLost() {
    const gameLog = document.getElementsByClassName("game-log");
    const turns = document.getElementById("turns");
    const modal = document.getElementById("myModal-fight");
    const container = document.getElementById("containerfight");
    const fightUpdates = document.getElementById("result-message");

    let ResultUpdate = document.createElement("p");
    ResultUpdate.innerHTML = `The Enemy Health Has Perished`
    ResultUpdate.style.fontSize = "15px";
    ResultUpdate.style.fontWeight = "bold";
    gameLog[0].insertBefore(ResultUpdate, gameLog[0].firstChild);
    document.getElementById("player-health").innerHTML = window.sessionStorage.getItem('health');

    ResultUpdate = document.getElementById("result-message");
    ResultUpdate.innerHTML = `You Won!`;
    ResultUpdate.style.fontSize = "30px";
    ResultUpdate.style.fontWeight = "bold";
    document.getElementById("player-health").innerHTML = window.sessionStorage.getItem('health');
    setTimeout(function () {
        fightUpdates.innerHTML = "Begin The Battle!"
        turns.innerHTML = "Battle-Log";
        modal.style.display = "none";
        container.style.display = "none";
    }, 1000)
    window.sessionStorage.removeItem("MonsterHealth");
}

// adds back the cell image after player moved from the cell
function recoverMonster(previous) {
    let previousCell = document.getElementById(`cell-${previous[0]}-${previous[1]}`);
    if (previousCell.className === "MonsterDefeated") {
        previousCell.style.backgroundImage = "url(" + '"' + "./assets/monsters/monsterdead1.jpg" + '"' + ")";
        previousCell.style.backgroundSize = "cover";
        previousCell.style.backgroundRepeat = "no-repeat";
        previousCell.style.backgroundPosition = "50% 50%";
    }
    saveBoard()
}