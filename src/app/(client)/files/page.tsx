"use client";
import { useEffect, useState } from "react";
import "./index.scss";
import { useFiles, useSortable } from "./useHook";
import { useRequest } from "ahooks";
import { uploadFile } from "./methods";

const Index = () => {
  const dir = "";
  const { data, loading } = useRequest(async () => {
    return await uploadFile({ dir });
  });

  const { file, onFileChange } = useFiles();

  const [photoList] = useState(
    new Array(10).fill({
      name: "test.png",
      url: "/imgs/1.png",
    })
  );
  useSortable({ className: ".nav_class" });

  useEffect(() => {}, []);
  return (
    <>
      <header className="full h-40">
        <form>
          <input type="file" onChange={onFileChange} />
        </form>
      </header>
      <nav className="flex flex-wrap nav_class">
        {/* {photoList.map((item, index) => {
          return (
            <>
              <div className="photo_nav" key={index}>
                <div className="title">标题：{item.name}</div>
                <div className="title">序号：{index}</div>
                <div className="photo-container">
                  <img alt="无法加载该图片" className="photo" src={item.url} />
                </div>
              </div>
            </>
          );
        })} */}
      </nav>
    </>
  );
};

export default Index;
