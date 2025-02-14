"use client";
import { useEffect, useState } from "react";
import { Sortable } from "sortablejs";

type TProps = {
  className: string;
};
export const useSortable = ({ className }: TProps) => {
  const [sortableClass, setSortableClass] = useState<any>(null);

  function createSortable(sortables: NodeListOf<Element>) {
    const sortable: any[] = [];
    sortables.forEach((item, index) => {
      sortable.push(
        new Sortable(item, {
          animation: 150,
          ghostClass: "blue-background-class",
        })
      );
    });
    setSortableClass(sortable);
  }

  useEffect(() => {
    if (className || !sortableClass) {
      const sortables = document.querySelectorAll(className);
      createSortable(sortables);
    }
  }, [className]);
  return sortableClass;
};

export const useFiles = () => {
  const [file, setFile] = useState<null | File>(null);

  const onFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile instanceof File, "selectedFile");
  };

  const handleFileUpload = () => {
    if (!(file instanceof File)) return;
    const formData = new FormData();
    formData.append("file", file);

    // 上传文件到服务器
    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log("文件上传成功:", data))
      .catch((error) => console.error("上传失败:", error));
  };

  return {
    file,
    onFileChange,
  };
};
