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
      // Fluid type scale (Inter). Each step scales between a mobile floor and the reference size.
      fontSize: {
        'display': ['clamp(1.75rem, 2.2vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'page-title': ['clamp(1.25rem, 1rem + 0.8vw, 1.625rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'section-title': ['clamp(1rem, 0.9rem + 0.45vw, 1.3rem)', { lineHeight: '1.25' }],
        'card-title': ['clamp(0.9rem, 1vw, 1.05rem)', { lineHeight: '1.3' }],
        'metric': ['clamp(1.5rem, 2vw, 2rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'body': ['clamp(0.75rem, 0.85vw, 0.9rem)', { lineHeight: '1.55' }],
        'caption': ['clamp(0.6875rem, 0.66rem + 0.1vw, 0.75rem)', { lineHeight: '1.4' }],
        'badge': ['0.6875rem', { lineHeight: '1.2' }],
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '7.5': '1.875rem',
        '13': '3.25rem',
        '18': '4.5rem',
      },
      scale: {
        '102': '1.02',
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
        '3xs': '0px 1px 1px rgba(23,21,43,0.03)',
        '2xs': '0px 1px 3px rgba(173,149,178,0.10), 0px 4px 14px rgba(173,149,178,0.06)',
        'xs': '0px 1px 2px rgba(23,21,43,0.06)',
        'card': '0px 1.2px 2.4px rgba(0,0,0,0.05)',
        'section': '0px 8px 24px rgba(173,149,178,0.06), 0px 1px 2px rgba(173,149,178,0.04)',
        'soft': '0px 4px 40px rgba(0,0,0,0.06)',
        'float': '0px 5.2px 31.4px -7.8px rgba(93,82,180,0.08)',
        'glow-pink': '0px 5.3px 29.9px rgba(253, 160, 216, 0.6)',
        'icon': '0px 10px 40px -12px rgba(183,110,199,0.18)',
        'tile': '0px 1px 4px rgba(0,0,0,0.04), 0px 2px 20px rgba(139,92,246,0.07)',
      },
      dropShadow: {
        'xs': '0 1px 1px rgba(0,0,0,0.05)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '48px',
      },
      keyframes: {
        'fade': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'enter': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'enter': 'enter 200ms ease-out both',
        // Opacity-only: for fixed full-screen overlays, which must never shift past the viewport
        'fade': 'fade 200ms ease-out both',
      },
    },
  },
  plugins: [],
}
