"use client";
import { useEffect, useState } from "react";
import "./index.scss";
import { getSortable } from "./useHook";

const Index = () => {
  const [photoList] = useState(
    new Array(10).fill({
      name: "test.png",
      url: "/imgs/1.png",
    })
  );
  getSortable({ className: ".nav_class" });

  useEffect(()=>{
    getFiles('')
  }, [])
  return (
    <>
      <header className="full">放入文件内容</header>
      <nav className="flex flex-wrap nav_class">
        {photoList.map((item, index) => {
          return (
            <>
              <div className="photo_nav" key={index}>
                <div className="title">
                  标题：{item.name}
                </div>
                <div className="title">序号：{index}</div>
                <div className="photo-container">
                  <img alt="无法加载该图片" className="photo" src={item.url} />
                </div>
              </div>
            </>
          );
        })}
      </nav>
    </>
  );
};

export default Index;
