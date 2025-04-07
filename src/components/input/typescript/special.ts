import { TInputProps, TspacialInputType } from "./index";

export type TInputFileProps = Pick<
  TInputProps,
  "name" | "value" | "onChange"
> & {
  type: TspacialInputType;
  id: string;
};

export type TInputSubmitProps = Pick<
  TInputFileProps,
  "name" | "value" | "onChange"
> & {
  type: TspacialInputType;
  id: string;
};
