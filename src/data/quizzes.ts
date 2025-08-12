// src/data/quizzes.ts

// Suppression de l'importation de 'lessons' car elle n'est pas utilisée dans ce fichier.
// import { lessons } from './lessons'; 

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  lessonId: number; // Ajout d'un ID de leçon pour lier le quiz à une leçon spécifique
}

// Nous allons structurer les quiz comme un Map ou un objet où la clé est l'ID de la leçon
// pour une récupération plus facile, plutôt qu'un simple tableau de tableaux.
// Cependant, si vous préférez un tableau de tableaux indexé par l'ID de leçon (id-1),
// je peux conserver ce format. Pour l'instant, je vais garder le format original
// mais en m'assurant de la cohérence des IDs.

export const quizzes: QuizQuestion[] = [
  // --- Quiz pour Leçon 1 (Fang: Salutations et présentations) ---
  {
    question: "Que signifie 'Mbolo' en Fang ?",
    options: ["Bonsoir", "Bonjour", "Merci", "Comment vas-tu ?"],
    correctAnswer: "Bonjour",
    lessonId: 1,
  },
  {
    question: "Comment dit-on 'Comment ça va ?' en Fang ?",
    options: ["Ayi bibi ?", "Nkombo ai ?", "Tata ?", "Mbɛna ɔɛ ?"],
    correctAnswer: "Ayi bibi ?",
    lessonId: 1,
  },

  // --- Quiz pour Leçon 2 (Fang: Se présenter) ---
  {
    question: "Comment dire 'Je viens du Gabon' en Fang ?",
    options: ["Nkombo ai", "Nzo ɛ́ Gabon", "Ndi mingi", "Tata"],
    correctAnswer: "Nzo ɛ́ Gabon",
    lessonId: 2,
  },
  {
    question: "Comment dire 'Je m’appelle …' en Fang ?",
    options: ["Ayi bibi ?", "Nkombo ai …", "Mbolo n’ti", "Leveri a vo"],
    correctAnswer: "Nkombo ai …",
    lessonId: 2,
  },

  // --- Quiz pour Leçon 3 (Fang: Famille et relations) ---
  {
    question: "Que signifie 'Mama' en Fang ?",
    options: ["Mère", "Frère", "Sœur", "Père"],
    correctAnswer: "Mère",
    lessonId: 3,
  },
  {
    question: "Que signifie 'Tata' en Fang ?",
    options: ["Mère", "Frère", "Sœur", "Père"],
    correctAnswer: "Père",
    lessonId: 3,
  },

  // --- Quiz pour Leçon 4 (Fang: Compter de 1 à 10) ---
  {
    question: "Comment dit-on 'Deux' en Fang ?",
    options: ["Mosi", "Mitatu", "Mibale", "Mina"],
    correctAnswer: "Mibale",
    lessonId: 4,
  },
  {
    question: "Quelle est la traduction de 'Cinq' en Fang ?",
    options: ["Muevolu", "Mitáno", "Muenyi", "Kèmbo"],
    correctAnswer: "Mitáno",
    lessonId: 4,
  },

  // --- Quiz pour Leçon 5 (Fang: Phrases utiles de voyage) ---
  {
    question: "Comment dire 'Je ne comprends pas' en Fang ?",
    options: ["Mbɛna ɔɛ ?", "Mbanɔ mbɔ", "Ndimɛɛ kwe", "Kèmbo"],
    correctAnswer: "Mbanɔ mbɔ",
    lessonId: 5,
  },
  {
    question: "Que signifie 'Ayiɛ kɛsɛnɛ ?' en Fang ?",
    options: ["Combien ça coûte ?", "Où est la toilette ?", "J’ai besoin d’eau", "Pouvez-vous répéter ?"],
    correctAnswer: "Où est la toilette ?",
    lessonId: 5,
  },

  // --- Quiz pour Leçon 6 (Nzébi: Salutations et présentations - anciennement Leçon 7 dans l'ordre des IDs) ---
  {
    question: "Comment dit-on 'Bonjour' en Nzébi ?",
    options: ["Mbote", "Mbolo", "Ayie mbia", "Bɛna bɔni ?"],
    correctAnswer: "Mbote",
    lessonId: 6,
  },
  {
    question: "Quelle phrase Nzébi correspond à 'Ça va bien, merci' ?",
    options: ["Mbanɔ mbɔ", "Nasi malamu, melesi", "Bɛna bɔni ?", "Sobɛ mbanɔ sɔhɛ"],
    correctAnswer: "Nasi malamu, melesi",
    lessonId: 6,
  },

  // --- Quiz pour Leçon 7 (Nzébi: Se présenter - anciennement Leçon 8) ---
  {
    question: "Pour dire 'Je m’appelle …' en Nzébi, quelle est la traduction ?",
    options: ["Nkombo ya ngai …", "Nawa mwa Gabon", "Naza na _ mobu", "Nasepeli koyeba yo"],
    correctAnswer: "Nkombo ya ngai …",
    lessonId: 7,
  },
  {
    question: "Quelle est la traduction Nzébi pour 'Je viens du Gabon' ?",
    options: ["Ndi _ mingi", "Nawa mwa Gabon", "Nzo ɛ́ Gabon", "Nkombo ai …"],
    correctAnswer: "Nawa mwa Gabon",
    lessonId: 7,
  },

  // --- Quiz pour Leçon 8 (Nzébi: Famille et relations - anciennement Leçon 9) ---
  {
    question: "Quelle est la traduction Nzébi pour 'Père' ?",
    options: ["Mama", "Nko", "Zaba", "Tata"],
    correctAnswer: "Tata",
    lessonId: 8,
  },
  {
    question: "Comment dit-on 'Mère' en Nzébi ?",
    options: ["Nko", "Mama", "Tata", "Zaba"],
    correctAnswer: "Mama",
    lessonId: 8,
  },

  // --- Quiz pour Leçon 9 (Nzébi: Compter de 1 à 10 - anciennement Leçon 10) ---
  {
    question: "Quelle est la traduction Nzébi de 'Un' ?",
    options: ["Moja", "Mosi", "Mibale", "Kumi"],
    correctAnswer: "Moja",
    lessonId: 9,
  },
  {
    question: "En Nzébi, comment dit-on 'Cinq' ?",
    options: ["Tano", "Tisa", "Nne", "Saba"],
    correctAnswer: "Tano",
    lessonId: 9,
  },

  // --- Quiz pour Leçon 10 (Nzébi: Phrases utiles de voyage - anciennement Leçon 6) ---
  {
    question: "Que signifie 'Kɛsɛnɛ y’a nsi ?' en Nzébi ?",
    options: ["J'ai faim", "Où est la toilette ?", "Combien de temps ?", "Je suis perdu"],
    correctAnswer: "Où est la toilette ?",
    lessonId: 10,
  },
  {
    question: "Comment dit-on 'J’ai besoin d’eau' en Nzébi ?",
    options: ["Bɛna bɔni ?", "Mbanɔ mbɔ", "Ndimɛɛ mwa mayi", "Sobɛ mbanɔ"],
    correctAnswer: "Ndimɛɛ mwa mayi",
    lessonId: 10,
  },
  {
    question: "Si vous entendez 'Bɛna bɔni ?' en Nzébi, que cherche la personne à savoir ?",
    options: ["L'heure", "Le prix", "La direction", "Le nom"],
    correctAnswer: "Le prix",
    lessonId: 10,
  },

  // --- Quiz pour Leçon 11 (Myene: Salutations et présentations) ---
  {
    question: "Que signifie 'Mbolo' en Myene ?",
    options: ["Bonjour", "Bonsoir", "Merci", "Au revoir"],
    correctAnswer: "Bonjour",
    lessonId: 11,
  },
  {
    question: "Comment dit-on 'Comment ça va ?' en Myene ?",
    options: ["Oyelele ?", "Ndiya", "Nasepele", "Kukanda ?"],
    correctAnswer: "Oyelele ?",
    lessonId: 11,
  },

  // --- Quiz pour Leçon 12 (Myene: Se présenter) ---
  {
    question: "Comment dire 'Je m’appelle …' en Myene ?",
    options: ["Nkombo yami …", "Ndiya Gabon", "Ndi _ mbu", "Nasepele kukanda"],
    correctAnswer: "Nkombo yami …",
    lessonId: 12,
  },
  {
    question: "Quelle est la traduction de 'Je viens du Gabon' en Myene ?",
    options: ["Ndiya Gabon", "Nkombo yami", "Ndi _ mbu", "Nasepele kukanda"],
    correctAnswer: "Ndiya Gabon",
    lessonId: 12,
  },

  // --- Quiz pour Leçon 13 (Myene: Famille et relations) ---
  {
    question: "Que signifie 'Tata' en Myene ?",
    options: ["Père", "Mère", "Frère", "Sœur"],
    correctAnswer: "Père",
    lessonId: 13,
  },
  {
    question: "Comment dit-on 'Mère' en Myene ?",
    options: ["Nko", "Mama", "Tata", "Ndeko mwasi"],
    correctAnswer: "Mama",
    lessonId: 13,
  },

  // --- Quiz pour Leçon 14 (Myene: Nombres) ---
  {
    question: "Quelle est la traduction de 'Un' en Myene ?",
    options: ["Mosi", "Mibale", "Mitatu", "Dikumi"],
    correctAnswer: "Mosi",
    lessonId: 14,
  },
  {
    question: "Comment dit-on 'Cinq' en Myene ?",
    options: ["Mitanu", "Mutoba", "Nsambanu", "Dikumi"],
    correctAnswer: "Mitanu",
    lessonId: 14,
  },

  // --- Quiz pour Leçon 15 (Myene: Phrases utiles de voyage) ---
  {
    question: "Que signifie 'Ndidi n'tolo ?' en Myene ?",
    options: ["Où est la toilette ?", "J’ai faim", "Combien ça coûte ?", "Je suis perdu"],
    correctAnswer: "Où est la toilette ?",
    lessonId: 15,
  },
  {
    question: "Comment dire 'J’ai besoin d’eau' en Myene ?",
    options: ["Ndiya mayi", "Ndikanda te", "Mbena mbani", "Kanda lisusu"],
    correctAnswer: "Ndiya mayi",
    lessonId: 15,
  },
];
