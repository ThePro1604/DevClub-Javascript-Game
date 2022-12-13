function popupModalFight() {
    let container = document.getElementById("containerfight");
    let modal = document.getElementById("myModal-fight");
    if (window.sessionStorage.getItem("MonsterHealth")) {
        modal.style.display = "block";
        container.style.display = "block";
    } else if (!window.sessionStorage.getItem("MonsterHealth")) {
        modal.style.display = "none";
        container.style.display = "none";
    }
}