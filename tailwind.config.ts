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
        /* Hijau hutan gelap LMP (#102A1D) sesuai desain */
        brand: {
          50: '#f2f7f4',
          100: '#e1ede5',
          200: '#c5dcce',
          300: '#9ec4ad',
          400: '#6fa584',
          500: '#46835e',
          600: '#326848',
          700: '#265339',
          800: '#1b3f2b',
          850: '#153524',
          900: '#102a1d',
          950: '#0a1a12'
        },
        /* Kuning emas aksen LMP (#CCA052 / #C89F5B) sebagai aksen & tombol */
        accent: {
          50: '#fdfaf2',
          100: '#f9f2df',
          200: '#f1e2bc',
          300: '#e7ce92',
          400: '#d9b669',
          500: '#cca052',
          600: '#b88a41',
          700: '#966d34',
          800: '#7a572e',
          900: '#654829',
          950: '#392612'
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