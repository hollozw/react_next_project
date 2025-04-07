import { useState } from "react";
import { TInputDefaultProps } from "../typescript";

const InputDefault = (props: TInputDefaultProps) => {
  const { onChange, defaultValue, value } = props;
  const [inputValue, setInputValue] = useState<string | number | undefined>(
    defaultValue
  );

  const currentValue = value !== undefined ? value : inputValue;

  return (
    <>
      <input
        {...props}
        type={props.type}
        name={props.name}
        value={currentValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (onChange && onChange(event)) return;
          setInputValue(event.target.value);
        }}
      />
    </>
  );
};

export default InputDefault;
