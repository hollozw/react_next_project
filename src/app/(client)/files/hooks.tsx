"use client";
import { MutableRefObject, useEffect, useMemo, useState } from "react";
import Sortable from "sortablejs";
import { TSetState } from "./type-file";
import { getFileDataIndex } from "./utils";

export const useFiles = (
  isSubmit: boolean,
  setIsSubmit: TSetState<boolean>,
  navRef: MutableRefObject<HTMLElement | null>
) => {
  const [files, setFile] = useState<File[]>([]);
  const [sortable, setSortable] = useState<Sortable | null>(null);
  const [filesIndex, setFilesIndex] = useState<number[]>([]);

  // 添加文件
  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile: File[] = Array.from(e.target.files ?? []);
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

  // 结束拖动
  function onEnd(event: Sortable.SortableEvent) {
    const childElements = Array.from(event.target.childNodes).filter(
      (node): node is HTMLElement => node.nodeType === Node.ELEMENT_NODE
    );
    setFilesIndex(getFileDataIndex(childElements));
  }

  // 初始化拖动效果
  const createSortable = (sortableNode: HTMLElement) => {
    setSortable(
      new Sortable(sortableNode, {
        animation: 150,
        ghostClass: "blue-background-class",
        onEnd,
      })
    );
  };
  useEffect(() => {
    if (navRef.current !== null) {
      const sortables = navRef.current;
      createSortable(sortables);
    }
  }, [navRef.current]);

  // 监听文件改动

  return {
    files,
    setFile,
    sortable,
    filesIndex,
    onFileInput,
  };
};
