function playerInteraction(previous, current) {
    let previousCell = document.getElementById(`cell-${previous[0]}-${previous[1]}`);
    let currentCell = document.getElementById(`cell-${current[0]}-${current[1]}`);
    previousCell.style.backgroundImage = null;
    currentCell.style.backgroundImage = window.sessionStorage.getItem("AvatarC");
    currentCell.style.backgroundSize= "cover";
    currentCell.style.backgroundRepeat= "no-repeat";
    currentCell.style.backgroundPosition= "50% 50%";
    console.log(previousCell.className);
    if((previousCell.className).includes("used") || (previousCell.className).includes("door")){
        recoverLoot(previous)
    }
    if((previousCell.className).includes("MonsterDefeated")){
        recoverMonster(previous)
    }

    window.sessionStorage.setItem('previous-x', previous[0]);
    window.sessionStorage.setItem('previous-y', previous[1]);
    window.sessionStorage.setItem('current-x', current[0]);
    window.sessionStorage.setItem('current-y', current[1])
}

// avatar pick at the beginning of the game
function chooseAvatar(avatar) {
    let avatarInfo = [];
    let modal = document.getElementById("myModal");
    let container = document.getElementById("container");

    avatarInfo.push({
        class: "cell-1-1",
        img: "url("+'"'+"./assets/avatars/"+avatar+".jpg"+'"'+")",
        size: "cover",
        repeat: "no-repeat",
        position: "50% 50%"
    })
    window.sessionStorage.setItem('Avatar', JSON.stringify(avatarInfo));
    modal.style.display = "none";
    container.style.display = "none";
    gamePlay()
}