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
    // window.sessionStorage.removeItem("tableData")
    if (window.sessionStorage.getItem("tableData")) {
        loadBoard()
    }
    else if (!window.sessionStorage.getItem("tableData")) {

        // Create an HTML table
        let table = document.createElement("table");
        table.setAttribute("id", "myGameBoard");
        table.style.backgroundImage = "url(./assets/flooring/pavement3.jpeg)"
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

        for (let i = 0; i < 180; i++) {
            let cellID = "cell-" + generateRandom() + "-" + generateRandom();
            let rand = Math.random();
            if (!(cellID === "cell-1-1")) {
                if (rand < 0.5) {
                    loots.push(cellID);
                } else {
                    monsters.push(cellID);
                }
            }
        }

        // Append the table to the document
        monsterGenerator(monsters)
        lootGenerator(loots)
        let startingCell = document.getElementById(`cell-${startingCoords[0]}-${startingCoords[1]}`);
        startingCell.style.backgroundColor = "yellow";
        saveBoard()
    }
}

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

function saveBoard() {
    const table = document.getElementById('myGameBoard');
// Create an array to hold the table data
    const tableData = [];

// Loop through the rows of the table
    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
        let rowData = [];
        // Loop through the cells of the row
        for (let j = 0; j < row.cells.length; j++) {
            let cell = row.cells[j];
            const cellData = [];
            // Add the cell data to the row object, using the
            // cell's id or class attribute as the key
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
            // console.log(tableRow[j])
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    document.body.appendChild(table);
    playerInteraction(previousLocation, currentLocation)
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            previousLocation = structuredClone(currentLocation);
            if(currentLocation[0] === 1){
            } else {
                currentLocation[0] = currentLocation[0] - 1;
            }

            playerInteraction(previousLocation, currentLocation);
            break;
        case "ArrowDown":
            previousLocation = structuredClone(currentLocation);
            if(currentLocation[0] === 25){
            } else {
                currentLocation[0] = currentLocation[0] + 1;
            }

            playerInteraction(previousLocation, currentLocation);
            break;
        case "ArrowLeft":
            previousLocation = structuredClone(currentLocation);
            if(currentLocation[1] === 1){
            } else {
                currentLocation[1] = currentLocation[1] - 1;
            }

            playerInteraction(previousLocation, currentLocation);
            break;
        case "ArrowRight":
            previousLocation = structuredClone(currentLocation);
            if(currentLocation[1] === 25){
            } else {
                currentLocation[1] = currentLocation[1] + 1;
            }
            playerInteraction(previousLocation, currentLocation);
            break;
    }
});
