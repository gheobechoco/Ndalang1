// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, UsersIcon, CalendarIcon, StarIcon } from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-blue-700 bg-opacity-90 text-white p-4 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center text-2xl font-bold hover:text-blue-100 transition-colors duration-200">
          <BookOpenIcon className="h-8 w-8 mr-2" />
          NdaLang
        </Link>
        <nav className="hidden md:flex space-x-6">
          {/* Ces liens sont des placeholders pour la navigation future */}
          <Link to="/community" className="flex items-center hover:text-blue-100 transition-colors duration-200">
            <UsersIcon className="h-5 w-5 mr-1" /> Communauté
          </Link>
          <Link to="/ask-question" className="flex items-center hover:text-blue-100 transition-colors duration-200">
            <CalendarIcon className="h-5 w-5 mr-1" /> Questions
          </Link>
          <Link to="/premium" className="flex items-center hover:text-blue-100 transition-colors duration-200">
            <StarIcon className="h-5 w-5 mr-1" /> Premium
          </Link>
        </nav>
        {/* Un bouton de menu mobile pourrait être ajouté ici pour les petits écrans */}
      </div>
    </header>
  );
};

export default Header;
