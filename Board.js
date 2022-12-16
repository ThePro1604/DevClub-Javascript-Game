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

// random background
function choosePavement() {
    let randomNum = Math.floor(Math.random() * pavementArray.length);
    return (pavementArray[randomNum])
}

function gamePlay() {
    if (window.sessionStorage.getItem("tableData")) {
        loadBoard()
    }
    else if (!window.sessionStorage.getItem("tableData")) {

        // Creating the board HTML table
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

        // generating random keys / monster / loot cells
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
        monsterGenerator(monsters)
        lootGenerator(loots)
        keysGenerator(keys)

        // setting the stats in the SessionStorage for future pulls
        window.sessionStorage.setItem('key', "Missing");
        window.sessionStorage.setItem('health', "100");
        window.sessionStorage.setItem('attack', "10");
        window.sessionStorage.setItem('defence', "10");
        window.sessionStorage.setItem('GameLog', JSON.stringify([]));
        window.sessionStorage.setItem('SpecialCount', "4");
        window.sessionStorage.setItem('OPMCount', "0");
        window.sessionStorage.setItem('UltimateCount', "0");

        const storageAvatar = JSON.parse(window.sessionStorage.getItem("Avatar"));

        // setting the starting point
        let startCell = document.getElementById(`cell-${currentLocation[0]}-${currentLocation[1]}`);
        startCell.style.backgroundImage= storageAvatar[0].img;
        startCell.style.backgroundSize= storageAvatar[0].size;
        startCell.style.backgroundRepeat= storageAvatar[0].repeat;
        startCell.style.backgroundPosition= storageAvatar[0].position;
        window.sessionStorage.setItem('AvatarC', storageAvatar[0].img);

        // setting the end point
        window.sessionStorage.setItem('key', "Missing");
        let endCell = document.getElementById(`cell-25-25`);
        endCell.style.backgroundImage= "url(" + '"' + "./assets/loot/door.png" + '"' + ")";
        endCell.style.backgroundSize= "contain";
        endCell.style.backgroundRepeat= "no-repeat";
        endCell.style.backgroundPosition= "50% 50%";
        endCell.setAttribute("class", "end-door");

        // adding the player default stats to the page
        document.getElementById("player-keys").innerText = window.sessionStorage.getItem('key');
        document.getElementById("player-health").innerText = window.sessionStorage.getItem('health');
        document.getElementById("player-attack").innerText = window.sessionStorage.getItem('attack');
        document.getElementById("player-defence").innerText = window.sessionStorage.getItem('defence');

        saveBoard()
    }
}

// Random number generator for the loot / monsters / keys
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

    // converts the HTML table into an array in order to save in SessionStorage
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
        tableData.push(rowData);
    }
    // Save the table data to local storage and updated coordinates
    window.sessionStorage.setItem('tableData', JSON.stringify(tableData));
    window.sessionStorage.setItem('previous-x', previousLocation[0]);
    window.sessionStorage.setItem('previous-y', previousLocation[1]);
    window.sessionStorage.setItem('current-x', currentLocation[0]);
    window.sessionStorage.setItem('current-y', currentLocation[1]);
}

function loadBoard() {
    // set variables that needed for the code to run smoothly
    previousLocation = [Number(window.sessionStorage.getItem("previous-x")), Number(window.sessionStorage.getItem("previous-y"))]
    currentLocation = [Number(window.sessionStorage.getItem("current-x")), Number(window.sessionStorage.getItem("current-y"))]
    const gameLog = document.getElementsByClassName("game-log");
    const storageGameLog = JSON.parse(window.sessionStorage.getItem("GameLog"));
    const retrieve = window.sessionStorage.getItem('tableData');
    const tableData = JSON.parse(retrieve);
    document.getElementById("special-counter").innerHTML = window.sessionStorage.getItem('SpecialCount');

    // pulling the table array from memory and converting it back to HTML table
    const table = document.createElement("table");
    table.setAttribute("id", "myGameBoard");
    table.style.backgroundImage = "url("+'"'+choosePavement()+'"'+")";
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

    // adding the player stats and location back to the page
    playerInteraction(previousLocation, currentLocation)
    document.getElementById("player-health").innerText = window.sessionStorage.getItem('health');
    document.getElementById("player-attack").innerText = window.sessionStorage.getItem('attack');
    document.getElementById("player-defence").innerText = window.sessionStorage.getItem('defence');
    document.getElementById("player-keys").innerText = window.sessionStorage.getItem('key');

    // updating the GameLog with all its previous information
    let lootUpdate;
    for (let i of storageGameLog) {
        lootUpdate = document.createElement("p");
        lootUpdate.innerHTML = i
        lootUpdate.style.fontSize = "15px";
        gameLog[0].appendChild(lootUpdate)
    }
}

// recognize the movement keystrokes
document.addEventListener("keydown", keyPress);
function keyPress(event) {
    if (!(window.sessionStorage.getItem("MonsterHealth"))) {
        if (window.sessionStorage.getItem("inDoor") !== "True") {
            switch (event.key) {
                case "ArrowUp":
                    previousLocation = structuredClone(currentLocation);
                    if (currentLocation[0] === 1) {
                    } else {
                        currentLocation[0] = currentLocation[0] - 1;
                    }
                    classSpread(previousLocation, currentLocation)
                    break;

                case "ArrowDown":
                    previousLocation = structuredClone(currentLocation);
                    if (currentLocation[0] === 25) {
                    } else {
                        currentLocation[0] = currentLocation[0] + 1;
                    }
                    classSpread(previousLocation, currentLocation)
                    break;

                case "ArrowLeft":
                    previousLocation = structuredClone(currentLocation);
                    if (currentLocation[1] === 1) {
                    } else {
                        currentLocation[1] = currentLocation[1] - 1;
                    }
                    classSpread(previousLocation, currentLocation)
                    break;

                case "ArrowRight":
                    previousLocation = structuredClone(currentLocation);
                    if (currentLocation[1] === 25) {
                    } else {
                        currentLocation[1] = currentLocation[1] + 1;
                    }
                    classSpread(previousLocation, currentLocation)
                    break;
            }
        }
    }
}

function classSpread(previousLocation, currentLocation) {
    // In-charge of player movement on the map
    playerInteraction(previousLocation, currentLocation);
    let cell = document.getElementById(`cell-${currentLocation[0]}-${currentLocation[1]}`);

    // Recognized if the current cell contains a monster
    if (cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-monster`) {
        monsterData(previousLocation, currentLocation)
    }
    // Recognized if the current cell contains loot
    else if (cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-loot`) {
        lootData(previousLocation, currentLocation)
    }
    // Recognized if the current cell contains a key
    else if (cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-key`) {
        keyData(previousLocation, currentLocation)
    }
    // Recognized if the current cell contains the finish door
    else if ((cell.className === `cell-${currentLocation[0]}-${currentLocation[1]}-key`) || (cell.className === `end-door`)) {
        keyData(previousLocation, currentLocation)
    }
}
