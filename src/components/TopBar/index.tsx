"use client";

import Link from "next/link";
import { btnList } from "./utils";
import "./index.scss";
import { useContext, useRef } from "react";
import { ConfigTemeContext } from "../context-provider/context";
import { useMoving } from "./hooks";

const TopBar = (props: any) => {
  const { theme } = useContext(ConfigTemeContext);
  const menuRef = useRef(null);
  // console.log(theme, "light");

  const { select, positionX } = useMoving({ menuRef });

  return (
    <>
      <header>
        <div className="left">icon</div>
        <div className="menu">
          <div className="menu-list" ref={menuRef}>
            {btnList.map((item, index) => {
              return (
                <Link
                  key={`${item}_${index}`}
                  href={item.href}
                  className={`menu-list-nav`}
                  onClick={() => {
                    select(index);
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="select-list" style={{ left: positionX }}></div>
        </div>
        <div className="right">menu</div>
      </header>
    </>
  );
};

export default TopBar;
