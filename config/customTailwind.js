// to use tailWindCss Custom

const plugin = require("tailwindcss/plugin");

module.exports.plugin = plugin(function ({ addUtilities }) {
  const customClass = Array.from({ length: 100 }).reduce((re, item, index) => {
    re[`.rounded-${index + 1}p`] = {
      "border-radius": `${index + 1}%`,
    };
    return re;
  }, {});
  addUtilities(customClass);
});

module.exports.theme = (function () {
  return {
    extend: {
      colors: {
        primary: {
          light: '#2563eb', // 亮色主题主色
          dark: '#3b82f6'   // 暗色主题主色
        },
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.3)",
        button: "0 2px 4px rgba(0, 0, 0, 0.2)",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  };
})();
