"use client";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Sortable from "sortablejs";
import { TSetState } from "./type-file";
import { getFileDataIndex } from "./methods";

export const useSortable = (navRef: MutableRefObject<HTMLElement | null>) => {
  const [sortable, setSortable] = useState<Sortable | null>(null);
  const [sortableIndex, setSortableIndex] = useState<number[]>([]);

  function onEnd(event: Sortable.SortableEvent) {
    const childElements = Array.from(event.target.childNodes).filter(
      (node): node is HTMLElement => node.nodeType === Node.ELEMENT_NODE
    );
    setSortableIndex(getFileDataIndex(childElements));
  }

  function createSortable(sortableNode: HTMLElement) {
    setSortable(
      new Sortable(sortableNode, {
        animation: 150,
        ghostClass: "blue-background-class",
        onEnd,
      })
    );
  }

  useEffect(() => {
    if (navRef.current !== null) {
      const sortables = navRef.current;
      createSortable(sortables);
    }
  }, [navRef.current]);

  return { sortable, sortableIndex };
};

export const useFiles = (
  isSubmit: boolean,
  setIsSubmit: TSetState<boolean>
) => {
  const [files, setFile] = useState<File[]>([]);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return {
    files,
    setFile,
    onFileChange,
  };
};
