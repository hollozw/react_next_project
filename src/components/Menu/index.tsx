"use client";

import { useComponentConfig } from "../context-provider/hooks";

const Menu = () => {
  const { theme } = useComponentConfig("TopBar");

  return (
    <>
      <div className="w-[25%] max-w-[250px] h-full box-border border-r">

      </div>
    </>
  )
}

export default Menu