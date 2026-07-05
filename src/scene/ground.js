import * as THREE from 'three';
import grassImg from "./../img/grass.jpg";

const textureLoader = new THREE.TextureLoader();
const grassTexture = textureLoader.load(grassImg);

grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(20, 60);

// Wide, long ground plane so it doesn't feel like driving on a postage stamp
const grassMaterial = new THREE.MeshStandardMaterial({
    map: grassTexture,
    color: new THREE.Color(0x929f2f),
    roughness: 1,
});

export const ground = new THREE.Mesh(
    new THREE.BoxGeometry(30, 1, 200),
    grassMaterial
);

ground.position.y = -0.7;
ground.position.z = -70;
ground.receiveShadow = true;

// Asphalt road strip down the middle
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x2b2b2f, roughness: 0.9 });
export const road = new THREE.Mesh(
    new THREE.BoxGeometry(9, 1.02, 200),
    roadMaterial
);
road.position.y = -0.7;
road.position.z = -70;
road.receiveShadow = true;

// Dashed lane markings, generated procedurally and reused as one merged group
export const createLaneMarkings = () => {
    const group = new THREE.Group();
    const dashMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const dashGeometry = new THREE.BoxGeometry(0.15, 0.03, 1.2);

    const laneOffsets = [-3, -1, 1, 3];
    laneOffsets.forEach((x) => {
        for (let z = 10; z > -160; z -= 4) {
            const dash = new THREE.Mesh(dashGeometry, dashMaterial);
            dash.position.set(x, -0.18, z);
            group.add(dash);
        }
    });

    return group;
};