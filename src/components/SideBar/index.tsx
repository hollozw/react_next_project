import React from "react";
import { getChildren } from "./utils";

type SideBarItem = {
  key?: React.Key;
  value: React.ReactNode | (() => React.ReactNode);
};

export interface SideBarProps {
  data?: SideBarItem[];
  className?: string;
}

const SideBarItemRow = React.memo(function SideBarItemRow({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-[3rem] leading-[3rem] overflow-hidden text-left box-border pl-[1rem] border-b-[1px] border-black">
      {children}
    </div>
  );
});

const SideBar = ({ data = [], className = "" }: SideBarProps) => {
  if (data.length === 0) return null;

  return (
    <div
      className={[
        "h-full w-[20%] box-border border-black border-r-[1px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {data.map((item, index) => (
        <SideBarItemRow key={item.key ?? index}>{getChildren(item.value)}</SideBarItemRow>
      ))}
    </div>
  );
};

export default SideBar;
