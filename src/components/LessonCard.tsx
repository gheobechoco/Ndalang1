// src/components/LessonCard.tsx
import React from 'react';
import type { Lesson } from '../data/lessons'; // Correction ici : 'import type Lesson'
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface LessonCardProps {
  lesson: Lesson;
  onClick: () => void;
  isCompleted: boolean;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onClick, isCompleted }) => {
  return (
    <div
      className={`
        bg-white p-4 rounded-lg shadow-md cursor-pointer 
        hover:shadow-lg transition-shadow duration-300
        flex items-center justify-between
        ${isCompleted ? 'border-2 border-green-500' : 'border border-gray-200'}
      `}
      onClick={onClick}
    >
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-1 text-gray-800">{lesson.title}</h3>
        <p className="text-sm text-gray-600">Langue: {lesson.languageCode.toUpperCase()}</p> {/* Affiche la langue */}
      </div>
      {isCompleted && (
        <CheckCircleIcon className="h-7 w-7 text-green-500 ml-3 flex-shrink-0" title="Leçon Complétée" />
      )}
    </div>
  );
};

export default LessonCard;
