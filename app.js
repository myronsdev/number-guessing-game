// game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max);
guessesLeft = 3;

// ui elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// assign min and max values
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    //clear input
    clearInput();
    window.location.reload();
  }
  console.log(1);
});

// listen for guess click
guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);

  // validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // check if guess is correct
  if (guess === winningNum) {
    //game over and you won
    gameOver(true, `${winningNum} is correct! You Win!`);
  } else {
    // wrong answer
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // game over and you lost
      gameOver(
        false,
        `Game over, you lost. The correct number was ${winningNum}`
      );
    } else {
      // game continues -- answer wrong
      //clear input
      clearInput();
      // notift of wrong answer
      setMessage(
        `${guess} is not correct. ${guessesLeft} guesses left.`,
        "red"
      );
    }
  }
});

// gameOver function
function gameOver(won, msg) {
  // disable input
  guessInput.disabled = true;

  // set color based on game result
  let color;
  won === true ? (color = "green") : (color = "red");

  // update border and text color
  guessInput.style.borderColor = color;
  message.style.color = color;

  // set message
  setMessage(msg);

  // play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// get winningNum function
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// setMessage function
function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}

// clear guessInput function
function clearInput() {
  guessInput.value = "";
}
