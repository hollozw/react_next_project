import React from "react";

interface ISideBarProps {
  data: { text: string; fn: () => void }[];
}

const SideBar = (props: ISideBarProps) => {
  const { data } = props || {};
  if (!data?.length) return;
  return (
    <>
      <div className="h-full w-[20%] box-border border-black border-r-[1px]">
        {Array.from(data, (item, index) => {
          return (
            <>
              <div
                key={index}
                className="w-full h-[3rem] leading-[3rem] overflow-hidden text-left box-border pl-[1rem] border-b-[1px] border-black"
                onClick={item.fn}
              >
                {item.text}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default SideBar;
