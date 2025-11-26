"use client";
import { useEffect, useRef } from "react";
import { Main } from "./hook";

const Index = () => {
  useEffect(() => {
    new Main();
  }, []);

  return (
    <>
      <div className="w-full h-full relative">
        <canvas className="absolute" id="character" />
        {/* <canvas className="absolute" id="background" /> */}
      </div>
    </>
  );
};

export default Index;
