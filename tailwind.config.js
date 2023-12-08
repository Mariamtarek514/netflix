/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        screen: "100dvh",
      },
      fontFamily: {
        "nsans-light": ["Nsans Light"],
        "nsans-medium": ["Nsans Medium"],
        "nsans-bold": ["Nsans Bold"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
