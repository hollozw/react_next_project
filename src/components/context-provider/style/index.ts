import { TDefaultConfiguration, TTheme } from "../typescript";

export const getDefaultValue: (theme: TTheme) => TDefaultConfiguration = (
  theme
) => {
  return {
    input: {
      className: `focus:outline-none focus:ring-0 border border-solid border-[#ccc] ${theme}-Border`,
    },
  };
};
