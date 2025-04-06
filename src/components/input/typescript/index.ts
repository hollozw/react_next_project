import { TInputFileProps, TInputSubmitProps } from "./special";

export type TInputPropsProps = {
  type: string;
  name: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
};

export type TdefaultInputType = string;
export type TInputDefaultProps = {};

export type TspacialInputType = "file" | "submit";
export type TInputSpecialProps = TInputFileProps | TInputSubmitProps;

export function getInputPropsType(
  type: TspacialInputType,
  props: TInputPropsProps
): TInputSpecialProps;
export function getInputPropsType(
  type: TdefaultInputType,
  props: TInputPropsProps
): TInputDefaultProps;
export function getInputPropsType(type: string, props: TInputPropsProps) {
  if (checkSpecialInputType(type)) {
    return props as TInputSpecialProps;
  } else {
    return props as TInputDefaultProps;
  }
}

export function checkSpecialInputType(
  value: string | TspacialInputType
): value is TspacialInputType {
  return ["file", "submit"].includes(value as TspacialInputType);
}
