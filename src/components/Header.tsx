  // src/components/Header.tsx
  import { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  // Import de UserIcon, CalendarIcon, UsersIcon, TrophyIcon, CurrencyDollarIcon
  import { UsersIcon, CalendarIcon, TrophyIcon, CurrencyDollarIcon, UserIcon } from '@heroicons/react/24/solid';

  const Header: React.FC = () => {
    const [totalXP, setTotalXP] = useState(0);
    const [totalCoins, setTotalCoins] = useState(0);

    useEffect(() => {
      // Fonction pour mettre à jour les XP et les pièces
      const updateStats = () => {
        const xp = parseInt(localStorage.getItem('ndalang_total_score') || '0', 10);
        const coins = parseInt(localStorage.getItem('ndalang_coins') || '0', 10);
        setTotalXP(xp);
        setTotalCoins(coins);
      };

      // Mettre à jour au montage du composant
      updateStats();

      // Écouter les changements dans localStorage (si vous les déclenchez manuellement ou avec un événement custom)
      // Pour l'instant, un simple intervalle suffit pour voir les mises à jour.
      const intervalId = setInterval(updateStats, 1000); // Mettre à jour toutes les secondes

      return () => clearInterval(intervalId); // Nettoyage de l'intervalle
    }, []);

    return (
      <header className="fixed top-0 left-0 w-full bg-blue-700 bg-opacity-90 text-white p-4 shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center text-2xl font-bold hover:text-blue-100 transition-colors duration-200">
            {/* Remplacement de BookOpenIcon par l'image du logo */}
            <img
              src="/images/WhatsApp Image 2025-07-22 at 12.33.37.jpeg" // Chemin vers votre logo
              alt="Logo NdaLang"
              className="h-10 w-10 mr-2 rounded-full object-cover" // Styles pour l'image
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null; // Empêche la boucle infinie en cas d'erreur
                target.src = "/images/Ndalang.jpeg"; // Image de remplacement si non trouvée
              }}
            />
            NdaLang
          </Link>
          <div className="flex items-center space-x-4">
            {/* Affichage des XP */}
            <div className="flex items-center bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold shadow-inner">
              <TrophyIcon className="h-5 w-5 text-yellow-300 mr-1" />
              <span>{totalXP} XP</span>
            </div>
            {/* Affichage des Pièces */}
            <div className="flex items-center bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold shadow-inner">
              <CurrencyDollarIcon className="h-5 w-5 text-green-300 mr-1" />
              <span>{totalCoins} Pièces</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/ask-question" className="flex items-center hover:text-blue-100 transition-colors duration-200">
              <CalendarIcon className="h-5 w-5 mr-1" /> Questions
            </Link>
            <Link to="/book-session" className="flex items-center hover:text-blue-100 transition-colors duration-200">
              <UsersIcon className="h-5 w-5 mr-1" /> Session
            </Link>
            {/* Nouveau lien vers la page de profil */}
            <Link to="/profile" className="flex items-center hover:text-blue-100 transition-colors duration-200">
              <UserIcon className="h-5 w-5 mr-1" /> Profil
            </Link>
          </nav>
        </div>
      </header>
    );
  };

  export default Header;
