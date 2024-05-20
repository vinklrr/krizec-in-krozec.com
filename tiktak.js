var cells = document.querySelectorAll('.cell');
var result = document.getElementById('result');
var resetButton = document.getElementById('reset-button');
var resetScoresButton = document.getElementById('reset-scores'); // Dodal resetiranje rezultatov
var xScoreDisplay = document.getElementById('x-score'); // Dodal prikaz točk igralca X
var oScoreDisplay = document.getElementById('o-score'); // Dodal prikaz točk igralca O
var currentPlayer = 'X';
var xScore = 0; // Dodal točke za igralca X
var oScore = 0; // Dodal točke za igralca O
var gameOver = false;

for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellClicked);
}

resetButton.addEventListener('click', resetGame);
resetScoresButton.addEventListener('click', resetScores); // Dodal poslušalca za gumb resetiranja točk

function cellClicked() {
    if (gameOver || this.textContent !== '') {
        return;
    }
    this.textContent = currentPlayer;
    this.classList.add(currentPlayer);
    checkWin();
    playClickSound();
    if (!gameOver) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    var winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (var i = 0; i < winningCombinations.length; i++) {
        if (cells[winningCombinations[i][0]].textContent === currentPlayer &&
            cells[winningCombinations[i][1]].textContent === currentPlayer &&
            cells[winningCombinations[i][2]].textContent === currentPlayer) {
            gameOver = true;
            result.textContent = currentPlayer + '  Zmaga!!!!';
            playWinSound();
            updateScores(currentPlayer); // Dodal posodobitev rezultatov ob zmagi
            highlightWinningCells(winningCombinations[i]);
            
            return;
            
        }
    }
    if (Array.prototype.every.call(cells, function (cell) {
        return cell.textContent !== '';
    })) {
        gameOver = true;
        result.textContent = 'Rezultat je izenačen!';
        playDrawSound();
        animateDraw();
        return;
    }
}

function resetGame() {
    addAnimation(resetButton); // Dodano za animacijo ob kliku
    for (var i = 0; i < cells.length; i++) {
      cells[i].textContent = '';
      cells[i].style.backgroundColor = 'white';
      cells[i].classList.remove('X', 'O', 'winning-cell', 'draw-animation');
    }
    result.textContent = '';
    currentPlayer = 'X';
    gameOver = false;
  }
  
  function resetScores() {
    addAnimation(resetScoresButton); // Dodano za animacijo ob kliku
    xScore = 0;
    oScore = 0;
    updateScoreDisplay();
  }

function updateScores(winner) {
    if (winner === 'X') {
        xScore++;
        
    } else if (winner === 'O') {
        oScore++;
    }
    updateScoreDisplay();
}

function updateScoreDisplay() {
    xScoreDisplay.textContent = xScore;
    oScoreDisplay.textContent = oScore;
}

function playClickSound() {
    var clickSound = new Audio('click_sound.mp3');
    clickSound.play();
}

function playWinSound() {
    var winSound = new Audio('win_sound.mp3');
    winSound.play();
}

function playDrawSound() {
    var drawSound = new Audio('draw_sound.mp3');
    drawSound.play();
}

function highlightWinningCells(winningCombination) {
    for (var i = 0; i < winningCombination.length; i++) {
        cells[winningCombination[i]].classList.add('winning-cell');
    }
}

function animateDraw() {
    for (var i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = 'blue';
        cells[i].classList.add('draw-animation');
    }
}

// Pridobimo elemente DOM
var instructionsModal = document.getElementById('instructions-modal');
var instructionsButton = document.getElementById('instructions-button');
var closeInstructionsBtn = document.getElementsByClassName('close')[1]; // Uporabljamo indeks [1] za pridobitev drugega gumba za zapiranje

// Funkcija za odpiranje modalnega okna z navodili
function openInstructionsModal() {
    instructionsModal.style.display = 'block';
}

// Funkcija za zapiranje modalnega okna z navodili
function closeInstructionsModal() {
    instructionsModal.style.display = 'none';
}

// Poslušalec dogodkov za odpiranje modalnega okna z navodili ob kliku na sliko
instructionsButton.addEventListener('click', openInstructionsModal);

// Poslušalec dogodkov za zapiranje modalnega okna z navodili ob kliku na gumb za zapiranje
closeInstructionsBtn.addEventListener('click', closeInstructionsModal);

// Poslušalec dogodkov za zapiranje modalnega okna z navodili ob kliku zunaj modalnega okna
window.addEventListener('click', function(event) {
    if (event.target == instructionsModal) {
        closeInstructionsModal();
    }
});
function addAnimation(button) {
    button.classList.add('animate-button');
    setTimeout(function() {
      button.classList.remove('animate-button');
    }, 300); // Ujemanje s časom animacije
  }

  var newGameButton = document.createElement('img');
newGameButton.src = 'gumb.png';
newGameButton.id = 'new-game-button';
newGameButton.alt = 'Nova igra';
document.getElementById('game').appendChild(newGameButton);

// Dodaj animacijo ob kliku na novo sliko gumba
newGameButton.addEventListener('click', function() {
    addAnimation(newGameButton);
    resetGame();
});

// Funkcija za dodajanje animacije na gumbe
function addAnimation(button) {
  button.classList.add('animate-button');
  setTimeout(function() {
    button.classList.remove('animate-button');
  }, 300); // Ujemanje s časom animacije
}

