// src/components/YouTubePlayer.tsx
import React from 'react';

interface YouTubePlayerProps {
  videoId: string;
  title?: string; // Optionnel : un titre pour le lecteur YouTube (pour l'accessibilité)
  width?: string; // Optionnel : largeur du lecteur (par défaut 100%)
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, title = "Vidéo de la leçon", width = "100%" }) => {
  // Si aucun videoId n'est fourni, on ne rend rien
  if (!videoId) {
    console.warn("YouTubePlayer: videoId est vide. Le lecteur ne sera pas affiché.");
    return null;
  }

  // Construction de l'URL d'intégration YouTube
  const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&modestbranding=1&rel=0&origin=${window.location.origin}`;

  return (
    <div className="youtube-player-container" style={{ 
      position: 'relative', 
      width: width, 
      paddingBottom: '56.25%', // Ratio 16:9 pour maintenir la proportion de la vidéo
      height: 0, 
      overflow: 'hidden' 
    }}>
      <iframe
        className="youtube-iframe"
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%' 
        }}
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;
