import * as THREE from 'three';
import skyImg from "./../img/sky.jpg";

export const setSkyBackground = (scene) => {
    const loader = new THREE.TextureLoader();
    loader.load(skyImg, (texture) => {
        scene.background = texture;
    });
};
