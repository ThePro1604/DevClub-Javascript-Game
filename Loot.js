function lootGenerator(loots) {
    for (let cell of loots){
        let passive = document.getElementById(cell);
        passive.innerHTML = "?";
        passive.style.backgroundColor = "green";
    }

}