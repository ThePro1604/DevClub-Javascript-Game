const startingCoords = [1, 1];
let currentLocation = startingCoords;
let previousLocation = startingCoords;
const pavementArray = [
    "./assets/flooring/pavement1.jpeg",
    "./assets/flooring/pavement2.jpeg",
    "./assets/flooring/pavement3.jpeg",
    "./assets/flooring/pavement4.jpeg",
    "./assets/flooring/pavement5.jpeg"
];

function choosePavement() {
    let randomNum = Math.floor(Math.random() * pavementArray.length);
    return (pavementArray[randomNum])
}
function gamePlay() {
    if (window.sessionStorage.getItem("tableData")) {
        loadBoard()
    }
    else if (!window.sessionStorage.getItem("tableData")) {
        // popupModal()
        // Create an HTML table
        let table = document.createElement("table");
        table.setAttribute("id", "myGameBoard");
        table.style.backgroundImage = "url("+'"'+choosePavement()+'"'+")"
        // Fill the table with the values from the matrix
        for (let i = 1; i <= 25; i++) {
            let row = document.createElement("tr");
            for (let j = 1; j <= 25; j++) {
                let cell = document.createElement("td");
                cell.setAttribute("id", `cell-${i}-${j}`);


                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        document.body.appendChild(table);

        let loots = []
        let monsters = []
        const special = 250;
        const key_max = special/20;
        let count = 0;
        let keys = [];
        for (let i = 0; i < special; i++) {
            let cellID = "cell-" + generateRandom() + "-" + generateRandom();
            let rand = Math.random();
            if (!(cellID === "cell-1-1") && !(cellID === "cell-25-25")) {
                if (count < key_max) {
                    keys.push(cellID);
                    count = count + 1;
                }
                else if (rand < 0.5) {
                    loots.push(cellID);
                } else {
                    monsters.push(cellID);
                }
            }
        }

        // Append the table to the document
        monsterGenerator(monsters)
        lootGenerator(loots)
        keysGenerator(keys)

        window.sessionStorage.setItem('health', "100");
        window.sessionStorage.setItem('attack', "10");
        window.sessionStorage.setItem('defence', "10");
        document.getElementById("player-health").innerText = window.sessionStorage.getItem('health');
        document.getElementById("player-attack").innerText = window.sessionStorage.getItem('attack');
        document.getElementById("player-defence").innerText = window.sessionStorage.getItem('defence');
        window.sessionStorage.setItem('GameLog', JSON.stringify([]));

        const storageAvatar = JSON.parse(window.sessionStorage.getItem("Avatar"));
        let startCell = document.getElementById(`cell-${currentLocation[0]}-${currentLocation[1]}`);
        startCell.style.backgroundImage= storageAvatar[0].img;
        startCell.style.backgroundSize= storageAvatar[0].size;
        startCell.style.backgroundRepeat= storageAvatar[0].repeat;
        startCell.style.backgroundPosition= storageAvatar[0].position;
        window.sessionStorage.setItem('AvatarC', storageAvatar[0].img);

        window.sessionStorage.setItem('key', "Missing");
        let endCell = document.getElementById(`cell-25-25`);
        endCell.style.backgroundImage= "url(" + '"' + "./assets/loot/door.png" + '"' + ")";
        endCell.style.backgroundSize= "contain";
        endCell.style.backgroundRepeat= "no-repeat";
        endCell.style.backgroundPosition= "50% 50%";
        endCell.setAttribute("class", "end-door");


        saveBoard()
    }
}

function generateRandom(min = 1, max = 26) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor( rand * difference);
    rand = rand + min;
    return rand;
}

function saveBoard() {
    const table = document.getElementById('myGameBoard');
    const tableData = [];

    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
        let rowData = [];
        for (let j = 0; j < row.cells.length; j++) {
            let cell = row.cells[j];
            const cellData = [];
            try {
                cellData.push({
                    id: cell.id,
                    class: cell.className,
                    img: cell.style.backgroundImage,
                    size: cell.style.backgroundSize,
                    repeat: cell.style.backgroundRepeat,
                    position: cell.style.backgroundPosition
                })
            } catch (err) {
                cellData.push({id: cell.id})
            }
            rowData.push(cellData);
        }

        // Add the row object to the table data array
        tableData.push(rowData);
    }
// Save the table data to local storage
    window.sessionStorage.setItem('tableData', JSON.stringify(tableData));

    window.sessionStorage.setItem('previous-x', previousLocation[0]);
    window.sessionStorage.setItem('previous-y', previousLocation[1]);
    window.sessionStorage.setItem('current-x', currentLocation[0]);
    window.sessionStorage.setItem('current-y', currentLocation[1]);
}

function loadBoard() {
    previousLocation = [Number(window.sessionStorage.getItem("previous-x")), Number(window.sessionStorage.getItem("previous-y"))]
    currentLocation = [Number(window.sessionStorage.getItem("current-x")), Number(window.sessionStorage.getItem("current-y"))]
    const gameLog = document.getElementsByClassName("game-log");
    const storageGameLog = JSON.parse(window.sessionStorage.getItem("GameLog"));
    const retrieve = window.sessionStorage.getItem('tableData');
    const tableData = JSON.parse(retrieve);
    // Create an HTML table
    let table = document.createElement("table");
    table.setAttribute("id", "myGameBoard");
    table.style.backgroundImage = "url(./assets/flooring/pavement3.jpeg)"
    // Fill the table with the values from the matrix
    for (let i = 0; i < 25; i++) {
        let tableRow = tableData[i];
        let row = document.createElement("tr");
        for (let j = 0; j < 25; j++) {
            let cell = document.createElement("td");
            let tempCell = tableRow[j][0];
            cell.setAttribute("id", tempCell.id);
            if (tempCell.class.length > 1)
            {
                cell.setAttribute("class", tempCell.class);
                cell.style.backgroundImage = tempCell.img;
                cell.style.backgroundSize= tempCell.size;
                cell.style.backgroundRepeat= tempCell.repeat;
                cell.style.backgroundPosition= tempCell.position;
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    document.body.appendChild(table);
    playerInteraction(previousLocation, currentLocation)
    document.getElementById("player-health").innerText = window.sessionStorage.getItem('health');
    document.getElementById("player-attack").innerText = window.sessionStorage.getItem('attack');
    document.getElementById("player-defence").innerText = window.sessionStorage.getItem('defence');

    let lootUpdate;
    for (let i of storageGameLog) {
        lootUpdate = document.createElement("p");
        lootUpdate.innerHTML = i
        lootUpdate.style.fontSize = "15px";
        gameLog[0].appendChild(lootUpdate)
    }
    let endCell = document.getElementById(`cell-25-25`);
    document.getElementById("player-keys").innerText = window.sessionStorage.getItem('key');
    endCell.style.backgroundImage= "url(" + '"' + "./assets/loot/door.png" + '"' + ")";
    endCell.style.backgroundSize= "contain";
    endCell.style.backgroundRepeat= "no-repeat";
    endCell.style.backgroundPosition= "50% 50%";
    endCell.setAttribute("class", "end-door");

}
document.addEventListener("keydown", keyPress);
// document.addEventListener("keydown", (event) => {
function keyPress(event) {
    if (!window.sessionStorage.getItem("MonsterHealth")) {
        let cell;
        switch (event.key) {
            case "ArrowUp":
                previousLocation = structuredClone(currentLocation);
                if (currentLocation[0] === 1) {
                } else {
                    currentLocation[0] = currentLocation[0] - 1;
                }
                playerInteraction(previousLocation, currentLocation);
                cell = document.getElementById(`cell-${currentLocation[0]}-${currentLocation[1]}`);
                if (cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-monster`) {
                    monsterData(previousLocation, currentLocation)
                } else if (cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-loot`) {
                    lootData(previousLocation, currentLocation)
                } else if (cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-key`) {
                    keyData(previousLocation, currentLocation)
                } else if ((cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-key`) || (cell.className === `end-door`)) {
                    keyData(previousLocation, currentLocation)
                }

                break;
            case "ArrowDown":
                previousLocation = structuredClone(currentLocation);
                if (currentLocation[0] === 25) {
                } else {
                    currentLocation[0] = currentLocation[0] + 1;
                }
                playerInteraction(previousLocation, currentLocation);
                cell = document.getElementById(`cell-${currentLocation[0]}-${currentLocation[1]}`);
                if (cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-monster`) {
                    monsterData(previousLocation, currentLocation)
                } else if (cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-loot`) {
                    lootData(previousLocation, currentLocation)
                } else if (cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-key`) {
                    keyData(previousLocation, currentLocation)
                } else if ((cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-key`) || (cell.className === `end-door`)) {
                    keyData(previousLocation, currentLocation)
                }


                break;
            case "ArrowLeft":
                previousLocation = structuredClone(currentLocation);
                if (currentLocation[1] === 1) {
                } else {
                    currentLocation[1] = currentLocation[1] - 1;
                }
                playerInteraction(previousLocation, currentLocation);
                cell = document.getElementById(`cell-${currentLocation[0]}-${currentLocation[1]}`);
                if (cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-monster`) {
                    monsterData(previousLocation, currentLocation)
                } else if (cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-loot`) {
                    lootData(previousLocation, currentLocation)
                } else if (cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-key`) {
                    keyData(previousLocation, currentLocation)
                } else if ((cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-key`) || (cell.className === `end-door`)) {
                    keyData(previousLocation, currentLocation)
                }


                break;
            case "ArrowRight":
                previousLocation = structuredClone(currentLocation);
                if (currentLocation[1] === 25) {
                } else {
                    currentLocation[1] = currentLocation[1] + 1;
                }
                playerInteraction(previousLocation, currentLocation);
                cell = document.getElementById(`cell-${currentLocation[0]}-${currentLocation[1]}`);
                if (cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-monster`) {
                    monsterData(previousLocation, currentLocation)
                } else if (cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-loot`) {
                    lootData(previousLocation, currentLocation)
                } else if ((cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-key`) || (cell.className === `end-door`)) {
                    keyData(previousLocation, currentLocation)
                }

                break;
        }
    }
}
// });