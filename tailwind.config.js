/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // Добавляем пользовательский цвет фона
      bgDark: "hsl(235, 21%, 11%)",
      bgLight: "hsl(0, 0%, 98%)",
      primaryClD: "hsl(234, 39%, 85%)",
      primaryClL: "hsl(235, 19%, 35%)",
      secondaryTextColor: "hsl(234, 11%, 52%)",
      textHoverD: "hsl(236, 33%, 92%)",
      textHoverL: "hsl(235, 19%, 25%)",
      blueColor: "hsl(220, 98%, 61%)",
      secondaryBgD: "hsl(235, 24%, 19%)",
      secondaryBgL: "hsl(236, 33%, 92%)",
      customBorder: "#8e8e8e43",
    },
    extend: {},
  },
  plugins: [],
  darkMode:'class'
};
