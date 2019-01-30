// game values
let min = 1,
  max = 30,
  winningNum = 2,
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
      guessInput.value = "";
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
}

// setMessage function
function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}
