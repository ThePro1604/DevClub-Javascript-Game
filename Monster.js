function monsterGenerator(monsters) {
    for (let cell of monsters){
        let hostile = document.getElementById(cell);
        hostile.innerHTML = "?";
        hostile.style.backgroundColor = "red";
    }

}