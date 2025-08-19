"use client";

import Link from "next/link";
import { btnList } from "./utils";
import "./index.scss";
import { useContext, useMemo } from "react";
import { ConfigTemeContext } from "../context-provider/context";

const TopBar = (props: any) => {
  const { theme } = useContext(ConfigTemeContext);
  console.log(theme);
  const { list, btnListLength } = useMemo(() => {
    return { list: btnList, btnListLength: btnList.length };
  }, []);
  return (
    <>
      <header className="flex h-[4rem] justify-between">
        <div className="w-[4rem]"></div>
        <div className="menu">
          <div className="menu-list">
            {list.map((item, index) => {
              return (
                <Link
                  key={`${item}_${index}`}
                  href={item.href}
                  className={`menu-list-nav ${
                    index !== btnListLength - 1 ? "after" : ""
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="menu-list-bg"></div>
          </div>
        </div>
        <div className="h-full w-[4rem]"></div>
      </header>
    </>
  );
};

export default TopBar;
