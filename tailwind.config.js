/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f7f8',
          100: '#eceef1',
          200: '#d4d8df',
          300: '#aab1bd',
          400: '#7b8494',
          500: '#5962741',
          600: '#424a59',
          700: '#323843',
          800: '#1f232c',
          900: '#121519',
          950: '#080a0d',
        },
        brand: {
          50: '#f0fbf7',
          100: '#d9f7eb',
          200: '#b3eed7',
          300: '#7adfb8',
          400: '#3bc994',
          500: '#14b07b',
          600: '#098e64',
          700: '#0a7252',
          800: '#0c5b43',
          900: '#0b4b39',
          950: '#042a21',
        },
        accent: {
          50: '#fff8ec',
          100: '#ffefcf',
          200: '#ffdc9c',
          300: '#ffc15c',
          400: '#ffa62f',
          500: '#f88613',
          600: '#e06808',
          700: '#bb4c09',
          800: '#953c10',
          900: '#793311',
          950: '#431806',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        float: 'float 8s ease-in-out infinite',
        'spin-slow': 'spin 24s linear infinite',
        marquee: 'marquee 32s linear infinite',
        'pulse-ring': 'pulseRing 3s ease-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(ellipse at top, rgba(20,176,123,0.18), transparent 60%)',
      },
    },
  },
  plugins: [],
};