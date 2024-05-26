import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GridHelper } from 'three';
import { addMoves } from './src/actions/moves';
import { ground } from './src/scene/ground';
import { player } from './src/scene/player';
import './style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

/* camera position */
camera.position.z = 2.2;
camera.position.y = 1.1;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* orbit control */
const controls = new OrbitControls(camera, renderer.domElement);

const gridHelper = new THREE.GridHelper(30,30);
scene.add(gridHelper);

scene.add(ground);
scene.add(player);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

addMoves(player);