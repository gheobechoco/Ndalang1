// src/pages/LanguageIntroPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal'; // Assurez-vous que le chemin est correct
import { lessons, languageCourses } from '../data/lessons'; // Importation des données de leçons

const LanguageIntroPage: React.FC = () => {
  const { languageCode } = useParams<{ languageCode: string }>();
  const navigate = useNavigate();
  const [greetingText, setGreetingText] = useState('Chargement...');

  useEffect(() => {
    if (!languageCode) {
      console.error("Code de langue non trouvé.");
      return;
    }

    // Recherche de la leçon de salutation dans les données
    const languageData = languageCourses.find(
      (course) => course.languageCode === languageCode
    );

    if (languageData) {
      const firstLesson = lessons.find(
        (lesson) => lesson.languageCode === languageCode && lesson.title.includes('Salutations')
      );

      // Trouve la traduction de "Bonjour" dans la première leçon
      const bonjourEntry = firstLesson?.entries.find(entry => entry.french === "Bonjour");
      const vernacularGreeting = bonjourEntry ? bonjourEntry.vernacularTranslation : "Bienvenue";

      const languageName = languageData.languageName;
      setGreetingText(`${vernacularGreeting} ! Préparez-vous à plonger dans le monde de la langue ${languageName}.`);

      // Redirige vers la page des leçons après 3 secondes (3000 ms)
      const timer = setTimeout(() => {
        navigate(`/cours/${languageCode}`);
      }, 3000); // Vous pouvez ajuster ce délai

      return () => clearTimeout(timer);
    } else {
      setGreetingText("Langue non trouvée.");
    }

  }, [languageCode, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <ScrollReveal
        textClassName="text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
        containerClassName="max-w-4xl"
      >
        {greetingText}
      </ScrollReveal>
    </div>
  );
};

export default LanguageIntroPage;
