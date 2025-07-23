// src/components/LessonNode.tsx

import React from 'react';
import { CheckCircleIcon, PlayCircleIcon, LockClosedIcon } from '@heroicons/react/24/solid'; // Import de LockClosedIcon

interface LessonNodeProps {
  title: string;
  isCompleted: boolean;
  onClick: () => void;
  languageCode: string; // Pour afficher l'icône de la langue
  progressPercentage: number; // Nouveau: 0-100
  isLocked: boolean; // Nouveau: Indique si la leçon est verrouillée
}

const LessonNode: React.FC<LessonNodeProps> = ({ title, isCompleted, onClick, languageCode, progressPercentage, isLocked }) => {
  // Déterminer l'icône de la langue
  const getLanguageIcon = (code: string) => {
    switch (code) {
      case 'fang': return '🗣️'; // Emoji pour Fang
      case 'nzebi': return '📚'; // Emoji pour Nzébi
      case 'massango': return '📘'; // Emoji pour Massango
      default: return '🌐'; // Emoji générique
    }
  };

  // Calculs pour la barre de progression circulaire
  const radius = 60; // Rayon du cercle de progression
  const circumference = 2 * Math.PI * radius;
  // Si la leçon est verrouillée, la progression est de 0% et la couleur est grise
  const actualProgressPercentage = isLocked ? 0 : progressPercentage;
  const strokeDashoffset = circumference * (1 - actualProgressPercentage / 100); 

  // Déterminer la couleur de la barre de progression basée sur le pourcentage
  const hue = (actualProgressPercentage / 100) * 120; // 0 (rouge) à 120 (vert)
  const progressColor = isLocked ? '#A0A0A0' : `hsl(${hue}, 70%, 50%)`; // Gris si verrouillé

  return (
    <button
      onClick={isLocked ? undefined : onClick} // Désactive le clic si verrouillé
      disabled={isLocked} // Désactive le bouton si verrouillé
      className={`
        relative w-48 h-48 rounded-full flex flex-col items-center justify-center text-center p-2 m-4
        shadow-lg transition-all duration-300 transform
        ${isLocked
          ? 'bg-gray-400 text-gray-700 cursor-not-allowed opacity-70' // Styles pour verrouillé
          : isCompleted 
            ? 'bg-gradient-to-br from-green-400 to-green-600 text-white hover:scale-105 hover:shadow-xl' 
            : 'bg-gradient-to-br from-blue-400 to-blue-600 text-white hover:scale-105 hover:shadow-xl'
        }
        border-4 ${isLocked ? 'border-gray-500' : (isCompleted ? 'border-green-700' : 'border-blue-700')}
        focus:outline-none focus:ring-4 ${isLocked ? 'focus:ring-gray-300' : (isCompleted ? 'focus:ring-green-300' : 'focus:ring-blue-300')}
        overflow-hidden // Pour s'assurer que le contenu ne déborde pas
      `}
    >
      {/* Icône de complétion, de lecture ou de verrouillage */}
      <div className="absolute top-2 right-2">
        {isLocked ? (
          <LockClosedIcon className="h-8 w-8 text-white-300 drop-shadow-md" />
        ) : isCompleted ? (
          <CheckCircleIcon className="h-8 w-8 text-white-300 drop-shadow-md" />
        ) : (
          <PlayCircleIcon className="h-8 w-8 text-white-300 drop-shadow-md" />
        )}
      </div>

      {/* SVG pour la barre de progression circulaire */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160">
        {/* Cercle de fond de la barre de progression */}
        <circle
          className="text-gray-300" // Couleur de fond du cercle
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          r={radius}
          cx="80"
          cy="80"
        />
        {/* Cercle de progression */}
        <circle
          stroke={progressColor} // Couleur dynamique basée sur le pourcentage ou gris si verrouillé
          strokeWidth="8"
          fill="transparent"
          r={radius}
          cx="80"
          cy="80"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 0.5s ease-in-out, stroke 0.5s ease-in-out', // Animation de la progression et de la couleur
            transform: 'rotate(-90deg)', // Commence la progression en haut
            transformOrigin: 'center',
          }}
        />
      </svg>

      {/* Icône de la langue */}
      <span className={`text-5xl mb-2 drop-shadow-md relative z-10 ${isLocked ? 'grayscale' : ''}`}>
        {getLanguageIcon(languageCode)}
      </span>
      
      {/* Titre de la leçon */}
      <span className="text-lg font-bold leading-tight drop-shadow-md relative z-10">
        {title}
      </span>
      {/* Affichage du pourcentage de complétion */}
      <span className="text-sm font-semibold mt-1 relative z-10">
        {isLocked ? 'Verrouillé' : `${Math.round(progressPercentage)}%`}
      </span>
    </button>
  );
};

export default LessonNode;
