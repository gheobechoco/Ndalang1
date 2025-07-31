// src/components/AudioPlayer.tsx
import React, { useRef, useState, useEffect } from 'react';
// Importez ArrowPathIcon ici
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

interface AudioPlayerProps {
  audioSrc: string; // Le chemin vers le fichier audio (ex: "/audios/fang_bonjour.mp3")
  label?: string;   // Un libellé optionnel pour le bouton (ex: "Écouter")
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc, label = "Écouter" }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Nouvel état pour indiquer le chargement
  const [error, setError] = useState<string | null>(null); // Nouvel état pour les erreurs

  // Effet pour gérer les changements de source audio et réinitialiser l'état
  useEffect(() => {
    setIsPlaying(false);
    setIsLoading(false);
    setError(null);
    if (audioRef.current) {
      audioRef.current.load(); // Recharge l'audio si la source change
      console.log(`[AudioPlayer] Source audio changée ou montée: ${audioSrc}. Tentative de chargement.`);
    }
  }, [audioSrc]);

  // Fonction pour basculer la lecture/pause
  const togglePlayPause = async () => {
    if (!audioRef.current) {
      console.error("[AudioPlayer] audioRef.current n'est pas disponible.");
      setError("Erreur interne: lecteur audio non prêt.");
      return;
    }

    if (isPlaying) {
      // Si en cours de lecture, mettre en pause
      audioRef.current.pause();
      setIsPlaying(false);
      console.log("[AudioPlayer] Audio mis en pause.");
    } else {
      // Si en pause, tenter de lire
      try {
        setIsLoading(true); // Indiquer que la lecture est en cours de tentative
        setError(null); // Réinitialiser les erreurs précédentes

        // Tenter de lire l'audio
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
        console.log(`[AudioPlayer] Lecture démarrée pour: ${audioSrc}`);
      } catch (e) {
        setIsPlaying(false);
        setIsLoading(false);
        let errorMessage = "Impossible de lire l'audio. ";
        if (e instanceof DOMException) {
          if (e.name === "NotAllowedError") {
            errorMessage += "Le navigateur a bloqué la lecture automatique. Interagissez avec la page d'abord.";
          } else if (e.name === "AbortError") {
            errorMessage += "La lecture a été interrompue (ex: par un autre son).";
          } else {
            errorMessage += `Erreur DOM: ${e.name} - ${e.message}`;
          }
        } else {
          errorMessage += `Erreur inconnue: ${e}`;
        }
        console.error(`[AudioPlayer] Erreur lors du démarrage de la lecture pour ${audioSrc}:`, e);
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={togglePlayPause}
        className={`p-2 rounded-full shadow-md transition duration-200
                   ${isPlaying ? 'bg-purple-700' : 'bg-purple-600'}
                   ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-700'}`}
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
        disabled={isLoading} // Désactiver le bouton pendant le chargement/tentative de lecture
      >
        {isLoading ? (
          <ArrowPathIcon className="h-5 w-5 animate-spin text-white" /> // Icône de chargement
        ) : isPlaying ? (
          <PauseIcon className="h-5 w-5 text-white" />
        ) : (
          <PlayIcon className="h-5 w-5 text-white" />
        )}
      </button>
      {label && <span className="text-gray-700 text-sm">{label}</span>}

      {/* Afficher l'erreur si présente */}
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}

      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={() => {
          setIsPlaying(false);
          console.log(`[AudioPlayer] Lecture terminée pour: ${audioSrc}`);
        }}
        onPlay={() => {
          setIsPlaying(true);
          setIsLoading(false); // La lecture a commencé, donc plus en chargement
          setError(null); // Effacer toute erreur précédente
          console.log(`[AudioPlayer] Événement 'play' déclenché pour: ${audioSrc}`);
        }}
        onPause={() => {
          setIsPlaying(false);
          console.log(`[AudioPlayer] Événement 'pause' déclenché pour: ${audioSrc}`);
        }}
        onError={(e) => {
          setIsPlaying(false);
          setIsLoading(false);
          const mediaError = (e.target as HTMLMediaElement).error;
          let errorMessage = "Erreur de chargement ou de lecture de l'audio. ";
          if (mediaError) {
            switch (mediaError.code) {
              case mediaError.MEDIA_ERR_ABORTED:
                errorMessage += "Le chargement audio a été annulé.";
                break;
              case mediaError.MEDIA_ERR_NETWORK:
                errorMessage += "Erreur réseau lors du téléchargement de l'audio.";
                break;
              case mediaError.MEDIA_ERR_DECODE:
                errorMessage += "Erreur de décodage audio (fichier corrompu ou format non supporté).";
                break;
              case mediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                errorMessage += "La source audio n'est pas supportée ou introuvable.";
                break;
              default:
                errorMessage += `Code d'erreur inconnu: ${mediaError.code}.`;
            }
          }
          console.error(`[AudioPlayer] Erreur de l'élément audio pour ${audioSrc}:`, mediaError || e);
          setError(errorMessage);
        }}
        onCanPlayThrough={() => {
          console.log(`[AudioPlayer] Audio prêt à être lu sans interruption pour: ${audioSrc}`);
          setIsLoading(false); // Le fichier est prêt, on n'est plus en chargement
        }}
        preload="auto" // Tenter de charger l'audio en arrière-plan
        style={{ display: 'none' }} // Masquer l'élément audio natif
      />
    </div>
  );
};

export default AudioPlayer;
