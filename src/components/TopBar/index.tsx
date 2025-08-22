"use client";

import Link from "next/link";
import { btnList } from "./utils";
import "./index.scss";
import { useRef } from "react";
import Image from "next/image";
import { useMoving } from "./hooks";
import { usePathname } from "next/navigation";
import { useComponentConfig } from "../context-provider/hooks";
import sum from "@/public/svg/太阳.svg";
import moon from "@/public/svg/月亮.svg";
import icon from "@/public/favicon.ico";

const TopBar = (props: any) => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useComponentConfig("TopBar");
  const menuRef = useRef(null);

  const { select, positionX } = useMoving({ menuRef, pathname });

  return (
    <>
      <header className="header" data-theme={theme}>
        <div className="left">
          <Image src={icon} width={45} alt="" />
        </div>
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
          <Image alt="" width={45} src={theme === "light" ? sum : moon} />
        </div>
      </header>
    </>
  );
};

export default TopBar;
