/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-error': '#ef4444', // Equivalent de red-500
        'green-success': '#22c55e', // Equivalent de green-500
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '25%': { transform: 'translateX(-8px)' }, // Augmenté légèrement l'amplitude
          '50%': { transform: 'translateX(8px)' },
          '75%': { transform: 'translateX(-8px)' },
        },
        pulseBorder: { // Animation pour la bordure verte
            '0%, 100%': { borderColor: 'transparent' }, // Commence et finit transparent
            '50%': { borderColor: '#22c55e' }, // Couleur verte au milieu
        },
        pulseEffect: { // Effet de dilatation pour la bonne réponse (similaire à pulse existant)
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.02)' }, // Plus subtil pour ne pas déformer trop
        }
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        pulseBorder: 'pulseBorder 1s infinite alternate', // Fait pulser la bordure
        pulseEffect: 'pulseEffect 0.6s ease-in-out', // Une seule pulsation
      }
    },
  },
  plugins: [],
}