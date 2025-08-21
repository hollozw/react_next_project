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
  const [theme, setTheme] = useState<Theme>(
    (window.localStorage.getItem("theme") as Theme) ?? "light"
  );

  function toggleTheme(val: Theme) {
    setTheme(val);
  }

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
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
