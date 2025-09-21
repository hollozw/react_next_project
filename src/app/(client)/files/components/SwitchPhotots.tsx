import Image from "next/image";
import { useFiles } from "../hooks";
import React, {
  forwardRef,
  MutableRefObject,
  useImperativeHandle,
} from "react";
import { SitchPhotoChildHandle, TSetState } from "../type-file";
import { getFileDataIndex } from "../utils";

interface ISwitchPhototsProps {
  isSubmit: boolean;
  setIsSubmit: TSetState<boolean>;
}

const SwitchPhotots = forwardRef<SitchPhotoChildHandle, ISwitchPhototsProps>(
  (props, ref) => {
    const navRef = React.useRef<HTMLElement | null>(null);

    const { files, filesIndex, onFileInput } = useFiles(
      props.isSubmit,
      props.setIsSubmit,
      navRef
    );

    useImperativeHandle(ref, () => {
      return {
        getValue: () => {
          if (!navRef.current) return files;
          const fileIndex = getFileDataIndex(
            Array.from(navRef.current.children)
          );
          const cloneFiles = Array.from(files);
          return fileIndex.map((item) => {
            return cloneFiles[item];
          });
        },
      };
    });

    return (
      <>
        <form>
          <input
            type="file"
            onChange={onFileInput}
            multiple
            style={{ display: "none" }}
            id="fileInput"
          />
        </form>
        <div
          className="w-full flex flex-wrap bg-gray-200"
          ref={navRef as MutableRefObject<HTMLDivElement | null>}
        >
          {Array.from(files, (file: File, index) => {
            const fileName = file?.name || "";
            const fileUrl = URL.createObjectURL(file);
            return (
              <div
                className="w-[20.75rem] h-[23rem] overflow-hidden flex flex-col mx-[0.25rem] bg-gray-200"
                key={index}
                data-index={index}
              >
                <div
                  onBlur={(evt) => {
                    console.log(evt.target.textContent);
                  }}
                  className="w-full h-[3rem] text-center leading-[3rem] text-[1rem]  overflow-auto mb-[0.5rem]"
                  contentEditable
                  suppressContentEditableWarning
                >
                  {fileName}
                </div>
                <div className="w-full bg-gray-200">
                  <Image
                    width={332}
                    height={332}
                    className="rounded-[30px]"
                    alt=""
                    src={fileUrl}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
);

export default SwitchPhotots;
