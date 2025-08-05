// src/components/BackgroundAnimation.tsx
import { Player } from '@lottiefiles/react-lottie-player';
import React from 'react';

// Le chemin vers votre animation Lottie
const lottieAnimationDataPath = '/animations/bbfb39fe-e03e-48d9-a1ba-a6098b864d03.json';

// Définir une interface pour les props du composant
interface BackgroundAnimationProps {
  children: React.ReactNode;
}

/**
 * Composant d'animation de fond pour l'application.
 * Il affiche une animation Lottie en arrière-plan de manière fixe.
 */
function BackgroundAnimation({ children }: BackgroundAnimationProps) {
  return (
    <div className="relative min-h-screen">
      {/* Conteneur de l'animation en arrière-plan */}
      <div
        className="fixed top-0 left-0 w-screen h-screen z-[-1] overflow-hidden flex justify-center items-center bg-[#006FCD]"
      >
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
      {/* Contenu de la page, affiché par-dessus l'animation */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default BackgroundAnimation;
