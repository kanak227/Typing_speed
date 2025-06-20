const textToType = document.getElementById("textToType");
const hiddenInput = document.getElementById("hiddenInput");
const timerDisplay = document.getElementById("timer");

let targetText = "The quick brown fox jumps over the lazy dog.";
let userInput = "";
let time = 0;
let timerInterval = null;
let timerStarted = false;
let totalTime = 60;

// Render all characters with spans initially
function renderInitialText() {
  const characters = targetText.split('').map(char => `<span class="char">${char}</span>`).join('');
  textToType.innerHTML = characters;
}
renderInitialText();

window.onload = () => hiddenInput.focus();
document.getElementById("typingBox").addEventListener("click", () => hiddenInput.focus());

function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    timerDisplay.textContent = `Time: ${time}s`;
    if (time >= totalTime) {
      stopTimer();
      showResults();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  hiddenInput.disabled = true;
}

function showResults() {
  const wordsTyped = userInput.trim().split(/\s+/).length;
  const wpm = Math.round((wordsTyped / time) * 60) || 0;
  timerDisplay.textContent += ` | WPM: ${wpm}`;
}

hiddenInput.addEventListener("input", () => {
  if (!timerStarted) {
    timerStarted = true;
    startTimer();
  }

  userInput = hiddenInput.value;
  updateTextOverlay();
});

function updateTextOverlay() {
  const spans = textToType.querySelectorAll("span.char");
  for (let i = 0; i < spans.length; i++) {
    if (i < userInput.length) {
      if (userInput[i] === targetText[i]) {
        spans[i].classList.add("correct");
        spans[i].classList.remove("wrong");
      } else {
        spans[i].classList.add("wrong");
        spans[i].classList.remove("correct");
      }
    } else {
      spans[i].classList.remove("correct", "wrong");
    }
  }
}
