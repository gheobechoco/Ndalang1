// src/App.tsx
import  { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import LessonPage from './pages/LessonPage';
import CommunityPage from './pages/CommunityPage';
import AirtableFormPage from './pages/AirtableFormPage';
import CalendlyPage from './pages/CalendlyPage';
import PremiumPage from './pages/PremiumPage';
import Header from './components/Header';
import LoadingPage from './components/LoadingPage'; // Import du composant LoadingPage
import ProfilePage from './pages/ProfilePage'; // <-- NOUVEL IMPORT : Import du composant ProfilePage
import LeagueSimulationPage from './pages/LeagueSimulationPage'; // Import si vous l'utilisez ailleurs

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // La logique de chargement est gérée par LoadingPage, qui appellera onLoaded
  useEffect(() => {
    // Pas besoin d'un setTimeout ici, LoadingPage se gère elle-même
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Tant que l'application est en chargement, affiche la page de chargement
  if (isLoading) {
    return <LoadingPage onLoaded={handleLoadingComplete} />;
  }

  // Une fois le chargement terminé, affiche le Header et les Routes
  return (
    <>
      <Header /> {/* Le Header est rendu ici pour apparaître sur toutes les pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/ask-question" element={<AirtableFormPage />} />
        <Route path="/book-session" element={<CalendlyPage />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* <-- NOUVELLE ROUTE : Route pour la page de profil */}
        <Route path="/league-simulation" element={<LeagueSimulationPage />} /> {/* Exemple de route supplémentaire si nécessaire */}
        <Route path="*" element={<div className="text-center mt-10">Page non trouvée</div>} />
      </Routes>
    </>
  );
}

export default App;
