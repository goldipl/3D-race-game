import './style.css'
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/* ground */
const ground = new THREE.Mesh(
	new THREE.BoxGeometry( 30, 1, 30 ),
	new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
	);
	ground.position.y = -1;
scene.add( ground );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})