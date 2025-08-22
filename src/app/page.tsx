"use client";

import { Input } from "@/components/index";
import React from "react";
import { TRefInput } from "@/components/index";

export default function Home() {
  const inputRef = React.useRef<TRefInput>(null);

  return (
    <main className="w-full">
      <button
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        按钮
      </button>
      <Input size={"large"} ref={inputRef} />
    </main>
  );
}
