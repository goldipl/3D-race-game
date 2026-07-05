import * as THREE from 'three';

// Glowing coin/ring powerup
export const powerup = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 50),
    new THREE.MeshStandardMaterial({
        color: 0xffd700,
        emissive: 0xffaa00,
        emissiveIntensity: 0.6,
        metalness: 0.7,
        roughness: 0.2,
    })
);

powerup.scale.set(0.06, 0.06, 0.06);
powerup.castShadow = true;

// A little point light baked in visually via emissive; real-time light added per-instance in main.js if desired.