// src/App.tsx
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Importez useNavigate
import Home from './pages/home';
import LessonPage from './pages/LessonPage';
import CommunityPage from './pages/CommunityPage';
import AirtableFormPage from './pages/AirtableFormPage';
import CalendlyPage from './pages/CalendlyPage';
import PremiumPage from './pages/PremiumPage';
import LeagueSimulationPage from './pages/LeagueSimulationPage';
import ProfilePage from './pages/ProfilePage';
import ShopPage from './pages/ShopPage';
import LanguesPage from './pages/LanguesPage'; // Remplace LanguageSelectionPage par LanguesPage
import Header from './components/Header';
import LoadingPage from './components/LoadingPage';
import Sidebar from './components/Sidebar';
import Partenariat from './components/partenariat';

// Importez les icônes de menu hamburger et de fermeture
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Initialisez le hook de navigation

  useEffect(() => {
    const storedLanguage = localStorage.getItem('ndalang_selected_language');
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
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
    localStorage.setItem('ndalang_selected_language', languageCode);
    setSelectedLanguage(languageCode);
    // Redirigez l'utilisateur vers la page d'accueil après la sélection de la langue
    navigate('/home');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (showLoading) {
    return <LoadingPage onLoaded={handleLoadingComplete} />;
  }

  // La page de sélection des langues est la première chose que l'utilisateur voit si aucune langue n'est sélectionnée.
  // J'utilise ici votre nouveau composant LanguesPage.
  if (!selectedLanguage) {
    return <LanguesPage onLanguageSelected={handleLanguageSelected} />;
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
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-64'} md:ml-64`}>
        <Header />

        <main className="flex-1 p-4 overflow-auto mt-16 md:mt-0">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Ajout d'une route pour la page de sélection des langues, pour la rendre accessible via la sidebar */}
            <Route path="/langues" element={<LanguesPage onLanguageSelected={handleLanguageSelected} />} />
            <Route path="/lesson/:id" element={<LessonPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/ask-question" element={<AirtableFormPage />} />
            <Route path="/book-session" element={<CalendlyPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/league-simulation" element={<LeagueSimulationPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/partenariat" element={<Partenariat />} />
            <Route path="*" element={<div className="text-center mt-10">Page non trouvée</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
