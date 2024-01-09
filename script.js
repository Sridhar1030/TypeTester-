$(document).ready(function() {
    var Duration = parseInt(prompt("Enter time")); // Set game duration in seconds
    var timer;
    var time = 5000;
    var count = 0;

    function generateRandom() {
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var randomIndex = Math.floor(Math.random() * alphabet.length);
        console.log(randomIndex);
        return alphabet[randomIndex];
    }

    function updateRandomLetter() {
        var random = generateRandom();
        $("#randomLetter").text(random);
        count += 1;
    }

    function updateScore() {
        var currentScore = parseInt($("#score").text());
        $("#score").text(currentScore + 1);
    }

    function endGame() {
        clearInterval(timer); // Stop the timer
        var currentScore = parseInt($("#score").text());

        $("#randomLetter").text("Game Over!");
        alert("Your score is: " + currentScore + " out of " + count);
        $(document).off("keypress"); // Turn off keypress event listener
    }

    function toggleDarkMode() {
        $("body").toggleClass("dark-mode");
    }

    // Initial setup
    updateRandomLetter();

    // Listen for keypress events
    $(document).keypress(function(event) {
        var userTypedLetter = event.key.toUpperCase();
        var randomLetter = $("#randomLetter").text();
        $("h2").css("color", "red");
        $("h2").text(userTypedLetter);
        if (userTypedLetter === randomLetter) {
            updateScore();
            updateRandomLetter();
            clearInterval(timer); // Stop the current timer
            timer = setInterval(function() {
                updateRandomLetter();
            }, time); // Start a new timer with the same interval
        } else {
            updateRandomLetter();
        }
    });

    // Auto-update random letter every 5 seconds
    timer = setInterval(function() {
        updateRandomLetter();
    }, time);

    // End the game after the specified duration
    setTimeout(function() {
        endGame();
    }, Duration * 1000);

    // Dark mode button click event
    $("#darkModeButton").click(function() {
        toggleDarkMode();
    });
});
