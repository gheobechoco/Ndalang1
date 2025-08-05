// src/pages/LanguageHomePage.tsx

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { lessons, languageCourses } from '../data/lessons';
import LessonNode from '../components/LessonNode';

export default function LanguageHomePage() {
  const navigate = useNavigate();
  const { languageCode } = useParams<{ languageCode: string }>();
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  // Récupérer les leçons de la langue sélectionnée
  const filteredLessons = lessons.filter(l => l.languageCode === languageCode);
  const languageCourse = languageCourses.find(c => c.languageCode === languageCode);

  if (!languageCourse) {
    return (
      <div className="text-center p-8 text-gray-500">
        La langue "{languageCode}" n'a pas été trouvée.
      </div>
    );
  }

  // Récupération des progrès
  const completedLessonsData = JSON.parse(localStorage.getItem('ndalang_completed_lessons') || '[]');
  const getLessonProgress = (lessonId: number) => {
    const lessonData = completedLessonsData.find((item: { id: number; progress: number }) => item.id === lessonId);
    return lessonData ? lessonData.progress : 0;
  };

  // Trier les leçons par ID
  const allLessonsSorted = [...filteredLessons].sort((a, b) => a.id - b.id);

  // Trouver la première leçon non complétée et débloquée
  const firstUncompletedAndUnlockedLesson = allLessonsSorted.find((lesson, index) => {
    const prevCompleted = index === 0 || getLessonProgress(allLessonsSorted[index - 1].id) === 100;
    return prevCompleted && getLessonProgress(lesson.id) < 100;
  });

  const allLessonsCompleted = allLessonsSorted.length > 0 && allLessonsSorted.every(lesson => getLessonProgress(lesson.id) === 100);

  // Gérer le clic sur "Commencer"
  const handleStartLearning = () => {
    if (firstUncompletedAndUnlockedLesson) {
      navigate(`/lesson/${firstUncompletedAndUnlockedLesson.id}`);
    } else if (allLessonsCompleted) {
      setModalMessage("Félicitations ! Vous avez terminé toutes les leçons disponibles pour cette langue.");
    } else {
      setModalMessage("Veuillez compléter la leçon précédente pour débloquer la suivante.");
    }
  };

  return (
    <div className="p-4 md:p-8 font-sans min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto my-8 p-6 md:p-10 bg-white rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-4">
          Cours de {languageCourse.languageName}
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          {languageCourse.chapters[0]?.description}
        </p>

        {!allLessonsCompleted && (
          <div className="text-center mb-8">
            <button
              onClick={handleStartLearning}
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-bold text-xl rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Commencer l'apprentissage 🎉
            </button>
          </div>
        )}

        <h2 className="text-2xl font-semibold mb-6 text-center">Votre Parcours</h2>
        <div className="flex flex-col items-center py-8">
          {allLessonsSorted.map((lesson, index) => {
            const isLocked = index > 0 && getLessonProgress(allLessonsSorted[index - 1].id) < 100;
            const isCompleted = getLessonProgress(lesson.id) === 100;

            return (
              <React.Fragment key={lesson.id}>
                <LessonNode
                  title={lesson.title}
                  isCompleted={isCompleted}
                  onClick={() => !isLocked && navigate(`/lesson/${lesson.id}`)}
                  languageCode={languageCode || 'fr'}
                  progressPercentage={getLessonProgress(lesson.id)}
                  isLocked={isLocked}
                />
                {index < allLessonsSorted.length - 1 && (
                  <div
                    className={`w-1 h-16 my-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gray-400'}`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {allLessonsCompleted && (
          <div className="text-center mt-8">
            <button
              onClick={() => setModalMessage("Bravo ! Vous avez terminé toutes les leçons disponibles.")}
              className="inline-flex items-center justify-center px-6 py-3 bg-red-700 text-white font-bold text-lg rounded-lg shadow-md hover:bg-red-800 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              Monter de Niveau 🎉
            </button>
          </div>
        )}
      </div>

      {modalMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto text-center">
            <p className="text-lg font-semibold text-gray-800 mb-4">{modalMessage}</p>
            <button
              onClick={() => setModalMessage(null)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
