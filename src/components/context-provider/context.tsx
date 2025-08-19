import React from "react";
import { getDefaultValue } from "./style";
import { IConfigContext, TComponentName, Theme } from "./typescript";

export const ConfigContext = React.createContext<IConfigContext>({
  components: getDefaultValue,
});

export const ConfigTemeContext = React.createContext<{ theme: Theme }>({
  theme: "light",
});

export const useComponentConfig = (name: TComponentName, theme?: Theme) => {
  const { components } = React.useContext(ConfigContext);
  const { theme: themeDefault } = React.useContext(ConfigTemeContext);

  const props = components(theme || themeDefault)[name] || {};

  return {
    ...props,
  };
};
