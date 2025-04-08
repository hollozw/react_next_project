import { TInputFileProps, TInputSubmitProps } from "./special";

export type TInputProps = {
  type: string;
  name: string;
  value: number | string;
  [key: string]: any;
};

export type TdefaultInputType = string;
export type TInputDefaultProps = Pick<
  TInputProps,
  "name" | "type" | "value"
> & {
  id?: string;
  className?: string;
  defaultValue?: number | string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => boolean | void | Promise<boolean | void>;
};

export type TspacialInputType = "file" | "submit";
export type TInputSpecialProps = TInputFileProps | TInputSubmitProps;

export function getInputPropsType(
  type: TspacialInputType,
  props: TInputProps
): TInputSpecialProps;
export function getInputPropsType(
  type: TdefaultInputType,
  props: TInputProps
): TInputDefaultProps;
export function getInputPropsType(type: string, props: TInputProps) {
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
