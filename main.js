import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { addMoves, updatePlayerMovement, inputState } from './src/actions/moves';
import { ground, road, createLaneMarkings } from './src/scene/ground';
import { player } from './src/scene/player';
import './src/css/style.css';
import * as THREE from 'three';
import { powerup } from './src/utils/powerup';
import { createObstacle } from './src/utils/obstacle';
import { cameraSettings, gameSettings } from './src/settings/settings';
import { setSkyBackground } from './src/scene/sky';
import { setPointsValue, setLivesValue, setBoostMeter } from './src/utils/points';
import { gameState, resetGameState, updateGame, randomRange, randomLaneX } from './src/logic/gameLogic';

const scene = new THREE.Scene();

setSkyBackground(scene);

const camera = new THREE.PerspectiveCamera(
    cameraSettings.fov,
    window.innerWidth / window.innerHeight,
    cameraSettings.near,
    cameraSettings.far
);
camera.position.set(cameraSettings.position.x, cameraSettings.position.y, cameraSettings.position.z);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

/* orbit control (kept for debugging; disabled once the game starts so it doesn't fight the follow-cam) */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const sunLight = new THREE.DirectionalLight(0xffffff, 1.1);
sunLight.position.set(10, 20, 10);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.camera.left = -30;
sunLight.shadow.camera.right = 30;
sunLight.shadow.camera.top = 30;
sunLight.shadow.camera.bottom = -30;
scene.add(sunLight);

scene.add(ground);
scene.add(road);
scene.add(createLaneMarkings());
scene.add(player);

// Powerups pool
const powerups = [];
for (let i = 0; i < gameSettings.powerupCount; i++) {
    const newPowerup = powerup.clone();
    newPowerup.name = 'powerup' + (i + 1);
    newPowerup.position.x = randomLaneX();
    newPowerup.position.z = randomRange(gameSettings.spawnZMin, gameSettings.spawnZMax);
    powerups.push(newPowerup);
    scene.add(newPowerup);
}

// Obstacles pool
const obstacles = [];
for (let i = 0; i < gameSettings.obstacleCount; i++) {
    const newObstacle = createObstacle();
    newObstacle.name = 'obstacle' + (i + 1);
    newObstacle.position.x = randomLaneX();
    newObstacle.position.z = randomRange(gameSettings.spawnZMin, gameSettings.spawnZMax);
    obstacles.push(newObstacle);
    scene.add(newObstacle);
}

const moveObjects = (arr, speed) => {
    arr.forEach((el) => {
        el.position.z += speed;
        if (el.position.z > gameSettings.despawnZ) {
            el.position.x = randomLaneX();
            el.position.z = randomRange(gameSettings.spawnZMin, gameSettings.spawnZMax);
        }
    });
};

let lastTime = performance.now();

const showGameOverScreen = () => {
    const gameOverScreen = document.getElementById('gameover-screen');
    const finalScore = document.getElementById('final-score');

    finalScore.innerText = document.querySelector('#game-points span').innerText;

    gameOverScreen.style.display = 'flex';

    document.getElementById('game-points').style.display = 'none';
    document.getElementById('game-lives').style.display = 'none';
    document.getElementById('game-speed').style.display = 'none';
    document.getElementById('boost-meter').style.display = 'none';

    toggleMobileControls(false);
};

const animate = () => {
    requestAnimationFrame(animate);

    const now = performance.now();
    const deltaTime = Math.min(0.1, (now - lastTime) / 1000);
    lastTime = now;

    if (gameState.isRunning) {
        updatePlayerMovement(player, deltaTime);

        const gameOverThisFrame = updateGame(deltaTime, {
            player,
            powerups,
            obstacles,
            boostRequested: inputState.boost,
            onGameOver: showGameOverScreen,
        });

        if (!gameOverThisFrame) {
            const scrollSpeed = gameState.speed;
            moveObjects(powerups, scrollSpeed);
            moveObjects(obstacles, scrollSpeed);

            // Spin powerups for visual juice
            powerups.forEach((p) => {
                p.rotation.z += deltaTime * 2;
            });

            // Camera gently follows player's x position for a dynamic feel
            camera.position.x += (player.position.x * 0.3 - (camera.position.x - cameraSettings.position.x)) * 0.05;
            camera.lookAt(player.position.x * 0.5, 0.3, player.position.z - 4);
        }
    }

    renderer.render(scene, camera);
    controls.update();
};

const toggleMobileControls = (show) => {
    const mobileControls = document.getElementById('mobile-controls');

    if (!mobileControls) return;

    mobileControls.classList.toggle('active', show);
};

const startGame = () => {
    const starterScreen = document.getElementById('starter-screen');
    const gamePoints = document.getElementById('game-points');
    const gameLives = document.getElementById('game-lives');
    const gameSpeed = document.getElementById('game-speed');
    const boostMeter = document.getElementById('boost-meter');

    starterScreen.style.display = 'none';
    gamePoints.style.display = 'block';
    gameLives.style.display = 'flex';
    gameSpeed.style.display = 'block';
    boostMeter.style.display = 'block';

    toggleMobileControls(true);

    player.position.set(0, 0.25, 0);
    setPointsValue(0);
    resetGameState();
    animate();
};

const restartGame = () => {
    const gameOverScreen = document.getElementById('gameover-screen');
    const gamePoints = document.getElementById('game-points');
    const gameLives = document.getElementById('game-lives');
    const gameSpeed = document.getElementById('game-speed');
    const boostMeter = document.getElementById('boost-meter');

    toggleMobileControls(true);

    gameOverScreen.style.display = 'none';
    gamePoints.style.display = 'block';
    gameLives.style.display = 'flex';
    gameSpeed.style.display = 'block';
    boostMeter.style.display = 'block';

    player.position.set(0, 0.25, 0);
    setPointsValue(0);
    resetGameState();
};

document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('restart-button').addEventListener('click', restartGame);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

addMoves(player);

// Initial UI state
setPointsValue(0);
setLivesValue(gameSettings.startLives);
setBoostMeter(100);