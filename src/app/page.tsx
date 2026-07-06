"use client";

import React, { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(()=>{
    if(canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, 400, 400);
      }
    }
  }, [])

  return (
    <div className="bg-black p-4 inline-block">
      <canvas
        ref={canvasRef}
        id="canvas"
        className="w-[400px] h-[400px] bg-white p-4 box-border"
      ></canvas>
    </div>
  );
}
