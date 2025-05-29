"use client";

import Input from "@/components/input/input";
import { ConfigTemeContext } from "@/components/context-provider/context";

export default function Home() {
  return (
    <ConfigTemeContext.Provider value={{ theme: "light" }}>
      <main className="w-full">
        <Input />
      </main>
    </ConfigTemeContext.Provider>
  );
}
