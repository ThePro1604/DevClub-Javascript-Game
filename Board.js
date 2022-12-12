const startingCoords = [1, 1];
let currentLocation = startingCoords;
let previousLocation = startingCoords;

function gamePlay() {
    // Create a 25 by 25 matrix
    let matrix = [];
    for (let i = 1; i <= 25; i++) {
        matrix[i] = new Array(25);
    }

    // Create an HTML table
    let table = document.createElement("table");
    table.setAttribute("id", "myGameBoard");

    // Fill the table with the values from the matrix
    for (let i = 1; i <= 25; i++) {
        let row = document.createElement("tr");
        for (let j = 1; j <= 25; j++) {
            let cell = document.createElement("td");
            cell.setAttribute("id", `cell-${i}-${j}`);
            cell.innerHTML = "x";

            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    document.body.appendChild(table);

    let loots = []
    let monsters = []

    for (let i = 0; i < 300; i++) {
        let cellID = "cell-" + generateRandom() + "-" + generateRandom();
        let rand = Math.random();
        if (rand < 0.5) {
            loots.push(cellID);
        }
        else {
            monsters.push(cellID);
        }
    }

    // Append the table to the document
    document.body.appendChild(table);

    monsterGenerator(monsters)
    lootGenerator(loots)
    let startingCell = document.getElementById(`cell-${startingCoords[0]}-${startingCoords[1]}`);
    startingCell.style.backgroundColor = "yellow";

}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            previousLocation = structuredClone(currentLocation);
            if(currentLocation[0] === 1){
                // currentLocation[0] = 25;
            } else {
                currentLocation[0] = currentLocation[0] - 1;
            }

            // monsterGenerator();
            playerInteraction(previousLocation, currentLocation);
            // lootGenerator();
            break;
        case "ArrowDown":
            previousLocation = structuredClone(currentLocation);
            if(currentLocation[0] === 25){
                // currentLocation[0] = 1;
            } else {
                currentLocation[0] = currentLocation[0] + 1;
            }

            // monsterGenerator();
            playerInteraction(previousLocation, currentLocation);
            // lootGenerator();
            break;
        case "ArrowLeft":
            previousLocation = structuredClone(currentLocation);
            if(currentLocation[1] === 1){
                // currentLocation[1] = 25;
            } else {
                currentLocation[1] = currentLocation[1] - 1;
            }

            // monsterGenerator();
            playerInteraction(previousLocation, currentLocation);
            // lootGenerator();
            break;
        case "ArrowRight":
            previousLocation = structuredClone(currentLocation);
            if(currentLocation[1] === 25){
                // currentLocation[1] = 1;
            } else {
                currentLocation[1] = currentLocation[1] + 1;
            }
            // monsterGenerator();
            playerInteraction(previousLocation, currentLocation);
            // lootGenerator();
            break;
    }
});


function generateRandom(min = 1, max = 26) {

    // find diff
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = Math.floor( rand * difference);

    // add with min value
    rand = rand + min;

    return rand;
}

