/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
      colors: {
        rs: {
          bg: '#faf7f4',
          surface: '#ffffff',
          'surface-2': '#f5f1ec',
          border: '#e8e2da',
          text: '#2d2a26',
          muted: '#8a8275',
          primary: '#e05545',
          'primary-dark': '#c44538',
          'primary-light': '#f06b5c',
          accent: '#f59e0b',
          success: '#16a34a',
          warning: '#f59e0b',
          error: '#dc2626',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'scale-in': 'scaleIn 0.3s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
