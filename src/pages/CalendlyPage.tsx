// src/pages/CalendlyPage.tsx

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Player } from '@lottiefiles/react-lottie-player'; // Import du composant Player de Lottie

// Déclarez l'interface pour le widget Calendly sur l'objet window
declare global {
  interface Window {
    Calendly: any;
  }
}

const lottieAnimationDataPath = '/animations/bbfb39fe-e03e-48d9-a1ba-a6098b864d03.json'; // Chemin de votre animation Lottie

export default function CalendlyPage() {
  useEffect(() => {
    // Charge le CSS du widget Calendly
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Charge le script principal du widget Calendly
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      // Initialise le widget badge une fois que le script est chargé
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: 'https://calendly.com/moueletgeoff/cafe-linguistique', // Votre URL Calendly
          text: 'Planifions un RDV', // Texte du badge
          color: '#0069ff', // Couleur de fond du badge
          textColor: '#ffffff', // Couleur du texte du badge
          branding: true // Afficher le branding Calendly
        });
      }
    };
    document.body.appendChild(script);

    // Fonction de nettoyage pour supprimer les scripts et styles si le composant est démonté
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      // Si Calendly a une méthode pour détruire le badge, elle irait ici.
      // Pour le badge, il n'y a généralement pas de méthode de destruction explicite nécessaire.
    };
  }, []); // Le tableau de dépendances vide assure que l'effet ne s'exécute qu'une seule fois au montage

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* L'animation Lottie en arrière-plan (couche la plus basse) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // S'assure que l'animation est derrière tout le reste
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#006FCD', // Couleur de fond pour correspondre au thème
      }}>
        <Player
          src={lottieAnimationDataPath}
          autoplay
          loop
          style={{
            width: '120%', // Légèrement plus grand pour couvrir l'écran
            height: '120%',
            minWidth: '100vw',
            minHeight: '100vh',
            objectFit: 'cover',
            transform: 'scale(1.2)', // Ajustement visuel si nécessaire
          }}
        />
      </div>

      {/* Contenu principal de la page, positionné au-dessus de l'arrière-plan */}
      <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl my-8 relative z-10">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Réservez votre Café Linguistique
        </h1>

        <p className="text-lg text-gray-700 mb-8 text-center">
          Utilisez le calendrier ci-dessous pour planifier votre session de pratique de la langue Fang avec un animateur NdaLang.
        </p>

        <div className="text-center text-gray-600">
          Le widget de réservation Calendly apparaîtra en bas à droite de votre écran.
          Cliquez dessus pour planifier votre session !
        </div>
      </div>
    </div>
  );
}
