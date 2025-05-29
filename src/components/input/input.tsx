import ReInput from "rc-input";
import { useComponentConfig } from "../context-provider/context";
import { IComponentConfig } from "../context-provider";

const Input = (props: IComponentConfig) => {
  const { className, style } = useComponentConfig("input");

  return (
    <>
      <ReInput className={`${className}`} style={style} {...props} />
    </>
  );
};

export default Input;
