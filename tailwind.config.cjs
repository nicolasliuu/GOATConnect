/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textarea: {
        'caret-color': 'black'
      }
    },
  },
  plugins: [],
};
