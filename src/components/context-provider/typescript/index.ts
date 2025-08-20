import React from "react";

export type TComponentName = "input" | "form";

export type Theme = "light" | "dark" | "custom";

export type TDefaultConfiguration<T = IComponentConfig> = {
  [key in TComponentName]?: T;
};

export type SizeType = "small" | "middle" | "large";

export interface IComponentConfig {
  className?: string;
  style?: React.CSSProperties;
}

export interface IConfigContext {
  components: (theme: Theme) => TDefaultConfiguration;
  prefixCls?: string;
  theme?: Theme;
}

export interface IConfigTemeContext {
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
}
