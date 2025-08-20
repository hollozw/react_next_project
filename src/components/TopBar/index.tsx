"use client";

import Link from "next/link";
import { btnList } from "./utils";
import "./index.scss";
import { useContext, useRef } from "react";
import { ConfigThemeContext } from "../context-provider/context";
import { useMoving, useTheme } from "./hooks";
import { usePathname } from "next/navigation";

const TopBar = (props: any) => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useContext(ConfigThemeContext);
  const menuRef = useRef(null);

  console.log(theme, "theme");

  const { headerStyle } = useTheme(theme);
  const { select, positionX } = useMoving({ menuRef, pathname });

  return (
    <>
      <header style={headerStyle}>
        <div className="left">icon</div>
        <div className="menu">
          <div className="menu-list" ref={menuRef}>
            {btnList.map((item, index) => {
              return (
                <Link
                  key={`${item}_${index}`}
                  href={item.href}
                  className="menu-list-nav"
                  onClick={() => {
                    select(index);
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div
            className="select-list"
            style={
              positionX !== null
                ? { left: positionX }
                : { visibility: "hidden" }
            }
          ></div>
        </div>
        <div
          className="right"
          onClick={() => {
            toggleTheme(theme === "light" ? "dark" : "light");
          }}
        >
          切换主题
        </div>
      </header>
    </>
  );
};

export default TopBar;
