/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './admin/**/*.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        royal: { 50: '#E8EEF6', DEFAULT: '#123B70', 700: '#0D2D57', 900: '#0A2344' },
        burgundy: { 100: '#F3E4EA', DEFAULT: '#741F3D', 600: '#8C2A4C', 800: '#5C1830' },
        navy: '#10243E',
        cool: '#F5F7FA',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', '"Inter Variable"', 'Inter', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      maxWidth: { page: '90rem' },
      letterSpacing: { display: '-0.03em' },
      borderRadius: { '4xl': '1.75rem', '5xl': '2.25rem' },
      transitionTimingFunction: { apple: 'cubic-bezier(0.25, 0.1, 0.25, 1)' },
      keyframes: {
        rise: { from: { opacity: '0', transform: 'translateY(28px)' }, to: { opacity: '1', transform: 'none' } },
        slide: { from: { transform: 'translateY(0.35em)' }, to: { transform: 'none' } },
        'panel-in': { from: { clipPath: 'inset(100% 0 0 0)' }, to: { clipPath: 'inset(0 0 0 0)' } },
        'bar-in': { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
        'scroll-cue': { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(300%)' } },
        fade: { from: { opacity: '0' }, to: { opacity: '1' } },
        'bounce-soft': { '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' }, '50%': { transform: 'translateY(6px)', opacity: '1' } },
        'hero-zoom': { from: { transform: 'scale(1.12)' }, to: { transform: 'scale(1)' } },
      },
      animation: {
        rise: 'rise .7s cubic-bezier(.2,.7,.2,1) both',
        slide: 'slide .8s cubic-bezier(.2,.7,.2,1) both',
        'panel-in': 'panel-in 1.3s cubic-bezier(.75,0,.2,1) both',
        'bar-in': 'bar-in 1.1s cubic-bezier(.75,0,.2,1) both',
        'scroll-cue': 'scroll-cue 2.4s cubic-bezier(.65,0,.35,1) infinite',
        fade: 'fade .5s ease both',
        'bounce-soft': 'bounce-soft 2s cubic-bezier(.25,.1,.25,1) infinite',
        'hero-zoom': 'hero-zoom 2.8s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
};
