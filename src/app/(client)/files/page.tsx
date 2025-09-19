"use client";
import { useRef, useState } from "react";
import "./index.scss";
import { useFiles, useSortable } from "./hooks";
import { downloadMultipleFiles, changeFileName } from "./utils";
import Image from "next/image";
import upload from "@/public/imgs/upload.png";
import test from "@/public/imgs/横屏test.webp";
import test1 from "@/public/imgs/竖屏test.jpg";
import SideBar from "@/components/SideBar";
import SwitchPhotots from "./components/SwitchPhotots";
// import { Input } from "./Input";

const Index = (props: unknown) => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const navRef = useRef<HTMLElement | null>(null);

  const { files, setFile, onFileChange } = useFiles(isSubmit, setIsSubmit);

  const { sortableIndex } = useSortable(navRef);

  const sideBarData = [
    {
      value: (
        <label htmlFor="fileInput" className="cursor-pointer">
          添加文件
        </label>
      )
    },
    {
      value: (
        <button type="submit" onClick={submitFile}>
          提交文件
        </button>
      )
    }
  ]

  function submitFile() {
    if (navRef.current === null || !sortableIndex.length) return;
    setIsSubmit(true);
    const newFileList: File[] = [...files];
    sortableIndex.forEach((item, index: number) => {
      newFileList[index] = files[item];
    });
    downloadMultipleFiles(newFileList);
  }

  return (
    <div className="flex h-full overflow-hidden">
      <SideBar data={sideBarData} />
      <form>
        <input
          type="file"
          onChange={onFileChange}
          multiple
          style={{ display: "none" }}
          id="fileInput"
        />
      </form>
      <SwitchPhotots files={files} />
      {/* <nav
        ref={navRef}
        className="flex flex-wrap nav_class border-t-2 border-black "
      >
        {Array.from(files, (file: File, index: number) => {
          const fileUrl = URL.createObjectURL(file);
          return (
            <>
              <div className="photo_nav" key={index} data-index={index}>
                <Input
                  class="title"
                  val={file.name}
                  onChange={(val: string) => {
                    setFile((file: File[]) => {
                      file[index] = changeFileName(file[index], val);
                      return file;
                    });
                  }}
                />
                <div className="photo-container">
                  <Image
                    className="w-[300px] max-h-[300px] rounded-[30px]"
                    src={test1}
                    alt=""
                  />
                </div>
              </div>
            </>
          );
        })}
      </nav> */}
    </div>
  );
};

export default Index;
