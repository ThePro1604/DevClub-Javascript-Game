const lootList = [
    "./assets/loot/loot1.png",
    "./assets/loot/loot2.png",
    "./assets/loot/potion1.png",
    "./assets/loot/potion2.png",
    "./assets/loot/potion3.png",
    "./assets/loot/potion4.png",
];

function chooseLoot() {
    let randomNum = Math.floor(Math.random() * lootList.length);
    return (lootList[randomNum])
}

function lootGenerator(loots) {
    for (let cell of loots){
        let passive = document.getElementById(cell);
        passive.innerHTML = "?";
        passive.setAttribute("class", cell+"-loot");
        passive.style.backgroundImage = "url(" + '"' + chooseLoot() + '"' + ")";
        passive.style.backgroundSize= "contain";
        passive.style.backgroundRepeat= "no-repeat";
        passive.style.backgroundPosition= "50% 50%";

    }

}