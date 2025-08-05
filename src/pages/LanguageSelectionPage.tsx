// src/pages/LanguageSelectionPage.tsx
import { useNavigate } from 'react-router-dom';
import { languageCourses, lessons } from '../data/lessons';

interface LanguageSelectionPageProps {
  onLanguageSelected: (languageCode: string) => void;
}

export default function LanguageSelectionPage({ onLanguageSelected }: LanguageSelectionPageProps) {
  const navigate = useNavigate();

  const handleLanguageSelect = (languageCode: string) => {
    localStorage.setItem('ndalang_selected_language', languageCode);
    onLanguageSelected(languageCode);
    const firstLesson = lessons.find(l => l.languageCode === languageCode);
    if (firstLesson) {
      navigate(`/lesson/${firstLesson.id}`);
    } else {
      navigate(`/cours/${languageCode}`);
    }
  };

  // Émojis de drapeau par langue
  const flags: Record<string, string> = {
    fang: '🇬🇦',
    nzebi: '🇬🇦',
    myene: '🇬🇦',
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="max-w-4xl mx-auto p-6 bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Choisissez une langue</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languageCourses.map(course => (
            <button
              key={course.languageCode}
              onClick={() => handleLanguageSelect(course.languageCode)}
              className="p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 text-center cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="text-5xl mb-4">{flags[course.languageCode] || '🌐'}</div>
              <span className="text-xl font-bold text-white">{course.languageName}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
