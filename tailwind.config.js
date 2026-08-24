/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          pink: '#EF4486',
          rose: '#FF70A4',
          hotpink: '#EA33A1',
          purple: '#955BE3',
          lightpurple: '#AF71F4',
          deep: '#26214E',
          berry: '#801543',
          magenta: '#A3165F',
        },
        phase: {
          menstruation: '#F87171',
          fertile: '#93C5FD',
          ovulation: '#4ADE80',
          luteal: '#C084FC',
          logged: '#D1D5DB',
        }
      },
      boxShadow: {
        'card': '0px 1.2px 2.4px rgba(0,0,0,0.05)',
        'section': '0px 8px 24px rgba(173,149,178,0.06), 0px 1px 2px rgba(173,149,178,0.04)',
        'soft': '0px 4px 40px rgba(0,0,0,0.06)',
        'float': '0px 5.2px 31.4px -7.8px rgba(93,82,180,0.08)',
        'glow-pink': '0px 5.3px 29.9px rgba(253, 160, 216, 0.6)',
        'icon': '0px 10px 40px -12px rgba(183,110,199,0.18)',
        'tile': '0px 1px 4px rgba(0,0,0,0.04), 0px 2px 20px rgba(139,92,246,0.07)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '48px',
      },
    },
  },
  plugins: [],
}

