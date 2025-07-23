// src/components/Sidebar.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  BookOpenIcon,
  UsersIcon,
  QuestionMarkCircleIcon,
  CalendarIcon,
  
  TrophyIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  ChartBarIcon, // Pour la simulation de ligue
  SparklesIcon // Pour le Premium
} from '@heroicons/react/24/solid';

const Sidebar: React.FC = () => {
  const [totalXP, setTotalXP] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const location = useLocation(); // Hook pour obtenir le chemin actuel

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

    // Écouter les changements dans localStorage pour les XP et les pièces
    const handleStorageChange = () => {
      updateStats();
    };
    window.addEventListener('storage', handleStorageChange); // Écoute les changements localStorage

    // Un intervalle de sécurité pour les mises à jour régulières
    const intervalId = setInterval(updateStats, 1000);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const navItems = [
    { name: 'Accueil', path: '/', icon: HomeIcon },
    { name: 'Profil', path: '/profile', icon: UserCircleIcon },
    { name: 'Leçons', path: '/lesson/0', icon: BookOpenIcon }, // Lien vers la première leçon
    { name: 'Ligue', path: '/league-simulation', icon: ChartBarIcon },
    { name: 'Communauté', path: '/community', icon: UsersIcon },
    { name: 'Poser une question', path: '/ask-question', icon: QuestionMarkCircleIcon },
    { name: 'Réserver une session', path: '/book-session', icon: CalendarIcon },
    { name: 'Premium', path: '/premium', icon: SparklesIcon },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-blue-800 text-white p-4 shadow-lg h-full fixed left-0 top-0 z-40">
      {/* Logo et Nom de l'App */}
      <Link to="/" className="flex items-center justify-center text-3xl font-bold mb-8 mt-4">
        <img
          src="/images/Ndalang.jpeg" // Chemin vers votre logo
          alt="Logo NdaLang"
          className="h-12 w-12 mr-2 rounded-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "https://placehold.co/48x48/cccccc/333333?text=NL"; // Fallback
          }}
        />
        NdaLang
      </Link>

      {/* Statistiques utilisateur */}
      <div className="flex flex-col items-center mb-8 bg-blue-700 p-3 rounded-lg shadow-inner">
        <div className="flex items-center mb-2">
          <TrophyIcon className="h-6 w-6 text-yellow-300 mr-2" />
          <span className="text-xl font-semibold">{totalXP} XP</span>
        </div>
        <div className="flex items-center">
          <CurrencyDollarIcon className="h-6 w-6 text-green-300 mr-2" />
          <span className="text-xl font-semibold">{totalCoins} Pièces</span>
        </div>
      </div>

      {/* Liens de navigation */}
      <nav className="flex-grow space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`
              flex items-center p-3 rounded-lg text-lg font-medium transition-colors duration-200
              ${location.pathname === item.path || (item.path.includes('/lesson') && location.pathname.includes('/lesson'))
                ? 'bg-blue-600 text-white shadow-md'
                : 'hover:bg-blue-700 text-blue-100'
              }
            `}
          >
            <item.icon className="h-6 w-6 mr-3" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Pied de page (optionnel) */}
      <div className="mt-auto pt-4 border-t border-blue-700 text-sm text-blue-200 text-center">
        © 2025 NdaLang. Tous droits réservés.
      </div>
    </div>
  );
};

export default Sidebar;
