function playerInteraction(previous, current) {
    let previousCell = document.getElementById(`cell-${previous[0]}-${previous[1]}`);
    let currentCell = document.getElementById(`cell-${current[0]}-${current[1]}`);
    previousCell.style.backgroundColor = "white";
    currentCell.style.backgroundColor = "yellow";

}