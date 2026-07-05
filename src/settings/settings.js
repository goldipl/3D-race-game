// settings.js
export const cameraSettings = {
    position: {
        x: 0,
        y: 2.6,
        z: 5.2
    },
    fov: 75,
    near: 0.1,
    far: 1000
};

export const gameSettings = {
    startLives: 3,
    laneWidth: 1.5,
    laneCount: 5, // -2, -1, 0, 1, 2 lane indices
    playerXBound: 6,

    baseSpeed: 0.06,
    maxSpeed: 0.22,
    speedRampPerSecond: 0.0015, // difficulty increase over time
    boostMultiplier: 2.2,
    boostDuration: 2.2, // seconds
    boostMeterMax: 100,
    boostDrainPerSecond: 34,
    boostRefillPerPickup: 30,

    invincibilityDuration: 1.5, // seconds after taking damage
    pointsPerPowerup: 25,
    pointsPerSecondSurvived: 5,

    spawnZMin: -60,
    spawnZMax: -20,
    despawnZ: 8,

    powerupCount: 8,
    obstacleCount: 10,
};