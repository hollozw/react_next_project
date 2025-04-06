"use client";

import "./index.scss";
import InputDefault from "./input-default";
import InputFile from "./special-Input/input-file";
import InputSubmit from "./special-Input/input-submit";
import {
  checkSpecialInputType,
  getInputPropsType,
  TInputPropsProps,
  TspacialInputType,
} from "./typescript";

const Input = (props: TInputPropsProps) => {
  const { type } = props || {};

  function getInputByType(type: string): React.ReactNode {
    if (checkSpecialInputType(type)) {
      const Props = getInputPropsType(type, props);
      const obj: Record<TspacialInputType, React.ReactNode> = {
        file: <InputFile {...Props} />,
        submit: <InputSubmit {...Props} />,
      };
      return obj[type];
    } else {
      const Props = getInputPropsType(type, props);
      return <InputDefault {...Props} />;
    }
  }

  return <>{getInputByType(type)}</>;
};

export default Input;
