import { gameSettings } from '../settings/settings';

export const inputState = {
    left: false,
    right: false,
    forward: false,
    back: false,
    boost: false,
};

export const addMoves = (player) => {
    // Keyboard
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
    const updateTouchInput = (touches) => {
        inputState.left = false;
        inputState.right = false;

        // Hold anywhere to boost
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

    window.addEventListener(
        'touchstart',
        (e) => {
            e.preventDefault();
            updateTouchInput(e.touches);
        },
        { passive: false }
    );

    window.addEventListener(
        'touchmove',
        (e) => {
            e.preventDefault();
            updateTouchInput(e.touches);
        },
        { passive: false }
    );

    window.addEventListener(
        'touchend',
        (e) => {
            e.preventDefault();
            updateTouchInput(e.touches);
        },
        { passive: false }
    );

    window.addEventListener(
        'touchcancel',
        (e) => {
            e.preventDefault();
            updateTouchInput(e.touches);
        },
        { passive: false }
    );
};

// Called every frame with deltaTime (seconds)
export const updatePlayerMovement = (player, deltaTime) => {
    const lateralSpeed = 4.0;
    const bound = gameSettings.playerXBound;

    if (inputState.left) player.position.x -= lateralSpeed * deltaTime;
    if (inputState.right) player.position.x += lateralSpeed * deltaTime;

    player.position.x = Math.max(-bound, Math.min(bound, player.position.x));

    // Slight tilt/lean into turns for a more dynamic feel
    const targetTilt = inputState.left ? 0.15 : inputState.right ? -0.15 : 0;
    player.rotation.z += (targetTilt - player.rotation.z) * Math.min(1, deltaTime * 8);

    // Slight forward/back bob (visual only)
    const targetPitch = inputState.forward ? -0.05 : inputState.back ? 0.05 : 0;
    player.rotation.x += (targetPitch - player.rotation.x) * Math.min(1, deltaTime * 8);
};