"use client";

import React from "react";
import { IProps } from "./type-login";
import { Input } from "@/components/input/index";

class Login extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <>
        <nav className="h-screen relative bg-background-primary">
          <div className="md:w-2/3 md:h-2/3 w-1/2 h-1/2 absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-[3%] border-[1px] border-[#404040] box-border bg-background-highlight md:p-8 p-4">
            <div className="w-[300px] h-[100px]">
              <Input
                value={"1"}
                defaultValue={2}
                onChange={() => {}}
                type={"text"}
                name="title"
              />
            </div>
          </div>
        </nav>
      </>
    );
  }
}

export default Login;
