/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#07060A',
          900: '#0D0B14',
          850: '#14111F',
          800: '#1F1A2F',
          700: '#2E2745',
        },
        rose: {
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
        },
        peach: {
          400: '#FDBA74',
          500: '#FB923C',
          600: '#F97316',
        },
        amber: {
          400: '#FCD34D',
          500: '#F59E0B',
        },
        cyan: {
          400: '#38BDF8',
          500: '#0ea5e9',
        },
        emerald: {
          400: '#34d399',
          500: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-sunset': '0 0 30px -5px rgba(244, 63, 94, 0.35), 0 0 15px -3px rgba(251, 146, 60, 0.25)',
        'glow-peach': '0 0 25px -5px rgba(251, 146, 60, 0.35)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.3)',
        'glow-cyan': '0 0 25px -5px rgba(56, 189, 248, 0.3)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.3)',
      }
    },
  },
  plugins: [],
}
