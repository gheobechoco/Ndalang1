// src/pages/AirtableFormPage.tsx


import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Player } from '@lottiefiles/react-lottie-player'; // Import du composant Player de Lottie

export default function AirtableFormPage() {
  const airtableEmbedUrl = "https://airtable.com/embed/appHCk7IOS5zdeH5O/pagCWmj9dhnoqZkiL/form";
  const lottieAnimationDataPath = 'public/animations/bbfb39fe-e03e-48d9-a1ba-a6098b864d03.json'; // Chemin de votre animation Lottie

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
          Posez vos questions à la Communauté NdaLang
        </h1>

        <p className="text-lg text-gray-700 mb-8 text-center">
          Vous avez une question sur une leçon, une traduction, ou un aspect culturel ?
          Utilisez le formulaire ci-dessous pour nous l'envoyer. La communauté et les experts NdaLang
          se feront un plaisir de vous aider !
        </p>

        <div className="w-full overflow-hidden rounded-lg shadow-md border border-gray-200" style={{ height: '600px' }}>
          <iframe
            className="airtable-embed w-full h-full"
            src={airtableEmbedUrl}
            frameBorder="0"
            onLoad={() => console.log("Airtable iframe chargé")}
            style={{ background: 'transparent' }}
            title="Formulaire de questions NdaLang"
          ></iframe>
        </div>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Vos questions seront visibles sur notre forum une fois validées par nos modérateurs.
        </p>
      </div>
    </div>
  );
}
