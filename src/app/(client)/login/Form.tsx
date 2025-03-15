"use client";

import Input from "@/components/input";

const Form = (props: any) => {

  return (
    <>
      <form>
        <Input name="用户名" type="text" />
        <Input name="密码" type="password" />
        <Input name="提交" type="submit" />
      </form>
    </>
  );
};

export default Form;
