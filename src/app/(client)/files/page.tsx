"use client";
import { useRef, useState } from "react";
import "./index.scss";
import { useFiles, useSortable } from "./useHook";
import { useRequest } from "ahooks";
import { downloadMultipleFiles, changeFileName } from "./methods";
import Image from "next/image";
import upload from "@/public/imgs/upload.png";
import test from "@/public/imgs/横屏test.webp";
import test1 from "@/public/imgs/竖屏test.jpg";
import SideBar from "@/components/SideBar";
// import { Input } from "./Input";

const Index = (props: unknown) => {
  const { data, loading } = useRequest(async () => {});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const navRef = useRef<HTMLElement | null>(null);

  const { files, setFile, onFileChange } = useFiles(isSubmit, setIsSubmit);

  const { sortableIndex } = useSortable(navRef);

  function submitFile() {
    if (navRef.current === null) return;
    setIsSubmit(true);
    const newFileList: File[] = [...files];
    sortableIndex.forEach((item, index: number) => {
      newFileList[index] = files[item];
    });
    downloadMultipleFiles(newFileList);
  }

  return (
    <div className="flex h-full overflow-hidden">
      <SideBar data={[{ text: "添加图片", fn: () => {} }]} />
      <header className="full relative pt-5 box-border">
        <form>
          <input
            type="file"
            onChange={onFileChange}
            multiple
            style={{ display: "none" }}
            id="fileInput"
          />
        </form>
        <div className="w-full">
          <label
            htmlFor="fileInput"
            className="inputFile box-border rounded-custom-10 overflow-hidden block w-40 h-40 border-2 border-custom-gray relative left-1/2 translate-y-[-50%]"
          >
            <Image
              alt=""
              className="relative top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] "
              src={upload}
            />
          </label>
        </div>

        <button
          className="absolute right-0 top-1/2 translate-x-[-50%]"
          type="submit"
          onClick={submitFile}
        >
          提交文件
        </button>
      </header>
      <nav
        ref={navRef}
        className="flex flex-wrap nav_class border-t-2 border-black "
      >
        {Array.from(files, (file: File, index: number) => {
          const fileUrl = URL.createObjectURL(file);
          return (
            <>
              <div className="photo_nav" key={index} data-index={index}>
                {/* <Input
                  class="title"
                  val={file.name}
                  onChange={(val: string) => {
                    setFile((file: File[]) => {
                      file[index] = changeFileName(file[index], val);
                      return file;
                    });
                  }}
                /> */}
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
      </nav>
    </div>
  );
};

export default Index;
