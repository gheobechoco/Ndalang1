// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrophyIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';

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
    const handleStorageChange = () => {
      updateStats();
    };
    window.addEventListener('storage', handleStorageChange);

    const intervalId = setInterval(updateStats, 1000); // Mettre à jour toutes les secondes

    return () => {
      clearInterval(intervalId); // Nettoyage de l'intervalle
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <header className="w-full bg-blue-700 bg-opacity-90 text-white p-4 shadow-lg z-30 flex justify-between items-center md:hidden"> {/* Visible uniquement sur mobile */}
      <Link to="/" className="flex items-center text-2xl font-bold">
        <img
          src="/images/Ndalang.jpeg" // Chemin vers votre logo
          alt="Logo NdaLang"
          className="h-8 w-8 mr-2 rounded-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "https://placehold.co/32x32/cccccc/333333?text=NL"; // Fallback
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
    </header>
  );
};

export default Header;
  