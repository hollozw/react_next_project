import { SizeType, Theme } from "@/components/context-provider/typescript";
import { InputRef, InputProps as RcInputProps } from "rc-input";


export interface InputProps extends Omit<RcInputProps, ""> {
  size?: SizeType;
  border?: boolean;
  disabled?: boolean;
  theme?: Theme;
  [key: `data-${string}`]: string | undefined;
}

export type TRefInput = InputRef & { [key: string]: unknown };
