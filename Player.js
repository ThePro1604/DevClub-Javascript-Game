function playerInteraction(previous, current) {
    let previousCell = document.getElementById(`cell-${previous[0]}-${previous[1]}`);
    let currentCell = document.getElementById(`cell-${current[0]}-${current[1]}`);
    previousCell.style.backgroundColor = null;
    currentCell.style.backgroundColor = "yellow";

    window.sessionStorage.setItem('previous-x', previous[0]);
    window.sessionStorage.setItem('previous-y', previous[1]);
    window.sessionStorage.setItem('current-x', current[0]);
    window.sessionStorage.setItem('current-y', current[1]);

}