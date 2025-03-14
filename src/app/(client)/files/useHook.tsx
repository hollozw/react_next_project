"use client";
import { getType } from "@/Functions/Fun";
import { TFun } from "@/Functions/type";
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

  return { sortableClass };
};

export const useFiles = (isSubmit: boolean, setIsSubmit: any) => {
  const [files, setFile] = useState<File[]>([]);
  const onFileChange = (e: any) => {
    const selectedFile: any[] = Array.from(e.target.files ?? []);
    setFile((val) => {
      if (isSubmit) {
        setIsSubmit(false);
        return selectedFile.filter((file) => file.type.startsWith("image/"));
      } else {
        return Array.from(val).concat(
          selectedFile.filter((file) => file.type.startsWith("image/"))
        );
      }
    });
  };

  return {
    files,
    setFile,
    onFileChange,
  };
};
