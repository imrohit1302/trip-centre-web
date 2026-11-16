/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B2A4A',
          'navy-dark': '#071D33',
          'navy-light': '#1E4A78',
          orange: '#FF8A00',
          'orange-dark': '#E67600',
          'orange-light': '#FFB74D',
          yellow: '#FFC107',
        },
        tc: {
          navy: '#0B2A4A',
          'navy-dark': '#071D33',
          'navy-light': '#1E4A78',
          orange: '#FF8A00',
          'orange-dark': '#E67600',
          'orange-light': '#FFB74D',
          yellow: '#FFC107',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['Nunito', 'Nunito Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 8px 24px rgba(255, 138, 0, 0.25)',
        'glow-navy': '0 8px 28px rgba(11, 42, 74, 0.25)',
        'card-hover': '0 12px 30px -8px rgba(11, 42, 74, 0.12)',
        'card-dark-hover': '0 12px 30px -8px rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.45s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}

