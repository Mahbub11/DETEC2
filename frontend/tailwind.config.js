/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '360px',
      msm: '428px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl:'1536px',
      xxxl:'1650px'
    },
    colors: {
      'midnight': '#093756',
      'tahiti': '#3ab7bf',
      'modt':'#103f5eb3',
      'home':'#B4D6FD',
      'header':'#d0e1f6',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      blue: colors.blue,
      pink: colors.pink,
      green: colors.green,
      red: colors.red,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      robotomono:['RobotoMono'],
      montserrat:['Montserrat'],
      opensans:['Opensans'],
      worksans:['Worksans'],
      lobster:['LobSter'],
      poppins:['Poppins']

    
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}