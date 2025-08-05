// src/pages/home.tsx

import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';

const lottieAnimationDataPath = '/animations/bbfb39fe-e03e-48d9-a1ba-a6098b864d03.json';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifie si une langue est déjà sélectionnée
    const storedLanguageCode = localStorage.getItem('ndalang_selected_language');
    if (storedLanguageCode) {
      // Redirige directement vers la page de cours de la langue sélectionnée
      navigate(`/cours/${storedLanguageCode}`, { replace: true });
    }
  }, [navigate]);

  const handleStartLearning = () => {
    navigate('/langues');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#006FCD',
      }}>
        <Player
          src={lottieAnimationDataPath}
          autoplay
          loop
          style={{
            width: '120%',
            height: '120%',
            minWidth: '100vw',
            minHeight: '100vh',
            objectFit: 'cover',
            transform: 'scale(1.2)',
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto p-4 relative z-10 bg-white bg-opacity-80 rounded-lg shadow-lg my-8 pt-16 text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Bienvenue sur NdaLang !</h1>
        <p className="text-lg text-gray-700 mb-8">
          Votre porte d'entrée vers l'apprentissage des langues vernaculaires du Gabon.
        </p>
        <div className="mb-8">
          <button
            onClick={handleStartLearning}
            className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-bold text-xl rounded-full shadow-lg
                       hover:bg-green-700 transition-all duration-300 transform hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-green-300
                       animate-bounce-vertical"
          >
            Commencer l'apprentissage 🎉
          </button>
        </div>
      </div>
    </div>
  );
}