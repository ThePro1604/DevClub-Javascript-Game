const monsterList = [
    "./assets/monsters/monster1.png",
    "./assets/monsters/monster2.png",
    "./assets/monsters/monster3.png",
    "./assets/monsters/monster4.png",
    "./assets/monsters/monster5.png",
];

const monsterListDead = [
    "./assets/monsters/monster_dead1.png",
    "./assets/monsters/monster_dead2.png",
    "./assets/monsters/monster_dead3.png",
    "./assets/monsters/monster_dead4.png",
    "./assets/monsters/monster_dead5.png",
];

// random monster chooser
function chooseMonster() {
    let randomNum = Math.floor(Math.random() * monsterList.length);
    return (monsterList[randomNum])
}

function chooseMonsterDead() {
    let randomNum = Math.floor(Math.random() * monsterListDead.length);
    return (monsterListDead[randomNum])
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
    const normal = document.getElementById("attack-one")
    const special = document.getElementById("attack-two")
    const ultimate = document.getElementById("attack-three")
    const punch = document.getElementById("attack-four")

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
    // currentCell.style.backgroundImage = "url(" + '"' + monsterType + '"' + ")";
    document.getElementById("monster-health-battle").innerHTML = window.sessionStorage.getItem('MonsterHealth');
    document.getElementById("player-health-battle").innerHTML = window.sessionStorage.getItem('health');

    special.style.opacity = "1";
    normal.style.opacity = "1";
    ultimate.style.opacity = "1";
    punch.style.opacity = "1";


    if (`cell-${current[0]}-${current[1]}-monster` === currentCell.className) {
        if (window.sessionStorage.getItem('SpecialCount') === "0") {
            // special.style.opacity = "0";
            console.log("why")
            special.style.pointerEvents = "none";
            special.style.backgroundColor = "#9c9c9c";
            special.style.boxShadow = " rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #494848 0 -3px 0 inset";
        }
        if (window.sessionStorage.getItem('UltimateCount') === "0") {
            // ultimate.style.opacity = "0";
            ultimate.style.pointerEvents = "none";
            ultimate.style.backgroundColor = "#9c9c9c"
            ultimate.style.boxShadow = "rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #494848 0 -3px 0 inset";
        }
        if (window.sessionStorage.getItem('OPMCount') === "0") {
            // punch.style.opacity = "0";
            punch.style.pointerEvents = "none";
            punch.style.backgroundColor = "#9c9c9c"
            punch.style.boxShadow = "rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #494848 0 -3px 0 inset";
        }

        popupModalFight()
        currentCell.setAttribute("class", "MonsterDefeated");
    }
}

function battleManager(multiplier) {
    const special = document.getElementById("attack-two")
    const normal = document.getElementById("attack-one")
    const ultimate = document.getElementById("attack-three")
    const punch = document.getElementById("attack-four")
    const fightUpdates = document.getElementById("result-message");

    special.style.opacity = "0";
    normal.style.opacity = "0";
    ultimate.style.opacity = "0";
    punch.style.opacity = "0";

    special.style.pointerEvents = "none";
    normal.style.pointerEvents = "none";
    ultimate.style.pointerEvents = "none";
    punch.style.pointerEvents = "none";

    if (multiplier === 2) {
        window.sessionStorage.setItem('SpecialCount', String(Number(window.sessionStorage.getItem('SpecialCount')) - 1));
        document.getElementById("special-counter").innerHTML = window.sessionStorage.getItem('SpecialCount');
    } else if (multiplier === 3) {
        window.sessionStorage.setItem('UltimateCount', String(Number(window.sessionStorage.getItem('UltimateCount')) - 1))
        document.getElementById("ultimate-counter").innerHTML = window.sessionStorage.getItem('UltimateCount');
    }
    else if (multiplier === 4) {
        window.sessionStorage.setItem('OPMCount', String(Number(window.sessionStorage.getItem('OPMCount')) - 1))
        document.getElementById("opm-counter").innerHTML = window.sessionStorage.getItem('OPMCount');
        multiplier = 3000;
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
        moveCountCheck();
        fightUpdates.innerHTML = "Pick Your Next Move!";
        saveBoard()

    }, 3000)
}

function moveCountCheck(){
    const special = document.getElementById("attack-two")
    const normal = document.getElementById("attack-one")
    const ultimate = document.getElementById("attack-three")
    const punch = document.getElementById("attack-four")

    if (window.sessionStorage.getItem('SpecialCount') !== "0") {
        // special.style.opacity = "1";
        special.style.pointerEvents = "auto";
        special.style.backgroundColor = "#FCFCFD";
        special.style.boxShadow = "rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset";
    }
    else {
        special.style.backgroundColor = "#9c9c9c";
        special.style.boxShadow = " rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #494848 0 -3px 0 inset";
    }
    if (window.sessionStorage.getItem('OPMCount') !== "0") {
        // punch.style.opacity = "1";
        punch.style.pointerEvents = "auto";
        punch.style.backgroundColor = "#FCFCFD";
        punch.style.boxShadow = "rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset";
    }
    else {
        punch.style.backgroundColor = "#9c9c9c";
        punch.style.boxShadow = " rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #494848 0 -3px 0 inset";
    }
    if (window.sessionStorage.getItem('UltimateCount') !== "0") {
        // ultimate.style.opacity = "1";
        ultimate.style.pointerEvents = "auto";
        ultimate.style.backgroundColor = "#FCFCFD";
        ultimate.style.boxShadow = "rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset";
    }
    else {
        ultimate.style.backgroundColor = "#9c9c9c";
        ultimate.style.boxShadow = " rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #494848 0 -3px 0 inset";
    }
    normal.style.opacity = "1";
    special.style.opacity = "1";
    punch.style.opacity = "1";
    ultimate.style.opacity = "1";
    normal.style.pointerEvents = "auto";
}

function rewardChance(){
    const gameLog = document.getElementsByClassName("game-log");
    let ResultUpdate = document.createElement("p");

    let rand = Math.random();
    if (rand < 0.1) {
        if (Number(window.sessionStorage.getItem('SpecialCount')) < 4) {
            window.sessionStorage.setItem('SpecialCount', String(Number(window.sessionStorage.getItem('SpecialCount')) + 1))
            document.getElementById("special-counter").innerHTML = window.sessionStorage.getItem('SpecialCount');

            ResultUpdate.innerHTML = `You Were Very Lucky And Received Extra Shikai Move`
            ResultUpdate.style.fontSize = "15px";
            ResultUpdate.style.fontWeight = "bold";
            gameLog[0].insertBefore(ResultUpdate, gameLog[0].firstChild);
        }
    }
    else if ((rand > 0.1) && (rand < 0.2)) {
        window.sessionStorage.setItem('OPMCount', String(Number(window.sessionStorage.getItem('OPMCount')) + 1))
        document.getElementById("opm-counter").innerHTML = window.sessionStorage.getItem('OPMCount');

        ResultUpdate.innerHTML = `You Were Incredibly Lucky And Received The Horn Of Salvation`
        ResultUpdate.style.fontSize = "15px";
        ResultUpdate.style.fontWeight = "bold";
        gameLog[0].insertBefore(ResultUpdate, gameLog[0].firstChild);
    }
    else if ((rand > 0.2) && (rand < 0.3)) {
        window.sessionStorage.setItem('UltimateCount', String(Number(window.sessionStorage.getItem('UltimateCount')) + 1))
        document.getElementById("ultimate-counter").innerHTML = window.sessionStorage.getItem('UltimateCount');

        ResultUpdate.innerHTML = `It's Your Luck Day You Received A Bankai Form Move`
        ResultUpdate.style.fontSize = "15px";
        ResultUpdate.style.fontWeight = "bold";
        gameLog[0].insertBefore(ResultUpdate, gameLog[0].firstChild);
    }
}

function playerMove(multiplier) {
    const fightUpdates = document.getElementById("result-message");
    const turns = document.getElementById("turns");
    let randomNum = Math.floor(Math.random() * 3);
    const playerAttack = Number(window.sessionStorage.getItem('attack')) - randomNum;
    const monsterHealth = Number(window.sessionStorage.getItem('MonsterHealth'));

    turns.innerHTML = "It's Now The Arrancars's turn";
    fightUpdates.innerHTML = `The Arrancar Received <strong style="font-size: 23px">${Number(playerAttack) * multiplier}</strong> Point Of Damage`;
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
    ResultUpdate.innerHTML = `The Arrancar Was Defeated`
    ResultUpdate.style.fontSize = "15px";
    ResultUpdate.style.fontWeight = "bold";
    gameLog[0].insertBefore(ResultUpdate, gameLog[0].firstChild);
    document.getElementById("player-health").innerHTML = window.sessionStorage.getItem('health');

    ResultUpdate = document.getElementById("result-message");
    ResultUpdate.innerHTML = `You Won!`;
    ResultUpdate.style.fontSize = "30px";
    ResultUpdate.style.fontWeight = "bold";
    document.getElementById("player-health").innerHTML = window.sessionStorage.getItem('health');
    rewardChance();
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
        previousCell.style.backgroundImage = "url(" + '"' + chooseMonsterDead() + '"' + ")";
        previousCell.style.backgroundSize = "contain";
        previousCell.style.backgroundRepeat = "no-repeat";
        previousCell.style.backgroundPosition = "50% 50%";
    }
    saveBoard()
}