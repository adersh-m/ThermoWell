/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ffe8e0',
          100: '#ffcfc0',
          200: '#ffa98e',
          300: '#ff8f71',
          400: '#ff7452',
          500: '#ff5a34',
          600: '#e64325',
          700: '#cc3118',
          800: '#b3210e',
          900: '#991003',
          DEFAULT: '#ff5a34',
        },
        secondary: {
          50: '#e6f2ff',
          100: '#c6e0ff',
          200: '#96c7ff',
          300: '#66adff',
          400: '#3394ff',
          500: '#007bff',
          600: '#0062cc',
          700: '#004999',
          800: '#003066',
          900: '#001733',
          DEFAULT: '#007bff',
        },
        heat: {
          safe: '#47c1bf',
          caution: '#fbbf24',
          warning: '#f97316',
          danger: '#ef4444',
          extreme: '#991b1b',
        },
        success: '#10b981',
        info: '#3b82f6',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      fontFamily: {
        'primary': ['Inter', 'sans-serif'],
        'heading': ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-banner.svg')",
        'heat-warning': "url('/images/heat-warning.svg')",
        'stay-hydrated': "url('/images/stay-hydrated.svg')",
        'heat-protection': "url('/images/heat-protection.svg')",
        'community': "url('/images/community.svg')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
