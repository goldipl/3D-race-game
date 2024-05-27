import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { addMoves } from './src/actions/moves';
import { ground } from './src/scene/ground';
import { player } from './src/scene/player';
import './style.css';
import * as THREE from 'three';
import { powerup } from './src/utils/powerup';
import { cameraSettings } from './src/settings/settings';
import { setSkyBackground } from './src/scene/sky';
import { setPointsValue } from './src/utils/points';

const scene = new THREE.Scene();

setSkyBackground(scene); // Set the sky background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Camera position
camera.position.set(cameraSettings.position.x, cameraSettings.position.y, cameraSettings.position.z);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* orbit control */
const controls = new OrbitControls(camera, renderer.domElement);

const gridHelper = new THREE.GridHelper(30, 30);
scene.add(gridHelper);

scene.add(ground);
scene.add(player);

const randomRangeNumber = (min, max) => {
  const randomDecimal = Math.random() * (max - min) + min;
  const roundedNumber = Math.round(randomDecimal * 2) / 2; // Rounds to the nearest 0.5
  return roundedNumber;
}

const moveObjects = (arr, speed, maxX, minX, maxZ, minZ) => {
  arr.forEach((el) => {
    el.position.z += speed;
    if (el.position.z > camera.position.z) {
      el.position.x = randomRangeNumber(maxX, minX);
      el.position.z = randomRangeNumber(maxZ, minZ);
    } 
  });
};

const powerups = [];

for (let i = 0; i < 10; i++) {
  const newPowerup = powerup.clone();
  newPowerup.name = "powerup" + (i + 1);
  newPowerup.position.x = randomRangeNumber(-6, 6);
  newPowerup.position.z = randomRangeNumber(-6, 6);
  powerups.push(newPowerup);
  scene.add(newPowerup);
}

const animate = () => {
  requestAnimationFrame(animate);
  moveObjects(powerups, 0.02, 8, -8, -10, 8);
  renderer.render(scene, camera);
  controls.update();
}

// Hide the starter screen and start the animation
const startGame = () => {
  const starterScreen = document.getElementById('starter-screen');
  const gamePoints = document.getElementById('game-points');
  starterScreen.style.display = 'none';
  gamePoints.style.display = 'block';
  animate();
}

// Add event listener to the start button
document.getElementById('start-button').addEventListener('click', startGame);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

addMoves(player);

// Points
setPointsValue(0);