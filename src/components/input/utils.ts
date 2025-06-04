import { SizeType } from "../context-provider/typescript";

type TSizeHeight = {
  [key in SizeType]: `${string}rem`;
};

export const sizeHeight: TSizeHeight = {
  small: "1.5rem",
  middle: "2rem",
  large: "2.5rem",
};
