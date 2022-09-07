import GUI from './node_modules/lil-gui/dist/lil-gui.esm.js';

const gui = new GUI();

const myObject = {
	myBoolean: true,
	//myFunction: function() { ... },
	myString: 'lil-gui',
	myNumber: 1
};

// gui.add( myObject, 'myBoolean' );  // Checkbox
// //gui.add( myObject, 'myFunction' ); // Button
// gui.add( myObject, 'myString' );   // Text Field
// gui.add( myObject, 'myNumber' );   // Number Field

// // Add sliders to number fields by passing min and max
// gui.add( myObject, 'myNumber', 0, 1 );
// gui.add( myObject, 'myNumber', 0, 100, 2 ); // snap to even numbers

// // Create dropdowns by passing an array or object of named values
// gui.add( myObject, 'myNumber', [ 0, 1, 2 ] );
// gui.add( myObject, 'myNumber', { Label1: 0, Label2: 1, Label3: 2 } );

// // Chainable methods
// gui.add( myObject, 'myProperty' )
// 	.name( 'Custom Name' )
// 	.onChange( value => {
// 		console.log( value );
// 	} );

// Create color pickers for multiple color formats
const colorFormats = {
	Color: '#ffffff',
	int: 0xffffff,
	object: { r: 1, g: 1, b: 1 },
	array: [ 1, 1, 1 ],
};

gui.addColor( colorFormats, 'Color' );

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