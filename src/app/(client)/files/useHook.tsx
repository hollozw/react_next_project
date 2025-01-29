"use client";
import { useEffect, useState } from "react";
import { Sortable } from "sortablejs";

type TProps = {
  className: string;
};
export const getSortable = ({ className }: TProps) => {
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
