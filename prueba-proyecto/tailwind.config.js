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
      gray: '#828282',
      navColor: '#313131',
      dashBack: '#e2e2e2',
      dashHover: '#c6c6c6',
      formBack: '#172554',
      btnForm: '#644D37',
      btnFormHover: '#4D3A29',
      footerColor: '#353535',
      red: '#ff0000',
      blue: '#1ca2ffff',
      landingBack: '#dfdfdfe6',

      //Paleta de colores
      footer: '#353535',
      footerTitle: '#B7B7B7',
      transparent: 'transparent',
    },
    screens:{
      'xs': {"raw": "(min-width: 250px)"},
      'sm': {"raw": "(min-width: 374px)"},
      'md': {"raw": "(min-width: 800px)"},
      'lg': {"raw": "(min-width: 1160px)"},
      'xl': {"raw": "(min-width: 1390px)"},
    },  
  }, plugins: [],
}
