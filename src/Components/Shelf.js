import * as THREE from "../../node_modules/three/build/three.module.js";
import { GLTFLoader } from "../../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "../../node_modules/three/examples/jsm/loaders/DRACOLoader.js"
import { KTX2Loader } from "../../node_modules/three/examples/jsm/loaders/KTX2Loader.js";
import { MeshoptDecoder } from "../../node_modules/three/examples/jsm/libs/meshopt_decoder.module.js"


class Shelf extends THREE.Object3D { 
    constructor(_objectURL){
        super();
        if(_objectURL){
            this.dracoLoader = new DRACOLoader();
            this.dracoLoader.setDecoderPath("../../node_modules/three/examples/jsm/libs/draco/gltf/");

            this.ktx2Loader = new KTX2Loader()
            this.ktx2Loader.setTranscoderPath("../../node_modules/three/examples/jsm/libs/basis/" );

            this.loader = new GLTFLoader();
            this.loader.setDRACOLoader( this.dracoLoader );
            this.loader.setKTX2Loader( this.ktx2Loader );
            this.loader.setMeshoptDecoder( MeshoptDecoder );
            // this.loader.parse(_objectURL, function(gltf){
            //     // Scaling
            //     let box = new THREE.Box3().setFromObject(gltf.scene);
            //     const box_height = box.getSize(new THREE.Vector3()).x;
            //     const scaleFactor = 1000 / box_height;
            //     gltf.scene.scale.multiplyScalar(scaleFactor);
            //     box = new THREE.Box3().setFromObject(gltf.scene);

            //     // Rotating
            //     // gltf.scene.rotation.y = Math.PI;

            //     // Lighting
            //     // const light = gltf.scene.Light001;

            //     // Positioning
            //     const box_center = box.getCenter(new THREE.Vector3());
            //     gltf.scene.translateX(-box_center.x);
            //     gltf.scene.translateY(-box_center.y);
            //     gltf.scene.translateZ(-box_center.z);
            //     box = new THREE.Box3().setFromObject(gltf.scene);

            //     // const box_helper = new THREE.Box3Helper(box, 0xffff00 );
            //     // this.add(box_helper);

            //     this.add(gltf.scene);
            // });
            this.loader.load(_objectURL, (gltf)=>{

                // Scaling
                let box = new THREE.Box3().setFromObject(gltf.scene);
                const box_height = box.getSize(new THREE.Vector3()).x;
                const scaleFactor = 1000 / box_height;
                gltf.scene.scale.multiplyScalar(scaleFactor);
                box = new THREE.Box3().setFromObject(gltf.scene);

                // Rotating
                // gltf.scene.rotation.y = Math.PI;

                // Lighting
                // const light = gltf.scene.Light001;

                // Positioning
                const box_center = box.getCenter(new THREE.Vector3());
                gltf.scene.translateX(-box_center.x);
                gltf.scene.translateY(-box_center.y);
                gltf.scene.translateZ(-box_center.z);
                box = new THREE.Box3().setFromObject(gltf.scene);

                // const box_helper = new THREE.Box3Helper(box, 0xffff00 );
                // this.add(box_helper);

                this.add(gltf.scene);
            });
        }
        else{
            // Default Shelf is called if objecs url is not provided.
            this.PlateMaterial = new THREE.MeshStandardMaterial({color: "rgb(255, 110, 49)"});
            this.PlateGeometry = new THREE.BoxGeometry(1200, 20, 200);
            this.Plate = new THREE.Mesh( this.PlateGeometry, this.PlateMaterial );
            this.Plate.receiveShadow = true;
            for(let i = 0; i < 7; i++){
                this.Plate[i] = this.Plate.clone();
                this.Plate[i].position.set(500, 200 * i, 0);
                this.add(this.Plate[i]);
            }
        }

    }
}

export { Shelf };