import { TInputFileProps } from "../typescript/special";

const InputFile = (props: TInputFileProps) => {
  const { type, id = "file", onChange = () => {} } = props;

  function onFileChange(events: React.ChangeEvent<HTMLInputElement>) {
    onChange(events);
  }

  return (
    <>
      <input type={type} id={id} className="hidden" onChange={onFileChange} />
      <label htmlFor={id}>
        <div className="w-[200px] h-[50px] bg-red-200"></div>
      </label>
    </>
  );
};

export default InputFile;
