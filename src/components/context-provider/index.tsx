import React from "react";
import { ConfigContext } from "./context";

export type TComponentName = "input" | "form";

export type TTheme = "light" | "dark" | "custom";

export type TDefaultConfiguration<T = IComponentConfig> = {
  [key in TComponentName]?: T;
};

export interface IComponentConfig {
  className?: string;
  style?: React.CSSProperties;
}

export interface IConfigContext {
  components: (theme: TTheme) => TDefaultConfiguration;
  prefixCls?: string;
  theme?: TTheme;
}

const ProviderChilder: React.FC<any> = (props) => {
  return <ConfigContext.Provider value={{}} {...props} />;
};

export default ProviderChilder;
