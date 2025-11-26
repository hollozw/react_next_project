export class Canvas {
  private ref: HTMLCanvasElement | null;
  public ctx: CanvasRenderingContext2D | null = null;
  public test: number = 1;

  constructor(DOMID: string) {
    this.ref = document.querySelector(DOMID);
    if (this.ref) this.ctx = this.ref.getContext("2d");
    if (this.ctx) {
      this.fullScreen();
    }
  }

  public fullScreen() {
    if (this.ctx && this.ref) {
      const parentElement = this.ref.parentElement;
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
    if (DOMID && !this.list.has(DOMID)) {
      const canvas = new Canvas(DOMID);
      this.list.set(DOMID, canvas);
    }
  }

  public static getInstance(DOMID: string): Canvas | null {
    if (this.instance && this.instance.list.has(DOMID)) {
      return this.instance.list.get(DOMID) ?? null;
    }
    return null;
  }
}

export class Main {
  public canvasList: CanvasList = CanvasList.setInstance();
  constructor() {
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
    return new Promise((resolve, rejects) => {
      const img = new Image();
      img.src = imageUrl;
      img.onerror = rejects;
      img.onload = () => {
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
