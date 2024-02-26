import * as THREE from 'three';
import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';


const publicPath = "/AstroData/Animation/";
// const publicPath = "";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

camera.position.z = 5;

// rotate the camera arond the origin
var angle = 0;
var radius = 5;
var speed = 0.01;


const currentDate = new Date();
let currentTime = currentDate.getTime();

let animationID;
let stopAnimID;


function animate() {
    if(Date.now() - currentTime > 50) {
        currentTime = Date.now();
        loadPointtsOneByOne();

    }
	animationID = requestAnimationFrame( animate );
    rotateCamera();
	renderer.render( scene, camera );
}

// From https://stackoverflow.com/questions/19588602/three-js-rotate-object-on-mouse-down-and-move

var mouseDown = false,
    mouseX = 0,
    mouseY = 0;

    // defing canvas
var canvas = document.getElementById('canvas');
addMouseHandler(document);

function onMouseMove(evt) {
    if (!mouseDown) {
        return;
    }

    evt.preventDefault();

    var deltaX = evt.clientX - mouseX;
    var deltaY = evt.clientY - mouseY;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
}

function onMouseDown(evt) {
    evt.preventDefault();

    cancelAnimationFrame(animationID);
    mouseDown = true;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
}

function onMouseUp(evt) {
    evt.preventDefault();
    animationID = requestAnimationFrame(animate);
    mouseDown = false;
}

function onMouseWheel(evt) {
    // console.log(evt);
    camera.fov -= evt.deltaY * 0.05;
    camera.updateProjectionMatrix();

    console.log(camera.fov);
}

function addMouseHandler(canvas) {
    // on mouse scroll event
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('wheel', onMouseWheel, false);
}




// instantiate a loader
const loader = new PCDLoader();
let simulations = [];
let currentPoint;
let completed = 0;
let currentSimulation = 0;

for ( let index = 0; index < 150; index++) {
    // load a resource
    loader.load(
        // resource URL
        publicPath + 'NianyiAnim/' + index + '.pcd',
        // called when the resource is loaded
        function ( points ) {
            console.log(points);
            
            simulations.push(points);

            completed++;
            
            // scene.add( points );

        },
        // called when loading is in progresses
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        },
        // called when loading has errors
        function ( error ) {

            console.log( 'An error happened' );

        }
    );
}

function loadPointtsOneByOne() {
    scene.clear();

    if (completed >= 150) {
        scene.add(simulations[currentSimulation]);
        currentPoint = simulations[currentSimulation];
        currentSimulation++;
        if (currentSimulation >= 150) {
            currentSimulation = 0;
        }
    }
}

function rotateCamera() {
    camera.position.x = radius * Math.sin(angle);
    camera.position.z = radius * Math.cos(angle);
    camera.lookAt(scene.position);
    angle += speed;
}



animate();