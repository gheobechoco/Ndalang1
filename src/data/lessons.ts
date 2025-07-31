// src/data/lessons.ts

export interface LessonEntry {
  french: string;
  // Propriété générique pour les tradu traductions des langues vernaculaires
  vernacularTranslation: string;
  pronunciation: string;
  audioFile?: string; // facultatif
}

export interface Lesson {
  id: number;
  title: string;
  description: string; // Ajouté pour la description de la leçon
  languageName: string; // Ajouté pour le nom complet de la langue
  // Code de la langue de la leçon pour une meilleure organisation
  languageCode: 'fang' | 'nzebi' | 'myene' | 'fr'; // 'massango' remplacé par 'myene'
  entries: LessonEntry[];
  youtubeVideoId?: string; // ID de la vidéo YouTube pour la leçon
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  lessonIds: number[]; // IDs des leçons incluses dans ce chapitre
}

export interface LanguageCourse {
  languageCode: 'fang' | 'nzebi' | 'myene'; // 'massango' remplacé par 'myene'
  languageName: string;
  chapters: Chapter[];
}

export const lessons: Lesson[] = [
  // --- LEÇONS FANG ---
  {
    id: 1,
    title: "Salutations et présentations (Fang)",
    description: "Apprenez les salutations de base et comment vous présenter en langue Fang.",
    languageName: "Fang",
    languageCode: 'fang',
    entries: [
      { french: "Bonjour", vernacularTranslation: "Mbolo", pronunciation: "M-bo-lo", audioFile: "/audios/fang_bonjour.mp3" },
      { french: "Bonsoir", vernacularTranslation: "Mbolo n’ti", pronunciation: "M-bo-lo n-ti", audioFile: "/audios/fang_bonsoir.mp3" },
      { french: "Comment ça va ?", vernacularTranslation: "Ayi bibi ?", pronunciation: "A-yii bi-bi ?", audioFile: "/audios/fang_comment_ca_va.mp3" },
      { french: "Ça va bien, merci", vernacularTranslation: "Ayie mbia, meloko", pronunciation: "A-yee m-bia, me-lo-ko", audioFile: "/audios/fang_oui_je_vais_bien.mp3" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_1"
  },
  {
    id: 2,
    title: "Se présenter (Fang)",
    description: "Découvrez les phrases essentielles pour vous présenter et parler de votre origine en Fang.",
    languageName: "Fang",
    languageCode: 'fang',
    entries: [
      { french: "Je m’appelle …", vernacularTranslation: "Nkombo ai …", pronunciation: "N-kom-bo ay …", audioFile: "/audios/fang_je_mappelle.mp3" },
      { french: "Je viens du Gabon", vernacularTranslation: "Nzo ɛ́ Gabon", pronunciation: "N-zo ɛ́ Ga-bon", audioFile: "/audios/fang_je_viens_du_gabon.mp3" },
      { french: "J’ai _ ans", vernacularTranslation: "Ndi _ mingi", pronunciation: "Ndi _ min-gi", audioFile: "/audios/fang_jai_ans.mp3" },
      { french: "Enchanté de te rencontrer", vernacularTranslation: "Leveri a vo", pronunciation: "Le-ver-i a vo", audioFile: "/audios/fang_enchante.mp3" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_2"
  },
  {
    id: 3,
    title: "Famille et relations (Fang)",
    description: "Apprenez le vocabulaire de base pour parler de la famille et des relations en Fang.",
    languageName: "Fang",
    languageCode: 'fang',
    entries: [
      { french: "Père", vernacularTranslation: "Tata", pronunciation: "Ta-ta", audioFile: "/audios/fang_pere.mp3" },
      { french: "Mère", vernacularTranslation: "Mama", pronunciation: "Ma-ma", audioFile: "/audios/fang_mere.mp3" },
      { french: "Frère", vernacularTranslation: "Nza", pronunciation: "N-za", audioFile: "/audios/fang_frere.mp3" },
      { french: "Sœur", vernacularTranslation: "Zaba", pronunciation: "Za-ba", audioFile: "/audios/fang_soeur.mp3" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_3"
  },
  {
    id: 4,
    title: "Compter de 1 à 10 (Fang)",
    description: "Maîtrisez les nombres de un à dix en langue Fang avec leur prononciation.",
    languageName: "Fang",
    languageCode: 'fang',
    entries: [
      { french: "Un", vernacularTranslation: "Mosi", pronunciation: "Mo-si", audioFile: "/audios/fang_1.mp3" },
      { french: "Deux", vernacularTranslation: "Mibale", pronunciation: "Mi-ba-le", audioFile: "/audios/fang_2.mp3" },
      { french: "Trois", vernacularTranslation: "Mitatu", pronunciation: "Mi-ta-tu", audioFile: "/audios/fang_3.mp3" },
      { french: "Quatre", vernacularTranslation: "Mina", pronunciation: "Mi-na", audioFile: "/audios/fang_4.mp3" },
      { french: "Cinq", vernacularTranslation: "Mitáno", pronunciation: "Mi-ta-no", audioFile: "/audios/fang_5.mp3" },
      { french: "Six", vernacularTranslation: "Muei", pronunciation: "Mu-ei", audioFile: "/audios/fang_6.mp3" },
      { french: "Sept", vernacularTranslation: "Mu᷆vúyi", pronunciation: "Mu-vu-yi", audioFile: "/audios/fang_7.mp3" },
      { french: "Huit", vernacularTranslation: "Muevolu", pronunciation: "Mu-e-vo-lu", audioFile: "/audios/fang_8.mp3" },
      { french: "Neuf", vernacularTranslation: "Muenyi", pronunciation: "Mu-en-yi", audioFile: "/audios/fang_9.mp3" },
      { french: "Dix", vernacularTranslation: "Kèmbo", pronunciation: "Kem-bo", audioFile: "/audios/fang_10.mp3" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_4"
  },
  {
    id: 5,
    title: "Phrases utiles de voyage (Fang)",
    description: "Apprenez des phrases pratiques pour voyager et vous orienter en pays Fang.",
    languageName: "Fang",
    languageCode: 'fang',
    entries: [
      { french: "Où est la toilette ?", vernacularTranslation: "Ayiɛ kɛsɛnɛ ?", pronunciation: "A-yi-ɛ ke-se-nɛ ?", audioFile: "/audios/fang_ou_est_toilette.mp3" },
      { french: "J’ai besoin d’eau", vernacularTranslation: "Ndimɛɛ kwe", pronunciation: "Ndi-mɛ-ɛ kwe", audioFile: "/audios/fang_jai_besoin_eau.mp3" },
      { french: "Combien ça coûte ?", vernacularTranslation: "Mbɛna ɔɛ ?", pronunciation: "Mbɛ-na ɔ-ɛ ?", audioFile: "/audios/fang_combien_ca_coute.mp3" },
      { french: "Je ne comprends pas", vernacularTranslation: "Mbanɔ mbɔ", pronunciation: "M-ba-nɔ m-bɔ", audioFile: "/audios/fang_je_ne_comprends_pas.mp3" },
      { french: "Pouvez-vous répéter ?", vernacularTranslation: "Sobɛ mbanɔ sɔhɛ, na li mbe?", pronunciation: "So-bɛ m-ba-nɔ so-hɛ, na li mbe?", audioFile: "/audios/fang_pouvez_vous_repeter.mp3" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_5"
  },

  // --- LEÇONS NZEBI ---
  // Réorganisation des leçons Nzébi pour un ordre plus logique et des IDs séquentiels
  {
    id: 6, // Ancien ID 7
    title: "Salutations et présentations (Nzébi)",
    description: "Maîtrisez les salutations et les formules de présentation en Nzébi.",
    languageName: "Nzébi",
    languageCode: 'nzebi',
    entries: [
      { french: "Bonjour", vernacularTranslation: "Mbote", pronunciation: "Mbo-te", audioFile: "/audios/nzebi_bonjour.mp3" },
      { french: "Bonsoir", vernacularTranslation: "Mbote mwa nyonga", pronunciation: "Mbo-te mwa n-yon-ga", audioFile: "/audios/nzebi_bonsoir.mp3" },
      { french: "Comment ça va ?", vernacularTranslation: "Osi wá ?", pronunciation: "O-si wa", audioFile: "/audios/nzebi_comment_ca_va.mp3" },
      { french: "Ça va bien, merci", vernacularTranslation: "Nasi malamu, melesi", pronunciation: "Na-si ma-la-mu, me-le-si", audioFile: "/audios/nzebi_ca_va_bien_merci.mp3" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_7" // Garde l'ID YouTube original si lié au contenu
  },
  {
    id: 7, // Ancien ID 8
    title: "Se présenter (Nzébi)",
    description: "Apprenez à vous présenter, dire votre nom et votre origine en Nzébi.",
    languageName: "Nzébi",
    languageCode: 'nzebi',
    entries: [
      { french: "Je m’appelle …", vernacularTranslation: "Nkombo ya ngai …", pronunciation: "N-kom-bo ya ngai", audioFile: "/audios/nzebi_je_mappelle.mp3" },
      { french: "Je viens du Gabon", vernacularTranslation: "Nawa mwa Gabon", pronunciation: "Na-wa mwa Ga-bon", audioFile: "/audios/nzebi_je_viens_du_gabon.mp3" },
      { french: "J’ai _ ans", vernacularTranslation: "Naza na _ mobu", pronunciation: "Na-za na _ mo-bou", audioFile: "/audios/nzebi_jai_ans.mp3" },
      { french: "Enchanté de te rencontrer", vernacularTranslation: "Nasepeli koyeba yo", pronunciation: "Na-se-pe-li ko-ye-ba yo", audioFile: "/audios/nzebi_enchante_de_te_rencontrer.mp3" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_8"
  },
  {
    id: 8, // Ancien ID 9
    title: "Famille et relations (Nzébi)",
    description: "Découvrez le vocabulaire familial et des termes de relations en Nzébi.",
    languageName: "Nzébi",
    languageCode: 'nzebi',
    entries: [
      { french: "Père", vernacularTranslation: "Tata", pronunciation: "Ta-ta", audioFile: "/audios/nzebi_pere.mp3" },
      { french: "Mère", vernacularTranslation: "Mama", pronunciation: "Ma-ma", audioFile: "/audios/nzebi_mere.mp3" },
      { french: "Frère", vernacularTranslation: "Nko", pronunciation: "N-ko", audioFile: "/audios/nzebi_frere.mp3" },
      { french: "Sœur", vernacularTranslation: "Ndeko mwasi", pronunciation: "N-de-ko mwa-si", audioFile: "/audios/nzebi_soeur.mp3" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_9"
  },
  {
    id: 9, // Ancien ID 10
    title: "Compter de 1 à 10 (Nzébi)",
    description: "Apprenez à compter de un à dix en langue Nzébi.",
    languageName: "Nzébi",
    languageCode: 'nzebi',
    entries: [
      { french: "Un", vernacularTranslation: "Moja", pronunciation: "Mo-ja", audioFile: "/audios/nzebi_un.mp3" },
      { french: "Deux", vernacularTranslation: "Mbili", pronunciation: "Mbi-li", audioFile: "/audios/nzebi_deux.mp3" },
      { french: "Trois", vernacularTranslation: "Tatu", pronunciation: "Ta-tu", audioFile: "/audios/nzebi_tres.mp3" },
      { french: "Quatre", vernacularTranslation: "Nne", pronunciation: "N-nè", audioFile: "/audios/nzebi_quatre.mp3" },
      { french: "Cinq", vernacularTranslation: "Tano", pronunciation: "Ta-no", audioFile: "/audios/nzebi_cinq.mp3" },
      { french: "Six", vernacularTranslation: "Sita", pronunciation: "Si-ta", audioFile: "/audios/nzebi_six.mp3" },
      { french: "Sept", vernacularTranslation: "Saba", pronunciation: "Sa-ba", audioFile: "/audios/nzebi_sept.mp3" },
      { french: "Huit", vernacularTranslation: "Nane", pronunciation: "Na-ne", audioFile: "/audios/nzebi_huit.mp3" },
      { french: "Neuf", vernacularTranslation: "Tisa", pronunciation: "Ti-sa", audioFile: "/audios/nzebi_neuf.mp3" },
      { french: "Dix", vernacularTranslation: "Kumi", pronunciation: "Ku-mi", audioFile: "/audios/nzebi_dix.mp3" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_10"
  },
  {
    id: 10, // Ancien ID 6
    title: "Phrases utiles de voyage (Nzébi)", // Titre mis à jour pour cohérence
    description: "Apprenez des phrases courantes et utiles pour la vie quotidienne en langue Nzébi.",
    languageName: "Nzébi",
    languageCode: 'nzebi',
    entries: [
      { french: "Où est la toilette ?", vernacularTranslation: "Kɛsɛnɛ y’a nsi ?", pronunciation: "ke‑se‑nɛ ya n‑si", audioFile: "/audios/nzebi_ou_est_la_toilette.mp3" },
      { french: "J’ai besoin d’eau", vernacularTranslation: "Ndimɛɛ mwa mayi", pronunciation: "ndi‑mɛ‑ɛ mwa ma‑yi", audioFile: "/audios/nzebi_jai_besoin_deau.mp3" },
      { french: "Combien ça coûte ?", vernacularTranslation: "Bɛna bɔni ?", pronunciation: "bè‑na bɔ‑ni", audioFile: "/audios/nzebi_combien_ca_coute.mp3" },
      { french: "Je ne comprends pas", vernacularTranslation: "Mbanɔ mbɔ", pronunciation: "mba‑nɔ mbɔ", audioFile: "/audios/nzebi_je_ne_comprends_pas.mp3" },
      { french: "Pouvez-vous répéter, s’il vous plaît ?", vernacularTranslation: "Sobɛ mbanɔ sɔhɛ, na limbe ?", pronunciation: "so‑bɛ mba‑nɔ so‑hɛ na li‑mbe", audioFile: "/audios/nzebi_pouvez_vous_repeter.mp3" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_6" // Garde l'ID YouTube original si lié au contenu
  },

  // --- LEÇONS MYENE (Anciennement Massango) ---
  {
    id: 11,
    title: "Salutations et présentations (Myene)",
    description: "Apprenez les salutations de base et comment vous présenter en langue Myene.",
    languageName: "Myene",
    languageCode: 'myene',
    entries: [
      { french: "Bonjour", vernacularTranslation: "Mbolo", pronunciation: "M-bo-lo", audioFile: "/audios/myene_bonjour.mp3" },
      { french: "Bonsoir", vernacularTranslation: "Mbolo n'gwa", pronunciation: "M-bo-lo n-gwa", audioFile: "/audios/myene_bonsoir.mp3" },
      { french: "Comment ça va ?", vernacularTranslation: "Oyelele ?", pronunciation: "O-ye-le-le ?", audioFile: "/audios/myene_comment_ca_va.mp3" },
      { french: "Ça va bien, merci", vernacularTranslation: "Ndiya, akiba", pronunciation: "Ndi-ya, a-ki-ba", audioFile: "/audios/myene_ca_va_bien_merci.mp3" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_11"
  },
  {
    id: 12,
    title: "Se présenter (Myene)",
    description: "Découvrez les phrases essentielles pour vous présenter et parler de votre origine en Myene.",
    languageName: "Myene",
    languageCode: 'myene',
    entries: [
      { french: "Je m’appelle …", vernacularTranslation: "Nkombo yami …", pronunciation: "N-kom-bo ya-mi …", audioFile: "/audios/myene_je_mappelle.mp3" },
      { french: "Je viens du Gabon", vernacularTranslation: "Ndiya Gabon", pronunciation: "Ndi-ya Ga-bon", audioFile: "/audios/myene_je_viens_du_gabon.mp3" },
      { french: "J’ai _ ans", vernacularTranslation: "Ndi _ mbu", pronunciation: "Ndi _ mbu", audioFile: "/audios/myene_jai_ans.mp3" },
      { french: "Enchanté de te rencontrer", vernacularTranslation: "Nasepele kukanda", pronunciation: "Na-se-pe-le ku-ka-nda", audioFile: "/audios/myene_enchante.mp3" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_12"
  },
  {
    id: 13,
    title: "Famille et relations (Myene)",
    description: "Apprenez le vocabulaire de base pour parler de la famille et des relations en Myene.",
    languageName: "Myene",
    languageCode: 'myene',
    entries: [
      { french: "Père", vernacularTranslation: "Tata", pronunciation: "Ta-ta", audioFile: "/audios/myene_pere.mp3" },
      { french: "Mère", vernacularTranslation: "Mama", pronunciation: "Ma-ma", audioFile: "/audios/myene_mere.mp3" },
      { french: "Frère", vernacularTranslation: "Nko", pronunciation: "N-ko", audioFile: "/audios/myene_frere.mp3" },
      { french: "Sœur", vernacularTranslation: "Ndeko mwasi", pronunciation: "N-de-ko mwa-si", audioFile: "/audios/myene_soeur.mp3" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_13"
  },
  {
    id: 14,
    title: "Compter de 1 à 10 (Myene)",
    description: "Maîtrisez les nombres de un à dix en langue Myene avec leur prononciation.",
    languageName: "Myene",
    languageCode: 'myene',
    entries: [
      { french: "Un", vernacularTranslation: "Mosi", pronunciation: "Mo-si", audioFile: "/audios/myene_1.mp3" },
      { french: "Deux", vernacularTranslation: "Mibale", pronunciation: "Mi-ba-le", audioFile: "/audios/myene_2.mp3" },
      { french: "Trois", vernacularTranslation: "Mitatu", pronunciation: "Mi-ta-tu", audioFile: "/audios/myene_3.mp3" },
      { french: "Quatre", vernacularTranslation: "Mina", pronunciation: "Mi-na", audioFile: "/audios/myene_4.mp3" },
      { french: "Cinq", vernacularTranslation: "Mitanu", pronunciation: "Mi-ta-nu", audioFile: "/audios/myene_5.mp3" },
      { french: "Six", vernacularTranslation: "Mutoba", pronunciation: "Mu-to-ba", audioFile: "/audios/myene_6.mp3" },
      { french: "Sept", vernacularTranslation: "Nsambanu", pronunciation: "N-sa-mba-nu", audioFile: "/audios/myene_7.mp3" },
      { french: "Huit", vernacularTranslation: "Mombili", pronunciation: "Mo-mbi-li", audioFile: "/audios/myene_8.mp3" },
      { french: "Neuf", vernacularTranslation: "Mowambi", pronunciation: "Mo-wa-mbi", audioFile: "/audios/myene_9.mp3" },
      { french: "Dix", vernacularTranslation: "Dikumi", pronunciation: "Di-ku-mi", audioFile: "/audios/myene_10.mp3" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_14"
  },
  {
    id: 15,
    title: "Phrases utiles de voyage (Myene)",
    description: "Apprenez des phrases pratiques pour voyager et vous orienter en pays Myene.",
    languageName: "Myene",
    languageCode: 'myene',
    entries: [
      { french: "Où est la toilette ?", vernacularTranslation: "Ndidi n'tolo ?", pronunciation: "Ndi-di n-to-lo ?", audioFile: "/audios/myene_ou_est_la_toilette.mp3" },
      { french: "J’ai besoin d’eau", vernacularTranslation: "Ndiya mayi", pronunciation: "Ndi-ya ma-yi", audioFile: "/audios/myene_jai_besoin_eau.mp3" },
      { french: "Combien ça coûte ?", vernacularTranslation: "Mbena mbani ?", pronunciation: "Mbe-na mba-ni ?", audioFile: "/audios/myene_combien_ca_coute.mp3" },
      { french: "Je ne comprends pas", vernacularTranslation: "Ndikanda te", pronunciation: "Ndi-ka-nda te", audioFile: "/audios/myene_je_ne_comprends_pas.mp3" },
      { french: "Pouvez-vous répéter ?", vernacularTranslation: "Kanda lisusu ?", pronunciation: "Ka-nda li-su-su ?", audioFile: "/audios/myene_pouvez_vous_repeter.mp3" }
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_15"
  },
];

export const languageCourses: LanguageCourse[] = [
  {
    languageCode: 'fang',
    languageName: 'Fang',
    chapters: [
      { id: 1, title: "Chapitre 1: Bases de la communication", description: "Ce chapitre couvre les salutations, les présentations et le vocabulaire essentiel pour les interactions quotidiennes.", lessonIds: [1, 2, 3] },
      { id: 2, title: "Chapitre 2: Nombres et expressions courantes", description: "Apprenez à compter et à utiliser des phrases pratiques pour le voyage et les situations courantes.", lessonIds: [4, 5] },
    ],
  },
  {
    languageCode: 'nzebi',
    languageName: 'Nzébi',
    chapters: [
      // IDs de leçons mis à jour pour refléter la nouvelle séquence Nzébi
      { id: 3, title: "Chapitre 1: Bases de la communication", description: "Ce chapitre vous introduit aux salutations, présentations et vocabulaire familial en Nzébi.", lessonIds: [6, 7, 8] },
      { id: 4, title: "Chapitre 2: Nombres et phrases utiles", description: "Maîtrisez les nombres et des phrases pratiques pour les situations de tous les jours en Nzébi.", lessonIds: [9, 10] },
    ],
  },
  {
    languageCode: 'myene',
    languageName: 'Myene',
    chapters: [
      { id: 5, title: "Chapitre 1: Bases de la communication", description: "Ce chapitre vous introduit aux salutations, présentations et vocabulaire familial en Myene.", lessonIds: [11, 12, 13] },
      { id: 6, title: "Chapitre 2: Nombres et phrases utiles", description: "Apprenez à compter et des phrases pratiques pour le voyage et les interactions courantes en Myene.", lessonIds: [14, 15] },
    ],
  },
];
