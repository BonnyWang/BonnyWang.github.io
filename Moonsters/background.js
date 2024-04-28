import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

// const publicPath =  "/Moonsters/";
const publicPath =  "./";
// Setup the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer(
    {antialias: true, alpha: true, canvas: document.getElementById("Canvas")}
);
renderer.setSize(window.innerWidth/5, window.innerHeight/5);
// assign the renderer to the document canvas by id

// Lighting
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.1);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
directionalLight.position.set(1, 1, 0).normalize();
scene.add(directionalLight);

// FBX model loader
const VIPERloader = new FBXLoader();
VIPERloader.load(publicPath + 'VIPER.fbx', (object) => {
    object.scale.set(0.015, 0.015, 0.015); // Scale the model down
    // move down the model
    object.position.y = -1.5;
    scene.add(object); // Add the loaded object to the scene

    // Animation function to rotate the model
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the model
        object.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    animate(); // Start the animation loop
}, undefined, (error) => {
    console.error('An error happened during the loading: ', error);
});

// Position the camera
camera.position.z = 5;

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);