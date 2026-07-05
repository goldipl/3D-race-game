import * as THREE from 'three';

// Traffic cone obstacle — hitting one costs a life
const coneGeometry = new THREE.ConeGeometry(0.35, 0.8, 16);
const coneMaterial = new THREE.MeshStandardMaterial({ color: 0xff6600, roughness: 0.6 });
const stripeGeometry = new THREE.CylinderGeometry(0.28, 0.3, 0.12, 16);
const stripeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 });

export const createObstacle = () => {
    const group = new THREE.Group();

    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.y = 0.4;
    cone.castShadow = true;

    const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
    stripe.position.y = 0.5;
    stripe.castShadow = true;

    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.42, 0.08, 16),
        coneMaterial
    );
    base.position.y = 0.04;
    base.castShadow = true;

    group.add(cone);
    group.add(stripe);
    group.add(base);
    group.userData.isObstacle = true;
    group.userData.radius = 0.45;

    return group;
};