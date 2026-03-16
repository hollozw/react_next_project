export class Canvas {
  // DOM 节点引用（这里的 DOMID 实际上传入的是 CSS selector，例如 "#character"）
  private ref: HTMLCanvasElement | null;
  public ctx: CanvasRenderingContext2D | null = null;
  public test: number = 1;

  constructor(DOMID: string) {
    // 通过 selector 获取 canvas 节点，并缓存 2D 渲染上下文
    this.ref = document.querySelector(DOMID);
    if (this.ref) this.ctx = this.ref.getContext("2d");
    if (this.ctx) {
      this.fullScreen();
    }
  }

  public fullScreen() {
    if (this.ctx && this.ref) {
      const parentElement = this.ref.parentElement;
      // 仅当没有显式设置 width/height attribute 时，才用父容器尺寸填充
      // 这样可以让外部通过 <canvas width height> 固定像素尺寸并覆盖该行为
      if (!this.ref?.getAttribute("width")) {
        const parentWidth = parentElement?.offsetWidth;
        typeof parentWidth === "number" && (this.ref.width = parentWidth);
      }
      if (!this.ref?.getAttribute("height")) {
        const parentHeight = parentElement?.offsetHeight;
        typeof parentHeight === "number" && (this.ref.height = parentHeight);
      }
    }
  }

  public getRef() {
    return this.ref;
  }
}

export class CanvasList {
  // 简易单例：用于在多个模块/对象间共享同一批 canvas 实例
  public static instance: CanvasList;
  public list: Map<string, Canvas> = new Map();
  constructor() {}

  public static setInstance(): CanvasList {
    if (!CanvasList.instance) {
      CanvasList.instance = new CanvasList();
    }
    return CanvasList.instance;
  }

  public addInstance(DOMID: string) {
    // 避免重复创建同 selector 的 Canvas（以 DOMID 为 key）
    if (DOMID && !this.list.has(DOMID)) {
      const canvas = new Canvas(DOMID);
      this.list.set(DOMID, canvas);
    }
  }

  public static getInstance(DOMID: string): Canvas | null {
    // 依赖已经调用过 setInstance() / addInstance() 完成注册
    if (this.instance && this.instance.list.has(DOMID)) {
      return this.instance.list.get(DOMID) ?? null;
    }
    return null;
  }
}

export class Main {
  public canvasList: CanvasList = CanvasList.setInstance();
  constructor() {
    // 统一在这里注册页面需要的 canvas（也可以按需延迟注册）
    const list = ["#character", "#background"];
    this.bindCanvasList(list);

    new Character({ DOMID: "#character" });
    // new BackGround("#background");
  }

  public bindCanvasList(list: string[]) {
    list.forEach((item) => {
      this.canvasList.addInstance(item);
    });
  }
}

export class Base {
  // 子类通过 DOMID 取到 Canvas/ctx；若未注册或 selector 找不到节点，则为 null
  protected canvas: Canvas | null;
  protected ctx: CanvasRenderingContext2D | null = null;
  constructor(DOMID: string) {
    this.canvas = CanvasList.getInstance(DOMID);
    if (this.canvas) {
      this.ctx = this.canvas.ctx;
    }
  }
}

type TScope = { width: number; height: number };
export class Character extends Base {
  // scope 目前既作为“角色尺寸”，也被 init 用作调试矩形的坐标/尺寸（见下方 rect）
  public scope: TScope;
  public state: "" | "stand" | "move" | "up" | "down" = "";
  constructor({ DOMID, scope }: { DOMID: string; scope?: TScope }) {
    super(DOMID);
    this.scope = scope ?? { width: 75, height: 150 };
    this.init();
  }

  private init() {
    if (this.ctx) {
      const { width, height } = this.scope;
      // 初始化时画一个调试用矩形，方便确认 canvas 尺寸与绘制是否正常
      this.ctx.beginPath();
      this.ctx.rect(width, height, width, height);
      this.ctx.strokeStyle = "black";
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  public drawImageInRect({
    imageUrl,
    x = 0,
    y = 0,
    width = 0,
    height = 0,
  }: {
    imageUrl: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }) {
    // Promise 包装图片加载：调用方可 await，确保 drawImage 在 onload 后执行
    return new Promise((resolve, rejects) => {
      const img = new Image();
      img.src = imageUrl;
      img.onerror = rejects;
      img.onload = () => {
        // ctx 可能为空（未注册/节点不存在/取不到 2d ctx），这里做一次保护性判断
        this.ctx && this.ctx.drawImage(img, x, y, width, height);
        resolve("onload");
      };
    });
  }
}

export class BackGround extends Base {
  constructor(DOMID: string) {
    super(DOMID);
  }
}
