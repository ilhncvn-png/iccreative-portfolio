/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:          '#020210',
          surface:     '#070B16',
          card:        '#0B1020',
          blue:        '#3F8CFF',
          'blue-hi':   '#5B8FFF',
          cyan:        '#00D4FF',
          orange:      '#FF6B2B',
          amber:       '#FFB347',
          violet:      '#7B4FFF',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '24px',
        btn:  '14px',
        pill: '100px',
      },
      animation: {
        'orb-1':        'orbDrift1 24s ease-in-out infinite',
        'orb-2':        'orbDrift2 32s ease-in-out infinite',
        'orb-3':        'orbDrift3 20s ease-in-out infinite',
        'lens-pulse':   'lensPulse 4s ease-in-out infinite',
        'scroll-hint':  'scrollHint 2s ease-in-out infinite',
        'nav-indicator':'navIndicator 300ms cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        orbDrift1: {
          '0%,100%': { transform: 'translate(0px,0px) scale(1)' },
          '25%':     { transform: 'translate(40px,-30px) scale(1.06)' },
          '50%':     { transform: 'translate(-20px,20px) scale(0.97)' },
          '75%':     { transform: 'translate(30px,15px) scale(1.03)' },
        },
        orbDrift2: {
          '0%,100%': { transform: 'translate(0px,0px) scale(1)' },
          '33%':     { transform: 'translate(-50px,30px) scale(1.08)' },
          '66%':     { transform: 'translate(30px,-20px) scale(0.94)' },
        },
        orbDrift3: {
          '0%,100%': { transform: 'translate(0px,0px)' },
          '50%':     { transform: 'translate(20px,-15px)' },
        },
        lensPulse: {
          '0%,100%': {
            boxShadow: '0 0 20px rgba(63,140,255,0.85), 0 0 40px rgba(63,140,255,0.45), 0 0 80px rgba(63,140,255,0.20)',
          },
          '50%': {
            boxShadow: '0 0 28px rgba(63,140,255,1), 0 0 56px rgba(63,140,255,0.65), 0 0 110px rgba(63,140,255,0.30)',
          },
        },
        scrollHint: {
          '0%,100%': { transform: 'translateY(0px)', opacity: '0.4' },
          '50%':     { transform: 'translateY(8px)', opacity: '0.9' },
        },
        navIndicator: {
          from: { transform: 'scaleX(0)' },
          to:   { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
}
