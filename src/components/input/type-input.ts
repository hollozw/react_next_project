export interface IInputProps {
  name: string;
  type: string;
  [key: string]: any;
}

export type IInputSpecialProps = TInputSubmitProps | IInputDefaultProps;

export interface TInputFileProps {
  type: string;
  id: string;
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TInputSubmitProps {
  type: string;
}

export interface IInputDefaultProps {
  labelProps?: Object;
  name: string;
  type: string;
  [key: string]: any;
}

export type TspacialInputType = "file" | "submit";

function checkSpecialInputType(
  value: string | TspacialInputType
): value is TspacialInputType {
  return ["file", "submit"].includes(value as TspacialInputType);
}

// 重载签名1：当参数是string时，返回TInputFileProps
export function getInputProps(
  value: TspacialInputType,
  props: IInputSpecialProps | IInputProps
): IInputSpecialProps;
// 重载签名2：当参数是number时，返回TInputSubmitProps
export function getInputProps(
  value: string,
  props: IInputSpecialProps | IInputProps
): IInputProps;
// 实现签名（实际函数实现）
export function getInputProps(
  value: string | TspacialInputType,
  props: IInputProps | IInputSpecialProps
): TInputFileProps | IInputProps {
  if (checkSpecialInputType(value)) {
    return props as TInputFileProps;
  } else {
    return props as IInputProps;
  }
}
