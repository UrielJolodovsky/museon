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
      navColor: '#0f172a',
      dashBack: '#e2e2e2',
      formBack: '#172554',
      btnForm: '#1e40af',
      footerColor: '#868686',
    }
  },
  plugins: [],
}
