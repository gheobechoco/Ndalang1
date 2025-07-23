// src/pages/LessonPage.tsx

import { useParams, useNavigate } from "react-router-dom"; 
import { useState, useEffect, useMemo, useRef } from "react";
import { lessons } from "../data/lessons";
import { quizzes } from "../data/quizzes";
import Quiz from "../components/Quiz";
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { MicrophoneIcon, StopIcon, PlayIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import YouTubePlayer from '../components/YouTubePlayer';
import { Player } from '@lottiefiles/react-lottie-player';
import FloatingBubblesBackground from '../components/FloatingBubblesBackground'; 

const LOCAL_STORAGE_TOTAL_SCORE_KEY = 'ndalang_total_score';
const LOCAL_STORAGE_COMPLETED_LESSONS_KEY = 'ndalang_completed_lessons';
const LOCAL_STORAGE_COINS_KEY = 'ndalang_coins'; // Nouvelle clé pour les pièces

// Chemin de l'animation Lottie pour l'arrière-plan des leçons
const lottieLessonBackgroundAnimationPath = '/animations/bbfb39fe-e03e-48d9-a1ba-a6098b864d03.json';

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const index = parseInt(id || "0");
  const [currentLessonIndex, setCurrentLessonIndex] = useState(index);
  const lesson = lessons[currentLessonIndex];
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompletedMessage, setQuizCompletedMessage] = useState<string | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [recordedAudioURL, setRecordedAudioURL] = useState<string | null>(null);
  const [activeRecordingEntryIndex, setActiveRecordingEntryIndex] = useState<number | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Déterminer le nom de la langue à afficher dans le tableau
  const languageDisplayName = useMemo(() => {
    const langCode = lesson?.languageCode || 'fr'; 
    switch (langCode) {
      case 'fang': return 'Fang';
      case 'nzebi': return 'Nzébi';
      case 'massango': return 'Massango'; 
      case 'fr': return 'Français';
      default: return 'Langue'; 
    }
  }, [lesson]); 


  if (!lesson) {
    console.error("Leçon introuvable pour l'index :", currentLessonIndex);
    return (
      <div className="max-w-2xl mx-auto p-4 text-center text-red-600 font-bold">
        Désolé, cette leçon n'existe pas ou n'est plus disponible.
        <button onClick={() => navigate('/')} className="block mx-auto mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const quizStartAudio = useMemo(() => new Audio('/audios/marimba-bloop-3-188151.mp3'), []);

  useEffect(() => {
    setShowQuiz(false);
    setQuizCompletedMessage(null);
    setIsRecording(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
    if (recordedAudioURL) {
        URL.revokeObjectURL(recordedAudioURL);
        console.log("Recorded audio URL revoked (on lesson change cleanup):", recordedAudioURL);
    }
    setRecordedAudioURL(null);
    setActiveRecordingEntryIndex(null);

    return () => {
        if (recordedAudioURL) {
            URL.revokeObjectURL(recordedAudioURL);
            console.log("Recorded audio URL revoked (component unmount cleanup):", recordedAudioURL);
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };
  }, [currentLessonIndex]);

  const resetRecordingStateForEntry = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
    if (recordedAudioURL) {
        URL.revokeObjectURL(recordedAudioURL);
    }
    setRecordedAudioURL(null);
    if (audioPlayerRef.current) {
        audioPlayerRef.current.src = '';
        audioPlayerRef.current.pause();
        audioPlayerRef.current.load();
    }
    console.log("Enregistrement réinitialisé pour l'entrée active.");
  }

  const startRecording = async (entryIndex: number) => {
    resetRecordingStateForEntry();
    setActiveRecordingEntryIndex(entryIndex);
    setRecordedAudioURL(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      let mimeType = 'audio/webm';
      const preferredMimeTypes = [
          'audio/webm',
          'audio/ogg',
          'audio/wav',
          'audio/webm; codecs=opus',
          'audio/ogg; codecs=opus',
          'audio/mp4',
      ];

      for (const type of preferredMimeTypes) {
          if (MediaRecorder.isTypeSupported(type)) {
              mimeType = type;
              break;
          }
      }
      console.log("Utilisation du MIME type pour l'enregistrement:", mimeType);

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          console.log("Fragment audio collecté, taille:", event.data.size, "bytes");
        } else {
            console.log("Fragment audio vide détecté.");
        }
      };

      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        const finalBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(finalBlob);
        
        setRecordedAudioURL(url);
        setIsRecording(false);

        console.log("Enregistrement terminé. Blob généré, taille:", finalBlob.size, "bytes. URL:", url);
        if (finalBlob.size === 0) {
            console.warn("Le Blob audio généré est vide. Il pourrait y avoir un problème de capture.");
        }
        audioChunksRef.current = [];
      };

      recorder.start();
      setIsRecording(true);
      console.log("Enregistrement démarré.");
    } catch (err) {
      console.error("Erreur lors de l'accès au microphone ou de l'enregistrement:", err);
      setIsRecording(false);
      setActiveRecordingEntryIndex(null);
      alert("Impossible d'accéder au microphone. Veuillez autoriser l'accès et vérifier la console pour plus de détails.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      console.log("Enregistrement arrêté.");
    }
  };

  const playRecordedAudio = (url: string) => {
    if (audioPlayerRef.current) {
        audioPlayerRef.current.src = url;
        audioPlayerRef.current.onended = () => console.log("Lecture terminée.");
        audioPlayerRef.current.onerror = (e) => console.error("Erreur de lecture de l'audio:", e);
        audioPlayerRef.current.play().then(() => {
            console.log("Lecture de l'enregistrement démarrée:", url);
        }).catch(e => {
            console.error("Erreur lors du démarrage de la lecture:", e);
            alert("Impossible de lire l'audio. Le format pourrait être incompatible ou l'audio est vide.");
        });
    } else {
        console.warn("audioPlayerRef.current n'est pas disponible pour la lecture.");
    }
  };

  const handleResetRecordingButton = () => {
    resetRecordingStateForEntry();
  }

  const handleQuizComplete = (score: number) => {
    setShowQuiz(false);
    
    // Récupérer le nombre total de questions pour le quiz actuel
    const totalQuestions = quizzes[currentLessonIndex]?.length || 0;
    // Calculer le pourcentage de réussite au quiz
    const quizPercentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

    // Mise à jour du score total (XP)
    const currentTotalScore = parseInt(localStorage.getItem(LOCAL_STORAGE_TOTAL_SCORE_KEY) || '0', 10);
    localStorage.setItem(LOCAL_STORAGE_TOTAL_SCORE_KEY, (currentTotalScore + score).toString());

    // Mise à jour des pièces (coins) - Exemple : 10 pièces par bonne réponse
    const currentCoins = parseInt(localStorage.getItem(LOCAL_STORAGE_COINS_KEY) || '0', 10);
    localStorage.setItem(LOCAL_STORAGE_COINS_KEY, (currentCoins + (score * 10)).toString()); // Gagne 10 pièces par bonne réponse

    // Récupérer les données de complétion existantes
    const completedLessonsData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_COMPLETED_LESSONS_KEY) || '[]');
    let lessonFound = false;
    const updatedCompletedLessonsData = completedLessonsData.map((item: { id: number; progress: number }) => {
        if (item.id === lesson.id) {
            lessonFound = true;
            // Mettre à jour la progression de la leçon existante
            return { id: lesson.id, progress: quizPercentage };
        }
        return item;
    });

    // Si la leçon n'était pas encore enregistrée, l'ajouter
    if (!lessonFound) {
        updatedCompletedLessonsData.push({ id: lesson.id, progress: quizPercentage });
    }
    // Sauvegarder les données de complétion mises à jour
    localStorage.setItem(LOCAL_STORAGE_COMPLETED_LESSONS_KEY, JSON.stringify(updatedCompletedLessonsData));

    // Nouvelle logique de navigation basée sur le score du quiz
    if (score === totalQuestions) {
      // Toutes les questions sont correctes : succès total
      setQuizCompletedMessage(`Félicitations ! Vous avez répondu correctement à toutes les ${totalQuestions} questions et gagné ${score * 10} pièces ! Passage à la leçon suivante...`);
      // Délai avant de passer à la leçon suivante pour le que l'utilisateur lise le message
      setTimeout(() => {
        handleNext();
      }, 2000); // 2 secondes de délai
    } else {
      // Au moins une question est incorrecte : échec partiel
      setQuizCompletedMessage(`Quiz terminé. Vous avez obtenu ${score} bonnes réponses sur ${totalQuestions} et gagné ${score * 10} pièces. Veuillez réviser la leçon et réessayer le quiz !`);
      // Le quiz est masqué, mais le bouton "Passer au Quiz" réapparaîtra si `showQuiz` est false
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      // Si ce n'est pas la dernière leçon, naviguer vers la suivante
      setCurrentLessonIndex(currentLessonIndex + 1);
      navigate(`/lesson/${currentLessonIndex + 1}`); // Mettre à jour l'URL également
    } else {
      // C'est la dernière leçon, naviguer vers l'accueil ou une page de fin
      console.log("Dernière leçon atteinte, redirection vers l'accueil.");
      navigate("/");
    }
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      navigate(`/lesson/${currentLessonIndex - 1}`); // Mettre à jour l'URL également
    }
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setQuizCompletedMessage(null);
    quizStartAudio.play().catch(e => console.error("Erreur de lecture du son de démarrage du quiz :", e));
  };

  const hasQuizForCurrentLesson = quizzes[currentLessonIndex] && quizzes[currentLessonIndex].length > 0;

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}> {/* Conteneur pour le contenu de la leçon, au-dessus des bulles */}
      {/* L'animation Lottie en arrière-plan (couche la plus basse) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -2, // <-- TRÈS IMPORTANT : z-index le plus bas pour être en arrière-plan
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#006FCD', // Couleur de fond (Bleu du Gabon)
      }}>
        <Player
          src={lottieLessonBackgroundAnimationPath}
          autoplay
          loop // L'animation se répète en boucle
          style={{
            width: '1000%', // <-- Largeur considérablement augmentée pour couvrir tout l'espace
            height: '1000%', // <-- Hauteur considérablement augmentée
            objectFit: 'cover', // Garantit que l'animation couvre l'intégralité du conteneur
            opacity: 0.5, // <-- Opacité légèrement plus faible pour un effet plus subtil
            transform: 'translate(-10%, 0)', // <-- Déplacement vers la gauche pour mieux couvrir l'espace
          }}
        />
      </div>

      {/* L'animation 3D des bulles (couche intermédiaire) */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // <-- TRÈS IMPORTANT : z-index pour être au-dessus de Lottie mais derrière le contenu
        pointerEvents: 'none', // Permet de cliquer à travers pour interagir avec le contenu
      }}>
        {/* Passage sécurisé du languageCode avec une valeur par défaut */}
        <FloatingBubblesBackground currentLessonLanguageCode={lesson?.languageCode || 'fr'} />
      </div>


      {/* Conteneur pour le contenu de la leçon (couche la plus haute) */}
      <div className="max-w-4xl mx-auto p-4 relative z-10 bg-white bg-opacity-80 rounded-lg shadow-lg my-8">
        <h1 className="text-2xl font-bold text-center mb-4">{lesson.title}</h1>

        {quizCompletedMessage && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Message du Quiz:</strong>
            <span className="block sm:inline"> {quizCompletedMessage}</span>
          </div>
        )}

        {!showQuiz && (
          <>
            {/* Section Vidéo de la Leçon (YouTube) */}
            {lesson.youtubeVideoId && (
              <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-3 text-center">Regardez la vidéo de la leçon : {lesson.title}</h2>
                <YouTubePlayer videoId={lesson.youtubeVideoId} title={`Vidéo de la leçon : ${lesson.title}`} />
                <p className="text-center text-gray-600 mt-2 text-sm italic">
                  Cette saynète vous aidera à comprendre les mots et phrases en contexte.
                  Regardez-la avant de passer aux exercices et au quiz !
                </p>
              </div>
            )}
            {/* Fin Section Vidéo de la Leçon */}

            <table className="w-full border border-gray-300 mb-6">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Français</th>
                  {/* Utilisation dynamique du nom de la langue */}
                  <th className="border p-2">{languageDisplayName}</th>
                  <th className="border p-2">Prononciation</th>
                  <th className="border p-2">Audio</th>
                  <th className="border p-2">Votre Prononciation</th>
                </tr>
              </thead>
              <tbody>
                {lesson.entries.map((entry, entryIndex) => (
                  <tr key={entryIndex} className="even:bg-gray-100">
                    <td className="border p-2">{entry.french}</td>
                    {/* Utilisation de vernacularTranslation */}
                    <td className="border p-2">{entry.vernacularTranslation}</td>
                    <td className="border p-2">{entry.pronunciation}</td>
                    <td className="border p-2">
                      {entry.audioFile ? (
                        <audio controls src={`/audios/${entry.audioFile}`} />
                      ) : (
                        <span className="text-gray-400 italic">Pas encore</span>
                      )}
                    </td>
                    <td className="border p-2 text-center">
                      {activeRecordingEntryIndex === entryIndex && isRecording ? (
                        <button
                          onClick={stopRecording}
                          className="bg-red-500 text-white p-2 rounded-full inline-flex items-center justify-center animate-pulse"
                        >
                          <StopIcon className="h-6 w-6" />
                        </button>
                      ) : (
                        <button
                          onClick={() => startRecording(entryIndex)}
                          disabled={isRecording && activeRecordingEntryIndex !== entryIndex}
                          className="bg-blue-500 text-white p-2 rounded-full inline-flex items-center justify-center disabled:opacity-50"
                        >
                          <MicrophoneIcon className="h-6 w-6" />
                        </button>
                      )}

                      {/* Affiche le bouton de lecture et réinitialisation si l'audio enregistré est pour cette ligne et n'est pas en cours d'enregistrement */}
                      {activeRecordingEntryIndex === entryIndex && recordedAudioURL && !isRecording && (
                          <div className="flex items-center justify-center mt-2 space-x-2">
                              <button
                                  onClick={() => playRecordedAudio(recordedAudioURL)}
                                  className="bg-green-500 text-white p-2 rounded-full inline-flex items-center justify-center"
                              >
                                  <PlayIcon className="h-6 w-6" />
                              </button>
                              <button
                                  onClick={handleResetRecordingButton}
                                  className="bg-gray-500 text-white p-2 rounded-full inline-flex items-center justify-center"
                                  title="Réinitialiser l'enregistrement"
                              >
                                  <ArrowPathIcon className="h-6 w-6" />
                              </button>
                          </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <audio ref={audioPlayerRef} style={{ display: 'none' }} />

            <div className="flex justify-center gap-4 mb-6">
              <button
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-1"
                onClick={handlePrevious}
                disabled={currentLessonIndex === 0}
              >
                <ArrowLeftIcon className="h-4 w-4" />
                <span>Précédent</span>
              </button>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-1"
                onClick={handleNext}
                disabled={currentLessonIndex === lessons.length - 1}
              >
                <span>Suivant</span>
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </>
        )}

        {hasQuizForCurrentLesson && !showQuiz && (
          <div className="flex justify-center mt-6">
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-green-600 transition duration-300"
              onClick={handleStartQuiz}
            >
              Passer au Quiz
            </button>
          </div>
        )}

        {hasQuizForCurrentLesson && showQuiz && (
          <Quiz
            key={currentLessonIndex}
            questions={quizzes[currentLessonIndex]}
            onSuccess={handleQuizComplete}
          />
        )}
      </div>
    </div>
  );
}
