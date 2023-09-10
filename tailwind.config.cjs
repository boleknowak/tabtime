/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff2fe',
          100: '#e2e6fd',
          200: '#cad0fb',
          300: '#aab1f7',
          400: '#888af1',
          500: '#716be9',
          600: '#624fdc',
          700: '#5441c1',
          800: '#45379c',
          900: '#3b337c',
          950: '#2b2457',
        },
      },
    },
  },
  plugins: [],
};
