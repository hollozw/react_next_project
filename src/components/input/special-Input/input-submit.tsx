import { TInputSubmitProps } from "../type-input";

const InputSubmit = (props: TInputSubmitProps) => {
  const { type } = props;
  return (
    <>
      <input type={type} />
    </>
  );
};

export default InputSubmit;
