import * as THREE from 'three';

export const powerup = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 50),
    new THREE.MeshBasicMaterial({color: 0xfffff00})
);

powerup.scale.set(0.06, 0.06, 0.06);
