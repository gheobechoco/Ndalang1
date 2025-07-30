// src/pages/LanguageSelectionPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { languageCourses, lessons, type LanguageCourse } from '../data/lessons'; // Import de LanguageCourse comme un type

interface LanguageSelectionPageProps {
  onLanguageSelected: (languageCode: string) => void;
}

const LanguageSelectionPage: React.FC<LanguageSelectionPageProps> = ({ onLanguageSelected }) => {
  const navigate = useNavigate();

  // Fonction pour obtenir la progression globale pour un groupe de langues
  const getLanguageGroupProgress = (languageCode: string) => {
    const lessonsInGroup = lessons.filter(lesson => lesson.languageCode === languageCode);
    if (lessonsInGroup.length === 0) return 0;

    const completedLessonsData = JSON.parse(localStorage.getItem('ndalang_completed_lessons') || '[]');
    let totalProgress = 0;
    let completedCount = 0;

    lessonsInGroup.forEach(lesson => {
      const lessonData = completedLessonsData.find((item: { id: number; progress: number }) => item.id === lesson.id);
      if (lessonData && lessonData.progress === 100) {
        completedCount++;
      }
      totalProgress += lessonData ? lessonData.progress : 0;
    });

    // Retourne le pourcentage de leçons complétées à 100% dans ce groupe
    return Math.round((completedCount / lessonsInGroup.length) * 100);
  };

  const handleLanguageSelect = (languageCode: string) => {
    localStorage.setItem('ndalang_selected_language', languageCode);
    onLanguageSelected(languageCode); // Informe le composant parent (App.tsx)
    navigate('/'); // Redirige vers la page d'accueil après la sélection
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 flex flex-col items-center justify-center text-white p-4 z-[90]">
      <h1 className="text-4xl font-bold text-center mb-8">
        Quel groupe de langues souhaitez-vous apprendre ?
      </h1>

      <div className="w-full max-w-md space-y-4">
        {languageCourses.map((course: LanguageCourse) => { // Typage du paramètre 'course'
          const progress = getLanguageGroupProgress(course.languageCode);
          return (
            <button
              key={course.languageCode}
              onClick={() => handleLanguageSelect(course.languageCode)}
              className="w-full p-4 bg-gray-800 bg-opacity-70 rounded-lg shadow-md
                         flex items-center justify-between text-left text-white text-xl font-semibold
                         hover:bg-gray-700 hover:bg-opacity-80 transition-colors duration-300
                         focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <span>{course.languageName}</span>
              {progress > 0 && (
                <span className="text-sm text-gray-300">
                  progr: {progress}%
                </span>
              )}
            </button>
          );
        })}
        {/* Exemple de bouton pour un groupe non défini dans lessons.ts, comme dans l'image */}
        <button
          onClick={() => alert("Ce groupe de langues n'est pas encore disponible.")}
          className="w-full p-4 bg-gray-800 bg-opacity-70 rounded-lg shadow-md
                     flex items-center justify-between text-left text-white text-xl font-semibold
                     hover:bg-gray-700 hover:bg-opacity-80 transition-colors duration-300
                     focus:outline-none focus:ring-4 focus:ring-blue-300 cursor-not-allowed opacity-70"
          disabled
        >
          <span>A30: Groupe Bube/Benga (Bientôt disponible)</span>
          <span className="text-sm text-gray-300">progr: 0%</span>
        </button>
      </div>
    </div>
  );
};

export default LanguageSelectionPage;
