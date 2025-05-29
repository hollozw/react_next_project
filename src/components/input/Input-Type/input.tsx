import React from "react";
import { TInputDefaultType } from "./type";

const Input: React.FC<TInputDefaultType> = (props) => {
  return (
    <>
      <label>
        {props.label ?? ""}
        <input
          {...props}
          value={props.value as string | number | readonly string[] | undefined}
        />
      </label>
    </>
  );
};

export default Input;
