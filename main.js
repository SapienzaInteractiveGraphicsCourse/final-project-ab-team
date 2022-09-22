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

const light = new THREE.AmbientLight(0x404040, 8); 
scene.add(light);
scene.background = new THREE.Color(0x87ceeb );
camera.position.y = 3
camera.position.z = 5;


var ball0 = true;
var ball1 = true;
var ball2 = true;
var ball3 = true;
var ball4 = true;
var ball5 = true;
var ball6 = true;
var ball7 = true;
var generalFlag = true;
var sumBalls = 0;
var flagAnimation = false;

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



//snowballs
var number = 0;
var signX;
var signY;
var flagX;
var flagY;
var Cordinates = new Array();
var Objects = new Array();
var Cordinates_x;
var Cordinates_y;
while (number < 8) {
  const geometry = new THREE.SphereGeometry(0.1, 20, 20, 20, 20, 20, 20);
  const texture = new THREE.TextureLoader().load("textures/snowstar.jpg");
  const material = new THREE.MeshBasicMaterial({ map: texture, color: 0xe0ffff });
  const snowball = new THREE.Mesh(geometry, material);
  flagX = Math.random();
  if (flagX >= 0.5) {
    signX = 1;
  } else {
    signX = -1;
  }
  flagY = Math.random();
  if (flagY >= 0.5) {
    signY = 1;
  } else {
    signY = -1;
  }
  Cordinates_x = Math.random() * 10 * signX;
  Cordinates_y = Math.random() * 10 * signY;
  Cordinates.push((Cordinates_x, 0, Cordinates_y));
  Objects.push(snowball);
  snowball.position.set(Cordinates_x, 0, Cordinates_y);
  scene.add(snowball);
  number = number + 1;
}


//floor
const geometryFloor = new THREE.BoxGeometry(200, 0.5, 200);
const textureFloor = new THREE.TextureLoader().load(
  "textures/snow.jpg"
);
const material2 = new THREE.MeshBasicMaterial({ map: textureFloor});//0xffffff });
const floor = new THREE.Mesh(geometryFloor, material2);
floor.position.y = -0.6;
scene.add(floor);




//snow
let particles;
let positions = [], velocities = [];
const numSnowflakes = 15000;
const maxRange = 100, minRange= maxRange / 2;
const minHeight = 15;
const geometry = new THREE.BufferGeometry();
const textureLoaderSF = new THREE.TextureLoader();

addSnowFlakes();

function addSnowFlakes(){

    for(let i = 0; i<numSnowflakes; i++){
        positions.push(
            Math.floor( Math.random() * maxRange - minRange),
            Math.floor( Math.random() * minRange + minHeight),
            Math.floor( Math.random() * maxRange - minRange)
        );
  
        velocities.push(
            Math.floor( Math.random() * 6 - 3) * 0.01,
            Math.floor( Math.random() * 5 + 0.12 ) * 0.018,
            Math.floor( Math.random() * 6 - 3) * 0.01,
        );
        }
  
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions,3));
        geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities,3));
  
        const flakeMaterial = new THREE.PointsMaterial({
            size : 0.5,
            map: textureLoaderSF.load("textures/snowing.png"),
            blending: THREE.AdditiveBlending,
            depthTest : false,
            transparent: true,
            opacity : 0.8
  
        });
        particles = new THREE.Points(geometry, flakeMaterial);
        scene.add(particles);
        particles.visible = false;
  
  }
  function updateParticles(){
   
    for(let i=0; i < numSnowflakes; i += 3){
        particles.geometry.attributes.position.array[i] -= particles.geometry.attributes.velocity.array[i];
        particles.geometry.attributes.position.array[i+1] -= particles.geometry.attributes.velocity.array[i+1];
        particles.geometry.attributes.position.array[i+2] -= particles.geometry.attributes.velocity.array[i+2];
  
        if(particles.geometry.attributes.position.array[i+1] < 0 ){
            particles.geometry.attributes.position.array[i] = Math.floor(Math.random() * maxRange - minRange );
            particles.geometry.attributes.position.array[i+1] = Math.floor(Math.random() * maxRange + minHeight );
            particles.geometry.attributes.position.array[i+2] = Math.floor(Math.random() * maxRange - minRange );
        }
  
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }

//pg
let loader = new THREE.GLTFLoader();
var pg;
var flagPg = false;
var ObjectsPg = new Array();
loader.load("scene.gltf", function(gltf){
  pg = gltf.scene;
  pg.position.y -= 0.34;
  scene.add(gltf.scene);
  flagPg = true;


  let loader1 = new THREE.GLTFLoader();
  var boot;
  loader1.load("snowboots/scene.gltf", function(gltf){
    boot = gltf.scene;
    boot.position.y += 0.03;
    boot.position.z += 0.2;
    boot.scale.x = 5;
    boot.scale.y = 5;
    boot.scale.z = 5;
    pg.add(gltf.scene);
  })
  
  let loader2 = new THREE.GLTFLoader();
  var boot2;
  loader2.load("snowboots/scene.gltf", function(gltf){
    boot2 = gltf.scene;
    boot2.position.y += 0.03;
    boot2.position.z -= 0.2;
    boot2.scale.x = 5;
    boot2.scale.y = 5;
    boot2.scale.z = 5;
    pg.add(gltf.scene);
  })

    //head
    const geometryHead = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const textureHead = new THREE.TextureLoader().load(
      "textures/hat2.jpg"
    );
     const materialHead = new THREE.MeshBasicMaterial({ map: textureHead });
     const head = new THREE.Mesh(geometryHead, materialHead);
     head.position.y += 1.9;
     head.position.x -= 0.25;
    ObjectsPg.push(head);
    pg.add(head);

//face
const geometryFaceTexture = new THREE.PlaneGeometry(0.3, 0.3);
const textureFaceTexture = new THREE.TextureLoader().load(
  "textures/face2.jpg"
);
const materialFaceTexture = new THREE.MeshBasicMaterial({
  map: textureFaceTexture,
});
const FaceTexture = new THREE.Mesh(
  geometryFaceTexture,
  materialFaceTexture
);
    FaceTexture.position.y += 1.9;
    FaceTexture.position.x -= 0.402;
    FaceTexture.rotation.y -= Math.PI / 2;
pg.add(FaceTexture);

//fur
const geometrySp = new THREE.SphereGeometry(0.03, 20, 20, 20, 20, 20, 20);
  const texture = new THREE.TextureLoader().load("textures/hat fur.jpg");
  const material = new THREE.MeshBasicMaterial({ map: texture, color: 0x006400 });
  const sphere = new THREE.Mesh(geometrySp, material);
  sphere.position.x -= 0.23;
  sphere.position.y += 2.1;
  pg.add(sphere);

//snowglasses
const geometryGlasses = new THREE.PlaneGeometry(0.3, 0.3);
const textureGlasses = new THREE.TextureLoader().load(
  "textures/glasses.jpg"
);
const materialGlasses = new THREE.MeshBasicMaterial({
  map: textureGlasses,
});
const Glasses = new THREE.Mesh(
  geometryGlasses,
  materialGlasses
);
    Glasses.scale.y = 0.33;
    Glasses.position.y += 1.95;
    Glasses.position.x -= 0.41;
    Glasses.rotation.y -= Math.PI / 2;
pg.add(Glasses);


    //body
    const geometryBody = new THREE.BoxGeometry(0.4, 0.75, 0.7);
    const textureBody = new THREE.TextureLoader().load(
      "textures/snowjacket2.jpg"
    );
    const materialBody = new THREE.MeshBasicMaterial({ map: textureBody, color: 0xffffff });
    const body = new THREE.Mesh(geometryBody, materialBody);
    body.position.y += 1.5;
    body.position.x += 0.13;
    body.rotation.z += 1/8 * Math.PI ;
    ObjectsPg.push(body);
    pg.add(body);

    //UpperLeftArm
    const geometryUpperLeftArm = new THREE.BoxGeometry(0.1, 0.28, 0.07);
    const textureUpperLeftArm = new THREE.TextureLoader().load(
      "textures/snowjacket2.jpg"
    );
    const materialUpperLeftArm = new THREE.MeshBasicMaterial({
      map: textureUpperLeftArm,
    });
    const UpperLeftArm = new THREE.Mesh(
      geometryUpperLeftArm,
      materialUpperLeftArm
    );
    UpperLeftArm.position.y += 1.65;
    UpperLeftArm.position.x -= 0.2;
    UpperLeftArm.position.z += 0.49;
    UpperLeftArm.rotation.z += 1/4 * Math.PI  ;
    UpperLeftArm.rotation.x += Math.PI / 2;
    ObjectsPg.push(UpperLeftArm);
    pg.add(UpperLeftArm);

    //UpperRightArm
    const geometryUpperRightArm = new THREE.BoxGeometry(0.1, 0.28, 0.07);
    const textureUpperRightArm = new THREE.TextureLoader().load(
      "textures/snowjacket2.jpg"
    );
    const materialUpperRightArm = new THREE.MeshBasicMaterial({
      map: textureUpperRightArm,
    });
    const UpperRightArm = new THREE.Mesh(
      geometryUpperRightArm,
      materialUpperRightArm
    );
    UpperRightArm.position.y += 1.65;
    UpperRightArm.position.x -= 0.2;
    UpperRightArm.position.z -= 0.49;
    UpperRightArm.rotation.z -= 1/4 * Math.PI  ;
    UpperRightArm.rotation.x += Math.PI / 2;
    ObjectsPg.push(UpperRightArm);
    pg.add(UpperRightArm);

    
    //LowerLeftArm
    const geometryLowerLeftArm = new THREE.BoxGeometry(0.08, 0.35, 0.07);
    const textureLowerLeftArm = new THREE.TextureLoader().load(
      "textures/snowjacket2.jpg"
    );
    const materialLowerLeftArm = new THREE.MeshBasicMaterial({
      map: textureLowerLeftArm,
    });
    const LowerLeftArm = new THREE.Mesh(
      geometryLowerLeftArm,
      materialLowerLeftArm
    );
    LowerLeftArm.position.y += 1.65;
    LowerLeftArm.position.x -= 0.44;
    LowerLeftArm.position.z += 0.58;
    LowerLeftArm.rotation.z += Math.PI / 2;
    ObjectsPg.push(LowerLeftArm);
    pg.add(LowerLeftArm);

    //LowerRightArm
const geometryLowerRightArm = new THREE.BoxGeometry(0.08, 0.35, 0.07);
const textureLowerRightArm = new THREE.TextureLoader().load(
  "textures/snowjacket2.jpg"
);
const materialLowerRightArm = new THREE.MeshBasicMaterial({
  map: textureLowerRightArm,
});
const LowerRightArm = new THREE.Mesh(
  geometryLowerRightArm,
  materialLowerRightArm
);
LowerRightArm.position.y += 1.65;
LowerRightArm.position.x -= 0.44;
LowerRightArm.position.z -= 0.58;
LowerRightArm.rotation.z += Math.PI / 2;
ObjectsPg.push(LowerRightArm);
pg.add(LowerRightArm);


//lefthand
let loaderHand = new THREE.GLTFLoader();
  var LeftHand;
  loaderHand.load("hand/scene.gltf", function(gltf){
    LeftHand = gltf.scene;
    LeftHand.position.y += 1.65;
    LeftHand.position.x -= 0.69;
    LeftHand.position.z += 0.58;
    LeftHand.scale.x = 0.04;
    LeftHand.scale.y = 0.04;
    LeftHand.scale.z = 0.04;
    LeftHand.rotation.z += Math.PI / 2;
    LeftHand.rotation.x -= Math.PI / 2;
    pg.add(gltf.scene);
  })

//righthand
  let loaderHand2 = new THREE.GLTFLoader();
  var RightHand;
  loaderHand2.load("hand/scene.gltf", function(gltf){
    RightHand = gltf.scene;
    RightHand.position.y += 1.65;
    RightHand.position.x -= 0.69;
    RightHand.position.z -= 0.58;
    RightHand.scale.x = 0.04;
    RightHand.scale.y = 0.04;
    RightHand.scale.z = 0.04;
    RightHand.rotation.z += Math.PI / 2;
    RightHand.rotation.x += Math.PI / 2;
    pg.add(gltf.scene);
  })
 
//leg
const geometryLeg = new THREE.BoxGeometry(0.45, 0.26, 0.6);
const textureLeg = new THREE.TextureLoader().load(
  "textures/snowjacket.jpg"
);
const materialLeg = new THREE.MeshBasicMaterial({ map: textureLeg, color:0x006400 });
const Leg = new THREE.Mesh(geometryLeg, materialLeg);
Leg.position.x += 0.3;
Leg.position.y += 1;
ObjectsPg.push(Leg);
pg.add(Leg);

    //upperLeftleg
    const geometryUpperLeftLeg = new THREE.BoxGeometry(0.15, 0.4, 0.17);
    const textureUpperLeftLeg = new THREE.TextureLoader().load(
      "textures/snowjacket.jpg"
    );
    const materialUpperLeftLeg = new THREE.MeshBasicMaterial({ map: textureUpperLeftLeg, color:0x006400  });
    const UpperLeftLeg = new THREE.Mesh(geometryUpperLeftLeg, materialUpperLeftLeg);
    UpperLeftLeg.position.x += 0.12;
    UpperLeftLeg.position.z += 0.2;
    UpperLeftLeg.position.y += 0.8;
    UpperLeftLeg.rotation.z -=1/7 * Math.PI ;
    ObjectsPg.push(UpperLeftLeg);
    pg.add(UpperLeftLeg);
   
   //upperRightleg
   const geometryUpperRightLeg = new THREE.BoxGeometry(0.15, 0.4, 0.17);
   const textureUpperRightLeg = new THREE.TextureLoader().load(
    "textures/snowjacket2.jpg"
   );
   const materialUpperRightLeg = new THREE.MeshBasicMaterial({ map: textureUpperRightLeg, color:0x006400  });
   const UpperRightLeg = new THREE.Mesh(geometryUpperRightLeg, materialUpperRightLeg);
   UpperRightLeg.position.x += 0.12;
   UpperRightLeg.position.z -= 0.2;
   UpperRightLeg.position.y += 0.8;
   UpperRightLeg.rotation.z -= 1/7 * Math.PI ;
   ObjectsPg.push(UpperRightLeg);
   pg.add(UpperRightLeg);

    //LowerLeftLeg
    const geometryLowerLeftLeg = new THREE.BoxGeometry(0.09, 0.35, 0.14);
    const textureLowerLeftLeg = new THREE.TextureLoader().load(
      "textures/snowjacket2.jpg"
    );
    const materialLowerLeftLeg = new THREE.MeshBasicMaterial({ map: textureLowerLeftLeg, color:0x006400  });
    const LowerLeftLeg = new THREE.Mesh(geometryLowerLeftLeg, materialLowerLeftLeg);
      LowerLeftLeg.position.x += 0.05;
      LowerLeftLeg.position.y += 0.5;
      LowerLeftLeg.position.z += 0.2;
      LowerLeftLeg.rotation.y += Math.PI / 2;
      ObjectsPg.push(LowerLeftLeg);
      pg.add(LowerLeftLeg);

//LowerRightLeg
    const geometryLowerRightLeg = new THREE.BoxGeometry(0.09, 0.35, 0.14);
    const textureLowerRightLeg = new THREE.TextureLoader().load(
      "textures/snowjacket.jpg"
    );
    const materialLowerRightLeg = new THREE.MeshBasicMaterial({ map: textureLowerRightLeg, color:0x006400  });
    const LowerRightLeg = new THREE.Mesh(geometryLowerRightLeg, materialLowerRightLeg);
      LowerRightLeg.position.x += 0.05;
      LowerRightLeg.position.y += 0.5;
      LowerRightLeg.position.z -= 0.2;
      LowerRightLeg.rotation.y += Math.PI / 2;
    ObjectsPg.push(LowerRightLeg);
    pg.add(LowerRightLeg);
    flagPg = true;

  });



//house
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


//houseroof
var flagHouseRoof = false;
let loaderHouseRoof = new THREE.GLTFLoader();
var HouseRoof;

loaderHouseRoof.load(
  "roof/scene.gltf",
  function (gltf) {
    HouseRoof = gltf.scene;
    HouseRoof.scale.x = 0.2;
    HouseRoof.scale.y = 0.08;
    HouseRoof.scale.z = 0.17;
    HouseRoof.rotation.z -= Math.PI / 2;
    HouseRoof.position.set(-9.8, 5.2, 7.9);;
    House.add(gltf.scene);
    flagHouseRoof = true;
  },
  undefined,
  function (error) {
    console.error(error);
  });


//housedoor
var flagHouseDoor = false;
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


//housewindow
var flagHouseWindow = false;
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


//cart
var flagHouseCart = false;
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
var flagSnowTrees1 = false;
let loaderSnowTrees1 = new THREE.GLTFLoader();
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


var flagSnowTrees4;
let loaderSnowTrees4 = new THREE.GLTFLoader();
var SnowTrees4;
loaderSnowTrees4.load(
  "snowtree/scene.gltf",
  function (gltf) {
    SnowTrees4 = gltf.scene;
    SnowTrees4.scale.x = 0.008;
    SnowTrees4.scale.y = 0.008;
    SnowTrees4.scale.z = 0.007;
    SnowTrees4.position.x += 3;
    SnowTrees4.position.y -= 0.75;
    SnowTrees4.position.z -= 22;
    scene.add(SnowTrees4);
    flagSnowTrees4= true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);


//snowman
var flagSnowMan;
let loaderSnowMan = new THREE.GLTFLoader();
var snowMan ;

loaderSnowMan.load(
  "snowman/scene.gltf",
  function(gltf) {
    snowMan = gltf.scene;
    snowMan.rotation.y -= Math.PI / 3;
    snowMan.position.x -= 15;
    snowMan.position.z -= 5;
    snowMan.position.y -= 6;
    snowMan.scale.x = 5;
    snowMan.scale.y = 5;
    snowMan.scale.z = 5;
    scene.add(snowMan);
    flagSnowMan = true;
  });


//snowmountain
  var flagSnowMountain;
  let loaderSnowMountain = new THREE.GLTFLoader();
  var SnowMountain ;
  
  loaderSnowMountain.load(
    "mountain/scene.gltf",
    function(gltf) {
      SnowMountain = gltf.scene;
      SnowMountain.rotation.y -= Math.PI / 2;
      SnowMountain.position.x += 30;
      SnowMountain.position.z -= 80;
      SnowMountain.position.y -= 4;
      SnowMountain.scale.x = 0.5;
      SnowMountain.scale.y = 0.5;
      SnowMountain.scale.z = 0.5;
      scene.add(SnowMountain);
      flagSnowMountain = true;
    });


    //score
var flagScore;
let loaderScore = new THREE.GLTFLoader();
var Score;
var ObjectsScore = new Array();
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
    ObjectsScore.push(Score);
    scene.add(Score);
    flagScore = true;

  //paper
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
    ObjectsScore.push(BoardPaper);
    Score.add(BoardPaper);

//text  
    const loaderGeometry = new THREE.FontLoader();
    loaderGeometry.load(
      "fonts/helvetiker_regular.typeface.json",
      function (font) {
        const geometryPaperText = new THREE.TextGeometry(
          "SNOWMAN \n PERCENTAGE \n COMPLETED:  0%", {font: font,size: 5.3,height: 1, curveSegments: 12,bevelEnabled: true,bevelThickness: 1,bevelSize: 0.2,bevelOffset: 0,bevelSegments: 3});
        const texturePaperText = new THREE.TextureLoader().load(
          "textures/BoardPaperTexture.jpg"
        );
        const materialPaperText = new THREE.MeshBasicMaterial({
          color: 0x0000ff,
        });
        const PaperText = new THREE.Mesh(geometryPaperText, materialPaperText);
        ObjectsPg.push(PaperText);
        PaperText.scale.x = 0.05;
        PaperText.scale.y = 0.05;
        PaperText.scale.z = 0.05;
        PaperText.position.y += 2.5;
        PaperText.position.z -= 21.6;
        PaperText.position.x -= 9.6;
        ObjectsScore.push(PaperText);
        scene.add(PaperText);
      }
    );
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//oldsnowman1
const geometryOldSnowMan = new THREE.SphereGeometry(0.8, 20, 20, 20, 20, 20, 20);
  const textureOldSnowMan = new THREE.TextureLoader().load("textures/snowstar.jpg");
  const materialOldSnowMan = new THREE.MeshBasicMaterial({ map: textureOldSnowMan, color: 0xffffff });
  const OldSnowMan = new THREE.Mesh(geometryOldSnowMan, materialOldSnowMan);
  OldSnowMan.position.x -= 15;
  OldSnowMan.position.z -= 5;
  OldSnowMan.position.y -= 1.5; // + 2
  scene.add(OldSnowMan);

//oldsnowman2  
  const geometryOldSnowMan1 = new THREE.SphereGeometry(0.5, 20, 20, 20, 20, 20, 20);
  const textureOldSnowMan1 = new THREE.TextureLoader().load("textures/snowstar.jpg");
  const materialOldSnowMan1 = new THREE.MeshBasicMaterial({ map: textureOldSnowMan1, color: 0xffffff });
  const OldSnowMan1 = new THREE.Mesh(geometryOldSnowMan1, materialOldSnowMan1);
  OldSnowMan1.position.x -= 15;
  OldSnowMan1.position.z -= 5;
  OldSnowMan1.position.y -= 1.1; // 2.5
  scene.add(OldSnowMan1);

//controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.screenSpacePanning = false;
controls.minDistance = 2;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2;
controls.keys = false;
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
camera.position.z = 6;
controls.update();
document.body.addEventListener("keydown", keyPressed);
var indiceappoggio = 0;
var direzione = 0;
var firstObj;
var secondObj;

function keyPressed(e) {
  if (flagPg) {
    controls.target = pg.position;

    switch (e.key) {
      case "ArrowUp":
        firstObj = new THREE.Box3().setFromObject(pg);
        secondObj = new THREE.Box3().setFromObject(SnowTrees1);
        var crash = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(Score);
        var crash1 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(House);
        var crash2 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(HouseCart);
        var crash3 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(SnowTrees2);
        var crash4 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(SnowTrees3);
        var crash5 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(SnowTrees4);
        var crash6 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(SnowMountain);
        var crash7 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(OldSnowMan);
        var crash8 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(OldSnowMan1);
        var crash9 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(snowMan);
        var crash10 = firstObj.intersectsBox(secondObj);

        
        if (!crash && !crash1 && !crash2 && !crash3 && !crash4 && !crash5 && !crash6 && !crash7 && !crash8 && !crash9 && !crash10)  {
          if (direzione == 0) {
            pg.position.z -= 0.1;
            camera.position.z -= 0.1;
          }
          if (direzione == -1) {
            pg.position.x += 0.1;
            camera.position.x += 0.1;
          }
          if (direzione == -2) {
            pg.position.z += 0.1;
            camera.position.z += 0.1;
          }
          if (direzione == -3) {
            pg.position.x -= 0.1;
            camera.position.x -= 0.1;
          }

          if (direzione == 1) {
            pg.position.x -= 0.1;
            camera.position.x -= 0.1;
          }
          if (direzione == 2) {
            pg.position.z += 0.1;
            camera.position.z += 0.1;
          }
          if (direzione == 3) {
            pg.position.x += 0.1;
            camera.position.x += 0.1;
          }
        }
        break;
        
      case "ArrowDown":
        firstObj = new THREE.Box3().setFromObject(pg);
        secondObj = new THREE.Box3().setFromObject(SnowTrees1);
        var crash = firstObj.intersectsBox(secondObj);

       secondObj = new THREE.Box3().setFromObject(Score);
        var crash1 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(House);
        var crash2 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(HouseCart);
        var crash3 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(SnowTrees2);
        var crash4 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(SnowTrees3);
        var crash5 = firstObj.intersectsBox(secondObj);
        
        secondObj = new THREE.Box3().setFromObject(SnowTrees4);
        var crash6 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(SnowMountain);
        var crash7 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(OldSnowMan);
        var crash8 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(OldSnowMan1);
        var crash9 = firstObj.intersectsBox(secondObj);

        secondObj = new THREE.Box3().setFromObject(snowMan);
        var crash10 = firstObj.intersectsBox(secondObj);


        if (!crash && !crash1 && !crash2 && !crash3 && !crash4 && !crash5 && !crash6 && !crash7 && !crash8 && !crash9 && !crash10) {
          if (direzione == 0) {
            pg.position.z += 0.1;
            camera.position.z += 0.1;
          }
          if (direzione == -1) {
            pg.position.x -= 0.1;
            camera.position.x -= 0.1;
          }
          if (direzione == -2) {
            pg.position.z -= 0.1;
            camera.position.z -= 0.1;
          }
          if (direzione == -3) {
            pg.position.x += 0.1;
            camera.position.x += 0.1;
          }

          if (direzione == 1) {
            pg.position.x += 0.1;
            camera.position.x += 0.1;
          }
          if (direzione == 2) {
            pg.position.z -= 0.1;
            camera.position.z -= 0.1;
          }
          if (direzione == 3) {
            pg.position.x -= 0.1;
            camera.position.x -= 0.1;
          }
        }

        break;
      case "ArrowLeft":
        direzione += 1;
        if (direzione == 4) {
          direzione = 0;
        }
        pg.rotation.y += Math.PI / 2;
        break;
      case "ArrowRight":
        direzione -= 1;
        if (direzione == -4) {
          direzione = 0;
        }
        pg.rotation.y -= Math.PI / 2;
        break;
    }
    e.preventDefault();
  }
}
var flagOldSnowMan = false;
var flagOldSnowMan1 = false;
var indexarraysphere = 0;
const animate = function () {
  requestAnimationFrame(animate);
  for (
    indexarraysphere = 0;
    indexarraysphere < Objects.length;
    indexarraysphere++
  ) {
    Objects[indexarraysphere].rotation.y += 0.02;
  }

if (generalFlag && flagPg) {
  const loaderGeometryFont = new THREE.FontLoader();

  if (sumBalls == 30 && flagOldSnowMan == false) {
    if(OldSnowMan.position.y < 0.43){
      OldSnowMan.position.y += 0.02;
      
    }
    else flagOldSnowMan = true;
  }

  if (sumBalls == 60 && flagOldSnowMan1 == false) {
    if(OldSnowMan1.position.y < 1.4){
      OldSnowMan1.position.y += 0.02;
      
    }
    else flagOldSnowMan1 = true;
  }

  if (ball0) {
    var xDif = pg.position.x - Objects[0].position.x;
    var yDif = pg.position.z - Objects[0].position.z;
    if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1) {
      scene.remove(Objects[0]);
      sumBalls += 10;
      ball0 = false;
      var stringa = String(sumBalls);
      loaderGeometryFont.load(
        "fonts/helvetiker_regular.typeface.json",
        function (font) {
          ObjectsScore[2].geometry = new THREE.TextGeometry(
            "SNOWMAN \n PERCENTAGE \n COMPLETED: " + stringa + "%",{font: font,size: 5.3,height: 1, curveSegments: 12,bevelEnabled: true,bevelThickness: 1,bevelSize: 0.2,bevelOffset: 0,bevelSegments: 3});
          scene.add(ObjectsScore[2]);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    }
  }
  if (ball1) {
    var xDif = pg.position.x - Objects[1].position.x;
    var yDif = pg.position.z - Objects[1].position.z;
    if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1) {
      scene.remove(Objects[1]);
      sumBalls += 10;
      ball1 = false;
      var stringa = String(sumBalls);
      loaderGeometryFont.load(
        "fonts/helvetiker_regular.typeface.json",
        function (font) {
          ObjectsScore[2].geometry = new THREE.TextGeometry(
            "SNOWMAN \n PERCENTAGE \n COMPLETED: " + stringa + "%",{font: font,size: 5.3,height: 1, curveSegments: 12,bevelEnabled: true,bevelThickness: 1,bevelSize: 0.2,bevelOffset: 0,bevelSegments: 3});
          scene.add(ObjectsScore[2]);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    }
  }
  if (ball2) {
    var xDif = pg.position.x - Objects[2].position.x;
    var yDif = pg.position.z - Objects[2].position.z;
    if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1) {
      scene.remove(Objects[2]);
      sumBalls += 10;
      ball2= false;
      var stringa = String(sumBalls);
      loaderGeometryFont.load(
        "fonts/helvetiker_regular.typeface.json",
        function (font) {
          ObjectsScore[2].geometry = new THREE.TextGeometry(
            "SNOWMAN \n PERCENTAGE \n COMPLETED: " + stringa + " %" ,{font: font,size: 5.3,height: 1, curveSegments: 12,bevelEnabled: true,bevelThickness: 1,bevelSize: 0.2,bevelOffset: 0,bevelSegments: 3});
          scene.add(ObjectsScore[2]);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    }
  }
  if (ball3) {
    var xDif = pg.position.x - Objects[3].position.x;
    var yDif = pg.position.z - Objects[3].position.z;
    if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1) {
      scene.remove(Objects[3]);
      sumBalls += 10;
      ball3= false;
      var stringa = String(sumBalls);
      loaderGeometryFont.load(
        "fonts/helvetiker_regular.typeface.json",
        function (font) {
          ObjectsScore[2].geometry = new THREE.TextGeometry(
            "SNOWMAN \n PERCENTAGE \n COMPLETED: " + stringa + "%",{font: font,size: 5.3,height: 1, curveSegments: 12,bevelEnabled: true,bevelThickness: 1,bevelSize: 0.2,bevelOffset: 0,bevelSegments: 3});
          scene.add(ObjectsScore[2]);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    }
  }
  if (ball4) {
    var xDif = pg.position.x - Objects[4].position.x;
    var yDif = pg.position.z - Objects[4].position.z;
    if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1) {
      scene.remove(Objects[4]);
      sumBalls += 10;
      ball4= false;
      var stringa = String(sumBalls);
      loaderGeometryFont.load(
        "fonts/helvetiker_regular.typeface.json",
        function (font) {
          ObjectsScore[2].geometry = new THREE.TextGeometry(
            "SNOWMAN \n PERCENTAGE \n COMPLETED: " + stringa + "%",{font: font,size: 5.3,height: 1, curveSegments: 12,bevelEnabled: true,bevelThickness: 1,bevelSize: 0.2,bevelOffset: 0,bevelSegments: 3});
          scene.add(ObjectsScore[2]);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    }
  }
  if (ball5) {
    var xDif = pg.position.x - Objects[5].position.x;
    var yDif = pg.position.z - Objects[5].position.z;
    if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1) {
      scene.remove(Objects[5]);
      sumBalls += 10;
      ball5= false;
      var stringa = String(sumBalls);
      loaderGeometryFont.load(
        "fonts/helvetiker_regular.typeface.json",
        function (font) {
          ObjectsScore[2].geometry = new THREE.TextGeometry(
            "SNOWMAN \n PERCENTAGE \n COMPLETED: " + stringa + "%",{font: font,size: 5.3,height: 1, curveSegments: 12,bevelEnabled: true,bevelThickness: 1,bevelSize: 0.2,bevelOffset: 0,bevelSegments: 3});
          scene.add(ObjectsScore[2]);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    }
  }
  if (ball6) {
    var xDif = pg.position.x - Objects[6].position.x;
    var yDif = pg.position.z - Objects[6].position.z;
    if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1) {
      scene.remove(Objects[6]);
      sumBalls += 10;
      ball6= false;
      var stringa = String(sumBalls);
      loaderGeometryFont.load(
        "fonts/helvetiker_regular.typeface.json",
        function (font) {
          ObjectsScore[2].geometry = new THREE.TextGeometry(
            "SNOWMAN \n PERCENTAGE \n COMPLETED: " + stringa + "%",{ font: font,size: 5.3,height: 1, curveSegments: 12,bevelEnabled: true,bevelThickness: 1,bevelSize: 0.2,bevelOffset: 0,bevelSegments: 3});
          scene.add(ObjectsScore[2]);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    }
  }
  if (ball7) {
    var xDif = pg.position.x - Objects[7].position.x;
    var yDif = pg.position.z - Objects[7].position.z;
    if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1) {
      scene.remove(Objects[7]);
      sumBalls += 10;
      ball7= false;
      var stringa = String(sumBalls);
      loaderGeometryFont.load(
        "fonts/helvetiker_regular.typeface.json",
        function (font) {
          ObjectsScore[2].geometry = new THREE.TextGeometry(
            "SNOWMAN \n PERCENTAGE \n COMPLETED: 100%",{font: font,size: 5.3,height: 1, curveSegments: 12,bevelEnabled: true,bevelThickness: 1,bevelSize: 0.2,bevelOffset: 0,bevelSegments: 3});
          scene.add(ObjectsScore[2]);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    }
  }

}

if (flagSnowMan) {
  if(sumBalls == 80 ){
    particles.visible = true;
    updateParticles();
  
  if (generalFlag == true) {
    OldSnowMan.rotation.y += 0.027;
    OldSnowMan1.rotation.y += 0.027;
    controls.target.x = -8;
    controls.target.z = -7;
    controls.update();
     if (OldSnowMan.rotation.y > 12 && OldSnowMan1.rotation.y > 12) {
      scene.remove(OldSnowMan);
      scene.remove(OldSnowMan1);
      flagAnimation = true;
    }
    if(flagAnimation == true && snowMan.position.y < -0.3 ){
        snowMan.position.y += 0.035;
       }
    }  
      if ( snowMan.position.y > -0.3 && generalFlag == true ) {
        generalFlag = false;
        alert(
          "Congratulations, you have made your snowman!"
        );
       }
}
}
  controls.update();
  renderer.render(scene, camera);
}
animate();




