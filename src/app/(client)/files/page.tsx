"use client";
import { useRef, useState } from "react";
import "./index.scss";
import { useFiles, useSortable } from "./useHook";
import { useRequest } from "ahooks";
import { downloadMultipleFiles, changeFileName } from "./methods";
import { Input } from "./Input";

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
    console.log(newFileList, 'newFileList')
    downloadMultipleFiles(newFileList);
  }

  return (
    <>
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
            <img
              className="relative top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] "
              src="./imgs/upload.png"
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
                  <img className="photo" src={fileUrl} alt={file.name} />
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
