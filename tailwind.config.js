/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mont: ["Montserrat", "sans-serif"],
      },
      keyframes: {
        pulsate: {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(66, 153, 225, 0.7)",
          },
          "70%": {
            boxShadow: "0 0 0 10px rgba(66, 153, 225, 0)",
          },
        },
      },
      animation: {
        pulsate: "pulsate 1.5s infinite",
      },
    },
  },
  plugins: [],
};
