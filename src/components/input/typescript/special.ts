import { TInputPropsProps, TspacialInputType } from "./index";

export type TInputFileProps = Pick<
  TInputPropsProps,
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
