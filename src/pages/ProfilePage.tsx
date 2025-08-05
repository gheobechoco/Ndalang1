// src/pages/ProfilePage.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, Cog6ToothIcon, TrophyIcon, FireIcon, BoltIcon, StarIcon, CurrencyDollarIcon, BookOpenIcon, UsersIcon, PencilIcon } from '@heroicons/react/24/solid';
import { lessons, type Lesson } from '../data/lessons';

// Importations de DiceBear
import { createAvatar } from '@dicebear/core';
import { micah } from '@dicebear/collection';

// Import du nouveau composant de fond Ballpit basé sur Three.js

const LOCAL_STORAGE_USER_NAME_KEY = 'ndalang_user_name';
const LOCAL_STORAGE_MEMBER_SINCE_KEY = 'ndalang_member_since';
const LOCAL_STORAGE_LAST_PRACTICE_DATE_KEY = 'ndalang_last_practice_date';
const LOCAL_STORAGE_STREAK_KEY = 'ndalang_streak';
const LOCAL_STORAGE_TOTAL_SCORE_KEY = 'ndalang_total_score';
const LOCAL_STORAGE_COINS_KEY = 'ndalang_coins';
const LOCAL_STORAGE_COMPLETED_LESSONS_KEY = 'ndalang_completed_lessons';
const LOCAL_STORAGE_AVATAR_CONFIG_KEY = 'ndalang_avatar_config';

// Définition de l'interface pour la configuration de l'avatar DiceBear
interface AvatarConfig {
  seed: string;
  backgroundColor: string;
  skinColor?: string;
  hairColor?: string;
}

// Composant pour rendre l'avatar DiceBear
const AvatarDisplay: React.FC<{ config: AvatarConfig }> = ({ config }) => {
  const avatarSvg = useMemo(() => {
    const bgColor = config.backgroundColor ?? '#006FCD';

    const avatarOptions = {
      seed: config.seed,
      backgroundColor: [bgColor.replace('#', '')],
      radius: 50,
      skinColor: config.skinColor ? [config.skinColor.replace('#', '')] : undefined,
      hairColor: config.hairColor ? [config.hairColor.replace('#', '')] : undefined,
    };

    const avatar = createAvatar(micah, avatarOptions);
    return avatar.toDataUri();
  }, [config]);

  return (
    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center border-2 border-gray-300">
      <img src={avatarSvg} alt="Avatar utilisateur" className="w-full h-full object-cover" />
    </div>
  );
};


export default function ProfilePage() {
  const [userName, setUserName] = useState<string>(localStorage.getItem(LOCAL_STORAGE_USER_NAME_KEY) || 'Apprenant NdaLang');
  const [isEditingName, setIsEditingName] = useState(false);
  const [memberSince] = useState<string>(() => {
    let date = localStorage.getItem(LOCAL_STORAGE_MEMBER_SINCE_KEY);
    if (!date) {
      date = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
      localStorage.setItem(LOCAL_STORAGE_MEMBER_SINCE_KEY, date);
    }
    return date;
  });

  const [streak, setStreak] = useState(parseInt(localStorage.getItem(LOCAL_STORAGE_STREAK_KEY) || '0', 10));
  const [lastPracticeDate, setLastPracticeDate] = useState<string | null>(localStorage.getItem(LOCAL_STORAGE_LAST_PRACTICE_DATE_KEY));
  const totalXP = parseInt(localStorage.getItem(LOCAL_STORAGE_TOTAL_SCORE_KEY) || '0', 10);
  const totalCoins = parseInt(localStorage.getItem(LOCAL_STORAGE_COINS_KEY) || '0', 10);

  const [showAvatarEditor, setShowAvatarEditor] = useState(false);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(() => {
    const defaultAvatarConfig: AvatarConfig = {
      seed: 'default-user',
      backgroundColor: '#006FCD',
      skinColor: '#A16035',
      hairColor: '#4A2C2A',
    };
    try {
      const savedConfig = localStorage.getItem(LOCAL_STORAGE_AVATAR_CONFIG_KEY);
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        if (parsedConfig && typeof parsedConfig.seed === 'string' && typeof parsedConfig.backgroundColor === 'string') {
          return { ...defaultAvatarConfig, ...parsedConfig };
        }
      }
    } catch (e) {
      console.error("Erreur lors de la lecture de la configuration de l'avatar depuis localStorage:", e);
    }
    return defaultAvatarConfig;
  });

  const [showFriendFeatureMessage, setShowFriendFeatureMessage] = useState(false);

  const currentDivision = "Division Bronze";

  const scoresByLanguage = useMemo(() => {
    const completedLessonsData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_COMPLETED_LESSONS_KEY) || '[]');
    const langScores: { [key: string]: { totalProgress: number, lessonCount: number } } = {};

    lessons.forEach((lesson: Lesson) => {
      if (!langScores[lesson.languageCode]) {
        langScores[lesson.languageCode] = { totalProgress: 0, lessonCount: 0 };
      }
      const lessonProgress = completedLessonsData.find((item: { id: number; progress: number }) => item.id === lesson.id);
      if (lessonProgress) {
        langScores[lesson.languageCode].totalProgress += lessonProgress.progress;
      }
      langScores[lesson.languageCode].lessonCount += 1;
    });

    const formattedScores: { language: string; score: number }[] = [];
    for (const langCode in langScores) {
      if (langScores[langCode].lessonCount > 0) {
        const averageProgress = Math.round(langScores[langCode].totalProgress / langScores[langCode].lessonCount);
        formattedScores.push({
          language: langCode.charAt(0).toUpperCase() + langCode.slice(1),
          score: averageProgress,
        });
      }
    }
    return formattedScores;
  }, [totalXP]);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentDayString = today.toISOString().split('T')[0];

    if (lastPracticeDate) {
      const lastDate = new Date(lastPracticeDate);
      lastDate.setHours(0, 0, 0, 0);

      const diffTime = Math.abs(today.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 1) {
        setStreak(0);
        localStorage.setItem(LOCAL_STORAGE_STREAK_KEY, '0');
      }
    }
    setLastPracticeDate(currentDayString);
    localStorage.setItem(LOCAL_STORAGE_LAST_PRACTICE_DATE_KEY, currentDayString);

  }, [lastPracticeDate, streak]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSaveName = () => {
    localStorage.setItem(LOCAL_STORAGE_USER_NAME_KEY, userName);
    setIsEditingName(false);
    setAvatarConfig(prev => {
      const newConfig = { ...prev, seed: userName || 'default-user' };
      localStorage.setItem(LOCAL_STORAGE_AVATAR_CONFIG_KEY, JSON.stringify(newConfig));
      return newConfig;
    });
  };

  const handleCancelEdit = () => {
    setUserName(localStorage.getItem(LOCAL_STORAGE_USER_NAME_KEY) || 'Apprenant NdaLang');
    setIsEditingName(false);
  };

  const handleAvatarChange = (part: keyof AvatarConfig, value: string) => {
    setAvatarConfig(prev => {
      const newConfig = { ...prev, [part]: value };
      localStorage.setItem(LOCAL_STORAGE_AVATAR_CONFIG_KEY, JSON.stringify(newConfig));
      return newConfig;
    });
  };

  const handleAddFriendClick = () => {
    setShowFriendFeatureMessage(true);
    setTimeout(() => {
      setShowFriendFeatureMessage(false);
    }, 3000);
  };

  const badges = useMemo(() => [
    { id: 1, name: "Premier Pas", description: "Compléter votre première leçon.", unlocked: true, icon: <StarIcon className="h-10 w-10 text-yellow-500" /> },
    { id: 2, name: "Série de 7 Jours", description: "Pratiquer 7 jours d'affilée.", unlocked: streak >= 7, icon: <FireIcon className="h-10 w-10 text-red-500" /> },
    { id: 3, name: "Maître du Quiz", description: "Atteindre 500 XP.", unlocked: totalXP >= 500, icon: <BoltIcon className="h-10 w-10 text-blue-500" /> },
    { id: 4, name: "Explorateur Fang", description: "Compléter toutes les leçons Fang.", unlocked: false, icon: <BookOpenIcon className="h-10 w-10 text-green-500" /> },
    { id: 5, name: "Ami des Mots", description: "Gagner 1000 Pièces.", unlocked: totalCoins >= 1000, icon: <CurrencyDollarIcon className="h-10 w-10 text-purple-500" /> },
    { id: 6, name: "Communauté Active", description: "Rejoindre le Discord NdaLang.", unlocked: false, icon: <UsersIcon className="h-10 w-10 text-indigo-500" /> },
  ], [streak, totalXP, totalCoins]);


  return (
    // Conteneur principal avec position relative pour que le background fixed soit relatif à lui
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Arrière-plan Ballpit Three.js */}
      {/* Il est positionné en fixed et aura un z-index bas (-2) pour être derrière tout le contenu */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2, // Place le canvas derrière tout le contenu
        overflow: 'hidden',
        backgroundColor: '#006FCD', // Une couleur de fond pour éviter les zones vides
      }}>
      </div>

      {/* Contenu de la page de profil */}
      {/* Ce div a un z-index plus élevé (z-10 de Tailwind) et un fond semi-transparent */}
      <div className="max-w-2xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl my-8 pt-16 relative z-10">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Retour à l'accueil
        </Link>

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="relative mr-4">
              <AvatarDisplay config={avatarConfig} />
              <button
                onClick={() => setShowAvatarEditor(true)}
                className="absolute bottom-0 right-0 bg-gray-700 text-white rounded-full p-1 shadow-md hover:bg-gray-800 transition-colors"
                title="Modifier l'avatar"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            </div>
            
            <div>
              {isEditingName ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    value={userName}
                    onChange={handleNameChange}
                    className="text-3xl font-bold text-gray-900 bg-gray-100 p-1 rounded"
                  />
                  <button onClick={handleSaveName} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded text-sm">Sauvegarder</button>
                  <button onClick={handleCancelEdit} className="ml-2 px-3 py-1 bg-gray-300 text-gray-800 rounded text-sm">Annuler</button>
                </div>
              ) : (
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  {userName}
                  <button onClick={() => setIsEditingName(true)} className="ml-2 text-blue-500 hover:text-blue-700">
                    <Cog6ToothIcon className="h-6 w-6" />
                  </button>
                </h1>
              )}
              <p className="text-gray-600">Membre depuis {memberSince}</p>
            </div>
          </div>
          <button
            onClick={handleAddFriendClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            + Ajouter des amis
          </button>
        </div>

        {showFriendFeatureMessage && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4 text-center">
            <strong className="font-bold">Fonctionnalité en développement :</strong>
            <span className="block sm:inline"> La gestion des amis sera disponible dans une future mise à jour !</span>
          </div>
        )}

        {showAvatarEditor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Modifier votre Avatar</h2>
              <div className="flex justify-center mb-6">
                <AvatarDisplay config={avatarConfig} />
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Graine (pour la variation):</label>
                  <input
                    type="text"
                    value={avatarConfig.seed}
                    onChange={(e) => handleAvatarChange('seed', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Entrez un texte pour changer l'avatar"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Couleur de fond:</label>
                  <div className="flex space-x-2">
                    {['#006FCD', '#FCD116', '#009B48', '#FF6347'].map(color => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 ${avatarConfig.backgroundColor === color ? 'border-blue-500' : 'border-gray-300'}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleAvatarChange('backgroundColor', color)}
                        title={color}
                      ></button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Couleur de peau:</label>
                  <div className="flex space-x-2">
                    {['#A16035', '#C68642', '#E0AC69', '#F1C27D', '#FFDBB0'].map(color => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 ${avatarConfig.skinColor === color ? 'border-blue-500' : 'border-gray-300'}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleAvatarChange('skinColor', color)}
                        title={color}
                      ></button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Couleur de cheveux:</label>
                  <div className="flex space-x-2">
                    {['#4A2C2A', '#6B4423', '#A0522D', '#D2B48C', '#000000'].map(color => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full border-2 ${avatarConfig.hairColor === color ? 'border-blue-500' : 'border-gray-300'}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleAvatarChange('hairColor', color)}
                        title={color}
                      ></button>
                    ))}
                  </div>
                </div>

              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={() => setShowAvatarEditor(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}


        <h2 className="text-2xl font-bold mb-6 text-gray-900">Votre Récapitulatif</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-green-50 p-4 rounded-lg shadow-sm flex items-center">
            <FireIcon className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{streak}</p>
              <p className="text-gray-600">Jours d'affilée</p>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow-sm flex items-center">
            <BoltIcon className="h-8 w-8 text-yellow-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalXP}</p>
              <p className="text-gray-600">XP gagnés</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-sm flex items-center">
            <TrophyIcon className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{currentDivision}</p>
              <p className="text-gray-600">Division actuelle</p>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg shadow-sm flex items-center">
            <CurrencyDollarIcon className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalCoins}</p>
              <p className="text-gray-600">Pièces</p>
            </div>
          </div>
        </div>

        {scoresByLanguage.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Scores par Langue</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scoresByLanguage.map((langScore, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-800">{langScore.language}</p>
                  <p className="text-xl font-bold text-green-600">{langScore.score}%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6 text-gray-900">Vos Badges Mensuels</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {badges.map(badge => (
            <div key={badge.id} className={`p-4 rounded-lg shadow-sm text-center ${badge.unlocked ? 'bg-white border-2 border-green-400' : 'bg-gray-100 opacity-60'}`}>
              <div className="flex justify-center mb-2">
                {badge.unlocked ? badge.icon : React.cloneElement(badge.icon, { className: `${badge.icon.props.className} grayscale` })}
              </div>
              <h3 className="font-semibold text-gray-800">{badge.name}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}