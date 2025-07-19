// src/pages/CommunityPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function CommunityPage() {
  const discordInviteLink = "https://discord.gg/6tUrqgrYXB";

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl my-8">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Retour à l'accueil
      </Link>

      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
        💬 Rejoignez la Communauté NdaLang sur Discord !
      </h1>

      <p className="text-lg text-gray-700 mb-8 text-center">
        Plongez au cœur de l'apprentissage des langues gabonaises avec notre communauté Discord.
        Échangez, pratiquez et progressez avec d'autres passionnés et des locuteurs natifs !
      </p>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          🌍 Espace Public
        </h2>
        <p className="text-gray-600 mb-4">
          Ces salons sont ouverts à tous les membres de la communauté NdaLang.
        </p>
        <ul className="space-y-4">
          <li className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-blue-700 mb-1">📢 #annonces</h3>
            <p className="text-gray-700">
              Recevez les dernières nouvelles de NdaLang : nouvelles leçons, quiz, vidéos, et produits.
              Restez informé de tout ce qui se passe !
            </p>
          </li>
          <li className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-blue-700 mb-1">💬 #entraide</h3>
            <p className="text-gray-700">
              Posez vos questions, demandez de l'aide, proposez des traductions et aidez d'autres membres.
              Un espace collaboratif pour apprendre ensemble.
            </p>
          </li>
          <li className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold text-blue-700 mb-1">📸 #mur-visuel</h3>
            <p className="text-gray-700">
              Partagez des images, GIFs, dessins ou photos en lien avec les langues gabonaises.
              Un espace ludique pour s'exprimer visuellement en Fang !
            </p>
          </li>
        </ul>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          🔒 Espace Premium
        </h2>
        <p className="text-gray-600 mb-4">
          Ces salons sont réservés aux membres Premium pour une expérience d'apprentissage plus approfondie.
        </p>
        <ul className="space-y-4">
          <li className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-200">
            <h3 className="text-xl font-bold text-yellow-700 mb-1">🗣️ #pratique-fang (Vocal)</h3>
            <p className="text-gray-700">
              Rejoignez des sessions vocales pour pratiquer le Fang à l'oral, poser des questions
              directement aux locuteurs natifs et échanger en temps réel.
            </p>
          </li>
          <li className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-200">
            <h3 className="text-xl font-bold text-yellow-700 mb-1">🎙️ #corrections-orales</h3>
            <p className="text-gray-700">
              Postez vos enregistrements audio et recevez des retours personnalisés en texte ou audio.
              Améliorez votre prononciation et votre fluidité.
            </p>
          </li>
          <li className="bg-yellow-50 p-4 rounded-lg shadow-sm border border-yellow-200">
            <h3 className="text-xl font-bold text-yellow-700 mb-1">📚 #ressources-exclusives</h3>
            <p className="text-gray-700">
              Accédez à des ressources uniques : PDF, MP3, liens privés et packs audio téléchargeables,
              exclusivement pour les abonnés Premium.
            </p>
          </li>
        </ul>
      </div>

      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Prêt à nous rejoindre ?
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Cliquez sur le bouton ci-dessous pour accéder à notre serveur Discord et commencer votre aventure !
        </p>
        <a
          href={discordInviteLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 text-white font-bold text-xl rounded-full shadow-lg
                     hover:bg-purple-700 transition-all duration-300 transform hover:scale-105
                     focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          Rejoindre le Discord NdaLang
          <svg className="ml-3 h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.95 3.01c-.48-.48-1.12-.75-1.8-.75H4.85c-.68 0-1.32.27-1.8.75-.48.48-.75 1.12-.75 1.8V19.1c0 .68.27 1.32.75 1.8.48.48 1.12.75 1.8.75h14.3c.68 0 1.32-.27 1.8-.75.48-.48.75-1.12.75-1.8V4.81c0-.68-.27-1.32-.75-1.8zM18 9.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-6 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-6 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
