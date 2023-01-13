/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      "color-main-extra": "#2F9BA4",
      "doctor-color-main": "#90e0ef",
      "color-purple": "#453f85",
      "color-white": "#ffffff",
      "color-white-secondary": "#EBF7F6",
      "color-white-third": "#fcfffe",
      "color-white-fourth": "#FAFDFC",
      "color-main": "#33A9B3",
      "color-secondary": "#5cbac2",
      "color-third": "#24767d",
      "color-gray-primary": "#e5e5e5",
      "color-gray-secondary": "#FAFAFA",
      "color-dark-primary": "#00224F",
      "color-warning-primary": "#f6b581",
      "color-warning-dark": "#e76f51",
      "color-success-primary": "#99d98c",
      "color-success-dark": "#52b69a",
      "color-danger-primary": "#ff686b",
      "color-danger-dark": "#ff0a54",
      "color-info-primary": "#a2d2ff",
      "color-info-dark": "#5c95ff",
    },
    backgroundImage: {
      "hero-pattern":
        "radial-gradient(circle, rgba(51,169,179,1) 0%, rgba(36,118,125,1) 35%)",
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tw-elements/dist/plugin")],
};
