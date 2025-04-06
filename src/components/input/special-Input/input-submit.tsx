import { TInputSubmitProps } from "../typescript";

const InputSubmit = (props: TInputSubmitProps) => {
  const { type } = props;
  return (
    <>
      <input type={type} />
    </>
  );
};

export default InputSubmit;
