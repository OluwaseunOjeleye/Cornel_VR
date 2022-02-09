import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/build/three.module.js';
import {create_Cornel, length, API} from './cornel.js';
import {create_GUI} from './gui.js';
import { RectAreaLightUniformsLib } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { VRButton } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/webxr/VRButton.js';

let scene, camera, renderer, controls, cornel_Box;

init();
animate();

function init(){
  const canvas = document.querySelector('#bg');
  renderer = new THREE.WebGLRenderer({canvas, antialias: true});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( VRButton.createButton( renderer ) );
  renderer.xr.enabled = true;

  const angleOfView = 60;
  const aspectRatio = window.innerWidth /window.innerHeight;
  const nearPlane   = 0.1;
  const farPlane    = 1000;
  camera = new THREE.PerspectiveCamera(angleOfView, aspectRatio, nearPlane, farPlane);
  //camera.position.set(0, 0, 10);

  const cameraHolder = new THREE.Group();
  cameraHolder.add(camera);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  scene.add(cameraHolder);
  cameraHolder.position.set(0, 0, 10);

  // Adding Axes helper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // Creating Cornel Box
  RectAreaLightUniformsLib.init();

  cornel_Box = create_Cornel();
  scene.add(cornel_Box);

  // Adding GUI
  create_GUI(cornel_Box);

}

function render(){
  renderer.render(scene, camera);
}

// DRAW Function in VR
function animate(){
  renderer.setAnimationLoop( render );
}
