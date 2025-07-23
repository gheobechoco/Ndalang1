// src/components/LoadingPage.tsx
import React, { useState, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

interface LoadingPageProps {
  onLoaded: () => void; // Fonction à appeler lorsque le chargement est terminé
}

const LoadingPage: React.FC<LoadingPageProps> = ({ onLoaded }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Préparation de votre parcours linguistique...",
    "Chargement des leçons interactives...",
    "Synchronisation des audios et des quiz...",
    "Découvrez les langues gabonaises avec NdaLang !",
  ];

  const lottieAnimationPath = '/animations/loading_animation.json'; // Assurez-vous que ce chemin est correct pour votre animation Lottie
  const ndalangLogoPath = '/images/Ndalang.jpeg'; // Chemin vers le logo Ndalang

  useEffect(() => {
    // Cycle à travers les messages toutes les 1.5 secondes
    const messageTimer = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 1500);

    // Simuler un temps de chargement de 4 secondes avant de passer à l'application principale
    const loadingTimer = setTimeout(() => {
      clearInterval(messageTimer); // Arrêter le cycle des messages
      onLoaded(); // Appeler la fonction pour indiquer que le chargement est terminé
    }, 4000); // Durée totale du chargement simulé

    // Nettoyage des timers lors du démontage du composant
    return () => {
      clearInterval(messageTimer);
      clearTimeout(loadingTimer);
    };
  }, []); // S'exécute une seule fois au montage du composant

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 flex flex-col items-center justify-center text-white p-4 z-[100]">
      {/* Container pour combiner le logo et l'animation Lottie */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-8"> {/* Taille ajustée pour une meilleure visibilité */}
        <Player
          src={lottieAnimationPath}
          autoplay
          loop
          style={{ width: '100%', height: '100%' }}
        />
        <img
          src={ndalangLogoPath}
          alt="Logo NdaLang"
          className="absolute w-32 h-32 rounded-full shadow-lg object-cover" // Plus petit, centré sur l'animation Lottie
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Empêche la boucle infinie en cas d'erreur
            target.src = "/images/Ndalang2.jpeg"; // Image de remplacement
          }}
        />
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-center">NdaLang</h1>
      
      <p className="text-lg text-center font-semibold mb-8 h-12 flex items-center justify-center">
        {messages[messageIndex]}
      </p>

      {/* Un bouton "Commencer" pourrait apparaître ici si vous voulez que l'utilisateur clique pour continuer après le chargement simulé */}
       <button
        onClick={onLoaded}
        className="px-8 py-3 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-gray-200 transition-colors duration-300"
      >
        Commencer
      </button> 
    </div>
  );
};

export default LoadingPage;