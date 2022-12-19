// in charge of the monster data creation
function monsterData(){
    const normal = document.getElementById("attack-one")
    const special = document.getElementById("attack-two")
    const ultimate = document.getElementById("attack-three")
    const punch = document.getElementById("attack-four")
    document.getElementById("special-counter1").innerHTML = window.sessionStorage.getItem('SpecialCount1');
    document.getElementById("special-counter2").innerHTML = window.sessionStorage.getItem('SpecialCount2');
    document.getElementById("special-counter3").innerHTML = window.sessionStorage.getItem('SpecialCount3');

    //decides monster attack between 5-10
    let randomNum = Math.floor(Math.random() * 10);
    randomNum = randomNum + 5;
    let monsterAttack = randomNum;

    let length = window.sessionStorage.getItem("AvatarC").length
    document.getElementById("player").src = window.sessionStorage.getItem("AvatarC").substring(5,length - 2)

    //adds the current monster health and attack to the storage for easy access
    window.sessionStorage.setItem('MonsterAttack', String(monsterAttack));

    document.getElementById("special-counter1").innerHTML = window.sessionStorage.getItem('SpecialCount1');

    special.style.opacity = "1";
    normal.style.opacity = "1";
    ultimate.style.opacity = "1";
    punch.style.opacity = "1";

    if (window.sessionStorage.getItem('SpecialCount1') === "0") {
        // special.style.opacity = "0";
        special.style.pointerEvents = "none";
        special.style.backgroundColor = "#9c9c9c";
        special.style.boxShadow = " rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #494848 0 -3px 0 inset";
    }
    if (window.sessionStorage.getItem('SpecialCount2') === "0") {
        // ultimate.style.opacity = "0";
        ultimate.style.pointerEvents = "none";
        ultimate.style.backgroundColor = "#9c9c9c"
        ultimate.style.boxShadow = "rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #494848 0 -3px 0 inset";
    }
    if (window.sessionStorage.getItem('SpecialCount3') === "0") {
        // punch.style.opacity = "0";
        punch.style.pointerEvents = "none";
        punch.style.backgroundColor = "#9c9c9c"
        punch.style.boxShadow = "rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #494848 0 -3px 0 inset";
    }
}

function battleManager(multiplier) {
    const special = document.getElementById("attack-two")
    const normal = document.getElementById("attack-one")
    const ultimate = document.getElementById("attack-three")
    const punch = document.getElementById("attack-four")
    const fightUpdates = document.getElementById("messages");

    special.style.opacity = "0";
    normal.style.opacity = "0";
    ultimate.style.opacity = "0";
    punch.style.opacity = "0";

    special.style.pointerEvents = "none";
    normal.style.pointerEvents = "none";
    ultimate.style.pointerEvents = "none";
    punch.style.pointerEvents = "none";

    if (multiplier === 2) {
        window.sessionStorage.setItem('SpecialCount1', String(Number(window.sessionStorage.getItem('SpecialCount1')) - 1));
        document.getElementById("special-counter1").innerHTML = window.sessionStorage.getItem('SpecialCount1');
    } else if (multiplier === 3) {
        window.sessionStorage.setItem('SpecialCount2', String(Number(window.sessionStorage.getItem('SpecialCount2')) - 1))
        document.getElementById("special-counter2").innerHTML = window.sessionStorage.getItem('SpecialCount2');
    }
    else if (multiplier === 4) {
        window.sessionStorage.setItem('SpecialCount3', String(Number(window.sessionStorage.getItem('SpecialCount3')) - 1))
        document.getElementById("special-counter3").innerHTML = window.sessionStorage.getItem('SpecialCount3');
        multiplier = 10;
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

    }, 3000)
}

function moveCountCheck(){
    const special = document.getElementById("attack-two")
    const normal = document.getElementById("attack-one")
    const ultimate = document.getElementById("attack-three")
    const punch = document.getElementById("attack-four")

    if (window.sessionStorage.getItem('SpecialCount1') !== "0") {
        // special.style.opacity = "1";
        special.style.pointerEvents = "auto";
        special.style.backgroundColor = "#FCFCFD";
        special.style.boxShadow = "rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset";
    }
    else {
        special.style.backgroundColor = "#9c9c9c";
        special.style.boxShadow = " rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #494848 0 -3px 0 inset";
    }
    if (window.sessionStorage.getItem('SpecialCount3') !== "0") {
        // punch.style.opacity = "1";
        punch.style.pointerEvents = "auto";
        punch.style.backgroundColor = "#FCFCFD";
        punch.style.boxShadow = "rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset";
    }
    else {
        punch.style.backgroundColor = "#9c9c9c";
        punch.style.boxShadow = " rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #494848 0 -3px 0 inset";
    }
    if (window.sessionStorage.getItem('SpecialCount2') !== "0") {
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

function playerMove(multiplier) {
    const fightUpdates = document.getElementById("messages");
    let randomNum = Math.floor(Math.random() * 3);
    const playerAttack = Number(window.sessionStorage.getItem('attack')) - randomNum;
    const monsterHealth = Number(window.sessionStorage.getItem('MonsterHealth'));
    let BossHealthLeft = document.getElementById("healthbar__meter--player-two")

    fightUpdates.innerHTML = `The Arrancar Received <strong style="font-size: 23px">${Number(playerAttack) * multiplier}</strong> Point Of Damage`;
    window.sessionStorage.setItem('MonsterHealth', String(Number(monsterHealth) - Number(playerAttack) * multiplier));
    // document.getElementById("monster-health-battle").innerHTML = window.sessionStorage.getItem('MonsterHealth');

    let progressbar =  window.sessionStorage.getItem("ProgressBoss")
    window.sessionStorage.setItem("ProgressBoss", String((Number(window.sessionStorage.getItem("ProgressBoss")) + (((playerAttack * multiplier)/Number(window.sessionStorage.getItem("maxBossHealth")))*100))));
    let progress = window.sessionStorage.getItem("ProgressBoss");
    console.log(progressbar)
    console.log(progress)
    // playerHealthLeft.style.width = progress + "%"
    if (window.sessionStorage.getItem("ProgressBoss") > 100) {
        window.sessionStorage.setItem("ProgressBoss", String(100));
        progress = 100
    }
    let i = 0;
    if (i === 0) {
        i = 1;
        let width = parseInt(progressbar);

        let id = setInterval(frame, 1);

        function frame() {
            if (width >= progress) {
                clearInterval(id);
                i = 0;
            } else {
                console.log(progress)
                width = width + 0.05;
                BossHealthLeft.style.width = width + "%";
            }
        }
    }

}

function monsterMove() {
    const fightUpdates = document.getElementById("messages");

    let randomNum = Math.floor(Math.random() * 10);
    randomNum = randomNum + 5;
    const monsterAttack = randomNum;
    const playerHealth = Number(window.sessionStorage.getItem("health"));
    const playerDefence = Number(window.sessionStorage.getItem('defence'));
    let playerHealthLeft = document.getElementById("healthbar__meter--player-one")

    let defence = (monsterAttack * playerDefence) / 100
    let attackAfterDefence = monsterAttack - defence
    fightUpdates.innerHTML = `You Received <strong style="font-size: 23px">${attackAfterDefence.toFixed(0)}</strong> Points Of Damage`
    window.sessionStorage.setItem('health', String((playerHealth - attackAfterDefence).toFixed(2)))
    // document.getElementById("player-health-battle").innerHTML = window.sessionStorage.getItem('health');

    let progressbar =  window.sessionStorage.getItem("ProgressPlayer")
    window.sessionStorage.setItem("ProgressPlayer", String((Number(window.sessionStorage.getItem("ProgressPlayer")) + ((attackAfterDefence/Number(window.sessionStorage.getItem("maxPlayerHealth")))*100))));
    let progress = window.sessionStorage.getItem("ProgressPlayer");
    console.log(progressbar)
    console.log(progress)
    // playerHealthLeft.style.width = progress + "%"
    if (window.sessionStorage.getItem("ProgressPlayer") > 100) {
        window.sessionStorage.setItem("ProgressPlayer", String(100));
        progress = 100;

    }
    let i = 0;
    if (i === 0) {
        i = 1;
        let width = parseInt(progressbar);

        let id = setInterval(frame, 1);

        function frame() {
            if (width >= progress) {
                clearInterval(id);
                i = 0;
            } else {
                console.log(progress)
                width = width + 0.05;
                playerHealthLeft.style.width = width + "%";
            }
        }
    }
}

function playerLost() {
    let ResultUpdate = document.getElementById("messages");
    ResultUpdate.innerHTML = `You Lost!`

    setTimeout(function () {
        window.sessionStorage.clear();
        window.location = "./index.html"
    }, 3000)
}

function monsterLost() {
    const fightUpdates = document.getElementById("messages");

    fightUpdates.innerHTML = `You Won!`;
    setTimeout(function () {
        window.sessionStorage.clear();
        window.location = "./index.html"
    }, 3000)
    window.sessionStorage.removeItem("MonsterHealth");
}
