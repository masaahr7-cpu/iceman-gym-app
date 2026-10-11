module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        iceman: {
          black: '#0B0B0B',
          charcoal: '#1A1A1A',
          gold: '#D4AF37',
          goldSoft: '#E6C96A',
          white: '#F5F5F5',
          muted: '#A3A3A3',
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(212,175,55,0.4), 0 18px 60px rgba(0,0,0,0.35)',
      }
    },
  },
  plugins: [],
};
