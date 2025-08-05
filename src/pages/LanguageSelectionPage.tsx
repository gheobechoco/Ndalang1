
  import { Link } from 'react-router-dom';
  import { languageCourses } from '../data/lessons';

  type LanguageSelectionPageProps = {
    onLanguageSelected: (languageCode: string) => void;
  };

  export default function LanguageSelectionPage({ onLanguageSelected }: LanguageSelectionPageProps) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="max-w-4xl mx-auto p-6 bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
          <Link to="/" className="inline-block text-white/80 hover:text-white mb-6">← Retour</Link>
          <h1 className="text-3xl font-bold text-center mb-8 text-white">Choisissez une langue</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languageCourses.map(course => (
              <div
                key={course.languageCode}
                className="p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 text-center cursor-pointer hover:scale-105 transition-transform"
                onClick={() => onLanguageSelected(course.languageCode)}
              >
                <div className="text-5xl mb-4">🇬🇦</div>
                <h3 className="text-xl font-bold text-white">{course.languageName}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
