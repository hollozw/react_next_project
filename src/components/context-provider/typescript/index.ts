import React from "react";

export type TComponentName = "input" | "form";

export type TTheme = "light" | "dark" | "custom";

export type TDefaultConfiguration<T = IComponentConfig> = {
  [key in TComponentName]?: T;
};

export type SizeType = "small" | "middle" | "large";

export interface IComponentConfig {
  className?: string;
  style?: React.CSSProperties;
}

export interface IConfigContext {
  components: (theme: TTheme) => TDefaultConfiguration;
  prefixCls?: string;
  theme?: TTheme;
}
