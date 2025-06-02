/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Deep blue for primary elements
        secondary: '#64748B', // Gray-blue for secondary elements
        background: '#F8FAFC', // Light gray for background
        accent: '#EF4444', // Red for accents and warnings
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
