import * as THREE from 'three';
import grassImg from "./../img/grass.jpg";

const textureLoader = new THREE.TextureLoader();
const grassTexture = textureLoader.load(grassImg);

// Create the material with the loaded texture and darken it by setting a dark color
const grassMaterial = new THREE.MeshBasicMaterial({
    map: grassTexture,
    color: new THREE.Color(0x929f2f),
});

export const ground = new THREE.Mesh(
    new THREE.BoxGeometry(30, 1, 30),
    grassMaterial
);

ground.position.y = -0.7;

grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(20, 20);
