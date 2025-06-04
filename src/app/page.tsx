"use client";

import { Input } from "@/components/index";
import { ConfigTemeContext } from "@/components/context-provider/context";
import React from "react";
import { TRefInput } from "@/components/index";

export default function Home() {
  const inputRef = React.useRef<TRefInput>(null);

  return (
    <ConfigTemeContext.Provider value={{ theme: "light" }}>
      <main className="w-full">
        <button
          onClick={() => {
            inputRef.current?.focus();
          }}
        >
          按钮
        </button>
        <Input ref={inputRef} />
      </main>
    </ConfigTemeContext.Provider>
  );
}
