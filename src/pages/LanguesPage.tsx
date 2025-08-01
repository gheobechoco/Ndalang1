// src/pages/LanguesPage.tsx
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { languageCourses } from '../data/lessons';

type LanguesPageProps = {
  onLanguageSelected: (languageCode: string) => void;
};

export default function LanguesPage({ onLanguageSelected }: LanguesPageProps) {
  const navigate = useNavigate();

  const handleSelectLanguage = (languageCode: string) => {
    onLanguageSelected(languageCode); // Met à jour l'état et le local storage
    navigate(`/cours/${languageCode}`); // Navigue vers la nouvelle page de cours
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="max-w-4xl mx-auto my-8 p-6 md:p-10 lg:p-12 bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 transition-all duration-500 transform animate-fade-in-up">
        
        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-300 mb-6">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl font-bold text-center mb-8 text-white animate-slide-in-down">
          Choisissez une langue à apprendre
        </h1>
        
        <p className="text-lg text-white/80 mb-8 text-center animate-fade-in delay-200">
          Explorez et plongez dans la richesse des langues du Gabon.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languageCourses.map((course) => (
            <div
              key={course.languageCode}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleSelectLanguage(course.languageCode)}
            >
              <div className="text-5xl mb-4 transform transition-transform duration-300 hover:rotate-6">
                🇬🇦
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{course.languageName}</h3>
              
              <button
                className="w-full mt-4 px-4 py-2 rounded-lg text-lg font-semibold shadow-md transition duration-300 bg-white/30 text-white hover:bg-white/40"
              >
                Commencer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
