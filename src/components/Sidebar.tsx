// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, ChatBubbleLeftRightIcon, UserIcon, ShoppingCartIcon, SparklesIcon, CalendarIcon, UsersIcon, GlobeAltIcon, XMarkIcon, BriefcaseIcon } from '@heroicons/react/24/solid';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Sidebar pour mobile (apparaît en overlay) */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-blue-800 text-white z-40 transform transition-transform duration-300
          md:translate-x-0 md:static md:block md:shadow-lg
          ${isOpen ? 'translate-x-0 ease-out block' : '-translate-x-full ease-in hidden'}`}
      >
        <div className="p-4 flex items-center justify-between">
          {/* Ajout du logo et du texte Ndalang */}
          <Link to="/" className="flex items-center text-2xl font-bold text-white hover:text-blue-100 transition-colors duration-200" onClick={onClose}>
            <img
              src="/images/Ndalang.jpeg"
              alt="Logo NdaLang"
              className="h-8 w-8 mr-2 rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://placehold.co/32x32/000000/FFFFFF?text=NL";
              }}
            />
            NdaLang
          </Link>
          {/* Bouton de fermeture pour mobile */}
          <button onClick={onClose} className="text-white focus:outline-none md:hidden">
            <XMarkIcon className="h-7 w-7" />
          </button>
        </div>
        <nav className="mt-8">
          <Link to="/" className="flex items-center px-4 py-2 hover:bg-blue-700 transition-colors duration-200 rounded-md mx-2 mb-2" onClick={onClose}>
            <HomeIcon className="h-6 w-6 mr-3" /> Accueil
          </Link>
          <Link to="/langues" className="flex items-center px-4 py-2 hover:bg-blue-700 transition-colors duration-200 rounded-md mx-2 mb-2" onClick={onClose}>
            <GlobeAltIcon className="h-6 w-6 mr-3" /> Langues
          </Link>
          <Link to="/community" className="flex items-center px-4 py-2 hover:bg-blue-700 transition-colors duration-200 rounded-md mx-2 mb-2" onClick={onClose}>
            <ChatBubbleLeftRightIcon className="h-6 w-6 mr-3" /> Communauté
          </Link>
          <Link to="/ask-question" className="flex items-center px-4 py-2 hover:bg-blue-700 transition-colors duration-200 rounded-md mx-2 mb-2" onClick={onClose}>
            <CalendarIcon className="h-6 w-6 mr-3" /> Questions
          </Link>
          <Link to="/book-session" className="flex items-center px-4 py-2 hover:bg-blue-700 transition-colors duration-200 rounded-md mx-2 mb-2" onClick={onClose}>
            <UsersIcon className="h-6 w-6 mr-3" /> Session
          </Link>
          <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-blue-700 transition-colors duration-200 rounded-md mx-2 mb-2" onClick={onClose}>
            <UserIcon className="h-6 w-6 mr-3" /> Profil
          </Link>
          <Link to="/shop" className="flex items-center px-4 py-2 hover:bg-blue-700 transition-colors duration-200 rounded-md mx-2 mb-2" onClick={onClose}>
            <ShoppingCartIcon className="h-6 w-6 mr-3" /> Boutique
          </Link>
          <Link to="/premium" className="flex items-center px-4 py-2 hover:bg-blue-700 transition-colors duration-200 rounded-md mx-2 mb-2" onClick={onClose}>
            <SparklesIcon className="h-6 w-6 mr-3 text-yellow-300" /> Premium
          </Link>
          <Link to="/partenariat" className="flex items-center px-4 py-2 hover:bg-blue-700 transition-colors duration-200 rounded-md mx-2 mb-2" onClick={onClose}>
            <BriefcaseIcon className="h-6 w-6 mr-3" /> Partenariat
          </Link>
          <Link to="/league-simulation" className="flex items-center px-4 py-2 hover:bg-blue-700 transition-colors duration-200 rounded-md mx-2 mb-2" onClick={onClose}>
            <BookOpenIcon className="h-6 w-6 mr-3" /> Simulation
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
