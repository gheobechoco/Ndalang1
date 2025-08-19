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
  import QuizFeedbackModal from '../components/QuizFeedbackModal';
  import AudioPlayer from '../components/AudioPlayer';

const LOCAL_STORAGE_TOTAL_SCORE_KEY = 'ndalang_total_score';
const LOCAL_STORAGE_COMPLETED_LESSONS_KEY = 'ndalang_completed_lessons';
const LOCAL_STORAGE_COINS_KEY = 'ndalang_coins';

const lottieLessonBackgroundAnimationPath = '/animations/bbfb39fe-e03e-48d9-a1ba-a6098b864d03.json';

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  // Assurez-vous que l'ID est un nombre valide, sinon 0
  const initialLessonId = parseInt(id || "1", 10); // Commencer à 1 car les IDs de leçons commencent à 1

  // Trouver l'index de la leçon basée sur son ID
  const initialLessonIndex = useMemo(() => {
    const foundIndex = lessons.findIndex(l => l.id === initialLessonId);
    return foundIndex !== -1 ? foundIndex : 0; // Retourne l'index trouvé ou 0 si non trouvé
  }, [initialLessonId]);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(initialLessonIndex);
  const lesson = lessons[currentLessonIndex];

  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [recordedAudioURL, setRecordedAudioURL] = useState<string | null>(null);
  const [activeRecordingEntryIndex, setActiveRecordingEntryIndex] = useState<number | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const [quizFeedback, setQuizFeedback] = useState<{
    isVisible: boolean;
    type: 'success' | 'failure';
    message: string;
    score: number;
    coinsEarned: number;
  } | null>(null);

    const languageDisplayName = useMemo(() => {
      const langCode = lesson?.languageCode || 'fr';
      switch (langCode) {
        case 'fang': return 'Fang';
        case 'nzebi': return 'Nzébi';
        case 'myene': return 'Myene';
        case 'fr': return 'Français';
        default: return 'Langue';
      }
    }, [lesson]);

  const quizStartAudio = useMemo(() => new Audio('/audios/marimba-bloop-3-188151.mp3'), []);

  // Filtrer les questions de quiz pour la leçon actuelle
  const currentLessonQuizzes = useMemo(() => {
    // S'assurer que 'lesson' est défini avant de filtrer
    if (!lesson) return [];
    return quizzes.filter(q => q.lessonId === lesson.id);
  }, [lesson]); // Dépend de la leçon actuelle

  // useEffect pour la réinitialisation de l'état lors du changement de leçon
  useEffect(() => {
    setShowQuiz(false);
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
    setQuizFeedback(null);

    // Nettoyage lors du démontage du composant ou changement de leçon
    return () => {
      if (recordedAudioURL) {
        URL.revokeObjectURL(recordedAudioURL);
        console.log("Recorded audio URL revoked (component unmount cleanup):", recordedAudioURL);
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [currentLessonIndex, recordedAudioURL]); // Ajout de recordedAudioURL aux dépendances

  // Vérification de l'existence de la leçon APRÈS la déclaration des Hooks
  if (!lesson) {
    console.error("Leçon introuvable pour l'ID :", initialLessonId);
    return (
      <div className="max-w-2xl mx-auto p-4 text-center text-red-600 font-bold">
        Désolé, cette leçon n'existe pas ou n'est plus disponible.
        <button onClick={() => navigate('/')} className="block mx-auto mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Retour à l'accueil
        </button>
      </div>
    );
  }

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
      console.error("Impossible d'accéder au microphone. Veuillez autoriser l'accès et vérifier la console pour plus de détails.");
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
        console.error("Impossible de lire l'audio. Le format pourrait être incompatible ou l'audio est vide.");
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

    const totalQuestions = currentLessonQuizzes.length || 0; // Utiliser currentLessonQuizzes ici
    const quizPercentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

    const currentTotalScore = parseInt(localStorage.getItem(LOCAL_STORAGE_TOTAL_SCORE_KEY) || '0', 10);
    localStorage.setItem(LOCAL_STORAGE_TOTAL_SCORE_KEY, (currentTotalScore + score).toString());

    const coinsEarned = score * 10;
    const currentCoins = parseInt(localStorage.getItem(LOCAL_STORAGE_COINS_KEY) || '0', 10);
    localStorage.setItem(LOCAL_STORAGE_COINS_KEY, (currentCoins + coinsEarned).toString());

    const completedLessonsData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_COMPLETED_LESSONS_KEY) || '[]');
    let lessonFound = false;
    const updatedCompletedLessonsData = completedLessonsData.map((item: { id: number; progress: number }) => {
      if (item.id === lesson.id) {
        lessonFound = true;
        return { id: lesson.id, progress: quizPercentage };
      }
      return item;
    });

    if (!lessonFound) {
      updatedCompletedLessonsData.push({ id: lesson.id, progress: quizPercentage });
    }
    localStorage.setItem(LOCAL_STORAGE_COMPLETED_LESSONS_KEY, JSON.stringify(updatedCompletedLessonsData));

    let feedbackMessage = '';
    let feedbackType: 'success' | 'failure';

    if (score === totalQuestions) {
      feedbackMessage = `Vous avez répondu correctement à toutes les ${totalQuestions} questions et gagné ${coinsEarned} pièces !`;
      feedbackType = 'success';
    } else {
      feedbackMessage = `Vous avez obtenu ${score} bonnes réponses sur ${totalQuestions} et gagné ${coinsEarned} pièces. Réessayez pour un score parfait !`;
      feedbackType = 'failure';
    }

    setQuizFeedback({
      isVisible: true,
      type: feedbackType,
      message: feedbackMessage,
      score: score,
      coinsEarned: coinsEarned,
    });

    if (score === totalQuestions) {
      setTimeout(() => {
        handleNext();
      }, 4000);
    }
  };

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) {
      const nextLessonId = lessons[currentLessonIndex + 1].id;
      setCurrentLessonIndex(currentLessonIndex + 1);
      navigate(`/lesson/${nextLessonId}`); // Naviguer par ID de leçon
    } else {
      console.log("Dernière leçon atteinte, redirection vers l'accueil.");
      navigate("/");
    }
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      const prevLessonId = lessons[currentLessonIndex - 1].id;
      setCurrentLessonIndex(currentLessonIndex - 1);
      navigate(`/lesson/${prevLessonId}`); // Naviguer par ID de leçon
    }
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setQuizFeedback(null);
    quizStartAudio.play().catch(e => console.error("Erreur de lecture du son de démarrage du quiz :", e));
  };

  // Vérifier si la leçon actuelle a des questions de quiz
  const hasQuizForCurrentLesson = currentLessonQuizzes.length > 0;

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Fond Lottie */}
      <div className="fixed inset-0 z-[-2] overflow-hidden flex justify-center items-center bg-[#006FCD]">
        <Player
          src={lottieLessonBackgroundAnimationPath}
          autoplay
          loop
          className="w-[1000%] h-[1000%] object-cover opacity-50 transform -translate-x-1/10"
        />
      </div>

      {/* Bulles flottantes */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <FloatingBubblesBackground currentLessonLanguageCode={lesson?.languageCode || 'fr'} />
      </div>

      {/* Contenu principal de la leçon */}
      <div className="max-w-4xl w-full mx-auto p-4 relative z-10 bg-white bg-opacity-80 rounded-lg shadow-lg my-8 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">{lesson.title}</h1>

          {!showQuiz && (
            <>
              {lesson.youtubeVideoId && (
                <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-center">Regardez la vidéo de la leçon : {lesson.title}</h2>
                  <div className="aspect-w-16 aspect-h-9 w-full"> {/* Utilisation de classes de ratio d'aspect */}
                    <YouTubePlayer videoId={lesson.youtubeVideoId} title={`Vidéo de la leçon : ${lesson.title}`} />
                  </div>
                  <p className="text-center text-gray-600 mt-2 text-sm sm:text-base italic">
                    Cette saynète vous aidera à comprendre les mots et phrases en contexte.
                    Regardez-la avant de passer aux exercices et au quiz !
                  </p>
                </div>
              )}

              {/* Conteneur pour le tableau réactif */}
              <div className="overflow-x-auto rounded-lg shadow-md mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left border-b border-gray-300">Français</th>
                      <th className="py-3 px-6 text-left border-b border-gray-300">{languageDisplayName}</th>
                      <th className="py-3 px-6 text-left border-b border-gray-300">Prononciation</th>
                      <th className="py-3 px-6 text-center border-b border-gray-300">Audio</th>
                      <th className="py-3 px-6 text-center border-b border-gray-300">Votre Prononciation</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 text-sm font-light">
                    {lesson.entries.map((entry, entryIndex) => (
                      <tr key={entryIndex} className="border-b border-gray-200 hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{entry.french}</td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">{entry.vernacularTranslation}</td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">{entry.pronunciation}</td>
                        <td className="py-3 px-6 text-center">
                          {entry.audioFile ? (
                            <AudioPlayer audioSrc={entry.audioFile} label="Écouter" />
                          ) : (
                            <span className="text-gray-400 italic">Pas encore</span>
                          )}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex flex-col items-center justify-center space-y-2">
                            {activeRecordingEntryIndex === entryIndex && isRecording ? (
                              <button
                                onClick={stopRecording}
                                className="bg-red-500 text-white p-2 rounded-full inline-flex items-center justify-center animate-pulse shadow-md"
                                aria-label="Arrêter l'enregistrement"
                              >
                                <StopIcon className="h-6 w-6" />
                              </button>
                            ) : (
                              <button
                                onClick={() => startRecording(entryIndex)}
                                disabled={isRecording && activeRecordingEntryIndex !== entryIndex}
                                className="bg-blue-500 text-white p-2 rounded-full inline-flex items-center justify-center disabled:opacity-50 shadow-md hover:bg-blue-600 transition-colors"
                                aria-label="Démarrer l'enregistrement"
                              >
                                <MicrophoneIcon className="h-6 w-6" />
                              </button>
                            )}

                          {activeRecordingEntryIndex === entryIndex && recordedAudioURL && !isRecording && (
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                onClick={() => playRecordedAudio(recordedAudioURL)}
                                className="bg-green-500 text-white p-2 rounded-full inline-flex items-center justify-center shadow-md hover:bg-green-600 transition-colors"
                                aria-label="Écouter l'enregistrement"
                              >
                                <PlayIcon className="h-6 w-6" />
                              </button>
                              <button
                                onClick={handleResetRecordingButton}
                                className="bg-gray-500 text-white p-2 rounded-full inline-flex items-center justify-center shadow-md hover:bg-gray-600 transition-colors"
                                title="Réinitialiser l'enregistrement"
                                aria-label="Réinitialiser l'enregistrement"
                              >
                                <ArrowPathIcon className="h-6 w-6" />
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <audio ref={audioPlayerRef} style={{ display: 'none' }} />

            {/* Boutons de navigation */}
            <div className="flex justify-between gap-2 mt-6 flex-wrap">
              <button
                className="flex-1 sm:flex-none bg-gray-300 text-gray-800 px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-base flex items-center justify-center gap-2 hover:bg-gray-400 transition-colors"
                onClick={handlePrevious}
                disabled={currentLessonIndex === 0}
              >
                <ArrowLeftIcon className="h-5 w-5" />
                <span>Précédent</span>
              </button>
              <button
                className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-base flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                onClick={handleNext}
                disabled={currentLessonIndex === lessons.length - 1}
              >
                <span>Suivant</span>
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>
          </>
        )}

        {hasQuizForCurrentLesson && !showQuiz && (
          <div className="flex justify-center mt-6">
            <button
              className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg sm:text-xl font-semibold shadow-md hover:bg-green-600 transition duration-300"
              onClick={handleStartQuiz}
            >
              Passer au Quiz
            </button>
          </div>
        )}

        {hasQuizForCurrentLesson && showQuiz && (
          <Quiz
            key={lesson.id} // Utiliser lesson.id comme clé pour forcer le re-montage du Quiz si la leçon change
            questions={currentLessonQuizzes} // Passer le tableau filtré de questions
            onSuccess={handleQuizComplete}
          />
        )}
      </div>

      {quizFeedback && (
        <QuizFeedbackModal
          isVisible={quizFeedback.isVisible}
          type={quizFeedback.type}
          message={quizFeedback.message}
          score={quizFeedback.score}
          coinsEarned={quizFeedback.coinsEarned}
          onClose={() => setQuizFeedback(null)}
        />
      )}
    </div>
  );
}
