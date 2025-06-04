import { useState } from "react";

export const Input = (props: any) => {
  const [val, setVal] = useState<any>(props?.val ?? null);
  const [inputChange, setInputChange] = useState(false);

  return (
    <>
      {inputChange ? (
        <input
          type="text"
          onChange={(e) => setVal(e.target.value)}
          value={val}
          style={{ width: "100%", textAlign: "center", color: "black" }}
          onBlur={(e) => {
            setVal(e.target?.value);
            setInputChange(false);
            if (typeof props?.onChange === "function") {
              props.onChange(e.target?.value);
            }
          }}
        />
      ) : (
        <div
          className={props.class}
          style={{ cursor: "pointer" }}
          onClick={() => setInputChange(true)}
        >
          标题：<span>{val}</span>
        </div>
      )}
    </>
  );
};
