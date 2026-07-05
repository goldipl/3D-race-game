// points.js
let points = document.querySelector('#game-points span');
let livesContainer = document.querySelector('#game-lives');
let speedEl = document.querySelector('#game-speed span');
let boostFill = document.querySelector('#boost-fill');

let currentPoints = 0;
let currentLives = 3;

export const setPointsValue = (value) => {
    currentPoints = value;
    if (points) points.innerText = `${value}`;
};

export const addPoints = (amount) => {
    setPointsValue(currentPoints + amount);
};

export const getPoints = () => currentPoints;

export const setLivesValue = (lives) => {
    currentLives = lives;
    if (!livesContainer) return;
    livesContainer.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.textContent = '❤️';
        livesContainer.appendChild(heart);
    }
};

export const getLives = () => currentLives;

export const setSpeedDisplay = (speedUnits) => {
    if (speedEl) speedEl.innerText = `${Math.round(speedUnits)}`;
};

export const setBoostMeter = (percent) => {
    if (boostFill) boostFill.style.width = `${Math.max(0, Math.min(100, percent))}%`;
};

export const flashDamage = () => {
    const overlay = document.querySelector('#damage-flash');
    if (!overlay) return;
    overlay.classList.remove('flash-active');
    void overlay.offsetWidth; // restart animation
    overlay.classList.add('flash-active');
};