import * as THREE from 'three';
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { makeShelf } from './Components/makeShelf.js';   
import '../assets/plus.svg';
import '../assets/thumbtack.svg';

let scene, camera, renderer;
let shelfWidth;
let shelfHeight;
let contentKind;
let shelfGroup;
let plateGroup;
let frameGroup;
let objects = [];

const contentProp = {
    width: 10,
    height: 10,
    depth: 10,
    position: {
        x: 10,
        y: 10,
        z: 10
    }
}

init();

async function init(){
    shelfWidth = 80;
    shelfHeight = 100;
    contentKind = Array("youtube", "twitter", "instagram");

    // Create a renderer
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas'),
        antialias: true
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color("rgb(153, 255, 204)");

    // Create a camera
    // camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const camFactor = 10;
    camera = new THREE.OrthographicCamera( window.innerWidth / - camFactor, window.innerWidth / camFactor, window.innerHeight / camFactor, window.innerHeight / - camFactor, 0.1, 10000 );
    camera.position.set(200,200,200);
    if(window.innerWidth > window.innerHeight){
        camera.setViewOffset( window.innerWidth, window.innerHeight, 200, 0, window.innerWidth, window.innerHeight)
    }
    camera.lookAt(shelfWidth / 2, shelfHeight / 2,0);

    // let orbitControls = new OrbitControls(camera, renderer.domElement)
    // orbitControls.addEventListener( 'change', render );
    // orbitControls.enablePan = false;
    // orbitControls.update();

    const light = new THREE.SpotLight(0xffffff, 1);
    light.position.set(0, 0, 100);
    scene.add(light);

    // Shelf
    shelfGroup =  await makeShelf(shelfWidth, shelfHeight, 2, 10);
    scene.add(shelfGroup);
    plateGroup = shelfGroup.children[0];
    frameGroup = shelfGroup.children[1];

    // Contents
    const plateNum = plateGroup.children.length;
    for(let i = 0; i < 30; i++){
        const plate = plateGroup.children[Math.floor(Math.random() * plateNum)];
        const width = plate.geometry.parameters.width;
        const posY = plate.position.y;
        const posZ = plate.position.z;
        const contentSpan = 4;
        const numPlace = width / contentSpan;
        const height = Math.floor(Math.random() * 14) + 6;
        const kind = contentKind[Math.floor(Math.random() * contentKind.length)];
        const posX = Math.floor(Math.random() * numPlace) * contentSpan;
        createContent(3, height, 10, posX, posY, posZ, kind);
    }

    window.addEventListener( 'resize', onWindowResize );
    render();
}

function showOriginSphere(_x, _y, _z){
    const sphereGeo = new THREE.SphereGeometry(5, 5, 5);
    const sphereMat = new THREE.MeshToonMaterial({
        color: "rgb(255, 0, 0)"
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.set(_x, _y, _z);
    scene.add(sphere);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
        
    render();
}

function render(){
    renderer.render(scene, camera);
}

async function createContent(_width, _height, _depth, _posX, _posY, _posZ, _kind){
    const geometry = new THREE.BoxGeometry(_width, _height, _depth);
    let diffuseColor;
    if(_kind == "twitter"){
        diffuseColor = new THREE.Color("rgb(29, 161, 242)");
    }else if(_kind == "youtube"){
        diffuseColor = new THREE.Color("rgb(255, 0, 0)");
    }else if(_kind == "instagram"){
        diffuseColor = new THREE.Color("rgb(225, 48, 108)");
    }else{
        diffuseColor = new THREE.Color("rgb(101, 119, 134)");
    }
    const material = new THREE.MeshToonMaterial( {
        color: diffuseColor
    } );
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(_posX, _height / 2 + _posY + 1, _posZ);
    objects.push(cube);
    scene.add(cube);
}

    // show detailView when mouse overed
    const raycaster = new THREE.Raycaster();
    let intersects = [];
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    
    function onDocumentMouseMove( event ) {
        raycaster.setFromCamera(
            {
                x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
                y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
            },
            camera
        )

        let selectedID;
        for(let i = 0; i < objects.length; i++){
            intersects.length = 0;
            raycaster.intersectObject( objects[i], true, intersects );
            if(intersects.length > 0){
                selectedID = i;
                console.log(selectedID);
                break;
            }
        }
    }

// Animation loop
function animate() {
    requestAnimationFrame(animate);
}