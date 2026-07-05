import { gameSettings } from '../settings/settings';
import {
    addPoints,
    setLivesValue,
    setSpeedDisplay,
    setBoostMeter,
    flashDamage,
} from '../utils/points';

export const gameState = {
    isRunning: false,
    isGameOver: false,
    lives: gameSettings.startLives,
    speed: gameSettings.baseSpeed,
    boostMeter: gameSettings.boostMeterMax,
    isBoosting: false,
    invincibleUntil: 0,
    elapsedTime: 0,
};

export const resetGameState = () => {
    gameState.isRunning = true;
    gameState.isGameOver = false;
    gameState.lives = gameSettings.startLives;
    gameState.speed = gameSettings.baseSpeed;
    gameState.boostMeter = gameSettings.boostMeterMax;
    gameState.isBoosting = false;
    gameState.invincibleUntil = 0;
    gameState.elapsedTime = 0;
    setLivesValue(gameState.lives);
    setBoostMeter(gameState.boostMeter);
};

const distanceXZ = (a, b) => {
    const dx = a.x - b.x;
    const dz = a.z - b.z;
    return Math.sqrt(dx * dx + dz * dz);
};

// Call every frame. Returns true if game just ended this frame.
export const updateGame = (deltaTime, { player, powerups, obstacles, boostRequested, onGameOver }) => {
    if (!gameState.isRunning) return false;

    gameState.elapsedTime += deltaTime;

    // Difficulty ramp
    const rampedBase = Math.min(
        gameSettings.maxSpeed,
        gameSettings.baseSpeed + gameState.elapsedTime * gameSettings.speedRampPerSecond
    );

    // Boost handling
    gameState.isBoosting = boostRequested && gameState.boostMeter > 0;
    if (gameState.isBoosting) {
        gameState.boostMeter = Math.max(0, gameState.boostMeter - gameSettings.boostDrainPerSecond * deltaTime);
        gameState.speed = rampedBase * gameSettings.boostMultiplier;
    } else {
        gameState.speed = rampedBase;
    }

    setSpeedDisplay(gameState.speed * 400); // scaled for a readable "mph-ish" number
    setBoostMeter((gameState.boostMeter / gameSettings.boostMeterMax) * 100);

    // Survival points trickle
    addPoints(Math.round(gameSettings.pointsPerSecondSurvived * deltaTime));

    const now = performance.now();
    const isInvincible = now < gameState.invincibleUntil;

    // Powerup collection
    for (let i = powerups.length - 1; i >= 0; i--) {
        const p = powerups[i];
        if (distanceXZ(player.position, p.position) < 0.45) {
            addPoints(gameSettings.pointsPerPowerup);
            gameState.boostMeter = Math.min(
                gameSettings.boostMeterMax,
                gameState.boostMeter + gameSettings.boostRefillPerPickup
            );
            // Respawn far ahead instead of destroying, to keep the pool size constant
            p.position.z = randomRange(gameSettings.spawnZMin, gameSettings.spawnZMax);
            p.position.x = randomLaneX();
        }
    }

    // Obstacle collisions
    if (!isInvincible) {
        for (let i = 0; i < obstacles.length; i++) {
            const o = obstacles[i];
            const hitRadius = (o.userData.radius || 0.4) + (player.userData.collisionRadius || 0.3);
            if (distanceXZ(player.position, o.position) < hitRadius) {
                gameState.lives -= 1;
                setLivesValue(Math.max(0, gameState.lives));
                flashDamage();
                gameState.invincibleUntil = now + gameSettings.invincibilityDuration * 1000;

                // Push obstacle away so it doesn't repeatedly hit while respawning
                o.position.z = randomRange(gameSettings.spawnZMin, gameSettings.spawnZMax);
                o.position.x = randomLaneX();

                if (gameState.lives <= 0) {
                    gameState.isRunning = false;
                    gameState.isGameOver = true;
                    onGameOver();
                    return true;
                }
                break;
            }
        }
    }

    return false;
};

export const randomRange = (min, max) => Math.random() * (max - min) + min;

export const randomLaneX = () => {
    const half = Math.floor(gameSettings.laneCount / 2);
    const laneIndex = Math.floor(Math.random() * gameSettings.laneCount) - half;
    return laneIndex * gameSettings.laneWidth;
};