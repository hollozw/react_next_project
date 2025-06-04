import React from "react";
import { getDefaultValue } from "./style";
import { IConfigContext, TComponentName, TTheme } from "./typescript";

export const ConfigContext = React.createContext<IConfigContext>({
  components: getDefaultValue,
});

export const ConfigTemeContext = React.createContext<{ theme: TTheme }>({
  theme: "light",
});

export const useComponentConfig = (name: TComponentName, theme?: TTheme) => {
  const { components } = React.useContext(ConfigContext);
  const { theme: themeDefault } = React.useContext(ConfigTemeContext);

  const props = components(theme || themeDefault)[name] || {};

  return {
    ...props,
  };
};
