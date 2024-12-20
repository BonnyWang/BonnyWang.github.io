import * as THREE from 'three';
import { PCDLoader } from 'three/addons/loaders/PCDLoader.js';

const publicPath =  "/AstroData/";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

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



function animate() {
	requestAnimationFrame( animate );
    rotateCamera();
    // console.log(camera.position);
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
    rotateScene(deltaX, deltaY);
}

function onMouseDown(evt) {
    evt.preventDefault();
    mouseDown = true;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
}

function onMouseUp(evt) {
    evt.preventDefault();
    mouseDown = false;
}

function onMouseWheel(evt) {
    // console.log(evt);
    camera.fov -= evt.deltaY * 0.05;
    camera.updateProjectionMatrix();

    console.log(camera.fov);
}

function addMouseHandler(canvas) {
    canvas.addEventListener('mousemove', function (e) {
        onMouseMove(e);
    }, false);
    canvas.addEventListener('mousedown', function (e) {
        onMouseDown(e);
    }, false);
    canvas.addEventListener('mouseup', function (e) {
        onMouseUp(e);
    }, false);

    canvas.addEventListener('wheel', function (e) {onMouseWheel(e)}, false);
}




// instantiate a loader
const loader = new PCDLoader();

let p;

// load a resource
loader.load(
	// resource URL
	publicPath + 'test.pcd',
	// called when the resource is loaded
	function ( points ) {
        console.log(points);
        p = points;
        
		scene.add( points );

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

function rotateCamera() {
    camera.position.x = radius * Math.sin(angle);
    camera.position.z = radius * Math.cos(angle);
    camera.lookAt(scene.position);
    angle += speed;
}


function rotateScene(deltaX, deltaY) {
    p.rotation.y += deltaX / 100;
    p.rotation.x += deltaY / 100;
}

animate();