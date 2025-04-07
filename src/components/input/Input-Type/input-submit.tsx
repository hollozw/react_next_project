import { TInputSubmitProps } from "../typescript/special";

const InputSubmit = (props: TInputSubmitProps) => {
  const { type } = props;
  return (
    <>
      <input type={type} />
    </>
  );
};

export default InputSubmit;
