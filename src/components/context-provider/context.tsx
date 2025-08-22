import React from "react";
import { getDefaultValue } from "./style";
import { IConfigContext, IConfigTemeContext, Theme } from "./typescript";

export const ConfigContext = React.createContext<IConfigContext>({
  components: getDefaultValue,
});

export const ConfigThemeContext = React.createContext<IConfigTemeContext>({
  theme: "light",
  toggleTheme: (val) => {},
});
