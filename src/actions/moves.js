import { gameSettings } from '../settings/settings';

export const inputState = {
    left: false,
    right: false,
    forward: false,
    back: false,
    boost: false,
};

let touchControlsEnabled = false;

const updateTouchInput = (touches) => {
    inputState.left = false;
    inputState.right = false;

    // Hold anywhere on the game area to boost
    inputState.boost = touches.length > 0;

    for (let i = 0; i < touches.length; i++) {
        const touch = touches[i];

        if (touch.clientX < window.innerWidth / 2) {
            inputState.left = true;
        } else {
            inputState.right = true;
        }
    }
};

const isUIElement = (target) => {
    return target.closest(
        '#starter-screen, #gameover-screen, button'
    );
};

const handleTouchStart = (e) => {
    if (!touchControlsEnabled || isUIElement(e.target)) return;

    e.preventDefault();
    updateTouchInput(e.touches);
};

const handleTouchMove = (e) => {
    if (!touchControlsEnabled || isUIElement(e.target)) return;

    e.preventDefault();
    updateTouchInput(e.touches);
};

const handleTouchEnd = (e) => {
    if (!touchControlsEnabled) return;

    e.preventDefault();
    updateTouchInput(e.touches);
};

export const enableTouchControls = () => {
    touchControlsEnabled = true;
};

export const disableTouchControls = () => {
    touchControlsEnabled = false;

    inputState.left = false;
    inputState.right = false;
    inputState.boost = false;
};

export const addMoves = (player) => {
    // Keyboard controls
    window.addEventListener('keydown', (e) => {
        const key = e.key.toLowerCase();

        if (key === 'd' || key === 'arrowright') inputState.right = true;
        if (key === 'a' || key === 'arrowleft') inputState.left = true;
        if (key === 'w' || key === 'arrowup') inputState.forward = true;
        if (key === 's' || key === 'arrowdown') inputState.back = true;
        if (key === ' ' || key === 'shift') inputState.boost = true;
    });

    window.addEventListener('keyup', (e) => {
        const key = e.key.toLowerCase();

        if (key === 'd' || key === 'arrowright') inputState.right = false;
        if (key === 'a' || key === 'arrowleft') inputState.left = false;
        if (key === 'w' || key === 'arrowup') inputState.forward = false;
        if (key === 's' || key === 'arrowdown') inputState.back = false;
        if (key === ' ' || key === 'shift') inputState.boost = false;
    });

    // Mobile touch controls
    window.addEventListener(
        'touchstart',
        handleTouchStart,
        { passive: false }
    );

    window.addEventListener(
        'touchmove',
        handleTouchMove,
        { passive: false }
    );

    window.addEventListener(
        'touchend',
        handleTouchEnd,
        { passive: false }
    );

    window.addEventListener(
        'touchcancel',
        handleTouchEnd,
        { passive: false }
    );
};


// Called every frame with deltaTime (seconds)
export const updatePlayerMovement = (player, deltaTime) => {
    const lateralSpeed = 4.0;
    const bound = gameSettings.playerXBound;

    if (inputState.left) {
        player.position.x -= lateralSpeed * deltaTime;
    }

    if (inputState.right) {
        player.position.x += lateralSpeed * deltaTime;
    }

    player.position.x = Math.max(
        -bound,
        Math.min(bound, player.position.x)
    );

    // Lean while turning
    const targetTilt = inputState.left
        ? 0.15
        : inputState.right
            ? -0.15
            : 0;

    player.rotation.z +=
        (targetTilt - player.rotation.z) *
        Math.min(1, deltaTime * 8);

    // Visual pitch
    const targetPitch = inputState.forward
        ? -0.05
        : inputState.back
            ? 0.05
            : 0;

    player.rotation.x +=
        (targetPitch - player.rotation.x) *
        Math.min(1, deltaTime * 8);
};