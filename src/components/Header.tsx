import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dock from './Dock';
import {
  UsersIcon,
  CalendarIcon,
  TrophyIcon,
  CurrencyDollarIcon,
  UserIcon,
  ShoppingCartIcon,
  SparklesIcon,
  BriefcaseIcon
} from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  const navigate = useNavigate(); // ✅ pour navigation fluide

  const dockItems = [
    {
      icon: <CalendarIcon className="h-5 w-5 text-white" />,
      label: 'Questions',
      onClick: () => navigate('/ask-question'),
    },
    {
      icon: <UsersIcon className="h-5 w-5 text-white" />,
      label: 'Session',
      onClick: () => navigate('/book-session'),
    },
    {
      icon: <UserIcon className="h-5 w-5 text-white" />,
      label: 'Profil',
      onClick: () => navigate('/profile'),
    },
    {
      icon: <ShoppingCartIcon className="h-5 w-5 text-white" />,
      label: 'Boutique',
      onClick: () => navigate('/shop'),
    },
    {
      icon: <SparklesIcon className="h-5 w-5 text-yellow-300" />,
      label: 'Premium',
      onClick: () => navigate('/premium'),
    },
    {
      icon: <BriefcaseIcon className="h-5 w-5 text-white" />,
      label: 'Partenariat',
      onClick: () => navigate('/partenariat'),
    },
  ];

  const [totalXP, setTotalXP] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);

  useEffect(() => {
    const updateStats = () => {
      const xp = parseInt(localStorage.getItem('ndalang_total_score') || '0', 10);
      const coins = parseInt(localStorage.getItem('ndalang_coins') || '0', 10);
      setTotalXP(xp);
      setTotalCoins(coins);
    };

    updateStats();
    const id = setInterval(updateStats, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="flex fixed top-0 left-0 w-full bg-blue-700 bg-opacity-90 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo + titre */}
        <Link
          to="/"
          className="flex items-center text-2xl font-bold hover:text-blue-100 transition-colors duration-200"
        >
          <img
            src="/images/Ndalang.jpeg"
            alt="Logo NdaLang"
            className="h-8 w-8 mr-2 rounded-full object-cover"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.onerror = null;
              img.src = '/images/Ndalang.jpeg';
            }}
          />
          NdaLang
        </Link>

        {/* Statistiques XP & Pièces */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold shadow-inner">
            <TrophyIcon className="h-5 w-5 text-yellow-300 mr-1" />
            <span>{totalXP} XP</span>
          </div>
          <div className="flex items-center bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold shadow-inner">
            <CurrencyDollarIcon className="h-5 w-5 text-green-300 mr-1" />
            <span>{totalCoins} Pièces</span>
          </div>
        </div>

        {/* Dock de navigation (hover + magnification) */}
        <div className="hidden md:flex items-center ml-2">
          <Dock
            items={dockItems}
            panelHeight={48}
            baseItemSize={32}
            magnification={60}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
