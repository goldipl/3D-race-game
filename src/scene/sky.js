import * as THREE from 'three';

export const setSkyBackground = (scene) => {
    const loader = new THREE.TextureLoader();
    loader.load('./src/img/sky.jpg', (texture) => {
        scene.background = texture;
    });
};
