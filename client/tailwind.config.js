/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lasica: ['Lasica', 'sans-serif'],
      },
      'one': '#2c1e4a',
      'two': '#2756a5'
    },
  },
  plugins: [],
}

