/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'emph': {
          lighter: '#ADC6FF',
          light: '#3B82F6',
          DEFAULT: '#2563EB', 
          dark: '#005BC1',
        },

        'obscure': {
          lightest: '#2a2a2a',
          lighter: '#0d0e0d',
          light: '#131313',
          DEFAULT: '#09090b', 
          dark: '#020202',
          darker: '#000000',
        },

        
        'clarity': {
          lighter: '#ffffff',
          light: '#A1A1AA',
          DEFAULT: '#71717A', 
          dark: '#52525B',
          darker: '#3F3F46',
        },
      },
    },
  },
  plugins: [],
}