import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/build/three.module.js';
import { RectAreaLightHelper } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/helpers/RectAreaLightHelper.js';

export let length = 5;         // Size of wall

// Global API variable
export let API = {
    backwallColor: 0x0000FF,

    lighting_type: 'Point',
    lightIntensity: 0.7,
    lightColor: 0xFFFFFF,
    lightDistance: 0,
    lightPosition_x: 0,
    lightPosition_y: length - 0.1,
    lightPosition_z: 0,

    objTransparent: false,
    objOpacity: 1.0,
    objDepthTest: true,
    objDepthWrite: true,
    objAlphaTest: 0,
    objVisible: true,
    objSide: 'front',

    objColor: 0xceceee,
    objEmissive: 0x000000,
    objWireframe: false,
    objVertexColor: false,
    objFog: true,
    objMap: 'none',
    objAlphaMap: 'none',
    objReflectivity: 1,
    objRefractionRatio: 0.98
};

export let lambert_API = {
    combine: 'Multiply',
}

export let phong_API = {
    specular: 0x111111,
    specularMap: 'none',
    shininess: 30,
    flatShading: false,
    combine: 'Multiply',
}

export let physical_API = {
    roughness: 1.0,
    metalness: 0.8,
    clearCoat: 0.0,
    clearCoatRoughness: 0.0,
    flatShading: false,
    roughnessMap: 'none',
    sheenColor: 0xffffff,
    sheen: 0.0,
    sheenRoughness: 1.0,
    specularIntensity: 0.0,
    specularColor: 0xffffff,
    specularColorMap: 'none',
    transmission: 0.0,
    transmissionMap: 'none'
}

// Get Wall
function get_Wall(color, position, rotate){
    const wall = new THREE.Mesh(new THREE.PlaneGeometry(length, length),
                    new THREE. MeshPhysicalMaterial({color:color, side:THREE.DoubleSide}));
    wall.position.set(position.x, position.y, position.z);
    wall.rotation.set(rotate.x, rotate.y, rotate.z);
    //wall.receiveShadow = true;
    return wall
}

// Wall lights
function create_wall_light(color, position, rotate){
    const rectLight = new THREE.RectAreaLight(color, 2,  length, length);
    rectLight.position.set(position.x, position.y, position.z);
    rectLight.rotation.set(rotate.x, rotate.y, rotate.z);
    
    //const rectLightHelper = new RectAreaLightHelper( rectLight );
    //rectLight.add( rectLightHelper );
    return rectLight;
}

// Create Cornell Box
export function create_Cornel(){
    const cornel_Box = new THREE.Object3D();

    // Creating Walls
    const left_wall = get_Wall('red', new THREE.Vector3(-length/2, length/2, 0), new THREE.Vector3(0, Math.PI/2, 0));
    cornel_Box.add(left_wall);

    const right_wall = get_Wall('green', new THREE.Vector3(length/2, length/2, 0), new THREE.Vector3(0, Math.PI/2, 0));
    cornel_Box.add(right_wall);

    const floor = get_Wall('white', new THREE.Vector3(0, 0, 0), new THREE.Vector3(Math.PI/2, 0, 0));
    cornel_Box.add(floor);

    const ceiling = get_Wall('white', new THREE.Vector3(0, length, 0), new THREE.Vector3(Math.PI/2, 0, 0));
    cornel_Box.add(ceiling);

    const back_wall = get_Wall(API.backwallColor, new THREE.Vector3(0, length/2, -length/2), new THREE.Vector3(0, 0, Math.PI/2));
    cornel_Box.add(back_wall);
    
    // Creating Light Panel
    const light_panel = new THREE.Mesh(new THREE.BoxGeometry(1, 0.1, 1), new THREE.MeshPhysicalMaterial({roughness: 0, transmission: 1, thickness: 0.5,}));
    light_panel.position.set(0, length-0.055, 0);
    cornel_Box.add(light_panel);

    // Creating Cone
    let offset = 1;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1, 64), new THREE.MeshLambertMaterial({color: API.objColor}));
    cone.position.set(-length/2 + offset, 0.51, -offset);
    cornel_Box.add(cone);

    // Creating Cylinder
    const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1, 64), new THREE.MeshPhongMaterial({color: API.objColor}));
    cylinder.position.set(length/2 - offset, 0.4, 0);
    cylinder.rotation.set(0, Math.PI/4, Math.PI/2);
    cornel_Box.add(cylinder);

    // Creating Sphere
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.4, 64, 64, 64), new THREE.MeshPhysicalMaterial({color: API.objColor}));
    sphere.position.set(0, 0.4, offset);
    cornel_Box.add(sphere);

    // Creating default Light Source - Point Light Source
    const light = new THREE.PointLight(API.lightColor, API.lightIntensity);
    light.position.set(API.lightPosition_x, API.lightPosition_y, API.lightPosition_z);
    cornel_Box.add(light);

    // Creating neutral white ambient Light
    const ambient_light = new THREE.AmbientLight(0x404040);     
    cornel_Box.add(ambient_light);

    // Adding Wall Lights
    const left_wall_light = create_wall_light('red', new THREE.Vector3(-length/2 - 0.1, length/2, 0), new THREE.Vector3(0, -Math.PI/2, 0));
    cornel_Box.add(left_wall_light);
    const right_wall_light = create_wall_light('green', new THREE.Vector3(length/2 + 0.1, length/2, 0), new THREE.Vector3(0, Math.PI/2, 0));
    cornel_Box.add(right_wall_light);
    const back_wall_light = create_wall_light(API.backwallColor, new THREE.Vector3(0, length/2, -length/2 - 0.1), new THREE.Vector3(Math.PI, 0, Math.PI/2));
    cornel_Box.add(back_wall_light);

    return cornel_Box;
}
  