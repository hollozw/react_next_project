import React, { useState } from "react";
import { SizeType, TTheme } from "../context-provider/typescript";
import { sizeHeight } from "./utils";

export const useGetBorder = (border: boolean | undefined, theme: TTheme) => {
  return React.useMemo(() => {
    if (!border) "";
    return `border border-${theme}`;
  }, [border, theme]);
};

export const useGetSize = (size: SizeType | undefined) => {
  return React.useMemo(() => {
    const value = size ?? "small";
    return `min-h-[${sizeHeight[value]}]`;
  }, [size]);
};
