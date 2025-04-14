const emojis = ['🍕', '🚗', '🐶', '🎧', '🏀', '🌈', '🐱', '🍔'];
let cards = [...emojis, ...emojis]; 
let flippedCards = [];
let matchedCards = 0;
let startTime;
let timerInterval;

const gameBoard = document.getElementById('gameBoard');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restartBtn');
const endScreen = document.getElementById('endScreen');
const finalTime = document.getElementById('finalTime');


function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}


function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = `⏱️ ${elapsedSeconds}s`;
  }, 1000);
}


function stopTimer() {
  clearInterval(timerInterval);
}


function createBoard() {
  gameBoard.innerHTML = '';
  endScreen.style.display = 'none';
  matchedCards = 0;
  flippedCards = [];
  cards = shuffle(cards);

  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.textContent = '';
    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
  });

  startTimer();
}


function handleCardClick(e) {
  const clickedCard = e.target;

  if (
    clickedCard.classList.contains('flipped') ||
    clickedCard.classList.contains('matched') ||
    flippedCards.length === 2
  ) return;

  clickedCard.classList.add('flipped');
  clickedCard.textContent = clickedCard.dataset.emoji;
  flippedCards.push(clickedCard);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedCards += 2;
      flippedCards = [];

      if (matchedCards === cards.length) {
        stopTimer();
        const totalTime = Math.floor((Date.now() - startTime) / 1000);
        finalTime.textContent = totalTime;
        endScreen.style.display = 'block';
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
        flippedCards = [];
      }, 1000);
    }
  }
}


restartBtn.addEventListener('click', () => {
  stopTimer();
  timerDisplay.textContent = '⏱️ 0s';
  createBoard();
});

createBoard();
