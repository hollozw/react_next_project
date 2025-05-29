import { useEffect, useState } from "react";
import Input from "../input";
import { TInputValueFile } from "../type";

type TInputFileType = {
  /** 文件数据 */
  value?: TInputValueFile;
  /** 文件默认数据 */
  defaultValue?: TInputValueFile;
  name: string;
};

const InputFile = (props: TInputFileType) => {
  const { defaultValue } = props || {};
  const [value, setValueState] = useDefaultValue({
    defaultValue: defaultValue || null,
    value: props.value || null,
  });

  function onChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const files = evt.target.files;
    setValueState(files);
  }

  return (
    <>
      <Input {...props} type="file" onChange={onChange} value={null} />
    </>
  );
};

type TUseDefaultValue<T = string> = (val: {
  defaultValue: T;
  value: T;
}) => [T, React.Dispatch<T>];

const useDefaultValue: TUseDefaultValue<TInputValueFile> = ({
  defaultValue,
  value,
}) => {
  const [valueState, setValueState] = useState<TInputValueFile>(null);

  useEffect(() => {
    if (defaultValue) setValueState(defaultValue);
  }, [defaultValue]);

  return [value !== undefined ? value : valueState, setValueState];
};

export default InputFile;
