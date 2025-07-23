// src/App.tsx
import  { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/home';
import LessonPage from './pages/LessonPage';
import CommunityPage from './pages/CommunityPage';
import AirtableFormPage from './pages/AirtableFormPage';
import CalendlyPage from './pages/CalendlyPage';
import PremiumPage from './pages/PremiumPage';
import Header from './components/Header'; // Le Header simplifié
import LoadingPage from './components/LoadingPage';
import ProfilePage from './pages/ProfilePage';
import LeagueSimulationPage from './pages/LeagueSimulationPage';
import Sidebar from './components/Sidebar';

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // La logique de chargement est gérée par LoadingPage.
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  if (showLoading) {
    return <LoadingPage onLoaded={handleLoadingComplete} />;
  }

  return (
    // Suppression de bg-gray-100 ici pour laisser l'arrière-plan Lottie visible
    <div className="flex min-h-screen">
      <Sidebar /> {/* La barre latérale est toujours présente */}

      <div className="flex-1 flex flex-col md:ml-64"> {/* Le contenu prend le reste de l'espace, avec marge pour la sidebar */}
        <Header /> {/* Le Header simplifié est en haut du contenu */}
        
        <main className="flex-1 p-4 overflow-auto"> {/* Conteneur principal des pages */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lesson/:id" element={<LessonPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/ask-question" element={<AirtableFormPage />} />
            <Route path="/book-session" element={<CalendlyPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/league-simulation" element={<LeagueSimulationPage />} />
            <Route path="*" element={<div className="text-center mt-10">Page non trouvée</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
