// src/App.tsx
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './pages/home';
import LanguageSelectionPage from './pages/LanguageSelectionPage';
import LanguageHomePage from './pages/LanguageHomePage';
import LessonPage from './pages/LessonPage';
import CommunityPage from './pages/CommunityPage';
import AirtableFormPage from './pages/AirtableFormPage';
import CalendlyPage from './pages/CalendlyPage';
import PremiumPage from './pages/PremiumPage';
import ProfilePage from './pages/ProfilePage';
import ShopPage from './pages/ShopPage';
import LeagueSimulationPage from './pages/LeagueSimulationPage';
import Partenariat from './components/partenariat';

import Header from './components/Header';
import LoadingPage from './components/LoadingPage';
import Sidebar from './components/Sidebar';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { lessons } from './data/lessons';

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const lang = localStorage.getItem('ndalang_selected_language');
    if (lang) setSelectedLanguage(lang);
  }, []);

  const handleLoadingComplete = () => setShowLoading(false);

  const handleLanguageSelected = (code: string) => {
    localStorage.setItem('ndalang_selected_language', code);
    setSelectedLanguage(code);
    // Trouve la première leçon pour la langue sélectionnée
    const firstLesson = lessons.find(l => l.languageCode === code);
    if (firstLesson) {
      navigate(`/lesson/${firstLesson.id}`);
    } else {
      navigate(`/cours/${code}`);
    }
  };

  if (showLoading) {
    return <LoadingPage onLoaded={handleLoadingComplete} />;
  }

  if (!selectedLanguage) {
    return <LanguageSelectionPage onLanguageSelected={handleLanguageSelected} />;
  }

  return (
    <div className="flex min-h-screen">
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button onClick={() => setIsSidebarOpen(o => !o)} className="p-2 bg-blue-600 text-white rounded-full shadow-lg">
          {isSidebarOpen ? <XMarkIcon className="h-7 w-7"/> : <Bars3Icon className="h-7 w-7"/>}
        </button>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col transition-all duration-300 md:ml-64">
        <Header />
        <main className="flex-1 p-4 overflow-auto mt-16 md:mt-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/langues" element={<LanguageSelectionPage onLanguageSelected={handleLanguageSelected} />} />
            <Route path="/cours/:languageCode" element={<LanguageHomePage />} />
            <Route path="/lesson/:id" element={<LessonPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/ask-question" element={<AirtableFormPage />} />
            <Route path="/book-session" element={<CalendlyPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/league-simulation" element={<LeagueSimulationPage />} />
            <Route path="/partenariat" element={<Partenariat />} />
            <Route path="*" element={<div className="text-center mt-10">Page non trouvée</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
