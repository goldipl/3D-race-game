import * as THREE from 'three';

export const ground = new THREE.Mesh(
    new THREE.BoxGeometry(30, 1, 30),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
ground.position.y = -1;