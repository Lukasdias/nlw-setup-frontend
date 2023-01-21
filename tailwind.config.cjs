/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#09090A',
      },
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Inter', 'serif'],
      mono: ['Inter', 'monospace'],
    },
    gridTemplateRows: {
      7: 'repeat(7, minmax(0, 1fr))',
    },
  },
  plugins: [],
};
