/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors:{
      white: '#ffffff',
      black: '#000000',
      navColor: '#644D37',
      dashBack: '#e2e2e2',
      dashHover: '#c6c6c6',
      formBack: '#172554',
      btnForm: '#644D37',
      btnFormHover: '#4D3A29',
      footerColor: '#868686',
      red: '#ff0000',

      //Paleta de colores
      footer: '#353535',
      footerTitle: '#B7B7B7'
    },
    screens:{
      'sm': '364px',
      'md': '764px',
      'lg': '1060px',
      'xl': '1320px',
    },
  }, plugins: [],
}
