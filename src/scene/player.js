import * as THREE from 'three';

// Create the car body
const carBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.2, 0.4),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

// Create the wheels
const wheelGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.02, 32);
const wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
const wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial);
const wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial);

// Rotate the wheels to be aligned correctly
wheel1.rotation.z = Math.PI / 2;
wheel2.rotation.z = Math.PI / 2;
wheel3.rotation.z = Math.PI / 2;
wheel4.rotation.z = Math.PI / 2;

// Position the wheels relative to the car body
wheel1.position.set(-0.15, -0.1, 0.2);
wheel2.position.set(0.15, -0.1, 0.2);
wheel3.position.set(-0.15, -0.1, -0.2);
wheel4.position.set(0.15, -0.1, -0.2);

// Create the windows
const windowGeometry = new THREE.BoxGeometry(0.28, 0.1, 0.01);
const windowMaterial = new THREE.MeshBasicMaterial({ color: 0x6ac5fe, transparent: true, opacity: 0.9 });

const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial);
const backWindow = new THREE.Mesh(windowGeometry, windowMaterial);
const leftWindow = new THREE.Mesh(
    new THREE.BoxGeometry(0.01, 0.1, 0.38),
    windowMaterial
);
const rightWindow = new THREE.Mesh(
    new THREE.BoxGeometry(0.01, 0.1, 0.38),
    windowMaterial
);

// Position the windows relative to the car body
backWindow.position.set(0, 0.02, 0.195);
frontWindow.position.set(0, 0.02, -0.195);
leftWindow.position.set(-0.145, 0.02, 0);
rightWindow.position.set(0.145, 0.02, 0);

// Create a group to hold the car body, the wheels, and the windows
const car = new THREE.Group();
car.add(carBody);
car.add(wheel1);
car.add(wheel2);
car.add(wheel3);
car.add(wheel4);
car.add(frontWindow);
car.add(backWindow);
car.add(leftWindow);
car.add(rightWindow);

export { car as player };
