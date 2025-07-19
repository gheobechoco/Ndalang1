// src/pages/PremiumPage.tsx

import { Link } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon, CurrencyDollarIcon, PhoneIcon } from '@heroicons/react/24/solid';

export default function PremiumPage() {
  const whatsappNumber = "+241077657635"; // Remplacez par votre numéro WhatsApp réel (format international sans +)
  const whatsappMessage = encodeURIComponent("Bonjour, je souhaite m'abonner à NdaLang Premium. Pourriez-vous me donner les instructions de paiement via MoovMoney ou Airtel Money ?");

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl my-8">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Retour à l'accueil
      </Link>

      <h1 className="text-3xl font-bold text-center mb-6 text-yellow-800">
        ✨ NdaLang Premium : Passez au niveau supérieur !
      </h1>

      <p className="text-lg text-gray-700 mb-8 text-center">
        Débloquez tout le potentiel de NdaLang et accélérez votre apprentissage des langues gabonaises avec notre abonnement Premium.
      </p>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          🚀 Avantages Exclusifs du Premium
        </h2>
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-start bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
            <CheckCircleIcon className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-blue-700 mb-1">Accès aux salons privés Discord</h3>
              <p>Rejoignez des discussions exclusives, des sessions vocales de pratique et interagissez directement avec des locuteurs natifs et des experts.</p>
            </div>
          </li>
          <li className="flex items-start bg-green-50 p-4 rounded-lg shadow-sm border border-green-200">
            <CheckCircleIcon className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-green-700 mb-1">Ressources bonus téléchargeables (PDF & Audio)</h3>
              <p>Obtenez des fiches de vocabulaire illustrées, des guides de prononciation détaillés et des enregistrements audio exclusifs pour approfondir votre apprentissage.</p>
            </div>
          </li>
          <li className="flex items-start bg-purple-50 p-4 rounded-lg shadow-sm border border-purple-200">
            <CheckCircleIcon className="h-6 w-6 text-purple-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-purple-700 mb-1">Réduction sur les sessions de Café Linguistique</h3>
              <p>Profitez de tarifs préférentiels pour vos sessions de pratique individuelles ou en petit groupe via Whereby et Calendly.</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="text-center mt-10 p-6 bg-gray-50 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          💳 Comment s'abonner (Paiement Local)
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Nous privilégions les méthodes de paiement locales pour vous faciliter l'accès à NdaLang Premium.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4">
          <CurrencyDollarIcon className="h-12 w-12 text-green-500" />
          <p className="text-xl font-bold text-gray-900">
            Prix de l'abonnement Premium : <span className="text-green-600">5 000 XAF / mois</span>
          </p>
          <p className="text-md text-gray-600">
            (ou l'équivalent dans votre devise locale via Mobile Money)
          </p>
          <p className="text-lg text-gray-700 mt-4">
            Pour vous abonner, veuillez nous contacter directement via WhatsApp. Nous vous guiderons
            pour effectuer le paiement sécurisé par <span className="font-semibold text-blue-700">MoovMoney</span> ou <span className="font-semibold text-red-700">Airtel Money</span>.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white font-bold text-xl rounded-full shadow-lg
                       hover:bg-green-600 transition-all duration-300 transform hover:scale-105
                       focus:outline-none focus:ring-4 focus:ring-green-300 mt-6"
          >
            <PhoneIcon className="h-6 w-6 mr-3" />
            Contacter pour s'abonner (WhatsApp)
          </a>
          <p className="text-sm text-gray-500 mt-4">
            Votre accès Premium sera activé immédiatement après confirmation du paiement.
          </p>
        </div>
      </div>
    </div>
  );
}
