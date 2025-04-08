import { useState } from "react";
import { TInputDefaultProps } from "../typescript";
import "./index.scss";

const InputDefault = (props: TInputDefaultProps) => {
  const { onChange, defaultValue, value } = props;
  const [inputForce, setInputForce] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | number | undefined>(
    defaultValue
  );

  const currentValue = value !== undefined ? value : inputValue;

  return (
    <>
      <label htmlFor={props.id} className="input-label">
        <div className={inputForce ? 'label-span span-click' : 'label-span'}>{props.name}</div>
        <input
          className="input-value"
          {...props}
          value={currentValue}
          onFocus={() => {
            setInputForce(true);
          }}
          onBlur={() => {
            setInputForce(false);
          }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange && onChange(event)) return;
            setInputValue(event.target.value);
          }}
        />
      </label>
    </>
  );
};

export default InputDefault;
