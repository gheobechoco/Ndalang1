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

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simule le chargement de l'application
  useEffect(() => {
    // Le LoadingPage gère déjà son propre timer et appelle onLoaded
    // Donc, nous n'avons pas besoin d'un setTimeout ici, juste de la logique de LoadingPage
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingPage onLoaded={handleLoadingComplete} />;
  }

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
        <Route path="*" element={<div className="text-center mt-10">Page non trouvée</div>} />
      </Routes>
    </>
  );
}

export default App;
