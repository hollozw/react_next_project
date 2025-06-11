import React from "react";
import { SizeType, TTheme } from "../context-provider/typescript";
import { sizeFont, sizeHeight } from "./utils";

export const useGetBorder = (border: boolean | undefined, theme: TTheme) => {
  return React.useMemo(() => {
    if (!border) "";
    return `border border-${theme}`;
  }, [border, theme]);
};

export const useGetSize = (size: SizeType | undefined): React.CSSProperties => {
  return React.useMemo(() => {
    const value = size ?? "small";
    return {
      minHeight: sizeHeight[value],
      lineHeight: sizeHeight[value],
      fontSize: sizeFont[value],
    };
  }, [size]);
};
