let score = 0;
let treasureBox = 1;

function randomGuestName() {
    const names = [
        "Explorer",
        "Treasure Hunter",
        "Captain Gold",
        "Lucky Pirate",
        "Mystery Player"
    ];

    return names[Math.floor(Math.random() * names.length)];
}

function startGame() {

    let player = $("#playerName").val().trim();

    if (player === "") {
        player = randomGuestName();
    }

    $("#greeting").text("Good luck, " + player + "!");

    treasureBox = Math.floor(Math.random() * 3) + 1;

    score = 0;
    $("#score").text(score);

    $("#message").text("Choose a box!");
}

function saveScore(name, score) {

    let scores = JSON.parse(sessionStorage.getItem("scores")) || [];

    scores.push({
        player: name,
        score: score
    });

    scores.sort((a, b) => b.score - a.score);

    sessionStorage.setItem("scores", JSON.stringify(scores));
}

function loadLeaderboard() {

    let scores = JSON.parse(sessionStorage.getItem("scores")) || [];

    $("#leaderboardList").html("");

    scores.forEach(item => {

        $("#leaderboardList").append(
            `<li>${item.player} - ${item.score}</li>`
        );

    });

}

$("#startBtn").click(function () {

    startGame();

});

$(".box").click(function () {

    let chosen = Number($(this).data("box"));

    let player = $("#playerName").val().trim();

    if (player === "") {
        player = "Guest";
    }

    if (chosen === treasureBox) {

        score += 10;

        $("#score").text(score);

        $("#message").text("🎉 You found the treasure!");

        saveScore(player, score);

    }
    else {

        $("#message").text("❌ Wrong box. Try again!");

    }

});

$("#hintBtn").click(function () {

    if (treasureBox === 1) {

        $("#message").text("Hint: The treasure is in the first half.");

    }
    else {

        $("#message").text("Hint: The treasure is NOT in Box 1.");

    }

});

$("#resetBtn").click(function () {

    startGame();

});

$("#leaderboardBtn").click(function () {

    loadLeaderboard();

});

$("#conceptBtn").click(function () {

    $("#message").text("Concept Mode: Simple treasure hunt.");

});

$("#fullBtn").click(function () {

    $("#message").text("Full Game Mode Enabled!");

});