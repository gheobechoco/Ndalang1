// src/pages/CalendlyPage.tsx

import  { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

// Déclarez l'interface pour le widget Calendly sur l'objet window
declare global {
  interface Window {
    Calendly: any;
  }
}

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
    <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl my-8">
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
  );
}
