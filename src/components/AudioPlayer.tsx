// src/components/AudioPlayer.tsx

import React, { useRef } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid'; // Assurez-vous d'avoir @heroicons/react installé

interface AudioPlayerProps {
  audioFile: string; // Le chemin du fichier audio, ex: "/audios/fang_bonjour.mp3"
  title: string; // Un titre ou une description pour l'audio, utile pour l'accessibilité
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioFile, title }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Fonction pour gérer la lecture/pause de l'audio
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Erreur lors de la lecture de l'audio:", error);
          // Gérer les erreurs de lecture (ex: l'utilisateur n'a pas interagi avec la page)
          // Vous pouvez afficher un message à l'utilisateur ici si nécessaire
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Met à jour l'état quand l'audio se termine ou est mis en pause par le navigateur
  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={togglePlayPause}
        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200"
        aria-label={isPlaying ? `Pause ${title}` : `Jouer ${title}`}
      >
        {isPlaying ? (
          <PauseIcon className="h-5 w-5" />
        ) : (
          <PlayIcon className="h-5 w-5" />
        )}
      </button>
      {/* L'élément audio HTML est caché mais contrôlé par le bouton */}
      <audio
        ref={audioRef}
        src={audioFile}
        onEnded={handleEnded}
        onPause={handlePause}
        onPlay={() => setIsPlaying(true)} // S'assure que l'état est à jour si l'audio est joué par d'autres moyens
        preload="auto" // Charge l'audio pour une lecture plus rapide
        className="hidden" // Cache l'élément audio par défaut du navigateur
      >
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
    </div>
  );
};

export default AudioPlayer;
