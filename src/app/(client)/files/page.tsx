"use client";
import { useEffect, useState } from "react";
import "./index.scss";
import { useFiles, useSortable } from "./useHook";
import { useRequest } from "ahooks";
import { uploadFile, downloadMultipleFiles, changeFileName } from "./methods";
import { Input } from "./Input";

const Index = () => {
  const dir = "";
  const { data, loading } = useRequest(async () => {
    //return await uploadFile({ dir });
  });
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const { files, setFile, onFileChange } = useFiles(isSubmit, setIsSubmit);

  useSortable({ className: ".nav_class" });

  return (
    <>
      <header className="full h-40 flex">
        <form>
          <input
            type="file"
            onChange={onFileChange}
            multiple
            style={{ display: "none" }}
            id="fileInput"
          />
        </form>
        <label htmlFor="fileInput" className="inputFile">
          选择文件
        </label>

        <button
          type="submit"
          onClick={() => {
            setIsSubmit(true);
            const DOM = document.querySelector(".nav_class") as Element;
            const newFileList: any[] = [];
            Array.from(DOM?.children).forEach((item, index) => {
              const fileIndex = item?.getAttribute("index");
              newFileList[index] = files[fileIndex];
            });
            downloadMultipleFiles(newFileList);
          }}
        >
          提交文件
        </button>
      </header>
      <nav className="flex flex-wrap nav_class">
        {Array.from(files, (file: any, index) => {
          const fileUrl = URL.createObjectURL(file);
          return (
            <>
              <div className="photo_nav" key={index} index={index}>
                <Input
                  class="title"
                  val={file.name}
                  onChange={(val: string) => {
                    setFile((file: any[]) => {
                      file[index] = changeFileName(file[index], val);
                      return file;
                    });
                  }}
                />
                <div className="photo-container">
                  <img
                    alt="无法加载该图片"
                    className="photo"
                    src={fileUrl}
                    alt={file.name}
                  />
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
