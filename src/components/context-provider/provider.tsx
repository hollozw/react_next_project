"use client";

import { useEffect, useMemo, useState } from "react";
import { Theme } from "./typescript";
import { ConfigContext, ConfigThemeContext } from "./context";
import { getDefaultValue } from "./style";

/**
 * Theme hooks
 */
interface IProvider {
  children: React.ReactNode;
}
export const ProviderConfigTheme = ({ children }: IProvider) => {
  const [theme, setTheme] = useState<Theme>("light");

  function toggleTheme(val: Theme) {
    setTheme(val);
  }

  useEffect(() => {
    // 这些代码只会在客户端执行
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = savedTheme || (systemPrefersDark ? "dark" : "light");
    console.log(theme, 'theme')
    setTheme(theme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ConfigThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ConfigThemeContext.Provider>
  );
};

/**
 * The basic configuration of the component
 */
export const ProviderConfig = ({ children }: IProvider) => {
  const components = useMemo(() => {
    return getDefaultValue;
  }, []);

  return (
    <ConfigContext.Provider value={{ components }}>
      {children}
    </ConfigContext.Provider>
  );
};
