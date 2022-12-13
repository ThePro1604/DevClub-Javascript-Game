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

let isDone;

function chooseMonster() {
    let randomNum = Math.floor(Math.random() * monsterList.length);
    return (monsterList[randomNum])
}

function chooseMessage() {
    let randomNum = Math.floor(Math.random() * weirdMessages.length);
    return (weirdMessages[randomNum])
}



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

function monsterData(previous, current){
    // document.getElementsByClassName("game-log-box");
    const currentCell = document.getElementById(`cell-${current[0]}-${current[1]}`);
    let monsterType = chooseMonster();
    let randomNum = Math.floor(Math.random() * 20);
    randomNum = randomNum + 30;
    let monsterHealth = randomNum;
    randomNum = Math.floor(Math.random() * 5);
    randomNum = randomNum + 5;
    currentCell.style.backgroundImage = "url(" + '"' + monsterType + '"' + ")";
    let monsterAttack = randomNum;
    window.sessionStorage.setItem('MonsterHealth', String(monsterHealth));
    window.sessionStorage.setItem('MonsterAttack', String(monsterAttack));
    document.getElementById("monster-health-battle").innerHTML = window.sessionStorage.getItem('MonsterHealth');
    document.getElementById("player-health-battle").innerHTML = window.sessionStorage.getItem('health');
    const fightLog = document.getElementsByClassName("fight-log-box");
    const gameLog = document.getElementsByClassName("game-log");
    if (`cell-${current[0]}-${current[1]}-monster` === currentCell.className) {
        popupModalFight()
        isDone = setInterval(function (){
            let modal = document.getElementById("myModal-fight");
            let container = document.getElementById("containerfight");
            let fightUpdatePlayer;
            let fightUpdateMonster;
            let ResultUpdate;
            let weirdMsg;
            if (Number(window.sessionStorage.getItem("MonsterHealth")) > 0) {
                // fightUpdateMonster = document.createElement("p");
                fightUpdateMonster = document.getElementById("enemy-attack-log")
                fightUpdateMonster.innerHTML = `${window.sessionStorage.getItem('MonsterAttack')} Of Your Health Point Were Decreased By The Enemy`
                fightUpdateMonster.style.fontSize = "15px";
                fightLog[0].insertBefore(fightUpdateMonster, fightLog[0].firstChild);
                let defence = (Number(window.sessionStorage.getItem('MonsterAttack'))*Number(window.sessionStorage.getItem('defence')))/100;
                window.sessionStorage.setItem('health', String((Number(window.sessionStorage.getItem("health")) - (Number(window.sessionStorage.getItem('MonsterAttack')-defence))).toFixed(0)));
                document.getElementById("player-health-battle").innerHTML = window.sessionStorage.getItem('health');
                if (Number(window.sessionStorage.getItem("health")) > 0) {
                    // fightUpdatePlayer = document.createElement("p");
                    fightUpdatePlayer = document.getElementById("player-attack-log")
                    fightUpdatePlayer.innerHTML = `The Enemy Health Was Decreased By ${window.sessionStorage.getItem('attack')} Point`;
                    fightUpdatePlayer.style.fontSize = "15px";
                    fightLog[0].insertBefore(fightUpdatePlayer, fightLog[0].firstChild);
                    window.sessionStorage.setItem('MonsterHealth', String((Number(window.sessionStorage.getItem("MonsterHealth")) - Number(window.sessionStorage.getItem('attack')))));
                    document.getElementById("monster-health-battle").innerHTML = window.sessionStorage.getItem('MonsterHealth');
                } else {
                    ResultUpdate = document.createElement("p");
                    ResultUpdate.innerHTML = `You Lost!`
                    ResultUpdate.style.fontSize = "15px";
                    ResultUpdate.style.fontWeight = "bold";
                    fightLog[0].insertBefore(ResultUpdate, fightLog[0].firstChild);
                    setTimeout(function () {
                        window.sessionStorage.clear();
                        location.reload();
                    }, 5000)
                    clearInterval(isDone);
                }
            }
            else {
                ResultUpdate = document.createElement("p");
                ResultUpdate.innerHTML = `The Enemy Health Has Perished`
                ResultUpdate.style.fontSize = "15px";
                ResultUpdate.style.fontWeight = "bold";

                gameLog[0].insertBefore(ResultUpdate, gameLog[0].firstChild);
                document.getElementById("player-health").innerHTML = window.sessionStorage.getItem('health');
                currentCell.setAttribute("class", "MonsterDefeated");

                setTimeout(function(){
                    modal.style.display = "none";
                    container.style.display = "none";

                }, 2000)
                window.sessionStorage.removeItem("MonsterHealth");
                clearInterval(isDone)
            }
            weirdMsg = document.getElementById("weird-messages");
            weirdMsg.innerHTML = chooseMessage();
            weirdMsg.style.fontSize = "15px";
            fightLog[0].insertBefore(weirdMsg, fightLog[0].firstChild);

        },1000);
        document.getElementById("player-health").innerHTML = window.sessionStorage.getItem('health');
    }
    currentCell.style.backgroundImage = storageAvatar[0].img
    saveBoard()
}

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
