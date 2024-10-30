export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sky-blue": "#F6FAFF",
        blue: "#4699FF",
        red: "#FF457D",
        marker: "#5282C2",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
