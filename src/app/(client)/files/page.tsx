"use client";
import { useRef, useState } from "react";
import "./index.scss";
import { downloadMultipleFiles } from "./utils";
import SideBar from "@/components/SideBar";
import SwitchPhotots from "./components/SwitchPhotots";
import { SitchPhotoChildHandle } from "./type-file";
// import { Input } from "./Input";

const Index = (props: unknown) => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const switchPhotoRef = useRef<null | SitchPhotoChildHandle>(null);


  const sideBarData = [
    {
      value: (
        <label htmlFor="fileInput" className="cursor-pointer">
          添加文件
        </label>
      ),
    },
    {
      value: (
        <button type="submit" onClick={submitFile}>
          提交文件
        </button>
      ),
    },
  ];

  function submitFile() {
    if (switchPhotoRef.current === null) return;
    setIsSubmit(true);
    const files = switchPhotoRef.current?.getValue();
    downloadMultipleFiles(files);
  }

  return (
    <div className="flex h-full overflow-hidden">
      <SideBar data={sideBarData} />
      <SwitchPhotots
        ref={switchPhotoRef}
        isSubmit={isSubmit}
        setIsSubmit={setIsSubmit}
      />
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
