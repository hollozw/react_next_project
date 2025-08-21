"use client";
import React, { useEffect, useMemo, useState } from "react";
import { btnList } from "./utils";

interface IuseMoving {
  menuRef: React.MutableRefObject<null | HTMLDivElement>;
  pathname: string;
}
export const useMoving = ({ menuRef, pathname }: IuseMoving) => {
  const [preIndex, setPreIndex] = useState<null | number>(null);

  function select(val: number) {
    setPreIndex(val);
  }

  useEffect(() => {
    btnList.forEach((item, index) => {
      if (item.href === pathname) {
        setPreIndex(index);
      }
    });
  }, [pathname]);

  const positionX = useMemo(() => {
    if (menuRef.current && preIndex !== null) {
      const width = menuRef.current.children[0]?.clientWidth;
      return preIndex * width;
    }
    return null;
  }, [preIndex, menuRef]);

  return {
    select,
    positionX,
  };
};
