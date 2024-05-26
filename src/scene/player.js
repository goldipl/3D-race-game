import * as THREE from 'three';

export const player = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.2, 0.7),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);