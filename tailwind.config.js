/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        valentine: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        script: ['Dancing Script', 'cursive'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'heart-pulse': 'heartPulse 1.2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'gradient-shift': 'gradientShift 12s ease infinite',
        'heart-float': 'heartFloat 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        heartPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        heartFloat: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-8px) translateX(4px) rotate(2deg)' },
          '50%': { transform: 'translateY(-4px) translateX(-6px) rotate(-1deg)' },
          '75%': { transform: 'translateY(-12px) translateX(2px) rotate(3deg)' },
        },
      },
      backgroundSize: {
        'gradient': '200% 200%',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(236, 72, 153, 0.12), 0 2px 8px -2px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 10px 40px -10px rgba(236, 72, 153, 0.18), 0 4px 12px -4px rgba(0, 0, 0, 0.08)',
        'card': '0 8px 32px -8px rgba(190, 24, 93, 0.12), 0 2px 12px -4px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 16px 48px -12px rgba(190, 24, 93, 0.18), 0 4px 16px -4px rgba(0, 0, 0, 0.08)',
        'photo-card': '0 12px 40px -8px rgba(190, 24, 93, 0.2), 0 4px 16px -4px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.4)',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
      fontSize: {
        'fluid-sm': 'clamp(0.8125rem, 2vw, 0.875rem)',
        'fluid-base': 'clamp(0.875rem, 2.5vw, 1rem)',
        'fluid-lg': 'clamp(1rem, 3vw, 1.125rem)',
        'fluid-xl': 'clamp(1.125rem, 4vw, 1.25rem)',
        'fluid-2xl': 'clamp(1.25rem, 5vw, 1.5rem)',
        'fluid-3xl': 'clamp(1.5rem, 6vw, 1.875rem)',
        'fluid-4xl': 'clamp(1.875rem, 8vw, 2.25rem)',
      },
      spacing: {
        'page': 'clamp(0.75rem, 4vw, 1.5rem)',
        'section': 'clamp(1rem, 5vw, 2rem)',
      },
    },
  },
  plugins: [],
}
