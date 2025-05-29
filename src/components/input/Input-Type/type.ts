import { InputHTMLAttributes } from "react";

export type TInputDefaultType = {
  type: string;
  name: string;
  label?: string;
  value?: string | number | FileList | null;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value">;

export type TInputValueFile = FileList | null | undefined;
export type TInputValueDefault = string | undefined;

export type TGetInputValue<T> = T extends "file"
  ? TInputValueFile
  : TInputValueDefault;
