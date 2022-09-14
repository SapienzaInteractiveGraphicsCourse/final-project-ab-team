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
var pg;
var ObjectsPg = new Array();
loader.load("scene.gltf", function(gltf){
  pg = gltf.scene;
  pg.position.y -= 0.34;
  //pg.scale.x = 0.2;
  //pg.scale.y = 0.2;
  //pg.scale.z = 0.2;
  scene.add(gltf.scene);











})

/*
let loader1 = new THREE.GLTFLoader();
var boot;
loader1.load("snowboots/scene.gltf", function(gltf){
  boot = gltf.scene;
  boot.position.y -= 0.25;
  boot.position.z += 0.3;
  boot.scale.x = 7;
  boot.scale.y = 7;
  boot.scale.z = 7;
  scene.add(gltf.scene);
})

let loader2 = new THREE.GLTFLoader();
var boot2;
loader2.load("snowboots/scene.gltf", function(gltf){
  boot2 = gltf.scene;
  boot2.position.y -= 0.25;
  boot2.position.z -= 0.3;
  boot2.scale.x = 7;
  boot2.scale.y = 7;
  boot2.scale.z = 7;
  scene.add(gltf.scene);
})


*/
  


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


//Cart

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

//Light house

const directionalLight = new THREE.PointLight(0xffc966, 15, 6);
directionalLight.position.x = -20;
directionalLight.position.y += 6.5;
directionalLight.position.z = -29;

scene.add(directionalLight);


//Trees

var flagSnowTrees1;
let loaderSnowTrees1 = new THREE.GLTFLoader();

var indexSnowTrees = 0;

var SnowTrees1;
loaderSnowTrees1.load(
  "snowtree/scene.gltf",
  function (gltf) {
    SnowTrees1 = gltf.scene;

     SnowTrees1.scale.x = 0.008;
   SnowTrees1.scale.y = 0.008;
    SnowTrees1.scale.z = 0.007;
  SnowTrees1.position.y -= 0.5;

     SnowTrees1.position.z -= 15;
     SnowTrees1.position.x -= 40;

   

    scene.add(SnowTrees1);

    flagSnowTrees1 = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

var flagSnowTrees2;
let loaderSnowTrees2 = new THREE.GLTFLoader();

var indexSnowTrees = 0;

var SnowTrees2;
loaderSnowTrees2.load(
  "snowtree/scene.gltf",
  function (gltf) {
    SnowTrees2 = gltf.scene;

     SnowTrees2.scale.x = 0.008;
   SnowTrees2.scale.y = 0.008;
    SnowTrees2.scale.z = 0.007;
  SnowTrees2.position.y -= 0.5;

     SnowTrees2.position.z += 14;
     SnowTrees2.position.x -= 25;

   

    scene.add(SnowTrees2);

    flagSnowTrees2 = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

var flagSnowTrees3;
let loaderSnowTrees3 = new THREE.GLTFLoader();

var indexSnowTrees = 0;

var SnowTrees3;
loaderSnowTrees3.load(
  "snowtree/scene.gltf",
  function (gltf) {
    SnowTrees3 = gltf.scene;

    SnowTrees3.scale.x = 0.008;
    SnowTrees3.scale.y = 0.008;
    SnowTrees3.scale.z = 0.007;
    SnowTrees3.position.y -= 0.5;

    SnowTrees3.position.z += 2;
    SnowTrees3.position.x += 15;

   

    scene.add(SnowTrees3);

    flagSnowTrees3= true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);



/*
var flagSnowMan;
let loaderSnowMan = new THREE.GLTFLoader();
var snowMan ;

loaderSnowMan.load(
  "snowman/scene.gltf",
  function(gltf) {
    snowMan = gltf.scene;
    snowMan.rotation.y -= Math.PI / 1.3;
    snowMan.position.x += 5;
    snowMan.position.z -= 10;
    snowMan.scale.x = 5;
    snowMan.scale.y = 5;
    snowMan.scale.z = 5;

    scene.add(snowMan);
    flagSnowMan = true;
  });

  var flagSnowMountain;
  let loaderSnowMountain = new THREE.GLTFLoader();
  var SnowMountain ;
  
  loaderSnowMountain.load(
    "mountain/scene.gltf",
    function(gltf) {
      SnowMountain = gltf.scene;
      SnowMountain.rotation.y -= Math.PI / 2;
      SnowMountain.position.x += 55;
      SnowMountain.position.z -= 95;
      SnowMountain.position.y -= 4;
      SnowMountain.scale.x = 0.7;
      SnowMountain.scale.y = 0.7;
      SnowMountain.scale.z = 0.7;
  
      scene.add(SnowMountain);
      flagSnowMountain = true;
    });
*/
var flagScore;
let loaderScore = new THREE.GLTFLoader();
var Score;

loaderScore.load(
  "score/scene.gltf",
  function(gltf){
    Score = gltf.scene;
    Score.scale.x = 10;
    Score.scale.y = 10;
    Score.scale.z = 10;

    Score.position.x -= 8;
    Score.position.y -= 0.75;
    Score.position.z -= 22;

    scene.add(Score);
    flagScore = true;
    const geometryBoardPaper = new THREE.BoxGeometry(3.2, 1.8, 0.1);
    const textureBoardPaper = new THREE.TextureLoader().load(
      "textures/BoardPaperTexture.jpg"
    );
    const materialBoardPaper = new THREE.MeshBasicMaterial({
      map: textureBoardPaper
});
const BoardPaper = new THREE.Mesh(geometryBoardPaper, materialBoardPaper);
    BoardPaper.position.y += 0.3;
    BoardPaper.position.x += 0.01;
    BoardPaper.position.z += 0.03;
    BoardPaper.rotation.y -= Math.PI;
    BoardPaper.scale.x = 0.12;
    BoardPaper.scale.y = 0.12;
    BoardPaper.scale.z = 0.12;
    ObjectsPg.push(BoardPaper);
    Score.add(BoardPaper);

    const loaderGeometry = new THREE.FontLoader();

    loaderGeometry.load(
      "fonts/helvetiker_regular.typeface.json",
      function (font) {
        const geometryPaperText = new THREE.TextGeometry(
          "TOTAL SNOWBALLS \n COLLECTED: 0",
          {
            font: font,
            size: 5,
            height: 1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 0.2,
            bevelOffset: 0,
            bevelSegments: 3,
          }
        );
        const texturePaperText = new THREE.TextureLoader().load(
          "textures/BoardPaperTexture.jpg"
        );
        const materialPaperText = new THREE.MeshBasicMaterial({
          color: 0xffa500,
        });
        const PaperText = new THREE.Mesh(geometryPaperText, materialPaperText);
        ObjectsPg.push(PaperText);
        PaperText.scale.x = 0.05;
        PaperText.scale.y = 0.05;
        PaperText.scale.z = 0.05;
        PaperText.position.y += 2.5;
        PaperText.position.z -= 21.6;
        PaperText.position.x -= 9.5;
        scene.add(PaperText);
      }
    );
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const animate = function () {
  requestAnimationFrame(animate);
 
  renderer.render(scene, camera);
}
animate();


