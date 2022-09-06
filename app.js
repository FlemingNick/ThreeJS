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
    camera.position.set(-4,3,-1);

    const ambient = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(-70,80,10);
    scene.add(light);

    //renderer
    //alpha to set any background we want
    renderer = new THREE.WebGL1Renderer({antialias:true, alpha:true});
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
        animate();
    });

    function animate(){
        requestAnimationFrame(animate);
        house.rotation.z += 0.005;
        controls.update();
        renderer.render(scene, camera);
    }

}

init();