import * as THREE from 'three';

// Create the car body
const carBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.15, 0.5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

// Create the wheels
const wheelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 42);
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

// Create the rims
const rimGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05 * 0.7, 42); // 70% area of wheels
const rimMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });

const rim1 = new THREE.Mesh(rimGeometry, rimMaterial);
const rim2 = new THREE.Mesh(rimGeometry, rimMaterial);
const rim3 = new THREE.Mesh(rimGeometry, rimMaterial);
const rim4 = new THREE.Mesh(rimGeometry, rimMaterial);

// Position the rims at the center of each wheel and rotate them to match wheel rotation
rim1.position.copy(wheel1.position);
rim2.position.copy(wheel2.position);
rim3.position.copy(wheel3.position);
rim4.position.copy(wheel4.position);
rim1.rotation.copy(wheel1.rotation);
rim2.rotation.copy(wheel2.rotation);
rim3.rotation.copy(wheel3.rotation);
rim4.rotation.copy(wheel4.rotation);

// Scale the rims to be 70% of the area of the wheels
rim1.scale.set(0.6, 1.7, 0.6);
rim2.scale.set(0.6, 1.7, 0.6);
rim3.scale.set(0.6, 1.7, 0.6);
rim4.scale.set(0.6, 1.7, 0.6);

// Create the windows
const windowGeometry = new THREE.BoxGeometry(0.15, 0.05, 0.01);
const windowMaterial = new THREE.MeshBasicMaterial({ color: 0x6ac5fe, transparent: true, opacity: 0.9 });

const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial);
const backWindow = new THREE.Mesh(windowGeometry, windowMaterial);
const leftWindow = new THREE.Mesh(
    new THREE.BoxGeometry(0.01, 0.1, 0.12),
    windowMaterial
);
const rightWindow = new THREE.Mesh(
    new THREE.BoxGeometry(0.01, 0.1, 0.12),
    windowMaterial
);

// Create the car cabin
const carCabin = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.15, 0.25),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
);
// Position the car cabin relative to the car body
carCabin.position.set(0, 0.10, 0.1);

// Position the windows relative to the car body
backWindow.position.set(0, 0.12, 0.225);
frontWindow.position.set(0, 0.12, -0.03);
leftWindow.position.set(-0.1, 0.1, 0.05);
rightWindow.position.set(0.1, 0.1, 0.05);

// Create a group to hold the car body, the wheels, rims, and the windows
const car = new THREE.Group();
car.add(carBody);
car.add(wheel1);
car.add(wheel2);
car.add(wheel3);
car.add(wheel4);
car.add(rim1);
car.add(rim2);
car.add(rim3);
car.add(rim4);
car.add(frontWindow);
car.add(backWindow);
car.add(leftWindow);
car.add(rightWindow);
car.add(carCabin);

export { car as player };
