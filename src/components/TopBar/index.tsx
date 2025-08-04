import Link from "next/link";
import { btnList } from "./utils";
import "./index.scss";

const TopBar = () => {
  return (
    <>
      <header className="flex h-[4rem] justify-between">
        <div className="w-[4rem]"></div>
        <div className="menu">
          <div className="menu-list">
            {btnList().map((item, index) => {
              return (
                <Link
                  key={`${item}_${index}`}
                  href={item.href}
                  className="menu-list-nav"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="sign">
            <div className="sign-center"></div>
          </div>
        </div>

        <div className="h-full w-[4rem]"></div>
      </header>
    </>
  );
};

export default TopBar;
