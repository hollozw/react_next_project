import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45, // 视角
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
);

const renderer = new THREE.WebGLRenderer({
  antialias: true, // 开启抗锯齿
});

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 创建网格
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

// 相机位置
camera.position.z = 5;
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

function canvasDraw(id) {
  document.getElementById(id).appendChild(renderer.domElement);
  animate();
}

export { canvasDraw };
