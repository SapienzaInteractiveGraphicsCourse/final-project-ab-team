const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
/* var arrayCubes = [];
var i = 0;
var number = 0;
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color(0x99ffff);
camera.position.set(1, 0.5, 5);
var conta = 0;
var flag0 = true;
var flag1 = true;
var flag2 = true;
var flag3 = true;
var flag4 = true;
var flag5 = true;
var flag6 = true;
var flagAnimation = false;
var flagRotationUp = true;
var flagHouseAnimation = false;

var flagRotationDown = false;
var flagAnimation1 = false;
var arrayCheck = [false, false, false, false, false, false, false];
var sumFlag = 0;
var generalFlag = true;
var ObjectsPlayer1 = new Array();
const light = new THREE.AmbientLight(0x404040, 4); // soft white light
scene.add(light);

//sky

var sky = new THREE.Sky();
sky.scale.setScalar(5000);

//sun
const params = {
  turbidity: 1,
  mieDirectionalG: 0.65,
  mieCoefficient: 0.008,
  azimuth: 180,
  elevation: 3,
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
*/

