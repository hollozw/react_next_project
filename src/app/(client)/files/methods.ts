import JSZip from "jszip";
import { IUploadFileParm, TGetFIleDataIndex } from "./type-file";

export const uploadFile = async ({ dir, file }: IUploadFileParm) => {
  try {
    const res = await fetch("/api/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dir }), // 传递文件夹路径
    });
    // console.log(res, "res");
  } catch (error) {
    return "";
  }
};

export function downloadMultipleFiles(files: File[] | []) {
  if (files.length == 0) return;
  const zip = new JSZip();
  files.forEach((file) => {
    zip.file(file.name, file);
  });

  zip.generateAsync({ type: "blob" }).then((content) => {
    const a = document.createElement("a");
    const url = URL.createObjectURL(content);
    a.href = url;
    a.download = "files.zip"; // 设置下载的文件名
    a.click();
    URL.revokeObjectURL(url);
  });
}

export function changeFileName(file: File, newName: string) {
  // 创建一个新的 Blob 对象，内容是原始文件的内容
  const newFile = new Blob([file], { type: file.type });

  // 创建一个新的 File 对象，设置新的文件名
  const renamedFile = new File([newFile], newName, { type: file.type });

  return renamedFile;
}

export const getFileDataIndex: TGetFIleDataIndex = (eLementList) => {
  const dataIndex = eLementList.map((item, index) => {
    const fileIndex = item.getAttribute("data-index") as string;
    return Number(fileIndex);
  });
  return dataIndex;
};
