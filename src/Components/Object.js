import * as THREE from "../../node_modules/three/build/three.module.js";
import { GLTFLoader } from "../../node_modules/three/examples/jsm/loaders/GLTFLoader.js";


class Object extends THREE.Object3D{
    constructor(pk){
        super();
        axios.get(`http://127.0.0.1:8000/upload/${pk}/`)
            .then((res)=>{
                console.log("get object")

                this.name = res.data.name;
                this.description = res.data.description;
                this.model = res.data.model;
                this.savedPosition = res.data.position.split(',');
                this.addedDate = res.data.addedDate;
                this.acquisitionDate = res.data.acquisitionDate;
                this.iframe1 = res.data.iframe1;
                this.iframe2 = res.data.iframe2;
                this.iframe3 = res.data.iframe3;
                this.pk = pk;

                if(this.model){
                    axios.get(this.model,
                        {
                            responseType: 'arraybuffer',
                        })
                        .then((res)=>{
                            this.objectData = res.data;
                            this.loader = new GLTFLoader();
                            this.loader.parse(this.objectData, '', (gltf)=>{
                                this.box = new THREE.Box3().setFromObject(gltf.scene);

                                // Scaling Local
                                this.box_height = this.box.getSize(new THREE.Vector3()).y;
                                this.scaleFactor = 100 / this.box_height;
                                gltf.scene.scale.multiplyScalar(this.scaleFactor);
                                this.box = new THREE.Box3().setFromObject(gltf.scene);

                                // Positioning Local
                                this.box_centerHeight = this.box.getCenter(new THREE.Vector3()).y;
                                gltf.scene.translateY(-this.box_centerHeight);
                                this.box = new THREE.Box3().setFromObject(gltf.scene);

                                this.box_helper = new THREE.Box3Helper( this.box, 0xffff00 );
                                // this.add(this.box_helper);

                                // Positionaing World
                                // gltf.scene.position.set(this.savedPosition[0], this.savedPosition[1], this.savedPosition[2]);
                                this.position.set(this.savedPosition[0], this.savedPosition[1], 0);

                                this.add(gltf.scene);
                            })
                        })
                }else{
                    console.log("Cannot get model from server")
                    this.ObjectGeometry = new THREE.SphereGeometry(80, 10, 10);
                    this.ObjectMaterilal = new THREE.MeshStandardMaterial({color: `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`});
                    this.ObjectMesh = new THREE.Mesh( this.ObjectGeometry, this.ObjectMaterilal);
                    this.add(this.ObjectMesh);
                }
            });
    }

    // async loadModel(pk){
    //     console.log("load model");
    //     await axios.get(`http://127.0.0.1:8000/upload/${pk}/`)
    //     .then((res)=>{
    //         console.log("get object")

    //         this.name = res.data.name;
    //         this.description = res.data.description;
    //         this.model = res.data.model;
    //         this.savedPosition = res.data.position.split(',');
    //         this.addedDate = res.data.addedDate;
    //         this.acquisitionDate = res.data.acquisitionDate;
    //         this.iframe1 = res.data.iframe1;
    //         this.iframe2 = res.data.iframe2;
    //         this.iframe3 = res.data.iframe3;
    //         this.pk = pk;

    //         if(this.model){
    //             // console.log("get object")
    //             axios.get(this.model,
    //                 {
    //                     responseType: 'arraybuffer',
    //                 })
    //                 .then((res)=>{
    //                     this.objectData = res.data;
    //                     this.loader = new GLTFLoader();
    //                     this.loader.parseAsync(this.objectData, '', (gltf)=>{
    //                         this.box = new THREE.Box3().setFromObject(gltf.scene);

    //                         // Scaling Local
    //                         this.box_height = this.box.getSize(new THREE.Vector3()).y;
    //                         this.scaleFactor = 100 / this.box_height;
    //                         gltf.scene.scale.multiplyScalar(this.scaleFactor);
    //                         this.box = new THREE.Box3().setFromObject(gltf.scene);

    //                         // Positioning Local
    //                         this.box_centerHeight = this.box.getCenter(new THREE.Vector3()).y;
    //                         gltf.scene.translateY(-this.box_centerHeight);
    //                         this.box = new THREE.Box3().setFromObject(gltf.scene);

    //                         this.box_helper = new THREE.Box3Helper( this.box, 0xffff00 );
    //                         // this.add(this.box_helper);

    //                         // Positionaing World
    //                         // gltf.scene.position.set(this.savedPosition[0], this.savedPosition[1], this.savedPosition[2]);
    //                         this.position.set(this.savedPosition[0], this.savedPosition[1], this.savedPosition[2]);

    //                         this.add(gltf.scene);
    //                     })
    //                 })
    //         }else{
    //     // if(!this.model){
    //             console.log("Cannot get model from server")
    //             this.ObjectGeometry = new THREE.SphereGeometry(80, 10, 10);
    //             this.ObjectMaterilal = new THREE.MeshStandardMaterial({color: `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`});
    //             this.ObjectMesh = new THREE.Mesh( this.ObjectGeometry, this.ObjectMaterilal);
    //             this.add(this.ObjectMesh);
    //         }

    //     })
    // }
};

export { Object };