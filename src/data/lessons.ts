// src/data/lessons.ts

export interface LessonEntry {
  french: string;
  // Propriété générique pour les traductions des langues vernaculaires
  vernacularTranslation: string; 
  pronunciation: string;
  audioFile?: string; // facultatif
}

export interface Lesson {
  id: number;
  title: string;
  // Code de la langue de la leçon pour une meilleure organisation
  languageCode: 'fang' | 'nzebi' | 'massango' | 'fr'; // 'massango-new' ajouté ici
  entries: LessonEntry[];
  youtubeVideoId?: string; // ID de la vidéo YouTube pour la leçon
}

export const lessons: Lesson[] = [
  // --- LEÇONS FANG ---
  {
    id: 1,
    title: "Salutations et présentations (Fang)", 
    languageCode: 'fang', 
    entries: [
      { french: "Bonjour", vernacularTranslation: "Mbolo", pronunciation: "M-bo-lo", audioFile: "/audios/mbolo.mp4" }, 
      { french: "Bonsoir", vernacularTranslation: "Mbolo n’ti", pronunciation: "M-bo-lo n-ti", audioFile: "/audios/bonsoir.mp4" },
      { french: "Comment ça va ?", vernacularTranslation: "Ayi bibi ?", pronunciation: "A-yii bi-bi ?", audioFile: "/audios/comment ca va .mp4" },
      { french: "Ça va bien, merci", vernacularTranslation: "Ayie mbia, meloko", pronunciation: "A-yee m-bia, me-lo-ko", audioFile: "public/audios/oui-je-vais-bien.mp4" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_1" // Remplacez par l'ID réel
  },
  {
    id: 2,
    title: "Se présenter (Fang)",
    languageCode: 'fang',
    entries: [
      { french: "Je m’appelle …", vernacularTranslation: "Nkombo ai …", pronunciation: "N-kom-bo ay …", audioFile: "public/audios/je=mappelle.mp4" },
      { french: "Je viens du Gabon", vernacularTranslation: "Nzo ɛ́ Gabon", pronunciation: "N-zo ɛ́ Ga-bon", audioFile: "fang_nzo_e_gab.mp3" },
      { french: "J’ai _ ans", vernacularTranslation: "Ndi _ mingi", pronunciation: "Ndi _ min-gi", audioFile: "fang_ndi_mingi.mp3" },
      { french: "Enchanté de te rencontrer", vernacularTranslation: "Leveri a vo", pronunciation: "Le-ver-i a vo", audioFile: "public/audios/enchnater.mp4" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_2" 
  },
  {
    id: 3,
    title: "Famille et relations (Fang)",
    languageCode: 'fang',
    entries: [
      { french: "Père", vernacularTranslation: "Tata", pronunciation: "Ta-ta", audioFile: "fang_tata.mp3" },
      { french: "Mère", vernacularTranslation: "Mama", pronunciation: "Ma-ma", audioFile: "fang_mama.mp3" },
      { french: "Frère", vernacularTranslation: "Nza", pronunciation: "N-za", audioFile: "fang_nza.mp3" },
      { french: "Sœur", vernacularTranslation: "Zaba", pronunciation: "Za-ba", audioFile: "fang_zaba.mp3" },
      { french: "Mon père s’appelle …", vernacularTranslation: "Tata m’kombo ai …", pronunciation: "Ta-ta m-kom-bo ay …", audioFile: "fang_tata_mkombo_ai.mp3" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_3" 
  },
  {
    id: 4,
    title: "Compter de 1 à 10 (Fang)",
    languageCode: 'fang',
    entries: [
      { french: "Un", vernacularTranslation: "Mosi", pronunciation: "Mo-si", audioFile: "public/audios/1.mp3" },
      { french: "Deux", vernacularTranslation: "Mibale", pronunciation: "Mi-ba-le", audioFile: "public/audios/2.mp4" },
      { french: "Trois", vernacularTranslation: "Mitatu", pronunciation: "Mi-ta-tu", audioFile: "public/audios/3.mp4" },
      { french: "Quatre", vernacularTranslation: "Mina", pronunciation: "Mi-na", audioFile: "public/audios/4.mp4" },
      { french: "Cinq", vernacularTranslation: "Mitáno", pronunciation: "Mi-ta-no", audioFile: "public/audios/5.mp4" },
      { french: "Six", vernacularTranslation: "Muei", pronunciation: "Mu-ei", audioFile: "public/audios/6.mp4" },
      { french: "Sept", vernacularTranslation: "Mu᷆vúyi", pronunciation: "Mu-vu-yi", audioFile: "public/audios/7.mp4" },
      { french: "Huit", vernacularTranslation: "Muevolu", pronunciation: "Mu-e-vo-lu", audioFile: "public/audios/8.mp4" },
      { french: "Neuf", vernacularTranslation: "Muenyi", pronunciation: "Mu-en-yi", audioFile: "public/audios/9.mp4" },
      { french: "Dix", vernacularTranslation: "Kèmbo", pronunciation: "Kem-bo", audioFile: "public/audios/10.mp4" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_4" 
  },
  {
    id: 5,
    title: "Phrases utiles de voyage (Fang)",
    languageCode: 'fang',
    entries: [
      { french: "Où est la toilette ?", vernacularTranslation: "Ayiɛ kɛsɛnɛ ?", pronunciation: "A-yi-ɛ ke-se-nɛ ?", audioFile: "public/audios/ou=est=toilette.mp4" },
      { french: "J’ai besoin d’eau", vernacularTranslation: "Ndimɛɛ kwe", pronunciation: "Ndi-mɛ-ɛ kwe", audioFile: "fang_ndimee_kwe.mp3" },
      { french: "Combien ça coûte ?", vernacularTranslation: "Mbɛna ɔɛ ?", pronunciation: "Mbɛ-na ɔ-ɛ ?", audioFile: "public/audios/combien.mp4" },
      { french: "Je ne comprends pas", vernacularTranslation: "Mbanɔ mbɔ", pronunciation: "M-ba-nɔ m-bɔ", audioFile: "public/audios/je=ne=comprends=paas.mp4" },
      { french: "Pouvez-vous répéter ?", vernacularTranslation: "Sobɛ mbanɔ sɔhɛ, na li mbe?", pronunciation: "So-bɛ m-ba-nɔ so-hɛ, na li mbe?", audioFile: "public/audios/vous=puvez=repeter.mp4" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_5" 
  },
  // --- LEÇONS NZEBI ---
  {
    id: 6, 
    title: "Phrases utiles en Nzébi", 
    languageCode: 'nzebi', 
    entries: [
      { french: "Où est la toilette ?", vernacularTranslation: "Kɛsɛnɛ y’a nsi ?", pronunciation: "ke‑se‑nɛ ya n‑si" },
      { french: "J’ai besoin d’eau", vernacularTranslation: "Ndimɛɛ mwa mayi", pronunciation: "ndi‑mɛ‑ɛ mwa ma‑yi" },
      { french: "Combien ça coûte ?", vernacularTranslation: "Bɛna bɔni ?", pronunciation: "bè‑na bɔ‑ni" },
      { french: "Je ne comprends pas", vernacularTranslation: "Mbanɔ mbɔ", pronunciation: "mba‑nɔ mbɔ" },
      { french: "Pouvez-vous répéter, s’il vous plaît ?", vernacularTranslation: "Sobɛ mbanɔ sɔhɛ, na limbe ?", pronunciation: "so‑bɛ mba‑nɔ so‑hɛ na li‑mbe" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_6" 
  },
  {
    id: 7, 
    title: "Salutations et présentations (Nzébi)",
    languageCode: 'nzebi',
    entries: [
      { french: "Bonjour", vernacularTranslation: "Mbote", pronunciation: "Mbo-te" },
      { french: "Bonsoir", vernacularTranslation: "Mbote mwa nyonga", pronunciation: "Mbo-te mwa n-yon-ga" },
      { french: "Comment ça va ?", vernacularTranslation: "Osi wá ?", pronunciation: "O-si wa" },
      { french: "Ça va bien, merci", vernacularTranslation: "Nasi malamu, melesi", pronunciation: "Na-si ma-la-mu, me-le-si" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_7"
  },
  {
    id: 8, 
    title: "Se présenter (Nzébi)",
    languageCode: 'nzebi',
    entries: [
      { french: "Je m’appelle …", vernacularTranslation: "Nkombo ya ngai …", pronunciation: "N-kom-bo ya ngai" },
      { french: "Je viens du Gabon", vernacularTranslation: "Nawa mwa Gabon", pronunciation: "Na-wa mwa Ga-bon" },
      { french: "J’ai _ ans", vernacularTranslation: "Naza na _ mobu", pronunciation: "Na-za na _ mo-bou" },
      { french: "Enchanté de te rencontrer", vernacularTranslation: "Nasepeli koyeba yo", pronunciation: "Na-se-pe-li ko-ye-ba yo" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_8"
  },
  {
    id: 9, 
    title: "Famille et relations (Nzébi)",
    languageCode: 'nzebi',
    entries: [
      { french: "Père", vernacularTranslation: "Tata", pronunciation: "Ta-ta" },
      { french: "Mère", vernacularTranslation: "Mama", pronunciation: "Ma-ma" },
      { french: "Frère", vernacularTranslation: "Nko", pronunciation: "N-ko" },
      { french: "Sœur", vernacularTranslation: "Ndeko mwasi", pronunciation: "N-de-ko mwa-si" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_9"
  },
  {
    id: 10, 
    title: "Compter de 1 à 10 (Nzébi)",
    languageCode: 'nzebi',
    entries: [
      { french: "Un", vernacularTranslation: "Moja", pronunciation: "Mo-ja" },
      { french: "Deux", vernacularTranslation: "Mbili", pronunciation: "Mbi-li" },
      { french: "Trois", vernacularTranslation: "Tatu", pronunciation: "Ta-tu" },
      { french: "Quatre", vernacularTranslation: "Nne", pronunciation: "N-nè" },
      { french: "Cinq", vernacularTranslation: "Tano", pronunciation: "Ta-no" },
      { french: "Six", vernacularTranslation: "Sita", pronunciation: "Si-ta" },
      { french: "Sept", vernacularTranslation: "Saba", pronunciation: "Sa-ba" },
      { french: "Huit", vernacularTranslation: "Nane", pronunciation: "Na-ne" },
      { french: "Neuf", vernacularTranslation: "Tisa", pronunciation: "Ti-sa" },
      { french: "Dix", vernacularTranslation: "Kumi", pronunciation: "Ku-mi" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_10"
  },
  // --- LEÇONS MASSANGO (Anciennes) ---
  {
    id: 11,
    title: "Salutations et présentations (Massango - Ancien)",
    languageCode: 'massango',
    entries: [
      { french: "Bonjour", vernacularTranslation: "Ndeme", pronunciation: "N-de-me" },
      { french: "Bonsoir", vernacularTranslation: "Ndeme wa mbala", pronunciation: "N-de-me wa m-ba-la" },
      { french: "Comment ça va ?", vernacularTranslation: "Ndɛ tɛ̃ ?", pronunciation: "Ndɛ tɛ̃" },
      { french: "Ça va bien, merci", vernacularTranslation: "Ndɛ malamu, akiba", pronunciation: "Ndɛ ma-la-mu, a-ki-ba" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_11" 
  },
  {
    id: 12,
    title: "Se présenter (Massango - Ancien)",
    languageCode: 'massango',
    entries: [
      { french: "Je m’appelle …", vernacularTranslation: "Ndaku …", pronunciation: "Ndaku …" },
      { french: "Je viens du Gabon", vernacularTranslation: "Ndima e Gabon", pronunciation: "Ndi-ma é Ga-bon" },
      { french: "J’ai _ ans", vernacularTranslation: "Ndi _ mobu", pronunciation: "Ndi _ mo-bou" },
      { french: "Enchanté de te rencontrer", vernacularTranslation: "Nasɛpɛli koyeba yo", pronunciation: "Na-sɛ-pɛ-li ko-ye-ba yo" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_12" 
  },
  {
    id: 13,
    title: "Famille et relations (Massango - Ancien)",
    languageCode: 'massango',
    entries: [
      { french: "Père", vernacularTranslation: "Baba", pronunciation: "Ba-ba" },
      { french: "Mère", vernacularTranslation: "Mama", pronunciation: "Ma-ma" },
      { french: "Frère", vernacularTranslation: "Nko", pronunciation: "N-ko" },
      { french: "Sœur", vernacularTranslation: "Ndeko mwasi", pronunciation: "N-de-ko mwa-si" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_13" 
  },
  {
    id: 14,
    title: "Compter de 1 à 10 (Massango - Ancien)",
    languageCode: 'massango',
    entries: [
      { french: "Un", vernacularTranslation: "Moja", pronunciation: "Mo-ja" },
      { french: "Deux", vernacularTranslation: "Mbili", pronunciation: "Mbi-li" },
      { french: "Trois", vernacularTranslation: "Tatu", pronunciation: "Ta-tu" },
      { french: "Quatre", vernacularTranslation: "Nne", pronunciation: "N-nè" },
      { french: "Cinq", vernacularTranslation: "Tano", pronunciation: "Ta-no" },
      { french: "Six", vernacularTranslation: "Sita", pronunciation: "Si-ta" },
      { french: "Sept", vernacularTranslation: "Saba", pronunciation: "Sa-ba" },
      { french: "Huit", vernacularTranslation: "Nane", pronunciation: "Na-ne" },
      { french: "Neuf", vernacularTranslation: "Tisa", pronunciation: "Ti-sa" },
      { french: "Dix", vernacularTranslation: "Kumi", pronunciation: "Ku-mi" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_14" 
  },
  {
    id: 15,
    title: "Phrases utiles de voyage (Massango - Ancien)",
    languageCode: 'massango',
    entries: [
      { french: "Où est la toilette ?", vernacularTranslation: "Ndide nde ?", pronunciation: "Ndi-de nde ?" },
      { french: "J’ai besoin d’eau", vernacularTranslation: "Ndide mayi", pronunciation: "Ndi-de ma-yi" },
      { french: "Combien ça coûte ?", vernacularTranslation: "Bɛna bɔni ?", pronunciation: "Bè-na bɔ-ni" },
      { french: "Je ne comprends pas", vernacularTranslation: "Mbanɔ mbɔ", pronunciation: "Mba-nɔ mbɔ" },
      { french: "Pouvez-vous répéter ?", vernacularTranslation: "Sobɛ mbanɔ sɔhɛ, na limbe ?", pronunciation: "So-bɛ mba-nɔ so-hɛ na li-mbe" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_15" 
  },
];
