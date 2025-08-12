import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { lessons, languageCourses } from '../data/lessons';
import LessonNode from '../components/LessonNode';

export default function LanguageHomePage() {
  const { languageCode } = useParams<{ languageCode: string }>();
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  // Filter lessons for the selected language
  const filteredLessons = lessons.filter(l => l.languageCode === languageCode);
  const languageCourse = languageCourses.find(c => c.languageCode === languageCode);

  if (!languageCourse) {
    return <div className="text-center p-4">Langue non trouvée.</div>;
  }

  // Stored progress
  const completedLessonsData: { id: number; progress: number }[] =
    JSON.parse(localStorage.getItem('ndalang_completed_lessons') || '[]');

  const getLessonProgress = (lessonId: number) => {
    const data = completedLessonsData.find(item => item.id === lessonId);
    return data ? data.progress : 0;
  };

  // Sort by ID
  const allLessonsSorted = [...filteredLessons].sort((a, b) => a.id - b.id);

  // First uncompleted and unlocked lesson
  const firstUncompletedAndUnlocked = allLessonsSorted.find((lesson, idx) => {
    const prevDone = idx === 0 || getLessonProgress(allLessonsSorted[idx - 1].id) === 100;
    return prevDone && getLessonProgress(lesson.id) < 100;
  });

  const allCompleted =
    allLessonsSorted.length > 0 &&
    allLessonsSorted.every(lesson => getLessonProgress(lesson.id) === 100);

  const handleStartLearning = () => {
    if (firstUncompletedAndUnlocked) {
      navigate(`/lesson/${firstUncompletedAndUnlocked.id}`);
    } else if (allCompleted) {
      setModalMessage(
        "Bravo ! Vous avez terminé toutes les leçons disponibles pour cette langue."
      );
    } else {
      setModalMessage(
        "Veuillez compléter la leçon précédente pour débloquer la suivante."
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {languageCourse.languageName}
      </h1>

      {filteredLessons.length > 0 && (
        <div className="text-center mb-8">
          <button
            onClick={handleStartLearning}
            className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-bold text-xl rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 focus:ring-4 focus:ring-green-300"
          >
            Commencer l'apprentissage 🎉
          </button>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-6 text-center">
        Votre Parcours
      </h2>
      <div className="flex flex-col items-center py-8">
        {allLessonsSorted.map((lesson, idx) => {
          const prevDone =
            idx === 0 || getLessonProgress(allLessonsSorted[idx - 1].id) === 100;
          const isLocked = !prevDone;
          const progress = getLessonProgress(lesson.id);

          return (
            <React.Fragment key={lesson.id}>
              <LessonNode
                title={lesson.title}
                isCompleted={progress === 100}
                onClick={() => !isLocked && navigate(`/lesson/${lesson.id}`)}
                languageCode={languageCode || 'fr'}
                progressPercentage={progress}
                isLocked={isLocked}
              />
              {idx < allLessonsSorted.length - 1 && (
                <div
                  className={`w-1 h-16 my-2 rounded-full ${
                    progress === 100 ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {allCompleted && (
        <div className="text-center mt-8">
          <button
            onClick={() =>
              setModalMessage(
                "Bravo ! Vous avez terminé toutes les leçons disponibles."
              )
            }
            className="inline-flex items-center justify-center px-6 py-3 bg-red-700 text-white font-bold text-lg rounded-lg shadow-md hover:bg-red-800 transition duration-300 transform hover:scale-105 focus:ring-4 focus:ring-red-300"
          >
            Monter de Niveau 🎉
          </button>
        </div>
      )}

      {modalMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <p className="mb-4">{modalMessage}</p>
            <button
              onClick={() => setModalMessage(null)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
