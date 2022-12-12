const monsterList = [
    "./assets/monsters/monster1.jpeg",
    "./assets/monsters/monster2.jpeg",
    "./assets/monsters/monster3.jpeg",
    "./assets/monsters/monster4.jpeg",
    "./assets/monsters/monster5.jpeg",
    "./assets/monsters/monster6.jpeg",
];

function chooseMonster() {
    let randomNum = Math.floor(Math.random() * monsterList.length);
    return (monsterList[randomNum])
}


function monsterGenerator(monsters) {
    for (let cell of monsters){
        let hostile = document.getElementById(cell);
        hostile.setAttribute("class", cell+"-monster");
        // hostile.style.backgroundImage = "url(" + '"' + chooseMonster() + '"' + ")";
        hostile.style.backgroundImage = "url(" + '"' + "./assets/flooring/Qmark.png" + '"' + ")";

        hostile.style.backgroundSize= "contain";
        hostile.style.backgroundRepeat= "no-repeat";
        hostile.style.backgroundPosition= "50% 50%";
    }

}

function monsterData(){
    console.log("monster")
}