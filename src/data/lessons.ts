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
  languageCode: 'fang' | 'guissir' | 'myene' | 'fr'; // 'massango' remplacé par 'myene'
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
    languageCode: 'fang' | 'guissir' | 'myene'; // 'massango' remplacé par 'myene'
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
    },

    // --- LEÇONS GUISSIR (ancien Nzebi) ---
    {
      id: 6,
      title: "Salutations et présentations (Guissir)",
      description: "Maîtrisez les salutations et les formules de présentation en Guissir.",
      languageName: "Guissir",
      languageCode: 'guissir',
      entries: [
        { french: "Bonjour", vernacularTranslation: "mbulu mekièle", pronunciation: "Mbo-te", audioFile: "/audios/guissir-bonjour.mp3" },
        { french: "Bonsoir", vernacularTranslation: "mbulu i tsisig", pronunciation: "Mbo-te mwa n-yon-ga", audioFile: "/audios/guissir-bonsoir.mp3" },
        { french: "Comment ça va ?", vernacularTranslation: "U dikéngi' a ?", pronunciation: "O-si wa", audioFile: "/audios/guissir-combien-ca-coute.mp3" },
        { french: "Ça va bien, merci", vernacularTranslation: "Ni dikéngi, diboti", pronunciation: "Na-si ma-la-mu, me-le-si", audioFile: "/audios/guissir-ca-va-bien-merci.mp3" }
      ],
    },
    {
      id: 7,
      title: "Se présenter (Guissir)",
      description: "Apprenez à vous présenter, dire votre nom et votre origine en Guissir.",
      languageName: "Guissir",
      languageCode: 'guissir',
      entries: [
        { french: "Je m’appelle …", vernacularTranslation: "Dine, diami …", pronunciation: "N-kom-bo ya ngai", audioFile: "/audios/guissir-je-mapelle.mp3" },
        { french: "Je viens du Gabon", vernacularTranslation: "Nya rugili gu Gabu", pronunciation: "Na-wa mwa Ga-bon", audioFile: "/audios/guissir-je-viens-du-gabon.mp3" },
        { french: "J’ai _ ans", vernacularTranslation: "Naza na _ mobu", pronunciation: "Na-za na _ mo-bou", audioFile: "/audios/guissir-jai-ans.mp3" },
        { french: "Enchanté de te rencontrer", vernacularTranslation: "Diboti di gu kwène", pronunciation: "Na-se-pe-li ko-ye-ba yo", audioFile: "/audios/guissir-enchanter.mp3" }
      ],
    },
    {
      id: 8,
      title: "Famille et relations (Guissir)",
      description: "Découvrez le vocabulaire familial et des termes de relations en Guissir.",
      languageName: "Guissir",
      languageCode: 'guissir',
      entries: [
        { french: "Père", vernacularTranslation: "Taye", pronunciation: "Ta-ta", audioFile: "/audios/guissir-pere.mp3" },
        { french: "Mère", vernacularTranslation: "Nguye", pronunciation: "Ma-ma", audioFile: "/audios/guissir-mere.mp3" },
        { french: "Frère", vernacularTranslation: "Mwane nguye dibagle", pronunciation: "N-ko", audioFile: "/audios/guissir-frere.mp3" },
        { french: "Sœur", vernacularTranslation: "Mwane nguye mugétu ou Kétu", pronunciation: "N-de-ko mwa-si", audioFile: "/audios/guissir-soeur.mp3" }
      ],
    
    },
    {
      id: 9,
      title: "Compter de 1 à 10 (Guissir)",
      description: "Apprenez à compter de un à dix en langue Guissir.",
      languageName: "Guissir",
      languageCode: 'guissir',
      entries: [
        { french: "Un", vernacularTranslation: "Mosi", pronunciation: "Mo-ja", audioFile: "/audios/guissir-1.mp3" },
        { french: "Deux", vernacularTranslation: "bèyi", pronunciation: "Mbi-li", audioFile: "/audios/guissir-2.mp3" },
        { french: "Trois", vernacularTranslation: "iréru", pronunciation: "Ta-tu", audioFile: "/audios/guissir-3.mp3" },
        { french: "Quatre", vernacularTranslation: "Ine", pronunciation: "N-nè", audioFile: "/audios/guissir_4.mp3" },
        { french: "Cinq", vernacularTranslation: "iranu", pronunciation: "Ta-no", audioFile: "/audios/guissir_5.mp3" },
        { french: "Six", vernacularTranslation: "i siamnu", pronunciation: "Si-ta", audioFile: "/audios/guissir_6.mp3" },
        { french: "Sept", vernacularTranslation: "bine gu biréru", pronunciation: "Sa-ba", audioFile: "/audios/guissir_7.mp3" },
        { french: "Huit", vernacularTranslation: "ginane", pronunciation: "Na-ne", audioFile: "/audios/guissir-8.mp3" },
        { french: "Neuf", vernacularTranslation: "kambu mosi", pronunciation: "Ti-sa", audioFile: "/audios/guissir_9.mp3" },
        { french: "Dix", vernacularTranslation: "digumi", pronunciation: "Ku-mi", audioFile: "/audios/guissir_10.mp3" }
      ],
      
    },
    {
      id: 10,
      title: "Phrases utiles de voyage (Guissir)",
      description: "Apprenez des phrases courantes et utiles pour la vie quotidienne en langue Guissir.",
      languageName: "Guissir",
      languageCode: 'guissir',
      entries: [
        { french: "Où est la toilette ?", vernacularTranslation: "A tsomu i gû ?", pronunciation: "ke-se-nɛ ya n-si", audioFile: "/audios/guissir-ou-est-a-toilette.mp3" },
        { french: "J’ai besoin d’eau", vernacularTranslation: "Ni ne pwile mambe", pronunciation: "ndi-mɛ-ɛ mwa ma-yi", audioFile: "/audios/guissir-jai-besoin-deau (online-audio-converter.com).mp3" },
        { french: "Combien ça coûte ?", vernacularTranslation: "A disumbu, kwè ?", pronunciation: "bè-na bɔ-ni", audioFile: "/audios/guissir-combien-ca-coute.mp3" },
        { french: "Je ne comprends pas", vernacularTranslation: "Nza( Ntsa) gulu", pronunciation: "mba-nɔ mbɔ", audioFile: "/audios/guissir-je-ne-comprends-pas.mp3" },
        { french: "Pouvez-vous répéter ?", vernacularTranslation: "Nza gueule dikéngi, u bénie kunde gwambil' a ?", pronunciation: "so-bɛ mba-nɔ so-hɛ na li-mbe", audioFile: "/audios/guissir-vous-pouvez-repeter.mp3" }
      ],
    },
    // --- LEÇONS MYENE (Anciennement Massango) ---
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
    ]
  },
  {
    id: 15,
    title: "Phrases utiles de voyage (Myene)",
    description: "Apprenez des phrases pratiques pour voyager et vous orienter en pays Myene.",
    languageName: "Myene",
    languageCode: 'myene',
    entries: [
      { french: "Où est la toilette ?", vernacularTranslation: "Ndidi n'tolo ?", pronunciation: "Ndi-di n-to-lo ?", audioFile: "/audios/myene_ou_est_toilette.mp3" },
      { french: "J'ai besoin d'eau", vernacularTranslation: "Ndiya mayi", pronunciation: "Ndi-ya ma-yi", audioFile: "/audios/myene_jai_besoin_eau.mp3" },
      { french: "Combien ça coûte ?", vernacularTranslation: "Mbena mbani ?", pronunciation: "Mbe-na mba-ni ?", audioFile: "/audios/myene_combien_ca_coute.mp3" },
      { french: "Je ne comprends pas", vernacularTranslation: "Ndikanda te", pronunciation: "Ndi-ka-nda te", audioFile: "/audios/myene_je_ne_comprends_pas.mp3" },
      { french: "Pouvez-vous répéter ?", vernacularTranslation: "Kanda lisusu ?", pronunciation: "Ka-nda li-su-su ?", audioFile: "/audios/myene_pouvez_vous_repeter.mp3" }
    ]
  }
];

export const languageCourses: LanguageCourse[] = [
  {
    languageCode: 'fang',
    languageName: 'Fang',
    chapters: [
      { id: 1, title: "Chapitre 1: Bases de la communication", description: "Ce chapitre couvre les salutations, les présentations et le vocabulaire essentiel pour les interactions quotidiennes.", lessonIds: [1, 2, 3] },
      { id: 2, title: "Chapitre 2: Nombres et expressions courantes", description: "Apprenez à compter et à utiliser des phrases pratiques pour le voyage et les situations courantes.", lessonIds: [4, 5] }
    ]
  },
  {
    languageCode: 'guissir',
    languageName: 'Guissir',
    chapters: [
      { id: 3, title: "Chapitre 1: Bases de la communication", description: "Ce chapitre vous introduit aux salutations, présentations et vocabulaire familial en Guissir.", lessonIds: [6, 7, 8] },
      { id: 4, title: "Chapitre 2: Nombres et phrases utiles", description: "Maîtrisez les nombres et des phrases pratiques pour les situations de tous les jours en Guissir.", lessonIds: [9, 10] }
    ]
  },
  {
    languageCode: 'myene',
    languageName: 'Myene',
    chapters: [
      { id: 5, title: "Chapitre 1: Bases de la communication", description: "Ce chapitre vous introduit aux salutations, présentations et vocabulaire familial en Myene.", lessonIds: [11, 12, 13] },
      { id: 6, title: "Chapitre 2: Nombres et phrases utiles", description: "Apprenez à compter et des phrases pratiques pour le voyage et les interactions courantes en Myene.", lessonIds: [14, 15] }
    ]
  }
  ];
