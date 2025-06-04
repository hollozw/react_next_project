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
        // 背景色
        background: {
          primary: "#1A1A1A",
          secondary: "#262626",
          highlight: "#333333",
        },
        // 文字色
        color: {
          primary: "#E0E0E0",
          secondary: "#B0B0B0",
          highlight: "#FFFFFF",
        },
        // 强调色
        accent: {
          primary: "#4A90E2",
          secondary: "#9B59B6",
          success: "#2ECC71",
          warning: "#F39C12",
          error: "#E74C3C",
        },
        // 边框色
        borderColor: {
          primary: "#404040",
          highlight: "#4A90E2",
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
