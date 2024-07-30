const cardImages = [
    'a.jpg', 'a.jpg',
    'an.jpg', 'an.jpg',
    'ba.avif', 'ba.avif',
    'baa.webp', 'baa.webp',
    'baaa.jpg', 'baaa.jpg',
    'cheeks.webp', 'cheeks.webp',
    'mt.jpg', 'mt.jpg',
    'baby.jpg', 'baby.jpg'
];

let moves = 0;
let firstCard = null;
let secondCard = null;
let timerInterval;
let seconds = 0;

const board = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('reset-button');

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = image;
    
    const img = document.createElement('img');
    img.src = image;
    card.appendChild(img);
    
    card.addEventListener('click', flipCard);
    
    return card;
}

function setupGame() {
    board.innerHTML = '';
    const shuffledImages = shuffle([...cardImages]);

    shuffledImages.forEach(image => {
        const card = createCard(image);
        board.appendChild(card);
    });

    moves = 0;
    movesDisplay.textContent = moves;
    seconds = 0;
    timerDisplay.textContent = seconds;
    messageDisplay.textContent = '';
    
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.textContent = seconds;
    }, 1000);
}

function flipCard() {
    if (firstCard && secondCard) return;

    this.classList.add('flipped');
    
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesDisplay.textContent = moves;

    if (firstCard.dataset.image === secondCard.dataset.image) {
        firstCard = null;
        secondCard = null;
        checkWin();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard = null;
            secondCard = null;
        }, 1000);
    }
}

function checkWin() {
    const cards = document.querySelectorAll('.card');
    if ([...cards].every(card => card.classList.contains('flipped'))) {
        clearInterval(timerInterval);
        messageDisplay.textContent = `Congratulations! You won in ${seconds} seconds and ${moves} moves.`;
    }
}

resetButton.addEventListener('click', setupGame);

setupGame();