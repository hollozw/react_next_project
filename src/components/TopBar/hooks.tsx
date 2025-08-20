"use client";
import React, { CSSProperties, useEffect, useMemo, useState } from "react";
import { Theme } from "../context-provider/typescript";
import { btnList } from "./utils";

export const useTheme = (theme: Theme) => {
  return {
    headerStyle: useMemo<CSSProperties>(() => {
      if (theme === "dark") {
        return {
          backgroundColor: "#ccc",
          borderBottom: '1px solid #ccc'
        };
      }
      return { backgroundColor: "black" };
    }, [theme]),
  };
};

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
