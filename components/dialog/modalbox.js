function popupModal() {
    if (window.sessionStorage.getItem("tableData")) {
        let container = document.getElementById("container");
        container.style.display = "none";
        loadBoard()
    } else if (!window.sessionStorage.getItem("tableData")) {
        let modal = document.getElementById("myModal");
        modal.style.display = "block";
    }
}