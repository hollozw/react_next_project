"use client";

import "./index.scss";
import InputDefault from "./input-default";
import InputFile from "./special-Input/input-file";
import InputSubmit from "./special-Input/input-submit";
import { IInputProps, TspacialInputType } from "./type-input";

const Input = (props: IInputProps) => {
  const { type = "" } = props || {};

  function getInputByType(type: string): React.ReactNode {
    const obj: Record<TspacialInputType, React.ReactNode> = {
      file: <InputFile {...props} />,
      submit: <InputSubmit {...props} />,
    };
    if (type in obj) {
      return obj[type as TspacialInputType];
    }
    return <InputDefault {...props} />;
  }

  return <>{getInputByType(type)}</>;
};

export default Input;
