const monsterList = [
    "./assets/monsters/monster1.jpeg",
    "./assets/monsters/monster2.jpeg",
    "./assets/monsters/monster3.jpeg",
    "./assets/monsters/monster4.jpeg",
    "./assets/monsters/monster5.jpeg",
    "./assets/monsters/monster6.jpeg",
];


const weirdMessages = [
    "Careful Not To Die",
    "Run If You Can",
    "You Have No Chance Of Escaping",
    "Your Soul Belongs to me",
    "Nothing Can Escape My Grasp",
    "I Will Destroy You",
];

// battle loop variable
let isDone;

// random monster chooser
function chooseMonster() {
    let randomNum = Math.floor(Math.random() * monsterList.length);
    return (monsterList[randomNum])
}

// random message chooser
function chooseMessage() {
    let randomNum = Math.floor(Math.random() * weirdMessages.length);
    return (weirdMessages[randomNum])
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
        popupModalFight()
        isDone = setInterval(function (){
            battleManager(previous, current, currentCell)
        }, 1000)
        currentCell.style.backgroundImage = storageAvatar[0].img
        saveBoard()
    }
}

//in charge on battle management (runs in intervals of 1 second)
function battleManager(previous, current, currentCell) {
    //determine monster attack to this interval
    let randomNum = Math.floor(Math.random() * 5);
    randomNum = randomNum + 5;
    const monsterAttack = randomNum;

    //determine player attack to this interval
    randomNum = Math.floor(Math.random() * 3);
    const playerAttack = Number(window.sessionStorage.getItem('attack')) - randomNum;


    //logs the battle actions and the game actions (game actions = victory in battle)
    const gameLog = document.getElementsByClassName("game-log");
    const modal = document.getElementById("myModal-fight");
    const container = document.getElementById("containerfight");
    const monsterHealth = Number(window.sessionStorage.getItem('MonsterHealth'));
    const playerHealth = Number(window.sessionStorage.getItem("health"));
    const playerDefence = Number(window.sessionStorage.getItem('defence'));
    const fightUpdatePlayer = document.getElementById("player-attack-log");
    const fightUpdateMonster = document.getElementById("enemy-attack-log");
    let ResultUpdate;

    //if the monster has more than 0 health (meaning it's still alive)
    if (Number(window.sessionStorage.getItem("MonsterHealth")) > 0) {
        let defence = (monsterAttack * playerDefence) / 100
        let attackAfterDefence = monsterAttack - defence
        fightUpdateMonster.innerHTML = `You Received <strong style="font-size: 23px">${attackAfterDefence.toFixed(0)}</strong> Points Of Damage`
        fightUpdateMonster.style.fontSize = "20px";
        window.sessionStorage.setItem('health', String((playerHealth - attackAfterDefence).toFixed(2)))
        document.getElementById("player-health-battle").innerHTML = window.sessionStorage.getItem('health');

        //if the player has more than 0 health (meaning he's still alive)
        if (Number(window.sessionStorage.getItem("health")) > 0) {
            fightUpdatePlayer.innerHTML = `The Monster Received <strong style="font-size: 23px">${playerAttack}</strong> Point Of Damage`;
            fightUpdatePlayer.style.fontSize = "20px";
            window.sessionStorage.setItem('MonsterHealth', String(Number(monsterHealth) - Number(playerAttack)));
            document.getElementById("monster-health-battle").innerHTML = window.sessionStorage.getItem('MonsterHealth');
        }

        // if the player dies (write he dies and resets the game)
        else {
            ResultUpdate = document.getElementById("result-message");
            ResultUpdate.innerHTML = `You Lost!`
            ResultUpdate.style.fontSize = "30px";
            ResultUpdate.style.fontWeight = "bold";
            ResultUpdate.style.display = "block";

            setTimeout(function () {
                window.sessionStorage.clear();
                location.reload();
            }, 5000)
            clearInterval(isDone);
        }
    }

    // if the monster dies (closes the battle window updates data on the main board)
    else {
        ResultUpdate = document.createElement("p");
        ResultUpdate.innerHTML = `The Enemy Health Has Perished`
        ResultUpdate.style.fontSize = "15px";
        ResultUpdate.style.fontWeight = "bold";
        gameLog[0].insertBefore(ResultUpdate, gameLog[0].firstChild);
        document.getElementById("player-health").innerHTML = window.sessionStorage.getItem('health');
        currentCell.setAttribute("class", "MonsterDefeated");

        ResultUpdate = document.getElementById("result-message");
        ResultUpdate.innerHTML = `You Won!`
        ResultUpdate.style.fontSize = "30px";
        ResultUpdate.style.fontWeight = "bold";
        ResultUpdate.style.display = "block";

        setTimeout(function () {
            ResultUpdate.style.display = "none"
            modal.style.display = "none";
            container.style.display = "none";
        }, 2000)
        window.sessionStorage.removeItem("MonsterHealth");
        clearInterval(isDone)
    }
    document.getElementById("player-health").innerHTML = window.sessionStorage.getItem('health');
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
