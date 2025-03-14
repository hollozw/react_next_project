import JSZip from "jszip";

interface IUploadFileParm {
  dir?: string;
  file?: File;
}

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

export function downloadFile(file: any) {
  // 创建临时的 URL
  const url = URL.createObjectURL(file);

  // 创建一个 <a> 标签并设置其属性
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name; // 设置下载的文件名（你可以根据需要指定自定义名称）

  // 触发点击事件下载文件
  document.body.appendChild(a); // 将 <a> 标签添加到 DOM 中
  a.click(); // 模拟点击
  document.body.removeChild(a); // 下载后移除 <a> 标签

  // 释放临时 URL
  URL.revokeObjectURL(url);
}

export function downloadMultipleFiles(files: any) {
  const zip = new JSZip();
  files.forEach((file: any) => {
    zip.file(file.name, file);
  });

  zip.generateAsync({ type: "blob" }).then((content: any) => {
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
