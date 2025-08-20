"use client";
import React, { useState } from "react";
import { ConfigContext, ConfigThemeContext } from "./context";
import { TComponentName, Theme } from "./typescript";

/**
 * Theme hooks
 */
interface IuseTheme {
  children: React.ReactNode;
}
export const ProviderConfigTheme = ({ children }: IuseTheme) => {
  const [theme, setTheme] = useState<Theme>("light");

  function toggleTheme(val: Theme) {
    setTheme(val);
  }
  return (
    <ConfigThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ConfigThemeContext.Provider>
  );
};

export const useComponentConfig = (name: TComponentName, theme?: Theme) => {
  const { components } = React.useContext(ConfigContext);
  const { theme: themeDefault } = React.useContext(ConfigThemeContext);

  const props = components(theme || themeDefault)[name] || {};

  return {
    ...props,
  };
};
