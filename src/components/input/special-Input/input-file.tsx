import { TInputFileProps } from "../type-input";

const InputFile = (props: TInputFileProps) => {
  const { type, id = "file", onFileChange = () => {} } = props;

  function onChange(events: React.ChangeEvent<HTMLInputElement>) {
    onFileChange(events);
  }

  return (
    <>
      <input type={type} id={id} className="hidden" onChange={onChange} />
      <label htmlFor={id}>
        <div className="w-[200px] h-[50px] bg-red-200"></div>
      </label>
    </>
  );
};

export default InputFile;
