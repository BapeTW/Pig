// TITLE
let player1 = {
    totalPts: 0,
    turnPts: 0,
    id: "p1",
    winnerId: 1
}

let player2 = {
    totalPts: 0,
    turnPts: 0,
    id: "p2",
    winnerId: 2
}

let nextPlayer;

//Add event listeners
document.getElementById("p1-roll").addEventListener("click", function () {
    pRoll(player1);
});
document.getElementById("p1-hold").addEventListener("click", function () {
    pHold(player1);
});
document.getElementById("p2-roll").addEventListener("click", function () {
    pRoll(player2);
});
document.getElementById("p2-hold").addEventListener("click", function () {
    pHold(player2);
});

// Event functions
function pRoll(aPlayer) {
    // Roll and update Dice Image
    let rollNum = Math.randomInt(1, 7);
    let rollNum2 = Math.randomInt(1, 7);
    document.getElementById(aPlayer.id + "-roll-img").src = "images/dice" + rollNum + ".png";
    document.getElementById(aPlayer.id + "-roll-img2").src = "images/dice" + rollNum2 + ".png";

    //Check if 1 or not
    if (rollNum != 1 && rollNum2 != 1) {
        if (rollNum == rollNum2) {
            // If you roll doubles, multiplies sum of rolled umbers by 1.5 and floors and adds to turn points
            aPlayer.turnPts += Math.floor((rollNum * 2) * 1.5);
        } else {
            // If you roll 2 non 1's and non doubles, add the two rolls and add to turn points
            aPlayer.turnPts += rollNum + rollNum2;
        }
    } else if (rollNum == 1 || rollNum2 == 1) {
        // If you roll a 1, take away turn points then switch turns
        aPlayer.turnPts = 0;
        // Switch turns
        switchTurns(aPlayer);
    } else if (rollNum == 1 && rollNum2 == 1) {
        // SNAKE EYES
        // Remove all points from player
        aPlayer.turnPts = 0;
        aPlayer.totalPts = 0;
        switchTurns(aPlayer);
    }
    // Set turn-points element after 
    document.getElementById(aPlayer.id + "-turn-points").innerHTML = aPlayer.turnPts;
}

//Check if a player holds and then add points
function pHold(aPlayer) {

    //Transfer turn to total
    aPlayer.totalPts += aPlayer.turnPts;
    document.getElementById(aPlayer.id + "-points").innerHTML = aPlayer.totalPts;
    document.getElementById(aPlayer.id + "-turn-points").innerHTML = 0;
    // Switch turns
    switchTurns(aPlayer);
}

// Switch turns for the players
function switchTurns(player) {
    // Set nextPlayer var based on current player
    if (player.id == "p1") {
        nextPlayer = 2;
    } else {
        nextPlayer = 1;
    }
    // Manipulate active button classes and header text based on player + nextPlayer
    document.getElementById(player.id + "-header").classList.remove("active");
    document.getElementById("p" + nextPlayer + "-header").classList.add("active");
    document.getElementById(player.id + "-roll").disabled = true;
    document.getElementById(player.id + "-hold").disabled = true;
    document.getElementById("p" + nextPlayer + "-roll").disabled = false;
    document.getElementById("p" + nextPlayer + "-hold").disabled = false;
    // Set turn points to 0
    player.turnPts = 0;
    // Check if the player has over 100 points. If they do, they win
    if (player.totalPts >= 100) {
        winner(player.winnerId);
    }
}

// Display the winner of the game and reset the game to default state
function winner(player) {
    // Displaye a message depending on the winner
     alert("Player " + player + " wins! Game reset.");
    //Reset total point vars
    player1.totalPts = 0;
    player2.totalPts = 0;
    // Use a for loop to reset html elements
    for (let x = 1; x <= 2; x++) {
        document.getElementById("p" + x + "-points").innerHTML = player1.totalPts;
        document.getElementById("p" + x + "-roll-img").src = "images/dice3.png";
        document.getElementById("p" + x +"-roll-img2").src = "images/dice3.png";
    }
}