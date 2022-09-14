import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0x404040, 8); // soft white light
scene.add(light);
scene.background = new THREE.Color(0x87ceeb );




camera.position.y = 3
camera.position.z = 5;


//sky

var sky = new THREE.Sky();
sky.scale.setScalar(5000);

//sun
const params = {
  turbidity: 1,
  mieDirectionalG: 0.0,
  mieCoefficient: 0.0,
  azimuth: 180,
  elevation: 5,
  exposure: renderer.toneMappingExposure,
  rayleigh: 4,
};

var sun = new THREE.Vector3();
const skyParams = sky.material.uniforms;
skyParams["turbidity"].value = params.turbidity;
skyParams["rayleigh"].value = params.rayleigh;
skyParams["mieCoefficient"].value = params.mieCoefficient;
skyParams["mieDirectionalG"].value = params.mieDirectionalG;
const phi = THREE.MathUtils.degToRad(90 - params.elevation);
const theta = THREE.MathUtils.degToRad(params.azimuth);
sun.setFromSphericalCoords(1, phi, theta);

skyParams["sunPosition"].value.copy(sun);

renderer.toneMappingExposure = params.exposure;
scene.add(sky); 



const controls = new OrbitControls( camera, renderer.domElement );




//Floor

const geometryFloor = new THREE.BoxGeometry(1500, 0.5, 1500);
const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const floor = new THREE.Mesh(geometryFloor, material2);
floor.position.y = -0.6;
scene.add(floor);


/*const geometry = new THREE.BoxGeometry(0.3,0.5,0.2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff });
const cube = new THREE.Mesh(geometry, material);
cube.position.z= 0.3;
scene.add(cube);*/


let loader = new THREE.GLTFLoader();
var obj;
loader.load("scene.gltf", function(gltf){
  obj = gltf.scene;
  obj.position.y -= 0.3;
  //obj.scale.x = 0.2;
  //obj.scale.y = 0.2;
  //obj.scale.z = 0.2;
  scene.add(gltf.scene);
})

let loader1 = new THREE.GLTFLoader();
var boot;
loader1.load("snowboots/scene.gltf", function(gltf){
  boot = gltf.scene;
  boot.position.y -= 0.25;
  boot.position.z += 0.3;
  boot.scale.x = 10;
  boot.scale.y = 10;
  boot.scale.z = 10;
  scene.add(gltf.scene);
})

let loader2 = new THREE.GLTFLoader();
var boot2;
loader2.load("snowboots/scene.gltf", function(gltf){
  boot2 = gltf.scene;
  boot2.position.y -= 0.25;
  boot2.position.z -= 0.3;
  boot2.scale.x = 10;
  boot2.scale.y = 10;
  boot2.scale.z = 10;
  scene.add(gltf.scene);
})



  


//House
const geometryHouse = new THREE.BoxGeometry(15, 10, 15);
const textureHouse = new THREE.TextureLoader().load(
  "textures/textureHouse.jpg"
);
const materialHouse = new THREE.MeshBasicMaterial({ map: textureHouse });
const House = new THREE.Mesh(geometryHouse, materialHouse);
House.position.y = +4.7;
House.position.z = -30.6;
House.position.x = -30.6;
scene.add(House);



var flagHouseRoof;
let loaderHouseRoof = new THREE.GLTFLoader();
var HouseRoof;

loaderHouseRoof.load(
  "roof/scene.gltf",
  function (gltf) {
    HouseRoof = gltf.scene;
    HouseRoof.scale.x = 0.2;
    HouseRoof.scale.y = 0.08;
    HouseRoof.scale.z = 0.17;
    // HouseRoof.position.y += 5;
    HouseRoof.rotation.z -= Math.PI / 2;
    HouseRoof.position.set(-9.8, 5.2, 7.9);;

    House.add(gltf.scene);
    flagHouseRoof = true;
  },
  undefined,
  function (error) {
    console.error(error);
  });



var flagHouseDoor;
let loaderHouseDoor = new THREE.GLTFLoader();
var HouseDoor;

loaderHouseDoor.load(
  "Door/scene.gltf",
  function (gltf) {
    HouseDoor = gltf.scene;
    HouseDoor.scale.x = 2.7;
    HouseDoor.scale.y = 2.7;
    HouseDoor.scale.z = 2;
    HouseDoor.rotation.y -= Math.PI / 2;
    HouseDoor.position.set(0, -2.3, 7.6);

    House.add(HouseDoor);
    flagHouseDoor = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

var flagHouseWindow;
let loaderHouseWindow = new THREE.GLTFLoader();
var HouseWindow;

loaderHouseWindow.load(
  "window/scene.gltf",
  function (gltf) {
    HouseWindow = gltf.scene;
    HouseWindow.scale.x = 0.5;
    HouseWindow.scale.y = 0.5;
    HouseWindow.scale.z = 0.5;
    HouseWindow.rotation.y -= Math.PI / 2;
    HouseWindow.position.set(7.6, 2.5, 0);

    House.add(HouseWindow);
    flagHouseWindow = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

var flagHouseCart;
let loaderHouseCart = new THREE.GLTFLoader();
var HouseCart;

loaderHouseCart.load(
  "cart/scene.gltf",
  function (gltf) {
    HouseCart = gltf.scene;
    HouseCart.scale.x = 2;
    HouseCart.scale.y = 2;
    HouseCart.scale.z = 2;

    HouseCart.position.set(12, -5, 4.8);
    HouseCart.rotation.y -= Math.PI / 2;

    House.add(HouseCart);
    flagHouseCart = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// const directionalLight2 = new THREE.PointLight(0xffc966, 9, 5);
// directionalLight2.position.x = -19;
// directionalLight2.position.y = +5.5;
// directionalLight2.position.z = -20;
// if (flagHouseDoor) {
//   directionalLight2.target = HouseDoor;
// }
// scene.add(directionalLight2);

// const directionalLight3 = new THREE.PointLight(0xffc966, 15, 6);
// directionalLight3.position.x = -18;
// directionalLight3.position.y += 1;
// directionalLight3.position.z = -20;

// scene.add(directionalLight3);




const animate = function () {
  requestAnimationFrame(animate);
 
  renderer.render(scene, camera);
}
animate();


