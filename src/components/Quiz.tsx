// src/components/Quiz.tsx

import { useState, useEffect, useMemo } from "react";
import type { QuizQuestion } from "../data/quizzes";
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

interface QuizProps {
    questions: QuizQuestion[];
    onSuccess: (quizScore: number) => void;
}

export default function Quiz({ questions, onSuccess }: QuizProps) {
    // Tous les Hooks doivent être déclarés en premier, inconditionnellement
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [currentQuizScore, setCurrentQuizScore] = useState(0);
    const [feedbackAnimationClass, setFeedbackAnimationClass] = useState<string | null>(null);
    const [feedbackBorderClass, setFeedbackBorderClass] = useState<string | null>(null);

    const successAudio = useMemo(() => new Audio('/audios/marimba-win-b-3-209679.mp3'), []);
    const failureAudio = useMemo(() => new Audio('/audios/marimba-lose-250960.mp3'), []);

    // Déplacez useEffect AVANT toute logique conditionnelle de retour
    useEffect(() => {
        // Réinitialiser l'état du quiz à chaque fois que les questions changent (nouvelle leçon)
        setCurrent(0);
        setSelected(null);
        setShowResult(false);
        setIsCorrect(false);
        setCurrentQuizScore(0); // Réinitialiser le score pour le nouveau quiz
        setFeedbackAnimationClass(null);
        setFeedbackBorderClass(null);
    }, [questions]);

    // Maintenant, vous pouvez ajouter votre logique conditionnelle de retour
    if (!questions || questions.length === 0) {
        console.warn("Quiz: Aucune question fournie ou questions vides.");
        return (
            <div className="text-center p-4 text-red-600">
                Désolé, aucune question n'est disponible pour ce quiz.
            </div>
        );
    }

    const handleValidate = () => {
        // Vérifier si une option a été sélectionnée
        if (selected === null) {
            console.error("Veuillez sélectionner une réponse avant de valider.");
            return;
        }

        const correct = selected === questions[current].correctAnswer;
        setIsCorrect(correct);
        setShowResult(true);

        let scoreAfterValidation = currentQuizScore;

        if (correct) {
            scoreAfterValidation = currentQuizScore + 1;
            setCurrentQuizScore(scoreAfterValidation);
            setFeedbackAnimationClass("animate-pulseEffect");
            setFeedbackBorderClass("border-green-success border-2 animate-pulseBorder");
            successAudio.play().catch(e => console.error("Erreur de lecture du son de succès:", e));
        } else {
            setFeedbackAnimationClass("animate-shake");
            setFeedbackBorderClass("border-red-error border-2");
            failureAudio.play().catch(e => console.error("Erreur de lecture du son d'échec:", e));
        }

        const isLastQuestion = current === questions.length - 1;

        setTimeout(() => {
            setFeedbackAnimationClass(null);
            setFeedbackBorderClass(null);

            if (isLastQuestion) {
                onSuccess(scoreAfterValidation);
            } else {
                setCurrent(current + 1);
                setSelected(null);
                setShowResult(false);
            }
        }, correct ? 5500 : 5000);
    };

    return (
        <div className={`
            border mt-8 p-4 rounded bg-white shadow-lg
            ${feedbackAnimationClass || ''}
            ${feedbackBorderClass || ''}
        `}>
            <h2 className="text-2xl font-bold mb-4 text-center">Quiz</h2>
            <p className="mb-4 text-md text-gray-700 text-center">Question {current + 1} / {questions.length}</p>

            <p className="mb-6 text-lg font-semibold text-center">
                {questions[current].question}
            </p>

            <ul className="mb-6 space-y-3">
                {questions[current].options.map((opt: string, idx: number) => (
                    <li key={idx}>
                        <label className={`
                            flex items-center space-x-3 p-3 rounded-lg cursor-pointer
                            border-2 transition-all duration-200
                            ${selected === opt ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 border-gray-200'}
                            ${showResult && selected === opt && (opt === questions[current].correctAnswer ? 'border-green-600 bg-green-50' : 'border-red-500 bg-red-50')}
                            ${showResult && opt === questions[current].correctAnswer && !isCorrect && selected !== opt ? 'border-green-600 bg-green-50' : ''}
                            ${showResult ? 'pointer-events-none' : ''}
                        `}>
                            <input
                                type="radio"
                                name={`q-${current}`}
                                value={opt}
                                checked={selected === opt}
                                onChange={() => {
                                    setSelected(opt);
                                    setShowResult(false);
                                    setFeedbackAnimationClass(null);
                                    setFeedbackBorderClass(null);
                                }}
                                disabled={showResult}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-800 text-base">{opt}</span>

                            {showResult && selected === opt && (
                                isCorrect ? (
                                    <CheckCircleIcon className="h-6 w-6 text-green-600 ml-auto" />
                                ) : (
                                    <XCircleIcon className="h-6 w-6 text-red-500 ml-auto" />
                                )
                            )}
                        </label>
                    </li>
                ))}
            </ul>

            {!showResult ? (
                <div className="text-center">
                    <button
                        onClick={handleValidate}
                        disabled={selected === null}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Valider la réponse
                    </button>
                </div>
            ) : (
                <div className="flex items-center justify-center gap-4 mt-4 py-2">
                    {isCorrect ? (
                        <>
                            <CheckCircleIcon className="h-8 w-8 text-green-600" />
                            <p className="font-bold text-green-600 text-xl">Bonne réponse !</p>
                        </>
                    ) : (
                        <>
                            <XCircleIcon className="h-8 w-8 text-red-500" />
                            <p className="font-bold text-red-500 text-xl">Mauvaise réponse.</p>
                            <p className="text-md text-gray-700 ml-2">Correct: <span className="font-semibold text-green-600">{questions[current].correctAnswer}</span></p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
