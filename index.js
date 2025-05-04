const emojis = ['😀', '🐶', '🍕', '🚗', '🏀', '🎵', '🌈', '🧩'];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

const board = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  board.innerHTML = '';
  cards = shuffle([...emojis, ...emojis]);

  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;

    const inner = document.createElement('div');
    inner.classList.add('card-inner');
    inner.textContent = '';
    card.appendChild(inner);

    card.addEventListener('click', handleCardClick);
    board.appendChild(card);
  });
}

function handleCardClick(e) {
  const card = e.currentTarget;
  if (lockBoard || card.classList.contains('flipped') || card === firstCard) return;

  flipCard(card);

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    lockBoard = true;
    checkForMatch();
  }
}

function flipCard(card) {
  card.classList.add('flipped');
  card.querySelector('.card-inner').textContent = card.dataset.emoji;
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard.querySelector('.card-inner').textContent = '';
    secondCard.querySelector('.card-inner').textContent = '';
    resetBoard();
  }, 1000);
}

function checkForMatch() {
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
  if (isMatch) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
  } else {
    unflipCards();
  }
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

restartBtn.addEventListener('click', createBoard);
createBoard();