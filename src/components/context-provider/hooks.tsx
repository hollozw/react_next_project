"use client";
import React from "react";
import { ConfigContext, ConfigThemeContext } from "./context";
import { TComponentName, Theme } from "./typescript";

/**
 * Add default configurations for each component:
 *  theme / toggleTheme
 */
export const useComponentConfig = (name: TComponentName, theme?: Theme) => {
  const { components } = React.useContext(ConfigContext);
  const { theme: themeDefault, toggleTheme } =
    React.useContext(ConfigThemeContext);

  const props = components(theme || themeDefault)[name] || {};

  return {
    ...props,
    theme: theme || themeDefault,
    toggleTheme,
  };
};
