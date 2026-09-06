// ============================================
// DQSN PORTFOLIO
// REAL THREE.JS 3D ENVIRONMENT
// ============================================
const canvas = document.getElementById("three-canvas");
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(
  0x02040a,
  0.035
);
// CAMERA
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 0, 16);
// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true
});
renderer.setSize(
  window.innerWidth,
  window.innerHeight
);
renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);
// ============================================
// LIGHTING
// ============================================
const blueLight = new THREE.PointLight(
  0x168cff,
  2.5,
  40
);
blueLight.position.set(
  -5,
  3,
  8
);
scene.add(blueLight);
const cyanLight = new THREE.PointLight(
  0x38d9ff,
  2,
  30
);
cyanLight.position.set(
  6,
  -3,
  5
);
scene.add(cyanLight);
const purpleLight = new THREE.PointLight(
  0x8d65ff,
  1.5,
  25
);
purpleLight.position.set(
  2,
  5,
  -4
);
scene.add(purpleLight);
// ============================================
// MAIN 3D OBJECT
// ============================================
const mainGroup = new THREE.Group();
scene.add(mainGroup);
const geometry = new THREE.IcosahedronGeometry(
  2.5,
  2
);
const material = new THREE.MeshStandardMaterial({
  color: 0x0a3f7a,
  metalness: 0.85,
  roughness: 0.18,
  emissive: 0x02182e,
  emissiveIntensity: 0.8,
  wireframe: false
});
const mainObject = new THREE.Mesh(
  geometry,
  material
);
mainGroup.add(mainObject);
// WIREFRAME OVERLAY
const wireframe = new THREE.Mesh(
  geometry.clone(),
  new THREE.MeshBasicMaterial({
    color: 0x38d9ff,
    wireframe: true,
    transparent: true,
    opacity: 0.2
  })
);
wireframe.scale.setScalar(1.04);
mainGroup.add(wireframe);
// ============================================
// FLOATING RINGS
// ============================================
const ringGroup = new THREE.Group();
scene.add(ringGroup);
for (let i = 0; i < 4; i++) {
  const ringGeometry =
    new THREE.TorusGeometry(
      3.5 + i * 0.45,
      0.018,
      8,
      100
    );
  const ringMaterial =
    new THREE.MeshBasicMaterial({
      color:
        i % 2 === 0
          ? 0x168cff
          : 0x38d9ff,
      transparent: true,
      opacity: 0.28
    });
  const ring = new THREE.Mesh(
    ringGeometry,
    ringMaterial
  );
  ring.rotation.x =
    Math.random() * Math.PI;
  ring.rotation.y =
    Math.random() * Math.PI;
  ring.userData.speed =
    0.001 +
    Math.random() * 0.003;
  ringGroup.add(ring);
}
// ============================================
// FLOATING CUBES
// ============================================
const floatingObjects = [];
const cubeGeometry =
  new THREE.BoxGeometry(0.4, 0.4, 0.4);
for (let i = 0; i < 25; i++) {
  const cubeMaterial =
    new THREE.MeshStandardMaterial({
      color:
        Math.random() > 0.5
          ? 0x168cff
          : 0x38d9ff,
      emissive: 0x062d52,
      emissiveIntensity: 1,
      metalness: 0.8,
      roughness: 0.3
    });
  const cube = new THREE.Mesh(
    cubeGeometry,
    cubeMaterial
  );
  cube.position.set(
    (Math.random() - 0.5) * 28,
    (Math.random() - 0.5) * 18,
    (Math.random() - 0.5) * 16
  );
  cube.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI
  );
  cube.userData = {
    speed:
      0.001 +
      Math.random() * 0.003,
    offset:
      Math.random() * Math.PI * 2,
    originalY:
      cube.position.y
  };
  floatingObjects.push(cube);
  scene.add(cube);
}
// ============================================
// PARTICLE FIELD
// ============================================
const particleCount = 1600;
const positions =
  new Float32Array(
    particleCount * 3
  );
for (let i = 0; i < particleCount * 3; i++) {
  positions[i] =
    (Math.random() - 0.5) * 80;
}
const particleGeometry =
  new THREE.BufferGeometry();
particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(
    positions,
    3
  )
);
const particleMaterial =
  new THREE.PointsMaterial({
    color: 0x3b9dff,
    size: 0.035,
    transparent: true,
    opacity: 0.7
  });
const particleSystem =
  new THREE.Points(
    particleGeometry,
    particleMaterial
  );
scene.add(particleSystem);
// ============================================
// MOUSE MOVEMENT
// ============================================
const mouse = {
  x: 0,
  y: 0
};
window.addEventListener(
  "mousemove",
  (event) => {
    mouse.x =
      event.clientX /
      window.innerWidth - 0.5;
    mouse.y =
      event.clientY /
      window.innerHeight - 0.5;
  }
);
// ============================================
// RESIZE
// ============================================
window.addEventListener(
  "resize",
  () => {
    camera.aspect =
      window.innerWidth /
      window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }
);
// ============================================
// ANIMATION
// ============================================
const clock =
  new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const elapsed =
    clock.getElapsedTime();
  // MAIN OBJECT
  mainObject.rotation.x =
    elapsed * 0.08;
  mainObject.rotation.y =
    elapsed * 0.13;
  wireframe.rotation.x =
    -elapsed * 0.04;
  wireframe.rotation.y =
    elapsed * 0.08;
  mainGroup.position.x +=
    (mouse.x * 2 -
      mainGroup.position.x)
    * 0.02;
  mainGroup.position.y +=
    (-mouse.y * 1.5 -
      mainGroup.position.y)
    * 0.02;
  // RINGS
  ringGroup.children.forEach(
    (ring, index) => {
      ring.rotation.x +=
        ring.userData.speed;
      ring.rotation.y +=
        ring.userData.speed *
        (index % 2 === 0 ? 1 : -1);
    }
  );
  // FLOATING OBJECTS
  floatingObjects.forEach(
    (object) => {
      object.rotation.x +=
        object.userData.speed;
      object.rotation.y +=
        object.userData.speed * 1.5;
      object.position.y =
        object.userData.originalY +
        Math.sin(
          elapsed +
          object.userData.offset
        ) * 0.5;
    }
  );
  // PARTICLES
  particleSystem.rotation.y =
    elapsed * 0.008;
  particleSystem.rotation.x =
    elapsed * 0.003;
  // CAMERA MOVEMENT
  camera.position.x +=
    (mouse.x * 1.2 -
      camera.position.x)
    * 0.025;
  camera.position.y +=
    (-mouse.y * 0.8 -
      camera.position.y)
    * 0.025;
  camera.lookAt(0, 0, 0);
  renderer.render(
    scene,
    camera
  );
}
animate();
// ============================================
// MUSIC PLAYER
// ============================================
const music =
  document.getElementById(
    "backgroundMusic"
  );
const musicToggle =
  document.getElementById(
    "musicToggle"
  );
const musicIcon =
  document.getElementById(
    "musicIcon"
  );
const musicStatus =
  document.getElementById(
    "musicStatus"
  );
const volume =
  document.getElementById(
    "volume"
  );
music.volume =
  volume.value;
musicToggle.addEventListener(
  "click",
  async () => {
    if (music.paused) {
      try {
        await music.play();
        musicIcon.textContent =
          "Ⅱ";
        musicStatus.textContent =
          "PLAYING";
      } catch (error) {
        console.log(
          "Music requires user interaction."
        );
      }
    } else {
      music.pause();
      musicIcon.textContent =
        "▶";
      musicStatus.textContent =
        "PAUSED";
    }
  }
);
volume.addEventListener(
  "input",
  () => {
    music.volume =
      volume.value;
  }
);
// ============================================
// SCROLL REVEAL
// ============================================
const animatedSections =
  document.querySelectorAll(
    ".section"
  );
const observer =
  new IntersectionObserver(
    (entries) => {
      entries.forEach(
        (entry) => {
          if (
            entry.isIntersecting
          ) {
            entry.target.style.opacity =
              "1";
            entry.target.style.transform =
              "translateY(0)";
          }
        }
      );
    },
    {
      threshold: 0.08
    }
  );
animatedSections.forEach(
  (section) => {
    section.style.opacity =
      "0";
    section.style.transform =
      "translateY(35px)";
    section.style.transition =
      "opacity 0.8s ease, transform 0.8s ease";
    observer.observe(section);
  }
);
