import * as three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface IThreeClass {
  fatherid: string;
}

export class ThreeClass {
  private fatherDom: HTMLElement;
  private scene: three.Scene; // 屏幕
  private camera: three.PerspectiveCamera; // 相机
  private renderer: three.WebGLRenderer; // 渲染器
  private axesHelper: three.AxesHelper; // 坐标轴
  private controls; // 控制器

  constructor({ fatherid }: IThreeClass) {
    let dom: HTMLElement | null;
    if (fatherid[0] !== "#") {
      dom = document.querySelector("#" + fatherid);
    } else {
      dom = document.querySelector(fatherid);
    }
    if (!dom) {
      this.fatherDom = document.createElement("div");
      this.fatherDom.style.width = "100%";
      this.fatherDom.style.height = "100%";
      document.body.appendChild(this.fatherDom);
    } else {
      this.fatherDom = dom;
    }
    this.scene = new three.Scene();
    this.camera = new three.PerspectiveCamera(
      45, // 视角
      window.innerWidth / window.innerHeight, // 宽高比
      0.1, // 近平面
      1000 // 远平面
    );
    this.axesHelper = new three.AxesHelper(5); // 宽度为5
    this.renderer = new three.WebGLRenderer({
      antialias: true, // 开启抗锯齿
    });
    const width = this.fatherDom.clientWidth;
    const height = this.fatherDom.clientHeight;
    this.renderer.setSize(width, height);

    this.scene.add(this.axesHelper); // 添加到画布中

    this.fatherDom.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // 开始绘制
    const cube = this.draw();
    this.animate(cube);
  }

  draw() {
    const geometry = new three.BoxGeometry(1, 1, 1);
    // 创建材质
    const material = new three.MeshBasicMaterial({ color: 0x00ff00 });
    // 创建网格
    const cube = new three.Mesh(geometry, material);

    this.scene.add(cube);

    this.camera.position.z = 5;
    this.camera.position.y = 2;
    this.camera.position.x = 2;

    this.camera.lookAt(0, 0, 0);

    return cube;
  }
  animate(cube: three.Mesh) {
    this.controls.update();
    requestAnimationFrame(() => {
      this.animate(cube);
    });
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }
}

export const drawCanvas = ({ fatherid }: IThreeClass) => {
  const threeClass = new ThreeClass({ fatherid });
};
