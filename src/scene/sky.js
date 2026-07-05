import * as THREE from 'three';
import skyImg from "./../img/sky.jpg";

export const setSkyBackground = (scene) => {
    const loader = new THREE.TextureLoader();
    loader.load(skyImg, (texture) => {
        scene.background = texture;
    });

    // Fog gives a sense of speed and hides pop-in of spawning objects
    scene.fog = new THREE.Fog(0x87ceeb, 20, 90);
};