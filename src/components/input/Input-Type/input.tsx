type TInputDefaultType = {
  type: string;
  name: string;
  label?: string;
  [key: string]: any;
};

const Input = (props: TInputDefaultType) => {
  return (
    <>
      <label>
        {props.label ?? ""}
        <input {...props} />
      </label>
    </>
  );
};

export default Input;
