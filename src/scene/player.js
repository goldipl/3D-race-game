import * as THREE from 'three';

// Create the car body
const carBody = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.15, 0.5),
    new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.4, metalness: 0.3 })
);
carBody.castShadow = true;

// Create the wheels
const wheelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05, 42);
const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.8 });

const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
const wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial);
const wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial);
[wheel1, wheel2, wheel3, wheel4].forEach((w) => (w.castShadow = true));

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
const rimGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.05 * 0.7, 42);
const rimMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, metalness: 0.8, roughness: 0.3 });

const rim1 = new THREE.Mesh(rimGeometry, rimMaterial);
const rim2 = new THREE.Mesh(rimGeometry, rimMaterial);
const rim3 = new THREE.Mesh(rimGeometry, rimMaterial);
const rim4 = new THREE.Mesh(rimGeometry, rimMaterial);

rim1.position.copy(wheel1.position);
rim2.position.copy(wheel2.position);
rim3.position.copy(wheel3.position);
rim4.position.copy(wheel4.position);
rim1.rotation.copy(wheel1.rotation);
rim2.rotation.copy(wheel2.rotation);
rim3.rotation.copy(wheel3.rotation);
rim4.rotation.copy(wheel4.rotation);

rim1.scale.set(0.6, 1.7, 0.6);
rim2.scale.set(0.6, 1.7, 0.6);
rim3.scale.set(0.6, 1.7, 0.6);
rim4.scale.set(0.6, 1.7, 0.6);

// Create the windows
const windowGeometry = new THREE.BoxGeometry(0.15, 0.05, 0.01);
const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x6ac5fe, transparent: true, opacity: 0.9, roughness: 0.1 });

const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial);
const backWindow = new THREE.Mesh(windowGeometry, windowMaterial);
const leftWindow = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.1, 0.12), windowMaterial);
const rightWindow = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.1, 0.12), windowMaterial);

// Create the car cabin
const carCabin = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.15, 0.25),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 })
);
carCabin.position.set(0, 0.10, 0.1);
carCabin.castShadow = true;

backWindow.position.set(0, 0.12, 0.225);
frontWindow.position.set(0, 0.12, -0.03);
leftWindow.position.set(-0.1, 0.1, 0.05);
rightWindow.position.set(0.1, 0.1, 0.05);

// Headlights — small glowing spheres up front plus real lights for a nighttime-ready feel
const headlightGeometry = new THREE.SphereGeometry(0.03, 8, 8);
const headlightMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffee,
    emissive: 0xffffcc,
    emissiveIntensity: 1.5,
});
const headlightL = new THREE.Mesh(headlightGeometry, headlightMaterial);
const headlightR = new THREE.Mesh(headlightGeometry, headlightMaterial);
headlightL.position.set(-0.1, -0.02, -0.26);
headlightR.position.set(0.1, -0.02, -0.26);

const headlightSpotL = new THREE.SpotLight(0xffffee, 3, 8, Math.PI / 6, 0.5);
headlightSpotL.position.set(-0.1, 0.05, -0.26);
headlightSpotL.target.position.set(-0.1, 0, -3);

const headlightSpotR = new THREE.SpotLight(0xffffee, 3, 8, Math.PI / 6, 0.5);
headlightSpotR.position.set(0.1, 0.05, -0.26);
headlightSpotR.target.position.set(0.1, 0, -3);

// Brake lights (glow red when braking, toggled externally via userData ref)
const brakeGeometry = new THREE.BoxGeometry(0.05, 0.03, 0.02);
const brakeMaterial = new THREE.MeshStandardMaterial({ color: 0x330000, emissive: 0x330000, emissiveIntensity: 0.3 });
const brakeL = new THREE.Mesh(brakeGeometry, brakeMaterial);
const brakeR = new THREE.Mesh(brakeGeometry, brakeMaterial);
brakeL.position.set(-0.1, 0, 0.25);
brakeR.position.set(0.1, 0, 0.25);

// Create a group to hold everything
const car = new THREE.Group();
car.add(carBody);
car.add(wheel1, wheel2, wheel3, wheel4);
car.add(rim1, rim2, rim3, rim4);
car.add(frontWindow, backWindow, leftWindow, rightWindow);
car.add(carCabin);
car.add(headlightL, headlightR);
car.add(headlightSpotL, headlightSpotL.target);
car.add(headlightSpotR, headlightSpotR.target);
car.add(brakeL, brakeR);

car.position.y = 0.25;

// Expose brake lights so gameplay code can flash them, and a bounding radius for collisions
car.userData.brakeLights = [brakeMaterial];
car.userData.collisionRadius = 0.32;

export { car as player };