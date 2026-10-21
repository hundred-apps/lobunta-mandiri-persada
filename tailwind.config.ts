import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts}',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        /* Hijau logo LMP (#00B050) sebagai warna utama website. */
        brand: {
          50: '#eefaf3',
          100: '#d5f3e1',
          200: '#aee6c8',
          300: '#78d3a8',
          400: '#3fba82',
          500: '#00b050',
          600: '#009a43',
          700: '#007a36',
          800: '#02612c',
          900: '#034d26',
          950: '#012c17'
        },
        /* Kuning logo LMP (#FFCC00) sebagai aksen. */
        accent: {
          300: '#ffe484',
          400: '#ffd452',
          500: '#ffcc00',
          600: '#d9a800',
          700: '#a87f00'
        },
        ink: {
          DEFAULT: '#0f172a',
          soft: '#475569',
          mute: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Sora var', 'Sora', 'Inter var', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        container: '80rem'
      },
      boxShadow: {
        card: '0 1px 2px rgb(15 23 42 / 0.04), 0 8px 24px -12px rgb(15 23 42 / 0.15)'
      }
    }
  },
  plugins: []
}