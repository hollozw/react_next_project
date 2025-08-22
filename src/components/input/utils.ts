import { SizeType } from "../context-provider/typescript";

type TSizeHeight = {
  [key in SizeType]: `${string}rem`;
};

export const sizeHeight: TSizeHeight = {
  small: "1.5rem",
  middle: "2rem",
  large: "2.5rem",
};

export const sizeFont: TSizeHeight = {
  small: "0.875rem",
  middle: "1rem",
  large: "1.125rem",
};