const InputDefault = (props: any) => {
  const { labelProps = {}, name, type, ...inputProps } = props || {};
  function classNameInput() {
    const obj: { [key: string]: Function } = {
      submit: () => {
        return "custom-input-submit";
      },
    };
    return "custom-input";
  }

  return (
    <>
      <div className="input-box">
        <label {...labelProps} className="custom-label">
          {type == "submit" ? "" : name}
        </label>
        <input type={type} {...inputProps} className={`${classNameInput()}`} />
      </div>
    </>
  );
};

export default InputDefault;
