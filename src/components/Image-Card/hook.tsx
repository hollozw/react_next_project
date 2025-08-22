import React, { MouseEvent } from "react";

type Position = { x: number; y: number };

export class ImageHover<T extends HTMLElement> {
  reactRef;
  mousePosition: Position;
  centerPosition: Position;
  constructor(reactRef: React.MutableRefObject<null | T>) {
    this.reactRef = reactRef;
    const rect = this.reactRef.current?.getBoundingClientRect();
    this.mousePosition = { x: rect?.left || 0, y: rect?.top || 0 };
    this.centerPosition = {
      x: (this.reactRef.current?.clientWidth || 0) / 2,
      y: (this.reactRef.current?.clientHeight || 0) / 2,
    };
  }

  addEventListener(type: string, callback: (...arg: any[]) => any) {
    this.reactRef.current?.addEventListener(type, callback);
  }
}

export class RotateAnimation<T extends HTMLElement> extends ImageHover<T> {
  private maxRaio: number;
  constructor(
    reactRef: React.MutableRefObject<null | T>,
    maxRaio: number = 15
  ) {
    super(reactRef);
    this.maxRaio = maxRaio;
    if (this instanceof RotateAnimation) {
      this.bindEvent()
      this.addEventListener("mousemove", this.mouseMove);
      this.addEventListener("mouseleave", this.mouseLeave);
    }
  }

  bindEvent() {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      .filter(
        (method) =>
          method !== "constructor" &&
          typeof this[method as keyof this] === "function"
      )
      .forEach((method) => {
        this[method as keyof this] = (
          this[method as keyof this] as Function
        ).bind(this);
      });
  }

  mouseMove(event: MouseEvent<T>) {
    if (this.reactRef.current) {
      const mousePosition = this.reactRef.current.getBoundingClientRect();
      const x = event.clientX - mousePosition.left;
      const y = event.clientY - mousePosition.top;
      this.mousePosition = { x, y };
      const { rotateX, rotateY } = this.animationStart();
      this.reactRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  }

  mouseLeave(event: MouseEvent<T>) {
    if (this.reactRef.current) {
      this.reactRef.current.style.transform = `rotateX(${0}deg) rotateY(${0}deg)`;
    }
  }

  getRotateDge(centerPosition: number, mousePosition: number): number {
    if (!centerPosition) return 0;
    const difference = mousePosition - centerPosition;
    const rotate = parseFloat(
      ((difference / centerPosition) * this.maxRaio).toFixed(2)
    )
    if(difference > 0) return rotate
    else return rotate * 0.8
  }

  animationStart() {
    if (!(this instanceof RotateAnimation)) return { rotateX: 0, rotateY: 0 };
    const rotateX = this.getRotateDge(
      this.centerPosition.y,
      this.mousePosition.y
    );
    const rotateY = this.getRotateDge(
      this.centerPosition.x,
      this.mousePosition.x
    );
    return { rotateX, rotateY };
  }
}
