import * as THREE from "../../node_modules/three/build/three.module.js";

class Room extends THREE.Group{
    constructor(){
        this.floorGeo = new THREE.PlaneGeometry()
    }
}

export {Room}