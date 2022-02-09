import * as THREE from 'https://cdn.skypack.dev/three@0.136.0/build/three.module.js';
import {GUI} from 'https://cdn.skypack.dev/lil-gui';
import {length, API, lambert_API, phong_API, physical_API} from './cornel.js';

let gui;

function string_to_const(side){
    if (side=='front') return THREE.FrontSide;
    else if (side =='back') return THREE.BackSide;
    else if (side =='double') return THREE.DoubleSide;
    else if (side =='none') return null;
    else if (side =='Paris') return new THREE.TextureLoader().load('./img/paris.jpg');
    else if (side =='bricks') return new THREE.TextureLoader().load('./img/wall.jpg');
    else if (side == 'Multiply') return THREE.MultiplyOperation;
    else if (side == 'Mix') return THREE.MixOperation;
    else if (side == 'Add') return THREE.AddOperation;
}
  
function update_object(change, cornel_Box) {
    switch (change){
        case 'backwall_color':
            cornel_Box.children[4].material.color.set(API.backwallColor);
            cornel_Box.children[13].color.set(API.backwallColor); 
            break;
        case 'x':
            cornel_Box.children[9].position.setX(API.lightPosition_x); break;
        case 'y':
            cornel_Box.children[9].position.setY(API.lightPosition_y); break;
        case 'z':
            cornel_Box.children[9].position.setZ(API.lightPosition_z); break;
        case 'light_type':
            const curr_position = cornel_Box.children[9].position;
            if(API.lighting_type == 'Directional') cornel_Box.children[9] = new THREE.DirectionalLight(API.lightColor, API.lightIntensity); 
            else if(API.lighting_type == 'Point') cornel_Box.children[9] = new THREE.PointLight(API.lightColor, API.lightIntensity); 
            else if(API.lighting_type == 'Spot') cornel_Box.children[9] = new THREE.SpotLight(API.lightColor, API.lightIntensity);
            else if(API.lighting_type == 'Hemisphere') cornel_Box.children[9] = new THREE.HemisphereLight(API.lightColor, API.lightIntensity);
            cornel_Box.children[9].position.copy(curr_position);
            break;
        case 'light_intensity':
            cornel_Box.children[9].intensity = API.lightIntensity; break;
        case 'light_color':
            cornel_Box.children[9].color.set(API.lightColor); break;
        case 'light_distance':
            cornel_Box.children[9].distance = API.lightDistance; break;

        // Objects Materials
        case 'obj_color':
            for(let i=6; i<9; i++) cornel_Box.children[i].material.color.set(API.objColor); break;
        case 'obj_transparent':
            for(let i=6; i<9; i++) cornel_Box.children[i].material.transparent = API.objTransparent; break;
        case 'obj_opacity':
            for(let i=6; i<9; i++) cornel_Box.children[i].material.opacity = API.objOpacity; break;
        case 'obj_depthtest':
            for(let i=6; i<9; i++) cornel_Box.children[i].material.depthTest = API.objDepthTest; break;
        case 'obj_depthwrite':
            for(let i=6; i<9; i++) cornel_Box.children[i].material.depthWrite = API.objDepthWrite; break;
        case 'obj_alphatest':
            for(let i=6; i<9; i++) cornel_Box.children[i].material.alphaTest = API.objAlphaTest; break;
        case 'obj_visible':
            for(let i=6; i<9; i++) cornel_Box.children[i].material.visible = API.objVisible; break;
        case 'obj_side':
            for(let i=6; i<9; i++) cornel_Box.children[i].material.side = string_to_const(API.objSide); break;

        case 'obj_emissive':
            for(let i=6; i<9; i++) cornel_Box.children[i].material.emissive.set(API.objEmissive); break;
        case 'obj_wireframe':
            for(let i=6; i<9; i++) cornel_Box.children[i].material.wireframe = API.objWireframe; break;
        case 'obj_vertexcolor':
            for(let i=6; i<9; i++) cornel_Box.children[i].material.vertexColors = API.objVertexColor; break;
        case 'obj_fog':
            for(let i=6; i<9; i++) cornel_Box.children[i].material.fog = API.objFog; break;
        case 'obj_map':
            for(let i=6; i<9; i++) cornel_Box.children[i].material.map = string_to_const(API.objMap); break;
        case 'obj_alphamap':
            for(let i=6; i<9; i++) cornel_Box.children[i].material.alphaMap = string_to_const(API.objAlphaMap); break;
        case 'obj_reflectivity':
            for(let i=6; i<9; i++) cornel_Box.children[i].material.reflectivity = API.objReflectivity; break;
        case 'obj_refractionratio':
            for(let i=6; i<9; i++) cornel_Box.children[i].material.refractionRatio = API.objRefractionRatio; break;

        // For Cone material
        case 'cone_combine':
            cornel_Box.children[6].material.combine = string_to_const(lambert_API.combine); break;
        
        // For Cylinder material
        case 'specular':
            cornel_Box.children[7].material.specular.set(phong_API.specular); break;
        case 'specular_map':
            cornel_Box.children[7].material.specularMap = string_to_const(phong_API.specularMap); break;
        case 'shininess':
            cornel_Box.children[7].material.shininess = phong_API.shininess; break;
        case 'cylinder_flat_shading':
            cornel_Box.children[7].material.flatShading = phong_API.flatShading; break;
        case 'cylinder_combine':
            cornel_Box.children[7].material.combine = string_to_const(phong_API.combine); break;

        // For Sphere Material
        case 'roughness':
            cornel_Box.children[8].material.roughness = physical_API.roughness; break;
        case 'metalness':
            cornel_Box.children[8].material.metalness = physical_API.metalness; break;
        case 'clear_coat':
            cornel_Box.children[8].material.clearcoat = physical_API.clearCoat; break;
        case 'clear_coatroughness':
            cornel_Box.children[8].material.clearcoatRoughness = physical_API.clearCoatRoughness; break;
        case 'sphere_flat_shading':
            cornel_Box.children[8].material.flatShading = physical_API.flatShading; break;
        case 'roughness_map':
            cornel_Box.children[8].material.roughnessMap = string_to_const(physical_API.roughnessMap); break;
        case 'sheen_color':
            cornel_Box.children[8].material.sheenColor.set(physical_API.sheenColor); break;
        case 'sheen':
            cornel_Box.children[8].material.sheen = physical_API.sheen; break;
        case 'sheen_roughness':
            cornel_Box.children[8].material.sheenRoughness = physical_API.sheenRoughness; break;
        case 'specular_intensity':
            cornel_Box.children[8].material.specularIntensity = physical_API.specularIntensity; break;
        case 'specular_color':
            cornel_Box.children[8].material.specularColor.set(physical_API.specularColor); break;
        case 'specular_colormap':
            cornel_Box.children[8].material.specularColorMap = string_to_const(physical_API.specularColorMap); break;
        case 'transmission':
            cornel_Box.children[8].material.transmission = physical_API.transmission; break;
        case 'transmission_map':
            cornel_Box.children[8].material.transmissionMap = string_to_const(physical_API.transmissionMap); break;
        default:

    }
  
    for(let i=6; i<9; i++) cornel_Box.children[i].material.needsUpdate = true;
}
  
  // Function for creating GUI
export function create_GUI(cornel_Box){
    gui = new GUI();

    // Wall Sub-GUI
    const wall = gui.addFolder( 'Wall' );
    wall.addColor(API, 'backwallColor').name('Backwall Color').onChange(update_object.bind(null, 'backwall_color', cornel_Box));
    wall.close();

    // Light Sub-GUI
    const light = gui.addFolder( 'Light Source' );
    const geometry = light.addFolder( 'Geometry' );
  
    geometry.add(API, 'lightPosition_x', -length, length, 0.1).name( 'x' ).onChange(update_object.bind(null, 'x', cornel_Box));
    geometry.add(API, 'lightPosition_y', -length, length, 0.1).name( 'y' ).onChange(update_object.bind(null, 'y', cornel_Box));
    geometry.add(API, 'lightPosition_z', -length, length, 0.1).name( 'z' ).onChange(update_object.bind(null, 'z', cornel_Box));
    light.add( API, 'lighting_type', [ 'Directional', 'Point', 'Spot', 'Hemisphere'] ).name('Light Type').onChange(update_object.bind(null, 'light_type', cornel_Box));
    light.add( API, 'lightIntensity', 0, 1, 0.01 ).name('Light Intensity').onChange(update_object.bind(null, 'light_intensity', cornel_Box));
    light.addColor(API, 'lightColor').name('Light Color').onChange(update_object.bind(null, 'light_color', cornel_Box));
    light.add(API, 'lightDistance', 0, 2*length, 1).name('Light Distance').onChange(update_object.bind(null, 'light_distance', cornel_Box));
    light.close();

    // Materials Sub-GUI
    const mat_gui = gui.addFolder( 'Material' );
    mat_gui.addColor(API, 'objColor').name('Color').onChange(update_object.bind(null, 'obj_color', cornel_Box));
    mat_gui.add(API, 'objTransparent', 'myBoolean').name( 'Transparent' ).onChange(update_object.bind(null, 'obj_transparent', cornel_Box));
    mat_gui.add(API, 'objOpacity', 0, 1, 0.1).name( 'Opacity' ).onChange(update_object.bind(null, 'obj_opacity', cornel_Box));
    mat_gui.add(API, 'objDepthTest', 'myBoolean').name( 'Depth Test' ).onChange(update_object.bind(null, 'obj_depthtest', cornel_Box));
    mat_gui.add(API, 'objDepthWrite', 'myBoolean').name( 'Depth Write' ).onChange(update_object.bind(null, 'obj_depthwrite', cornel_Box));
    mat_gui.add(API, 'objAlphaTest', 0, 1, 0.1).name( 'Alpha Test' ).onChange(update_object.bind(null, 'obj_alphatest', cornel_Box));
    mat_gui.add(API, 'objVisible', 'myBoolean').name( 'Visible' ).onChange(update_object.bind(null, 'obj_visible', cornel_Box));
    mat_gui.add(API, 'objSide', ['front', 'back', 'double']).name( 'Side' ).onChange(update_object.bind(null, 'obj_side', cornel_Box));
  
    mat_gui.addColor(API, 'objEmissive').name('Emissive').onChange(update_object.bind(null, 'obj_emissive', cornel_Box));
    mat_gui.add(API, 'objWireframe', 'myBoolean').name( 'Wireframe' ).onChange(update_object.bind(null, 'obj_wireframe', cornel_Box));
    mat_gui.add(API, 'objVertexColor', 'myBoolean').name( 'Vertex Color' ).onChange(update_object.bind(null, 'obj_vertexcolor', cornel_Box));
    mat_gui.add(API, 'objFog', 'myBoolean').name( 'Fog' ).onChange(update_object.bind(null, 'obj_fog', cornel_Box));
    
    mat_gui.add(API, 'objMap', ['none', 'Paris']).name( 'Map' ).onChange(update_object.bind(null, 'obj_map', cornel_Box));
    mat_gui.add(API, 'objAlphaMap', ['none', 'bricks']).name( 'AlphaMap' ).onChange(update_object.bind(null, 'obj_alphamap', cornel_Box));
    
    mat_gui.add(API, 'objReflectivity', 0, 1, 0.1).name( 'Reflectivity' ).onChange(update_object.bind(null, 'obj_reflectivity', cornel_Box));
    mat_gui.add(API, 'objRefractionRatio', 0, 1, 0.1).name( 'Refraction Ratio' ).onChange(update_object.bind(null, 'obj_refractionratio', cornel_Box));
  
    // Cone
    const cone = mat_gui.addFolder( 'Cone' ); // lambert
    cone.add(lambert_API, 'combine', ['Multiply', 'Mix', 'Add']).name( 'Combine' ).onChange(update_object.bind(null, 'cone_combine', cornel_Box));
    cone.close();

    // Cylinder
    const cylinder = mat_gui.addFolder( 'Cylinder' ); // phong
    cylinder.addColor(phong_API, 'specular').name('Specular').onChange(update_object.bind(null, 'specular', cornel_Box));
    cylinder.add(phong_API, 'specularMap', ['none', 'Paris']).name( 'Specular Map' ).onChange(update_object.bind(null, 'specular_map', cornel_Box));
    cylinder.add(phong_API, 'shininess', 0, 100, 1).name( 'Shininess' ).onChange(update_object.bind(null, 'shininess', cornel_Box));
    cylinder.add(phong_API, 'flatShading', 'myBoolean').name( 'Flat Shading' ).onChange(update_object.bind(null, 'cylinder_flat_shading', cornel_Box));
    cylinder.add(phong_API, 'combine', ['Multiply', 'Mix', 'Add']).name( 'Combine' ).onChange(update_object.bind(null, 'cylinder_combine', cornel_Box));
    cylinder.close();

    // Sphere
    const sphere = mat_gui.addFolder( 'Sphere' ); // physical
    sphere.add(physical_API, 'roughness', 0, 1.0, 0.1).name( 'Roughness' ).onChange(update_object.bind(null, 'roughness', cornel_Box));
    sphere.add(physical_API, 'metalness', 0, 1.0, 0.1).name( 'Metalness' ).onChange(update_object.bind(null, 'metalness', cornel_Box));
    sphere.add(physical_API, 'clearCoat', 0, 1.0, 0.1).name( 'Clear Coat' ).onChange(update_object.bind(null, 'clear_coat', cornel_Box));
    sphere.add(physical_API, 'clearCoatRoughness', 0, 1.0, 0.1).name( 'Clear Coat Roughness' ).onChange(update_object.bind(null, 'clear_coatroughness', cornel_Box));
    sphere.add(physical_API, 'flatShading', 'myBoolean').name( 'Flat Shading' ).onChange(update_object.bind(null, 'sphere_flat_shading', cornel_Box));
    sphere.add(physical_API, 'roughnessMap', ['none', 'bricks']).name( 'Roughness Map' ).onChange(update_object.bind(null, 'roughness_map', cornel_Box));
    sphere.addColor(physical_API, 'sheenColor').name('Sheen Color').onChange(update_object.bind(null, 'sheen_color', cornel_Box));
    sphere.add(physical_API, 'sheen', 0, 1.0, 0.1).name( 'Sheen' ).onChange(update_object.bind(null, 'sheen', cornel_Box));
    sphere.add(physical_API, 'sheenRoughness', 0, 1.0, 0.1).name( 'Sheen Roughness' ).onChange(update_object.bind(null, 'sheen_roughness', cornel_Box));
    sphere.add(physical_API, 'specularIntensity', 0, 1.0, 0.1).name( 'Specular Intensity' ).onChange(update_object.bind(null, 'specular_intensity', cornel_Box));
    sphere.addColor(physical_API, 'specularColor').name('Specular Color').onChange(update_object.bind(null, 'specular_color', cornel_Box));
    sphere.add(physical_API, 'specularColorMap', ['none', 'Paris']).name( 'Specular Color Map' ).onChange(update_object.bind(null, 'specular_colormap', cornel_Box));
    sphere.add(physical_API, 'transmission', 0, 1.0, 0.1).name( 'Transmission' ).onChange(update_object.bind(null, 'transmission', cornel_Box));
    sphere.add(physical_API, 'transmissionMap', ['none', 'Paris']).name( 'Transmission Map' ).onChange(update_object.bind(null, 'transmission_map', cornel_Box));
    sphere.close();
}
  