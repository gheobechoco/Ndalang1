// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import LessonPage from './pages/LessonPage';
import CommunityPage from './pages/CommunityPage';
import AirtableFormPage from './pages/AirtableFormPage';
import CalendlyPage from './pages/CalendlyPage';
import PremiumPage from './pages/PremiumPage';
import LeagueSimulationPage from './pages/LeagueSimulationPage';
import ProfilePage from './pages/ProfilePage';
import ShopPage from './pages/ShopPage'; // Importation de la page Boutique
import LanguageSelectionPage from './pages/LanguageSelectionPage'; // Importation de la page de sélection de la langue
import Header from './components/Header'; // Le Header simplifié
import LoadingPage from './components/LoadingPage';
import Sidebar from './components/Sidebar';

function App() {
  const [showLoading, setShowLoading] = useState(true);
  // État pour stocker la langue sélectionnée par l'utilisateur
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    // La logique de chargement est gérée par LoadingPage.
    // Vérifier si une langue a déjà été sélectionnée dans le localStorage
    const storedLanguage = localStorage.getItem('ndalang_selected_language');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  // Fonction appelée lorsque l'utilisateur sélectionne une langue
  const handleLanguageSelected = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  if (showLoading) {
    return <LoadingPage onLoaded={handleLoadingComplete} />;
  }

  // Si aucune langue n'est sélectionnée, afficher la page de sélection de la langue
  if (!selectedLanguage) {
    return <LanguageSelectionPage onLanguageSelected={handleLanguageSelected} />;
  }

  return (
    // Suppression de bg-gray-100 ici pour laisser l'arrière-plan Lottie visible
    <div className="flex min-h-screen">
      <Sidebar /> {/* La barre latérale est toujours présente, sa visibilité est gérée par ses propres classes */}

      {/* Le contenu principal prend le reste de l'espace.
          md:ml-64 pour laisser la place à la sidebar sur les écrans moyens (tablettes).
          lg:ml-0 pour supprimer la marge sur les grands écrans (PC) où la sidebar est cachée. */}
      <div className="flex-1 flex flex-col md:ml-64 lg:ml-0">
        <Header /> {/* Le Header est en haut du contenu, sa visibilité est gérée par ses propres classes */}
        
        <main className="flex-1 p-4 overflow-auto"> {/* Conteneur principal des pages */}
          <Routes>
            {/* Passer la langue sélectionnée au composant Home */}
            <Route path="/" element={<Home selectedLanguage={selectedLanguage} />} />
            <Route path="/lesson/:id" element={<LessonPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/ask-question" element={<AirtableFormPage />} />
            <Route path="/book-session" element={<CalendlyPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/league-simulation" element={<LeagueSimulationPage />} />
            <Route path="/shop" element={<ShopPage />} /> {/* Ajout de la route pour la boutique */}
            <Route path="*" element={<div className="text-center mt-10">Page non trouvée</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
