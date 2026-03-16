/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#19bcc9',
      },
      // screens: {
      //   sm: '600px',
      //   md: '900px',
      //   lg: '1200px',
      //   xl: '1536px',
      //   '2xl': '1920px',
      // },
    },
  },
  plugins: [],
};
