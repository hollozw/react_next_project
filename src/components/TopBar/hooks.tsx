"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Theme } from "../context-provider/typescript";

const useTheme = (theme: Theme) => {
  return {};
};

interface IuseMoving {
  menuRef: React.MutableRefObject<null | HTMLDivElement>;
}
export const useMoving = ({ menuRef }: IuseMoving) => {
  const [preIndex, setPreIndex] = useState(0);
  const [menuWidth, setMenuWidth] = useState(0);

  function select(val: number) {
    setPreIndex(val);
  }

  useEffect(() => {
    if (menuRef.current) {
      setMenuWidth(menuRef.current.children[0]?.clientWidth ?? 0);
    }
  }, []);

  const positionX = useMemo(() => {
    return menuWidth * preIndex;
  }, [preIndex, menuWidth]);

  return {
    select,
    positionX,
  };
};
