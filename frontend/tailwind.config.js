/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@headlessui/react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color:{
        "custom-blue":"#002E6E",

      }
    },
  },
  plugins: [],
}