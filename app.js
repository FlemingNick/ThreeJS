import GUI from './node_modules/lil-gui/dist/lil-gui.esm.js';

//Variables for Setup

let container;
let camera;
let renderer;
let scene;
let house;

function init(){
    container = document.querySelector('.scene');

    //Create scene
    scene = new THREE.Scene();

    const  fov = 35;
    let w = container.offsetWidth;
    let h = container.offsetHeight;
    const aspect = (container.clientWidth/2)/(container.clientHeight/2);
    const near = 0.1;
    const far = 500;
    
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-20,3,-1);

    const ambient = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(-200,0,0);
    scene.add(light);

    //renderer
    //alpha to set any background we want
    renderer = new THREE.WebGL1Renderer({antialias:true, alpha:true});
    window.renderer = renderer;
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(window.devicePixelRatio);

    //Controls
    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update();

    container.appendChild(renderer.domElement);

    //Load model
    let loader = new THREE.GLTFLoader();
    loader.load('./model/scene.gltf', function(gltf){
        scene.add(gltf.scene);
        house = gltf.scene.children[0];
        house.rotation.y += 3.7
        animate();
    });

    function animate(){
        requestAnimationFrame(animate);
        //house.rotation.y += 0.002;
        controls.update();
        renderer.render(scene, camera);
    }

    window.addEventListener( 'resize', onWindowResize );

}

init();

function onWindowResize() {

    camera.aspect = (container.clientWidth/2)/(container.clientHeight/2);
    camera.updateProjectionMatrix();
    let w = container.offsetWidth;
    let h = container.offsetHeight;
    renderer.setSize( w, h );

}

const gui = new GUI();

// Create color pickers for multiple color formats
const colorFormats = {
	string: '#ffffff',
	int: 0xffffff,
	object: { r: 1, g: 1, b: 1 },
	array: [ 1, 1, 1 ],
};

gui.addColor( colorFormats, 'object' );

gui.onFinishChange(event=>{
    console.log(colorFormats.object)
    let loader = new THREE.GLTFLoader();
    scene.traverse((child)=>{
        if(child.isMesh && child.material.name == "Metall_MAT") {
            console.log(child.material)
            child.material.color.r = colorFormats.object.r;
            child.material.color.g = colorFormats.object.g;
            child.material.color.b = colorFormats.object.b;  
        }
    })

})