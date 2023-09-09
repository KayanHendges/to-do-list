/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    theme: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      colors: {
        "primary-light": "#ff966f",
        "primary-dark": "#cc633c",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#FF7C4B",
          secondary: "#d926a9",
          accent: "#1fb2a6",
          neutral: "#2a323c",
          "base-100": "#1d232a",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
