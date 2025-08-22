import { TDefaultConfiguration, Theme } from "../typescript";

export const getDefaultValue: (theme: Theme) => TDefaultConfiguration = (
  theme
) => {
  return {
    input: {
      className: `focus:outline-none focus:ring-0 focus:border-primary-${theme} border border-solid`,
    },
  };
};
