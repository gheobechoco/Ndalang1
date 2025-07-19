export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const quizzes: QuizQuestion[][] = [
  // Quiz pour Leçon 1 (Fang: Salutations et présentations)
  [
    {
      question: "Que signifie 'Mbolo' en Fang ?",
      options: ["Bonsoir", "Bonjour", "Merci", "Comment vas-tu ?"],
      correctAnswer: "Bonjour",
    },
    {
      question: "Comment dit-on 'Comment ça va ?' en Fang ?",
      options: ["Ayi bibi ?", "Nkombo ai ?", "Tata ?", "Mbɛna ɔɛ ?"],
      correctAnswer: "Ayi bibi ?",
    }
  ],
  // Quiz pour Leçon 2 (Fang: Se présenter)
  [
    {
      question: "Comment dire 'Je viens du Gabon' en Fang ?",
      options: ["Nkombo ai", "Nzo ɛ́ Gabon", "Ndi mingi", "Tata"],
      correctAnswer: "Nzo ɛ́ Gabon"
    },
    {
      question: "Comment dire 'Je m’appelle …' en Fang ?",
      options: ["Ayi bibi ?", "Nkombo ai …", "Mbolo n’ti", "Leveri a vo"],
      correctAnswer: "Nkombo ai …"
    }
  ],
  // Quiz pour Leçon 3 (Fang: Famille et relations)
  [
    {
      question: "Que signifie 'Mama' en Fang ?",
      options: ["Mère", "Frère", "Sœur", "Père"],
      correctAnswer: "Mère"
    },
    {
      question: "Que signifie 'Tata' en Fang ?",
      options: ["Mère", "Frère", "Sœur", "Père"],
      correctAnswer: "Père"
    }
  ],
  // Quiz pour Leçon 4 (Fang: Compter de 1 à 10)
  [
    {
      question: "Comment dit-on 'Deux' en Fang ?",
      options: ["Mosi", "Mitatu", "Mibale", "Mina"],
      correctAnswer: "Mibale"
    },
    {
      question: "Quelle est la traduction de 'Cinq' en Fang ?",
      options: ["Muevolu", "Mitáno", "Muenyi", "Kèmbo"],
      correctAnswer: "Mitáno"
    }
  ],
  // Quiz pour Leçon 5 (Fang: Phrases utiles de voyage)
  [
    {
      question: "Comment dire 'Je ne comprends pas' en Fang ?",
      options: ["Mbɛna ɔɛ ?", "Mbanɔ mbɔ", "Ndimɛɛ kwe", "Kèmbo"],
      correctAnswer: "Mbanɔ mbɔ"
    },
    {
      question: "Que signifie 'Ayiɛ kɛsɛnɛ ?' en Fang ?",
      options: ["Combien ça coûte ?", "Où est la toilette ?", "J’ai besoin d’eau", "Pouvez-vous répéter ?"],
      correctAnswer: "Où est la toilette ?"
    }
  ],
  // Quiz pour Leçon 6 (Nzébi: Phrases utiles en Nzébi)
  [
    {
      question: "Que signifie 'Kɛsɛnɛ y’a nsi ?' en Nzébi ?",
      options: ["J'ai faim", "Où est la toilette ?", "Combien de temps ?", "Je suis perdu"],
      correctAnswer: "Où est la toilette ?",
    },
    {
      question: "Comment dit-on 'J’ai besoin d’eau' en Nzébi ?",
      options: ["Bɛna bɔni ?", "Mbanɔ mbɔ", "Ndimɛɛ mwa mayi", "Sobɛ mbanɔ"],
      correctAnswer: "Ndimɛɛ mwa mayi",
    },
    {
      question: "Si vous entendez 'Bɛna bɔni ?' en Nzébi, que cherche la personne à savoir ?",
      options: ["L'heure", "Le prix", "La direction", "Le nom"],
      correctAnswer: "Le prix",
    }
  ],
  // Quiz pour Leçon 7 (Nzébi: Salutations et présentations)
  [
    {
      question: "Comment dit-on 'Bonjour' en Nzébi ?",
      options: ["Mbote", "Mbolo", "Ayie mbia", "Bɛna bɔni ?"],
      correctAnswer: "Mbote",
    },
    {
      question: "Quelle phrase Nzébi correspond à 'Ça va bien, merci' ?",
      options: ["Mbanɔ mbɔ", "Nasi malamu, melesi", "Bɛna bɔni ?", "Sobɛ mbanɔ sɔhɛ"],
      correctAnswer: "Nasi malamu, melesi",
    }
  ],
  // Quiz pour Leçon 8 (Nzébi: Se présenter)
  [
    {
      question: "Pour dire 'Je m’appelle …' en Nzébi, quelle est la traduction ?",
      options: ["Nkombo ya ngai …", "Nawa mwa Gabon", "Naza na _ mobu", "Nasepeli koyeba yo"],
      correctAnswer: "Nkombo ya ngai …",
    },
    {
      question: "Quelle est la traduction Nzébi pour 'Je viens du Gabon' ?",
      options: ["Ndi _ mingi", "Nawa mwa Gabon", "Nzo ɛ́ Gabon", "Nkombo ai …"],
      correctAnswer: "Nawa mwa Gabon",
    }
  ],
  // Quiz pour Leçon 9 (Nzébi: Famille et relations)
  [
    {
      question: "Quelle est la traduction Nzébi pour 'Père' ?",
      options: ["Mama", "Nko", "Zaba", "Tata"],
      correctAnswer: "Tata",
    },
    {
      question: "Comment dit-on 'Mère' en Nzébi ?",
      options: ["Nko", "Mama", "Tata", "Zaba"],
      correctAnswer: "Mama",
    }
  ],
  // Quiz pour Leçon 10 (Nzébi: Compter de 1 à 10)
  [
    {
      question: "Quelle est la traduction Nzébi de 'Un' ?",
      options: ["Moja", "Mosi", "Mibale", "Kumi"],
      correctAnswer: "Moja",
    },
    {
      question: "En Nzébi, comment dit-on 'Cinq' ?",
      options: ["Tano", "Tisa", "Nne", "Saba"],
      correctAnswer: "Tano",
    }
  ],
   // Quiz pour Leçon 11 (Massango: Salutations)
  [
    {
      question: "Que signifie 'Ndeme' en Massango ?",
      options: ["Bonjour", "Bonsoir", "Merci", "Au revoir"],
      correctAnswer: "Bonjour"
    },
    {
      question: "Comment dit-on 'Comment ça va ?' en Massango ?",
      options: ["Ndeme ?", "Mimi ?", "Malo ?", "Ndɛ tɛ̃ ?"],
      correctAnswer: "Ndɛ tɛ̃ ?"
    }
  ],
  // Quiz pour Leçon 12 (Massango: Se présenter)
  [
    {
      question: "Comment dire 'Je m’appelle …' en Massango ?",
      options: ["Nkombo ...", "Ndaku ...", "Mimi ...", "Ndeme ..."],
      correctAnswer: "Ndaku ..."
    },
    {
      question: "Quelle est la traduction de 'Je viens du Gabon' en Massango ?",
      options: ["Ndima e Gabon", "Ndimɛɛ Gabon", "Ndakula Gabon", "Ndaku Gabon"],
      correctAnswer: "Ndima e Gabon"
    }
  ],
  // Quiz pour Leçon 13 (Massango: Famille)
  [
    {
      question: "Que signifie 'Baba' en Massango ?",
      options: ["Père", "Mère", "Frère", "Sœur"],
      correctAnswer: "Père"
    },
    {
      question: "Comment dit-on 'Mère' en Massango ?",
      options: ["Mama", "Mimi", "Baba", "Nana"],
      correctAnswer: "Mama"
    }
  ],
  // Quiz pour Leçon 14 (Massango: Nombres)
  [
    {
      question: "Quelle est la traduction de 'Un' en Massango ?",
      options: ["Moja", "Mozo", "Moko", "Muna"],
      correctAnswer: "Moja"
    },
    {
      question: "Comment dit-on 'Cinq' en Massango ?",
      options: ["Tano", "Tata", "Talo", "Tuma"],
      correctAnswer: "Tano"
    }
  ],
  // Quiz pour Leçon 15 (Massango: Voyage)
  [
    {
      question: "Que signifie 'Ndide nde ?' en Massango ?",
      options: ["Où est la toilette ?", "J’ai faim", "Combien ça coûte ?", "Je suis perdu"],
      correctAnswer: "Où est la toilette ?"
    },
    {
      question: "Comment dire 'J’ai besoin d’eau' en Massango ?",
      options: ["Ndaku mayi", "Ndima mayi", "Ndide mayi", "Ndida mayi"],
      correctAnswer: "Ndide mayi"
    }
  ]
];
