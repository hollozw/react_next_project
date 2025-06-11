import ReInput, { InputRef } from "rc-input";
import {
  ConfigTemeContext,
  useComponentConfig,
} from "../context-provider/context";
import React, { useContext } from "react";
import clsx from "clsx";
import { TRefInput } from "./typescript";
import { useGetBorder, useGetSize } from "./hook";
import { InputProps } from "./typescript/index";

const Input = React.forwardRef<TRefInput, InputProps>((props, ref) => {
  const {
    onBlur,
    onFocus,
    border,
    disabled,
    size,
    theme: propsTheme,
    ...rest
  } = props || {};
  const { theme } = useContext(ConfigTemeContext);
  const inputRef = React.useRef<InputRef>(null);
  const { className: configClassName = "", style: configStyle = {} } =
    useComponentConfig("input") || {};

  function imperativeHandle() {
    const inputMethods: InputRef = inputRef.current as InputRef;
    return { ...inputMethods };
  }

  const borderDefaultClass = useGetBorder(border, propsTheme ?? theme);
  const sizeDefaultStyle = useGetSize(size);

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    onFocus?.(e);
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    onBlur?.(e);
  }

  React.useImperativeHandle(ref, imperativeHandle, [inputRef]);

  return (
    <ReInput
      ref={inputRef}
      className={clsx(configClassName, borderDefaultClass, props.className)}
      style={{ ...configStyle, ...sizeDefaultStyle, ...props.style }}
      {...rest}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
});

Input.displayName = "ForwardRef(Input)";

export default Input;
