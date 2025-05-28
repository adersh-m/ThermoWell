/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        heat: '#ff5722',  // Custom heatwave color
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
