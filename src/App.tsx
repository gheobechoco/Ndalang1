// src/App.tsx
import  { useState, useEffect } from 'react';
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
import Header from './components/Header'; // Le Header
import LoadingPage from './components/LoadingPage';
import Sidebar from './components/Sidebar'; // Le composant Sidebar

// Importez les icônes de menu hamburger et de fermeture
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // État pour la sidebar mobile

  useEffect(() => {
    const storedLanguage = localStorage.getItem('ndalang_selected_language');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }

    // Ferme la sidebar si l'écran est redimensionné au-delà du breakpoint mobile
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Tailwind's 'md' breakpoint is 768px
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  // Ferme la sidebar lorsque la route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [window.location.pathname]);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  const handleLanguageSelected = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (showLoading) {
    return <LoadingPage onLoaded={handleLoadingComplete} />;
  }

  if (!selectedLanguage) {
    return <LanguageSelectionPage onLanguageSelected={handleLanguageSelected} />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Bouton Hamburger pour mobile */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={toggleSidebar}
          className="p-2 text-white bg-blue-600 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isSidebarOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isSidebarOpen ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* Sidebar - Passez l'état et la fonction de fermeture */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

      {/* Overlay pour mobile lorsque la sidebar est ouverte */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Contenu principal */}
      {/* Ajuste la marge gauche pour laisser de la place à la sidebar sur les écrans md et plus */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
        <Header /> {/* Le Header est toujours présent en haut du contenu principal */}

        <main className="flex-1 p-4 overflow-auto mt-16 md:mt-0"> {/* Ajout de mt-16 pour compenser le Header sur mobile, md:mt-0 pour desktop */}
          <Routes>
            <Route path="/" element={<Home selectedLanguage={selectedLanguage} />} />
            <Route path="/lesson/:id" element={<LessonPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/ask-question" element={<AirtableFormPage />} />
            <Route path="/book-session" element={<CalendlyPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/league-simulation" element={<LeagueSimulationPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="*" element={<div className="text-center mt-10">Page non trouvée</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
