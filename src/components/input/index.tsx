"use client";

import "./index.scss";

interface IInputProps {
  labelProps?: Object;
  name: string;
  type: string;
  [key: string]: any;
}

const Input = (props: IInputProps) => {
  const { labelProps = {}, name, type, ...inputProps } = props || {};

  function classNameInput() {
    const obj: { [key: string]: Function } = {
      submit: () => {
        return "custom-input-submit";
      },
    };
    return type in obj ? obj[type]() : "custom-input";
  }

  return (
    <>
      <div className="input-box">
        <label {...labelProps} className="custom-label">
          {type == "submit" ? "" : name}
        </label>
        <input type={type} {...inputProps} className={`${classNameInput()}`} />
      </div>
    </>
  );
};

export default Input;
