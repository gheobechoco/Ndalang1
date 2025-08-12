// src/components/QuizFeedbackModal.tsx
import React, { useEffect, useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { TrophyIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';

interface QuizFeedbackModalProps {
  isVisible: boolean;
  type: 'success' | 'failure';
  message: string;
  score: number;
  coinsEarned: number;
  onClose: () => void;
}

const QuizFeedbackModal: React.FC<QuizFeedbackModalProps> = ({
  isVisible,
  type,
  message,
  score,
  coinsEarned,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Chemins des animations Lottie (à adapter si vous avez des animations spécifiques)
  // Utilisez des chemins absolus pour les ressources du dossier public
  const successAnimationPath = '/animations/success_animation.json';
  const failureAnimationPath = '/animations/failure_animation.json';

  useEffect(() => {
    if (isVisible) {
      // Défilement vers le haut pour s'assurer que le modal est visible
      if (modalRef.current) {
        modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Ferme le modal automatiquement après un certain délai
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Reste visible pendant 4 secondes

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) {
    return null;
  }

  const isSuccess = type === 'success';
  const animationSrc = isSuccess ? successAnimationPath : failureAnimationPath;
  const bgColor = isSuccess ? 'bg-green-50' : 'bg-red-50';
  const borderColor = isSuccess ? 'border-green-400' : 'border-red-400';
  const textColor = isSuccess ? 'text-green-700' : 'text-red-700';
  const titleColor = isSuccess ? 'text-green-800' : 'text-red-800';

  return (
    <div
      ref={modalRef}
      className={`fixed inset-0 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Fond semi-transparent
    >
      <div className={`relative ${bgColor} ${borderColor} border-2 rounded-lg shadow-xl p-6 max-w-md w-full text-center transform scale-95 animate-scaleUp`}>
        <h2 className={`text-3xl font-bold mb-4 ${titleColor}`}>
          {isSuccess ? 'Félicitations !' : 'Oups !'}
        </h2>

        <div className="flex justify-center mb-4">
          <Player
            src={animationSrc}
            autoplay
            loop={false} // Joue une seule fois
            className="w-32 h-32"
            onEvent={(event: string) => { // <-- Correction ici : 'any' remplacé par 'string'
              if (event === 'complete') {
                // Optionnel: faire quelque chose après la fin de l'animation
              }
            }}
          />
        </div>

        <p className={`text-lg mb-4 ${textColor}`}>
          {message}
        </p>

        <div className="flex justify-center items-center space-x-6 mb-4">
          <div className="flex items-center text-gray-800 font-semibold">
            <TrophyIcon className="h-6 w-6 text-yellow-500 mr-1" />
            <span>{score} XP</span>
          </div>
          <div className="flex items-center text-gray-800 font-semibold">
            <CurrencyDollarIcon className="h-6 w-6 text-purple-500 mr-1" />
            <span>{coinsEarned} Pièces</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Continuer
        </button>
      </div>
    </div>
  );
};

export default QuizFeedbackModal;
