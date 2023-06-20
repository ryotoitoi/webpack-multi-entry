# HomeShelf
HomeShelf is a management tool for digital contents. You can add, edit, correct, share and everything you want to do with digital contents.

# run webpack
move root dir and run below command
```bash 
npm start
```

## The rules of Branch Naming
-master |-development |-feature/*

## Scene Properties
- Center : (0,0,0)
- 

## Ojbect Properties
- Height : 100
- 

## Shelf Properties
- Vertical span between each plane : 200
- Shelf width : 1000

## How to control
- One finger to drag and drop
- Two finger to rotate camera

## To do
- Django Side
    - ~~Post position and rotation when objects changed.~~
    - User regisration
    - Connect each object
- Front End
    - Modes
        - ~~Perspective View~~
            - ~~Rotate entire scene~~
        - Control View
            - ~~Move indivisual object~~
            - ~~Register new object~~
                - select SNS or Original object
                - Show 3d perview when a file reigstrated
            - Update object 
                - ~~double click to zoom into the object~~
                - ~~show object detail~~
                - Embed iframe
                - Generate QR code from object detail panel URl.
        - Relationship View
            - Show object network 
        - Animation between modes
    - Loading screen
    - Environment
        - Sun lighting depending on time
        - ~~HDR mapping~~
        - Create Room (unneccesary)
    - ~~Move object combined (D)~~ Done
        - ~~Conbine objects in advance using Blender.~~
        - ~~THREE.Group has difficulties in drag and drop, lighting, so combining should be solved later.~~
        - This is the core part in this application.
        - Use traverse to cast or recieve shadow (https://stackoverflow.com/questions/49869345/how-to-cast-a-shadow-with-a-gltf-model-in-three-js)
    - Enable shadow (D)
    - Make complex shelf and alignable position matrix (D)
        - Use existing shelf made with Blender.
