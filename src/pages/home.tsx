// src/pages/home.tsx

import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
import { lessons } from '../data/lessons';
import LessonNode from '../components/LessonNode'; // Import du composant LessonNode

const lottieAnimationDataPath = '/animations/bbfb39fe-e03e-48d9-a1ba-a6098b864d03.json';

export default function Home() {
  const navigate = useNavigate();
  // Maintenant, completedLessonsData est un tableau d'objets { id: number, progress: number }
  const completedLessonsData = JSON.parse(localStorage.getItem('ndalang_completed_lessons') || '[]');

  // Fonction pour obtenir la progression d'une leçon spécifique
  const getLessonProgress = (lessonId: number) => {
    const lessonData = completedLessonsData.find((item: { id: number; progress: number }) => item.id === lessonId);
    return lessonData ? lessonData.progress : 0; // Retourne le pourcentage ou 0 si non trouvé
  };

  // Filtrer et trier toutes les leçons par ID pour la progression
  const allLessonsSorted = [...lessons].sort((a, b) => a.id - b.id);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* L'animation Lottie en arrière-plan */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#006FCD',
      }}>
        <Player
          src={lottieAnimationDataPath}
          autoplay
          loop
          style={{
            width: '120%',
            height: '120%',
            minWidth: '100vw',
            minHeight: '100vh',
            objectFit: 'cover',
            transform: 'scale(1.2)',
          }}
        />
      </div>

      
      {/* Ajout de pt-16 pour compenser la hauteur du header fixe */}
      <div className="max-w-2xl mx-auto p-4 relative z-10 bg-white bg-opacity-80 rounded-lg shadow-lg my-8 pt-16">
        <h1 className="text-4xl font-bold text-center mb-6">Bienvenue sur NdaLang !</h1>
        
        <p className="text-lg text-gray-700 mb-8">
          Votre porte d'entrée vers l'apprentissage des langues vernaculaires du Gabon.
        </p>

        <h2 className="text-3xl font-semibold mb-6 text-center">Votre Parcours d'Apprentissage</h2>
        
        {/* Section de la carte de progression visuelle */}
        <div className="flex flex-col items-center py-8">
          {allLessonsSorted.map((lesson, index) => (
            <React.Fragment key={lesson.id}>
              {/* Le nœud de la leçon */}
              <LessonNode
                title={lesson.title}
                // Une leçon est considérée comme complétée si sa progression est de 100%
                isCompleted={getLessonProgress(lesson.id) === 100}
                onClick={() => navigate(`/lesson/${lesson.id - 1}`)}
                languageCode={lesson.languageCode}
                // Passe le pourcentage de progression réel de la leçon
                progressPercentage={getLessonProgress(lesson.id)}
              />
              {/* Ligne de connexion entre les nœuds (sauf pour la dernière leçon) */}
              {index < allLessonsSorted.length - 1 && (
                <div className="w-1 h-16 bg-gray-400 my-2 rounded-full"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bouton "Monter de Niveau" ou "Prochain Chapitre" si toutes les leçons sont complétées */}
        {completedLessonsData.filter((item: { id: number; progress: number }) => item.progress === 100).length === allLessonsSorted.length && allLessonsSorted.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => alert("Félicitations ! Vous avez terminé toutes les leçons disponibles. De nouveaux chapitres arrivent bientôt !")}
              className="inline-flex items-center justify-center px-6 py-3 bg-red-700 text-white font-bold text-lg rounded-lg shadow-md
                         hover:bg-red-800 transition-all duration-300 transform hover:scale-105
                         focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              Monter de Niveau 🎉
            </button>
          </div>
        )}

        {/* Message si aucune leçon n'est disponible */}
        {allLessonsSorted.length === 0 && (
          <p className="text-center text-gray-500">Aucune leçon disponible pour le moment.</p>
        )}
      </div> 
    </div>
  );
}