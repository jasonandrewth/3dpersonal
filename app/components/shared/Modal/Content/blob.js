import * as THREE from "./dist/three.module.js";
import { MarchingCubes } from "./dist/MarchingCubes.js";

const fetchCockpitData = (
  singletonOrCollectionName,
  callback,
  isCollection
) => {
  const apiKey = "f5b8a538a288a7c95eb154d44bbf25";
  const cockpitUrl = "https://cms.rif.ke/";
  fetch(
    `${cockpitUrl}api/${
      isCollection === true ? "collections" : "singletons"
    }/get/${singletonOrCollectionName}?token=${apiKey}`
  )
    .then((response) => response.json())
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const handleFetchContent = (response) => {
  const wrapper = document.querySelector("#contentWrapper");
  if (response.text && wrapper) {
    wrapper.innerHTML = response.text;
  }
};

const loadContent = () => {
  fetchCockpitData("text", handleFetchContent, false);
};

function camvas(ctx, callback) {
  var self = this;
  // this.ctx = ctx
  this.callback = callback;

  // We can't `new Video()` yet, so we'll resort to the vintage
  // "hidden div" hack for dynamic loading.
  var streamContainer = document.createElement("div");
  streamContainer.classList.add("stream__container");
  this.video = document.createElement("video");
  this.video.classList.add("stream");

  // If we don't do this, the stream will not be played.
  // By the way, the play and pause controls work as usual
  // for streamed videos.
  this.video.setAttribute("autoplay", "1");
  this.video.setAttribute("playsinline", "1"); // important for iPhones

  // The video should fill out all of the canvas
  this.video.setAttribute("width", 0.5);
  this.video.setAttribute("height", 0.5);

  streamContainer.appendChild(this.video);
  document.body.appendChild(streamContainer);

  // The callback happens when we are starting to stream the video.
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(
      function (stream) {
        // Yay, now our webcam input is treated as a normal video and
        // we can start having fun
        self.video.srcObject = stream;
        // Let's start drawing the canvas!
        self.update();
      },
      function (err) {
        throw err;
      }
    )
    .catch((error) => {
      console.log(error);
    });

  // As soon as we can draw a new frame on the canvas, we call the `draw` function
  // we passed as a parameter.
  this.update = function () {
    var self = this;
    var last = Date.now();
    var loop = function () {
      // For some effects, you might want to know how much time is passed
      // since the last frame; that's why we pass along a Delta time `dt`
      // variable (expressed in milliseconds)
      var dt = Date.now() - last;
      // self.callback(self.video, dt)
      last = Date.now();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  };
}

var camera, scene, renderer;
var video;
let object;

let effectController = {
  material: "lolMaterial",

  speed: 1.0,
  numBlobs: 0,
  resolution: 48,
  isolation: 240,

  floor: false,
  wallx: false,
  wallz: false,

  hue: 0.0,
  saturation: 0.8,
  lightness: 0.1,

  lhue: 0.04,
  lsaturation: 1.0,
  llightness: 0.5,

  lx: 0.5,
  ly: 0.5,
  lz: 1.0,

  dummy: function () {},
};

var time = 0;
let clock = new THREE.Clock();

let mesh;
let meshPlane;
let lilMesh;
let lights = new THREE.Group();
let lights2 = new THREE.Group();
let planeGroup = new THREE.Group();
const cubeCamera = new THREE.CubeCamera(120, 12000, 512);
let textureCube;

var isUserInteracting = false,
  lon = 0,
  lat = 0,
  phi = 0,
  theta = 0,
  distance = 50,
  onPointerDownPointerX = 0,
  onPointerDownPointerY = 0,
  onPointerDownLon = 0,
  onPointerDownLat = 0;

let resolution;
let effect;

window.addEventListener("load", () => {
  const videoCanvas = document.createElement("canvas");
  videoCanvas.setAttribute("id", videoCanvas);
  const ctx = videoCanvas.getContext("2d");
  var mycamvas = new camvas(ctx);
  loadContent();
  init();
  animate();
});

function init() {
  var container;
  container = document.getElementById("container");

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1100
  );
  camera.position.set(-500, 500, 1500);
  camera.target = new THREE.Vector3(0, 0, 0);

  var light = new THREE.AmbientLight(0xffffff, 0.9);

  scene = new THREE.Scene();
  scene.add(cubeCamera);
  scene.add(light);
  light = new THREE.DirectionalLight(0x0000ff, 0.2);
  light.position.set(100, 200, 400);
  lights.add(light);
  light = new THREE.DirectionalLight(0xff0000, 0.2);
  light.position.set(-100, -200, -400);
  lights.add(light);

  light = new THREE.DirectionalLight(0xff0000, 0.2);
  light.position.set(-100, -200, -400);
  lights2.add(light);

  scene.add(lights);
  scene.add(lights2);

  var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
  // invert the geometry on the x-axis so that all of the faces point inward
  geometry.scale(-1, 1, 1);

  video = document.querySelector(".stream");

  var texture = new THREE.VideoTexture(video);
  var material = new THREE.MeshBasicMaterial({ map: texture });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  let planeGeo = new THREE.PlaneBufferGeometry(500, 500, 32);

  for (let i = 0; i < 6; i++) {
    meshPlane = new THREE.Mesh(planeGeo, material);
    meshPlane.material.side = THREE.DoubleSide;
    planeGroup.add(meshPlane);
  }

  planeGroup.children[1].position.set(-250, 0, 0);

  window.addEventListener("keydown", function (e) {
    if (planeGroup) {
      if (e.keyCode == "81") {
        planeGroup.position.x += 10;
      }
      if (e.keyCode == "65") {
        planeGroup.position.x += -10;
      }

      if (e.keyCode == "87") {
        planeGroup.position.y += 10;
      }
      if (e.keyCode == "83") {
        planeGroup.position.y += -10;
      }

      if (e.keyCode == "69") {
        planeGroup.position.z += 10;
      }
      if (e.keyCode == "68") {
        planeGroup.position.z += -10;
      }
    }
  });

  let lilGeometry = new THREE.SphereBufferGeometry(20, 60, 40);
  let lilMaterial = new THREE.MeshPhysicalMaterial({
    clearcoat: 1.0,
    roughness: 0,
    metalness: 0.9,
    reflectivity: 0.9,
  });
  let lolMaterial = new THREE.MeshPhysicalMaterial({
    clearcoat: 1.0,
    // transparent: true,
    // opacity: 0.9,
    envMap: cubeCamera.renderTarget.texture,
    roughness: 0,
    metalness: 0.9,
    reflectivity: 0.9,
  });

  lilMesh = new THREE.Mesh(lilGeometry, lilMaterial);

  // scene.add( lilMesh );

  //

  const loadModel = () => {
    object.traverse(function (child) {
      if (child.isMesh) child.material = lilMaterial;
    });
    object.rotation.y = 0;
  };

  var manager = new THREE.LoadingManager(loadModel);
  manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
  };

  function onProgress(xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = (xhr.loaded / xhr.total) * 100;
      // console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
    }
  }

  function onError() {}

  //

  resolution = 64;

  effect = new MarchingCubes(resolution, lolMaterial, true, true);
  effect.material.side = THREE.DoubleSide;
  effect.position.set(0, 0, 0);
  effect.scale.set(80, 40, 60);

  effect.enableUvs = false;
  effect.enableColors = false;

  scene.add(effect);

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  document.addEventListener("mousedown", onDocumentMouseDown, false);
  document.addEventListener("mousemove", onDocumentMouseMove, false);
  document.addEventListener("mouseup", onDocumentMouseUp, false);
  document.addEventListener("wheel", onDocumentMouseWheel, false);

  //

  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseDown(event) {
  event.preventDefault();

  isUserInteracting = true;

  onPointerDownPointerX = event.clientX;
  onPointerDownPointerY = event.clientY;

  onPointerDownLon = lon;
  onPointerDownLat = lat;
}

function onDocumentMouseMove(event) {
  if (isUserInteracting === true) {
    lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
    lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
  }
}

function onDocumentMouseUp() {
  isUserInteracting = false;
}

function onDocumentMouseWheel(event) {
  distance += event.deltaY * 0.05;

  distance = THREE.Math.clamp(distance, 1, 50);
}

function animate() {
  update();
  requestAnimationFrame(animate);
}

// this controls content of marching cubes voxel field

function updateCubes(object, time, numblobs, floor, wallx, wallz) {
  object.reset();

  // fill the field with some metaballs

  var i, ballx, bally, ballz, subtract, strength;
  subtract = 12;
  strength = 2 / ((Math.sqrt(numblobs) - 1) / 4 + 1);

  for (i = 0; i < numblobs; i++) {
    ballx =
      Math.sin(i + 1.26 * time * (1.03 + 0.5 * Math.cos(0.21 * i))) * 0.27 +
      0.5;
    bally =
      Math.abs(Math.cos(i + 1.12 * time * Math.cos(1.22 + 0.1424 * i))) * 0.77; // dip into the floor
    ballz =
      Math.cos(i + 1.32 * time * 0.1 * Math.sin(0.92 + 0.53 * i)) * 0.27 + 0.5;

    object.addBall(ballx, bally, ballz, strength, subtract);
  }

  if (floor) object.addPlaneY(2, 12);
  if (wallz) object.addPlaneZ(2, 12);
  if (wallx) object.addPlaneX(2, 12);
}

function update() {
  lat = Math.max(-20, Math.min(20, lat));
  phi = THREE.Math.degToRad(90 - lat);
  theta = THREE.Math.degToRad(lon);

  camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
  camera.position.y = distance * Math.cos(phi);
  camera.position.z = distance * Math.sin(phi) * Math.sin(theta);

  camera.lookAt(camera.target);

  if (mesh) {
    mesh.visible = true;
  }

  cubeCamera.update(renderer, scene);

  if (mesh) {
    mesh.visible = false;
  }

  if (object) {
    object.rotation.x += Math.PI / 180;
  }

  if (lights) {
    lights.rotation.y += Math.PI / 180;
    lights.rotation.z += Math.PI / 180;
  }

  if (lights2) {
    lights2.rotation.y += Math.PI / 90;
    lights2.rotation.z += Math.PI / 90;
  }

  var delta = clock.getDelta();
  time += delta * effectController.speed * 0.25;

  // marching cubes

  if (effectController.resolution !== resolution) {
    resolution = effectController.resolution;
    effect.init(Math.floor(resolution));
  }

  if (effectController.isolation !== effect.isolation) {
    effect.isolation = effectController.isolation;
  }

  updateCubes(
    effect,
    time,
    effectController.numBlobs,
    effectController.floor,
    effectController.wallx,
    effectController.wallz
  );

  renderer.render(scene, camera);

  if (video) {
    if (video.currentTime > 0) {
      if (Math.round(video.currentTime * 100) % 24 == 0) {
        if (effectController.numBlobs < 24) {
          effectController.numBlobs++;
        }
      }
    } else {
      effectController.numBlobs = 0;
    }
  }
}
