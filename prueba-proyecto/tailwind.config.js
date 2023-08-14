const { raw } = require('@prisma/client/runtime');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  theme: {
    colors:{
      white: '#ffffff',
      black: '#000000',
      navColor: '#967F69',
      dashBack: '#e2e2e2',
      dashHover: '#c6c6c6',
      formBack: '#172554',
      btnForm: '#644D37',
      btnFormHover: '#4D3A29',
      footerColor: '#868686',
      red: '#ff0000',
      landingBack: '#dfdfdfe6',

      //Paleta de colores
      footer: '#353535',
      footerTitle: '#B7B7B7',
      transparent: 'transparent',
    },
    screens:{
      'sm': {"raw": "(min-width: 364px)"},
      'md': {"raw": "(min-width: 764px)"},
      'lg': {"raw": "(min-width: 1060px)"},
      'xl': {"raw": "(min-width: 1320px)"},
    },  
  }, plugins: [],
}
