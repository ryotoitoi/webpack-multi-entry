import * as THREE from "../../node_modules/three/build/three.module.js";

async function makeShelf(_width, _height, _thickness, _depth){
    const shelfGroup = new THREE.Group();

    // Plate
    const plateGroup = new THREE.Group();
    const plateGeo = new THREE.BoxGeometry(_width, _thickness, _depth);
    const plateMat = new THREE.MeshToonMaterial({
        color: "rgb(255, 204, 103)"
    });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.receiveShadow = true;
    const plateNum = 3;
    const plateSpan = _height / plateNum;
    for(let i = 0; i < plateNum; i++){
        const plateInstance = plate.clone();
        plateInstance.position.set(0 + _width / 2, i * plateSpan, 0);
        if(i == 0){
            plateInstance.visible = false;
        }
        plateGroup.add(plateInstance);
        // console.log("plate")
    }
    shelfGroup.add(plateGroup);

    // Frame
    const frameGroup = new THREE.Group();
    const frameMat = new THREE.MeshToonMaterial({
        color: "rgb(240, 240, 240)"
    });
    // horizontal
    const horFrameGeo = new THREE.BoxGeometry(_width, _thickness, _depth);
    const horFrame = new THREE.Mesh(horFrameGeo, frameMat);
    horFrame.castShadow = true;
    horFrame.receiveShadow = true;
    for(let i = 0; i < 2; i++){
        const frameInstance = horFrame.clone();
        frameInstance.position.set(0 + _width / 2, i * _height, 0);
        frameGroup.add(frameInstance);
    }
    // vertical
    const vertFrameGeo = new THREE.BoxGeometry(_height + _thickness, _thickness, _depth);
    const vertFrame = new THREE.Mesh(vertFrameGeo, frameMat);
    for(let i = 0; i < 2; i++){
        const frameInstance = vertFrame.clone();
        if(i == 0){
            frameInstance.position.set(i * _width - _thickness / 2, 0 + _height / 2, 0);
        }else{
            frameInstance.position.set(i * _width + _thickness / 2, 0 + _height / 2, 0);
        }
        frameInstance.rotation.z = Math.PI / 2;
        frameGroup.add(frameInstance);
    }
    shelfGroup.add(frameGroup);

    return shelfGroup;
    // scene.add(shelfGroup);
    // console.log("hey");
}

export {makeShelf};