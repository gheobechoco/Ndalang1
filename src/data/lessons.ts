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
  // Code de la langue de la leçon pour une meilleure organisation
  languageCode: 'fang' | 'nzebi' | 'massango' | 'fr';
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
  languageCode: 'fang' | 'nzebi' | 'massango';
  languageName: string;
  chapters: Chapter[];
}

export const lessons: Lesson[] = [
  // --- LEÇONS FANG ---
  {
    id: 1,
    title: "Salutations et présentations (Fang)", 
    languageCode: 'fang', 
    entries: [
      { french: "Bonjour", vernacularTranslation: "Mbolo", pronunciation: "M-bo-lo", audioFile: "/audios/fang_bonjour.mp3" }, 
      { french: "Bonsoir", vernacularTranslation: "Mbolo n’ti", pronunciation: "M-bo-lo n-ti", audioFile: "/audios/fang_bonsoir.mp3" }, // Supposant un fichier bonsoir.mp3
      { french: "Comment ça va ?", vernacularTranslation: "Ayi bibi ?", pronunciation: "A-yii bi-bi ?", audioFile: "/audios/fang_comment_ca_va.mp3" }, 
      { french: "Ça va bien, merci", vernacularTranslation: "Ayie mbia, meloko", pronunciation: "A-yee m-bia, me-lo-ko", audioFile: "/audios/fang_oui_je_vais_bien.mp3" } 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_1" 
  },
  {
    id: 2,
    title: "Se présenter (Fang)",
    languageCode: 'fang',
    entries: [
      { french: "Je m’appelle …", vernacularTranslation: "Nkombo ai …", pronunciation: "N-kom-bo ay …", audioFile: "/audios/fang_je_mappelle.mp3" }, 
      { french: "Je viens du Gabon", vernacularTranslation: "Nzo ɛ́ Gabon", pronunciation: "N-zo ɛ́ Ga-bon", audioFile: "/audios/fang_je_viens_du_gabon.mp3" }, 
      { french: "J’ai _ ans", vernacularTranslation: "Ndi _ mingi", pronunciation: "Ndi _ min-gi", audioFile: "/audios/fang_jai_ans.mp3" }, // Supposant un fichier jai_ans.mp3
      { french: "Enchanté de te rencontrer", vernacularTranslation: "Leveri a vo", pronunciation: "Le-ver-i a vo", audioFile: "/audios/fang_enchante.mp3" } // Supposant un fichier enchante.mp3
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_2" 
  },
  {
    id: 3,
    title: "Famille et relations (Fang)",
    languageCode: 'fang',
    entries: [
      { french: "Père", vernacularTranslation: "Tata", pronunciation: "Ta-ta", audioFile: "/audios/fang_pere.mp3" }, // Supposant un fichier pere.mp3
      { french: "Mère", vernacularTranslation: "Mama", pronunciation: "Ma-ma", audioFile: "/audios/fang_mere.mp3" }, // Supposant un fichier mere.mp3
      { french: "Frère", vernacularTranslation: "Nza", pronunciation: "N-za", audioFile: "/audios/fang_frere.mp3" }, 
      { french: "Sœur", vernacularTranslation: "Zaba", pronunciation: "Za-ba", audioFile: "/audios/fang_soeur.mp3" } 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_3" 
  },
  {
    id: 4,
    title: "Compter de 1 à 10 (Fang)",
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
    languageCode: 'fang',
    entries: [
      { french: "Où est la toilette ?", vernacularTranslation: "Ayiɛ kɛsɛnɛ ?", pronunciation: "A-yi-ɛ ke-se-nɛ ?", audioFile: "/audios/fang_ou_est_toilette.mp3" }, 
      { french: "J’ai besoin d’eau", vernacularTranslation: "Ndimɛɛ kwe", pronunciation: "Ndi-mɛ-ɛ kwe", audioFile: "/audios/fang_jai-besoin-eau.mp3" },
      { french: "Combien ça coûte ?", vernacularTranslation: "Mbɛna ɔɛ ?", pronunciation: "Mbɛ-na ɔ-ɛ ?", audioFile: "/audios/fang_combien_ca_coute.mp3" }, // Supposant un fichier combien_ca_coute.mp3
      { french: "Je ne comprends pas", vernacularTranslation: "Mbanɔ mbɔ", pronunciation: "M-ba-nɔ m-bɔ", audioFile: "/audios/fang_je_ne_comprends_pas.mp3" }, 
      { french: "Pouvez-vous répéter ?", vernacularTranslation: "Sobɛ mbanɔ sɔhɛ, na li mbe?", pronunciation: "So-bɛ m-ba-nɔ so-hɛ, na li mbe?", audioFile: "/audios/fang_pouvez_vous_repeter.mp3" } // Supposant un fichier pouvez_vous_repeter.mp3
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_5" 
  },
  {
    id: 16,
    title: "Maison et objets du quotidien (Fang)",
    languageCode: 'fang',
    entries: [
      { french: "Ma maison", vernacularTranslation: "Nda jam", pronunciation: "N-da jam", audioFile: "/audios/fang_ma_maison.mp3" }, 
      { french: "Une chambre", vernacularTranslation: "Nda'a", pronunciation: "N-da-a", audioFile: "/audios/fang_une_chambre.mp3" }, 
      { french: "Une chaise", vernacularTranslation: "Ntsit", pronunciation: "N-tsit", audioFile: "/audios/fang_une_chaise.mp3" }, 
      { french: "Une table", vernacularTranslation: "Mesa", pronunciation: "Me-sa", audioFile: "/audios/fang_une_table.mp3" }, 
      { french: "Une marmite", vernacularTranslation: "Nkum", pronunciation: "N-kum", audioFile: "/audios/fang_une_marmite.mp3" }, 
      { french: "Du feu", vernacularTranslation: "Ndzem", pronunciation: "N-dzem", audioFile: "/audios/fang_du_feu.mp3" }, 
      { french: "Une porte", vernacularTranslation: "Mvo", pronunciation: "M-vo", audioFile: "/audios/fang_une_porte.mp3" }, 
      { french: "Une natte", vernacularTranslation: "Ntab", pronunciation: "N-tab", audioFile: "/audios/fang_une_natte.mp3" }, 
      { french: "Une lampe", vernacularTranslation: "Nlame", pronunciation: "N-la-me", audioFile: "/audios/fang_une_lampe.mp3" }, 
      { french: "Où est ma cuillère ?", vernacularTranslation: "Ayiɛ kɛsɛnɛ ndem ?", pronunciation: "A-yi-ɛ ke-se-nɛ n-dem ?", audioFile: "/audios/fang_ou_est_ma_cuillere.mp3" }, 
      { french: "Ce couteau est sale", vernacularTranslation: "Nko kɔ́ kɔŋ", pronunciation: "N-ko ko kong", audioFile: "/audios/fang_ce_couteau_est_sale.mp3" }, 
      { french: "Ferme la porte", vernacularTranslation: "Fɛŋ mvo", pronunciation: "Feŋ m-vo", audioFile: "/audios/fang_ferme_la_porte.mp3" }, 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_16"
  },
  {
    id: 17,
    title: "École et apprentissage (Fang)",
    languageCode: 'fang',
    entries: [
      { french: "Je vais à l'école", vernacularTranslation: "Nda kɔl", pronunciation: "N-da kol", audioFile: "/audios/fang_je_vais_a_lecole.mp3" }, 
      { french: "Tu sais lire ?", vernacularTranslation: "Oyiɛ nzem ?", pronunciation: "O-yi-ɛ n-zem ?", audioFile: "/audios/fang_tu_sais_lire.mp3" }, 
      { french: "J'ai un cahier", vernacularTranslation: "Ndi kaɛ", pronunciation: "Ndi ka-e", audioFile: "/audios/fang_jai_un_cahier.mp3" }, 
      { french: "Une ardoise", vernacularTranslation: "Nda'a", pronunciation: "N-da-a", audioFile: "/audios/fang_une_ardoise.mp3" }, 
      { french: "Un stylo", vernacularTranslation: "Ntylo", pronunciation: "N-ty-lo", audioFile: "/audios/fang_un_stylo.mp3" }, 
      { french: "Un enseignant", vernacularTranslation: "Ndzam", pronunciation: "N-dzam", audioFile: "/audios/fang_un_enseignant.mp3" }, 
      { french: "Je veux apprendre", vernacularTranslation: "Ndzam nzem", pronunciation: "N-dzam n-zem", audioFile: "/audios/fang_je_veux_apprendre.mp3" }, 
      { french: "Ce mot signifie quoi ?", vernacularTranslation: "Nkombo kɔŋ ?", pronunciation: "N-kom-bo kong ?", audioFile: "/audios/fang_ce_mot_signifie_quoi.mp3" }, 
      { french: "Répète s'il te plaît", vernacularTranslation: "Sobɛ mbanɔ sɔhɛ", pronunciation: "So-bɛ m-ba-nɔ so-hɛ", audioFile: "/audios/fang_repete_sil_te_plait.mp3" }, 
      { french: "C'est difficile / facile", vernacularTranslation: "Ndzem / Nzem", pronunciation: "N-dzem / N-dzem", audioFile: "/audios/fang_cest_difficile_facile.mp3" }, 
      { french: "Je ne comprends pas", vernacularTranslation: "Mbanɔ mbɔ", pronunciation: "M-ba-nɔ m-bɔ", audioFile: "/audios/fang_je_ne_comprends_pas.mp3" }, 
      { french: "Écris ça ici", vernacularTranslation: "Ndzem kɔŋ", pronunciation: "N-dzem kong", audioFile: "/audios/fang_ecris_ca_ici.mp3" }, 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_17"
  },
  {
    id: 18,
    title: "Expressions culturelles & proverbes (Fang)",
    languageCode: 'fang',
    entries: [
      { french: "Que Dieu te bénisse", vernacularTranslation: "Ndzam a kɔŋ", pronunciation: "N-dzam a kong", audioFile: "/audios/fang_que_dieu_te_benisse.mp3" }, 
      { french: "Merci pour tout", vernacularTranslation: "Meloko kɔŋ", pronunciation: "Me-lo-ko kong", audioFile: "/audios/fang_merci_pour_tout.mp3" }, 
      { french: "Va en paix", vernacularTranslation: "Nda nzem", pronunciation: "N-da n-zem", audioFile: "/audios/fang_va_en_paix.mp3" }, 
      { french: "On ne répond pas à un aîné", vernacularTranslation: "Mbanɔ nzem a kɔŋ", pronunciation: "M-ba-nɔ n-zem a kong", audioFile: "/audios/fang_on_ne_repond_pas_a_un_aine.mp3" }, 
      { french: "Il faut respecter les anciens", vernacularTranslation: "Ndzam nzem a kɔŋ", pronunciation: "N-dzam n-zem a kong", audioFile: "/audios/fang_il_faut_respecter_les_anciens.mp3" }, 
      { french: "L'union fait la force", vernacularTranslation: "Ndzam nzem a kɔŋ", pronunciation: "N-dzam n-zem a kong", audioFile: "/audios/fang_lunion_fait_la_force.mp3" }, 
      { french: "Un enfant bien élevé honore sa famille", vernacularTranslation: "Ndzam nzem a kɔŋ", pronunciation: "N-dzam n-zem a kong", audioFile: "/audios/fang_un_enfant_bien_eleve_honore_sa_famille.mp3" }, 
      { french: "L'arbre ne pousse pas en un jour", vernacularTranslation: "Ndzam nzem a kɔŋ", pronunciation: "N-dzam n-zem a kong", audioFile: "/audios/fang_larbre_ne_pousse_pas_en_un_jour.mp3" }, 
      { french: "Dis bonjour avant de parler", vernacularTranslation: "Ndzam nzem a kɔŋ", pronunciation: "N-dzam n-zem a kong", audioFile: "/audios/fang_dis_bonjour_avant_de_parler.mp3" }, 
      { french: "Si tu ne sais pas, demande", vernacularTranslation: "Ndzam nzem a kɔŋ", pronunciation: "N-dzam n-zem a kong", audioFile: "/audios/fang_si_tu_ne_sais_pas_demande.mp3" }, 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_18"
  },

  // --- LEÇONS NZEBI ---
  {
    id: 6, 
    title: "Phrases utiles en Nzébi", 
    languageCode: 'nzebi', 
    entries: [
      { french: "Où est la toilette ?", vernacularTranslation: "Kɛsɛnɛ y’a nsi ?", pronunciation: "ke‑se‑nɛ ya n‑si", audioFile: "/audios/nzebi_ou_est_la_toilette.mp3" }, 
      { french: "J’ai besoin d’eau", vernacularTranslation: "Ndimɛɛ mwa mayi", pronunciation: "ndi‑mɛ‑ɛ mwa ma‑yi", audioFile: "/audios/nzebi_jai_besoin_deau.mp3" }, 
      { french: "Combien ça coûte ?", vernacularTranslation: "Bɛna bɔni ?", pronunciation: "bè‑na bɔ‑ni", audioFile: "/audios/nzebi_combien_ca_coute.mp3" }, 
      { french: "Je ne comprends pas", vernacularTranslation: "Mbanɔ mbɔ", pronunciation: "mba‑nɔ mbɔ", audioFile: "/audios/nzebi_je_ne_comprends_pas.mp3" }, 
      { french: "Pouvez-vous répéter, s’il vous plaît ?", vernacularTranslation: "Sobɛ mbanɔ sɔhɛ, na limbe ?", pronunciation: "so‑bɛ mba‑nɔ so‑hɛ na li‑mbe", audioFile: "/audios/nzebi_pouvez_vous_repeter.mp3" } 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_6" 
  },
  {
    id: 7, 
    title: "Salutations et présentations (Nzébi)",
    languageCode: 'nzebi',
    entries: [
      { french: "Bonjour", vernacularTranslation: "Mbote", pronunciation: "Mbo-te", audioFile: "/audios/nzebi_bonjour.mp3" }, 
      { french: "Bonsoir", vernacularTranslation: "Mbote mwa nyonga", pronunciation: "Mbo-te mwa n-yon-ga", audioFile: "/audios/nzebi_bonsoir.mp3" }, 
      { french: "Comment ça va ?", vernacularTranslation: "Osi wá ?", pronunciation: "O-si wa", audioFile: "/audios/nzebi_comment_ca_va.mp3" }, 
      { french: "Ça va bien, merci", vernacularTranslation: "Nasi malamu, melesi", pronunciation: "Na-si ma-la-mu, me-le-si", audioFile: "/audios/nzebi_ca_va_bien_merci.mp3" } 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_7"
  },
  {
    id: 8, 
    title: "Se présenter (Nzébi)",
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
    id: 9, 
    title: "Famille et relations (Nzébi)",
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
    id: 10, 
    title: "Compter de 1 à 10 (Nzébi)",
    languageCode: 'nzebi',
    entries: [
      { french: "Un", vernacularTranslation: "Moja", pronunciation: "Mo-ja", audioFile: "/audios/nzebi_un.mp3" }, 
      { french: "Deux", vernacularTranslation: "Mbili", pronunciation: "Mbi-li", audioFile: "/audios/nzebi_deux.mp3" }, 
      { french: "Trois", vernacularTranslation: "Tatu", pronunciation: "Ta-tu", audioFile: "/audios/nzebi_trois.mp3" }, 
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
    id: 19,
    title: "Maison et objets du quotidien (Nzébi)",
    languageCode: 'nzebi',
    entries: [
      { french: "Ma maison", vernacularTranslation: "Nda yami", pronunciation: "N-da ya-mi", audioFile: "/audios/nzebi_ma_maison.mp3" }, 
      { french: "Une chambre", vernacularTranslation: "Nda ya kulala", pronunciation: "N-da ya ku-la-la", audioFile: "/audios/nzebi_une_chambre.mp3" }, 
      { french: "Une chaise", vernacularTranslation: "Kiti", pronunciation: "Ki-ti", audioFile: "/audios/nzebi_une_chaise.mp3" }, 
      { french: "Une table", vernacularTranslation: "Mesa", pronunciation: "Me-sa", audioFile: "/audios/nzebi_une_table.mp3" }, 
      { french: "Une marmite", vernacularTranslation: "Nyungu", pronunciation: "Nyu-ngu", audioFile: "/audios/nzebi_une_marmite.mp3" }, 
      { french: "Du feu", vernacularTranslation: "Moto", pronunciation: "Mo-to", audioFile: "/audios/nzebi_du_feu.mp3" }, 
      { french: "Une porte", vernacularTranslation: "Moyibi", pronunciation: "Mo-yi-bi", audioFile: "/audios/nzebi_une_porte.mp3" }, 
      { french: "Une natte", vernacularTranslation: "Lelo", pronunciation: "Le-lo", audioFile: "/audios/nzebi_une_natte.mp3" }, 
      { french: "Une lampe", vernacularTranslation: "Mwinda", pronunciation: "Mwi-nda", audioFile: "/audios/nzebi_une_lampe.mp3" }, 
      { french: "Où est ma cuillère ?", vernacularTranslation: "Lusú yami ezali wapi ?", pronunciation: "Lu-su ya-mi e-za-li wa-pi ?", audioFile: "/audios/nzebi_ou_est_ma_cuillere.mp3" }, 
      { french: "Ce couteau est sale", vernacularTranslation: "Mukwa oyo ezali mbindo", pronunciation: "Mu-kwa o-yo e-za-li m-bi-ndo", audioFile: "/audios/nzebi_ce_couteau_est_sale.mp3" }, 
      { french: "Ferme la porte", vernacularTranslation: "Kangola moyibi", pronunciation: "Ka-ngo-la mo-yi-bi", audioFile: "/audios/nzebi_ferme_la_porte.mp3" }, 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_19"
  },
  {
    id: 20,
    title: "École et apprentissage (Nzébi)",
    languageCode: 'nzebi',
    entries: [
      { french: "Je vais à l'école", vernacularTranslation: "Nazali kokenda na kelasi", pronunciation: "Na-za-li ko-ke-nda na ke-la-si", audioFile: "/audios/nzebi_je_vais_a_lecole.mp3" }, 
      { french: "Tu sais lire ?", vernacularTranslation: "Oyebi kotanga ?", pronunciation: "O-ye-bi ko-ta-nga ?", audioFile: "/audios/nzebi_tu_sais_lire.mp3" }, 
      { french: "J'ai un cahier", vernacularTranslation: "Nazali na mikanda", pronunciation: "Na-za-li na mi-ka-nda", audioFile: "/audios/nzebi_jai_un_cahier.mp3" }, 
      { french: "Une ardoise", vernacularTranslation: "Lelo ya kokoma", pronunciation: "Le-lo ya ko-ko-ma", audioFile: "/audios/nzebi_une_ardoise.mp3" }, 
      { french: "Un stylo", vernacularTranslation: "Stylo", pronunciation: "Sty-lo", audioFile: "/audios/nzebi_un_stylo.mp3" }, 
      { french: "Un enseignant", vernacularTranslation: "Molakisi", pronunciation: "Mo-la-ki-si", audioFile: "/audios/nzebi_un_enseignant.mp3" }, 
      { french: "Je veux apprendre", vernacularTranslation: "Nalingi koyekola", pronunciation: "Na-li-ngi ko-ye-ko-la", audioFile: "/audios/nzebi_je_veux_apprendre.mp3" }, 
      { french: "Ce mot signifie quoi ?", vernacularTranslation: "Liloba oyo elimboli nini ?", pronunciation: "Li-lo-ba o-yo e-li-mbo-li ni-ni ?", audioFile: "/audios/nzebi_ce_mot_signifie_quoi.mp3" }, 
      { french: "Répète s'il te plaît", vernacularTranslation: "Lobela lisusu s'il te plaît", pronunciation: "Lo-be-la li-su-su s'il te plaît", audioFile: "/audios/nzebi_repete_sil_te_plait.mp3" }, 
      { french: "C'est difficile / facile", vernacularTranslation: "Ezali mpasi / Ezali pɛtɛɛ", pronunciation: "E-za-li mpa-si / E-za-li pɛ-tɛ-ɛ", audioFile: "/audios/nzebi_cest_difficile_facile.mp3" }, 
      { french: "Je ne comprends pas", vernacularTranslation: "Nakanisi te", pronunciation: "Na-ka-ni-si te", audioFile: "/audios/nzebi_je_ne_comprends_pas.mp3" }, 
      { french: "Écris ça ici", vernacularTranslation: "Koma yango awa", pronunciation: "Ko-ma ya-ngo a-wa", audioFile: "/audios/nzebi_ecris_ca_ici.mp3" }, 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_20"
  },
  {
    id: 21,
    title: "Expressions culturelles & proverbes (Nzébi)",
    languageCode: 'nzebi',
    entries: [
      { french: "Que Dieu te bénisse", vernacularTranslation: "Nzambe apambola yo", pronunciation: "Nza-mbe a-pa-mbo-la yo", audioFile: "/audios/nzebi_que_dieu_te_benisse.mp3" }, 
      { french: "Merci pour tout", vernacularTranslation: "Melesi mpo na biloko nyonso", pronunciation: "Me-le-si mpo na bi-lo-ko nyo-nso", audioFile: "/audios/nzebi_merci_pour_tout.mp3" }, 
      { french: "Va en paix", vernacularTranslation: "Kende na kimya", pronunciation: "Ke-nde na ki-mya", audioFile: "/audios/nzebi_va_en_paix.mp3" }, 
      { french: "On ne répond pas à un aîné", vernacularTranslation: "Bato bakoki te kozongisa maloba na mokolo", pronunciation: "Ba-to ba-ko-ki te ko-zo-ngi-sa ma-lo-ba na mo-ko-lo", audioFile: "/audios/nzebi_on_ne_repond_pas_a_un_aine.mp3" }, 
      { french: "Il faut respecter les anciens", vernacularTranslation: "Esengeli kopesa lokumu na bakolo", pronunciation: "E-se-nge-li ko-pe-sa lo-ku-mu na ba-ko-lo", audioFile: "/audios/nzebi_il_faut_respecter_les_anciens.mp3" }, 
      { french: "L'union fait la force", vernacularTranslation: "Lisanga ezali nguya", pronunciation: "Li-sa-nga e-za-li ngu-ya", audioFile: "/audios/nzebi_lunion_fait_la_force.mp3" }, 
      { french: "Un enfant bien élevé honore sa famille", vernacularTranslation: "Mwana oyo abotami malamu akopesa libota na ye lokumu", pronunciation: "Mwa-na o-yo a-bo-ta-mi ma-la-mu a-ko-pe-sa li-bo-ta na ye lo-ku-mu", audioFile: "/audios/nzebi_un_enfant_bien_eleve_honore_sa_famille.mp3" }, 
      { french: "L'arbre ne pousse pas en un jour", vernacularTranslation: "Nzete ekoli te na mokolo moko", pronunciation: "Nze-te e-ko-li te na mo-ko-lo mo-ko", audioFile: "/audios/nzebi_larbre_ne_pousse_pas_en_un_jour.mp3" }, 
      { french: "Dis bonjour avant de parler", vernacularTranslation: "Loba mbote liboso ya koloba", pronunciation: "Lo-be-la mbo-te li-bo-so ya ko-lo-ba", audioFile: "/audios/nzebi_dis_bonjour_avant_de_parler.mp3" }, 
      { french: "Si tu ne sais pas, demande", vernacularTranslation: "Soki oyebi te, tuna", pronunciation: "So-ki o-ye-bi te, tu-na", audioFile: "/audios/nzebi_si_tu_ne_sais_pas_demande.mp3" }, 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_21"
  },

  // --- LEÇONS MASSANGO ---
  {
    id: 11,
    title: "Salutations et présentations (Massango)",
    languageCode: 'massango',
    entries: [
      { french: "Bonjour", vernacularTranslation: "Ndeme", pronunciation: "N-de-me", audioFile: "/audios/massango_bonjour.mp3" }, 
      { french: "Bonsoir", vernacularTranslation: "Ndeme wa mbala", pronunciation: "N-de-me wa m-ba-la", audioFile: "/audios/massango_bonsoir.mp3" }, 
      { french: "Comment ça va ?", vernacularTranslation: "Ndɛ tɛ̃ ?", pronunciation: "Ndɛ tɛ̃", audioFile: "/audios/massango_comment_ca_va.mp3" }, 
      { french: "Ça va bien, merci", vernacularTranslation: "Ndɛ malamu, akiba", pronunciation: "Ndɛ ma-la-mu, a-ki-ba", audioFile: "/audios/massango_ca_va_bien_merci.mp3" } 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_11" 
  },
  {
    id: 12,
    title: "Se présenter (Massango)",
    languageCode: 'massango',
    entries: [
      { french: "Je m’appelle …", vernacularTranslation: "Ndaku …", pronunciation: "Ndaku …", audioFile: "/audios/massango_je_mappelle.mp3" }, 
      { french: "Je viens du Gabon", vernacularTranslation: "Ndima e Gabon", pronunciation: "Ndi-ma é Ga-bon", audioFile: "/audios/massango_je_viens_du_gabon.mp3" }, 
      { french: "J’ai _ ans", vernacularTranslation: "Ndi _ mobu", pronunciation: "Ndi _ mo-bou", audioFile: "/audios/massango_jai_ans.mp3" }, 
      { french: "Enchanté de te rencontrer", vernacularTranslation: "Nasɛpɛli koyeba yo", pronunciation: "Na-sɛ-pɛ-li ko-ye-ba yo", audioFile: "/audios/massango_enchante_de_te_rencontrer.mp3" } 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_12" 
  },
  {
    id: 13,
    title: "Famille et relations (Massango)",
    languageCode: 'massango',
    entries: [
      { french: "Père", vernacularTranslation: "Baba", pronunciation: "Ba-ba", audioFile: "/audios/massango_pere.mp3" }, 
      { french: "Mère", vernacularTranslation: "Mama", pronunciation: "Ma-ma", audioFile: "/audios/massango_mere.mp3" }, 
      { french: "Frère", vernacularTranslation: "Nko", pronunciation: "N-ko", audioFile: "/audios/massango_frere.mp3" }, 
      { french: "Sœur", vernacularTranslation: "Ndeko mwasi", pronunciation: "N-de-ko mwa-si", audioFile: "/audios/massango_soeur.mp3" } 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_13" 
  },
  {
    id: 14,
    title: "Compter de 1 à 10 (Massango)",
    languageCode: 'massango',
    entries: [
      { french: "Un", vernacularTranslation: "Moja", pronunciation: "Mo-ja", audioFile: "/audios/massango_un.mp3" }, 
      { french: "Deux", vernacularTranslation: "Mbili", pronunciation: "Mbi-li", audioFile: "/audios/massango_deux.mp3" }, 
      { french: "Trois", vernacularTranslation: "Tatu", pronunciation: "Ta-tu", audioFile: "/audios/massango_trois.mp3" }, 
      { french: "Quatre", vernacularTranslation: "Nne", pronunciation: "N-nè", audioFile: "/audios/massango_quatre.mp3" }, 
      { french: "Cinq", vernacularTranslation: "Tano", pronunciation: "Ta-no", audioFile: "/audios/massango_cinq.mp3" }, 
      { french: "Six", vernacularTranslation: "Sita", pronunciation: "Si-ta", audioFile: "/audios/massango_six.mp3" }, 
      { french: "Sept", vernacularTranslation: "Saba", pronunciation: "Sa-ba", audioFile: "/audios/massango_sept.mp3" }, 
      { french: "Huit", vernacularTranslation: "Nane", pronunciation: "Na-ne", audioFile: "/audios/massango_huit.mp3" }, 
      { french: "Neuf", vernacularTranslation: "Tisa", pronunciation: "Ti-sa", audioFile: "/audios/massango_neuf.mp3" }, 
      { french: "Dix", vernacularTranslation: "Kumi", pronunciation: "Ku-mi", audioFile: "/audios/massango_dix.mp3" } 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_14" 
  },
  {
    id: 15,
    title: "Phrases utiles de voyage (Massango)",
    languageCode: 'massango',
    entries: [
      { french: "Où est la toilette ?", vernacularTranslation: "Ndide nde ?", pronunciation: "Ndi-de nde ?", audioFile: "/audios/massango_ou_est_la_toilette.mp3" }, 
      { french: "J’ai besoin d’eau", vernacularTranslation: "Ndide mayi", pronunciation: "Ndi-de ma-yi", audioFile: "/audios/massango_jai_besoin_deau.mp3" }, 
      { french: "Combien ça coûte ?", vernacularTranslation: "Bɛna bɔni ?", pronunciation: "Bè-na bɔ-ni", audioFile: "/audios/massango_combien_ca_coute.mp3" }, 
      { french: "Je ne comprends pas", vernacularTranslation: "Mbanɔ mbɔ", pronunciation: "Mba-nɔ mbɔ", audioFile: "/audios/massango_je_ne_comprends_pas.mp3" }, 
      { french: "Pouvez-vous répéter ?", vernacularTranslation: "Sobɛ mbanɔ sɔhɛ, na limbe ?", pronunciation: "So-bɛ mba-nɔ so-hɛ na li-mbe", audioFile: "/audios/massango_pouvez_vous_repeter.mp3" } 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_15" 
  },
  {
    id: 22,
    title: "Maison et objets du quotidien (Massango)",
    languageCode: 'massango',
    entries: [
      { french: "Ma maison", vernacularTranslation: "Nda yami", pronunciation: "N-da ya-mi", audioFile: "/audios/massango_ma_maison.mp3" }, 
      { french: "Une chambre", vernacularTranslation: "Nda ya kulala", pronunciation: "N-da ya ku-la-la", audioFile: "/audios/massango_une_chambre.mp3" }, 
      { french: "Une chaise", vernacularTranslation: "Kiti", pronunciation: "Ki-ti", audioFile: "/audios/massango_une_chaise.mp3" }, 
      { french: "Une table", vernacularTranslation: "Mesa", pronunciation: "Me-sa", audioFile: "/audios/massango_une_table.mp3" }, 
      { french: "Une marmite", vernacularTranslation: "Nyungu", pronunciation: "Nyu-ngu", audioFile: "/audios/massango_une_marmite.mp3" }, 
      { french: "Du feu", vernacularTranslation: "Moto", pronunciation: "Mo-to", audioFile: "/audios/massango_du_feu.mp3" }, 
      { french: "Une porte", vernacularTranslation: "Moyibi", pronunciation: "Mo-yi-bi", audioFile: "/audios/massango_une_porte.mp3" }, 
      { french: "Une natte", vernacularTranslation: "Lelo", pronunciation: "Le-lo", audioFile: "/audios/massango_une_natte.mp3" }, 
      { french: "Une lampe", vernacularTranslation: "Mwinda", pronunciation: "Mwi-nda", audioFile: "/audios/massango_une_lampe.mp3" }, 
      { french: "Où est ma cuillère ?", vernacularTranslation: "Lusú yami ezali wapi ?", pronunciation: "Lu-su ya-mi e-za-li wa-pi ?", audioFile: "/audios/massango_ou_est_ma_cuillere.mp3" }, 
      { french: "Ce couteau est sale", vernacularTranslation: "Mukwa oyo ezali mbindo", pronunciation: "Mu-kwa o-yo e-za-li m-bi-ndo", audioFile: "/audios/massango_ce_couteau_est_sale.mp3" }, 
      { french: "Ferme la porte", vernacularTranslation: "Kangola moyibi", pronunciation: "Ka-ngo-la mo-yi-bi", audioFile: "/audios/massango_ferme_la_porte.mp3" }, 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_22"
  },
  {
    id: 23,
    title: "École et apprentissage (Massango)",
    languageCode: 'massango',
    entries: [
      { french: "Je vais à l'école", vernacularTranslation: "Nazali kokenda na kelasi", pronunciation: "Na-za-li ko-ke-nda na ke-la-si", audioFile: "/audios/massango_je_vais_a_lecole.mp3" }, 
      { french: "Tu sais lire ?", vernacularTranslation: "Oyebi kotanga ?", pronunciation: "O-ye-bi ko-ta-nga ?", audioFile: "/audios/massango_tu_sais_lire.mp3" }, 
      { french: "J'ai un cahier", vernacularTranslation: "Nazali na mikanda", pronunciation: "Na-za-li na mi-ka-nda", audioFile: "/audios/massango_jai_un_cahier.mp3" }, 
      { french: "Une ardoise", vernacularTranslation: "Lelo ya kokoma", pronunciation: "Le-lo ya ko-ko-ma", audioFile: "/audios/massango_une_ardoise.mp3" }, 
      { french: "Un stylo", vernacularTranslation: "Stylo", pronunciation: "Sty-lo", audioFile: "/audios/massango_un_stylo.mp3" }, 
      { french: "Un enseignant", vernacularTranslation: "Molakisi", pronunciation: "Mo-la-ki-si", audioFile: "/audios/massango_un_enseignant.mp3" }, 
      { french: "Je veux apprendre", vernacularTranslation: "Nalingi koyekola", pronunciation: "Na-li-ngi ko-ye-ko-la", audioFile: "/audios/massango_je_veux_apprendre.mp3" }, 
      { french: "Ce mot signifie quoi ?", vernacularTranslation: "Liloba oyo elimboli nini ?", pronunciation: "Li-lo-ba o-yo e-li-mbo-li ni-ni ?", audioFile: "/audios/massango_ce_mot_signifie_quoi.mp3" }, 
      { french: "Répète s'il te plaît", vernacularTranslation: "Lobela lisusu s'il te plaît", pronunciation: "Lo-be-la li-su-su s'il te plaît", audioFile: "/audios/massango_repete_sil_te_plait.mp3" }, 
      { french: "C'est difficile / facile", vernacularTranslation: "Ezali mpasi / Ezali pɛtɛɛ", pronunciation: "E-za-li mpa-si / E-za-li pɛ-tɛ-ɛ", audioFile: "/audios/massango_cest_difficile_facile.mp3" }, 
      { french: "Je ne comprends pas", vernacularTranslation: "Nakanisi te", pronunciation: "Na-ka-ni-si te", audioFile: "/audios/massango_je_ne_comprends_pas.mp3" }, 
      { french: "Écris ça ici", vernacularTranslation: "Koma yango awa", pronunciation: "Ko-ma ya-ngo a-wa", audioFile: "/audios/massango_ecris_ca_ici.mp3" }, 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_23"
  },
  {
    id: 24,
    title: "Expressions culturelles & proverbes (Massango)",
    languageCode: 'massango',
    entries: [
      { french: "Que Dieu te bénisse", vernacularTranslation: "Nzambe apambola yo", pronunciation: "Nza-mbe a-pa-mbo-la yo", audioFile: "/audios/massango_que_dieu_te_benisse.mp3" }, 
      { french: "Merci pour tout", vernacularTranslation: "Melesi mpo na biloko nyonso", pronunciation: "Me-le-si mpo na bi-lo-ko nyo-nso", audioFile: "/audios/massango_merci_pour_tout.mp3" }, 
      { french: "Va en paix", vernacularTranslation: "Kende na kimya", pronunciation: "Ke-nde na ki-mya", audioFile: "/audios/massango_va_en_paix.mp3" }, 
      { french: "On ne répond pas à un aîné", vernacularTranslation: "Bato bakoki te kozongisa maloba na mokolo", pronunciation: "Ba-to ba-ko-ki te ko-zo-ngi-sa ma-lo-ba na mo-ko-lo", audioFile: "/audios/massango_on_ne_repond_pas_a_un_aine.mp3" }, 
      { french: "Il faut respecter les anciens", vernacularTranslation: "Esengeli kopesa lokumu na bakolo", pronunciation: "E-se-nge-li ko-pe-sa lo-ku-mu na ba-ko-lo", audioFile: "/audios/massango_il_faut_respecter_les_anciens.mp3" }, 
      { french: "L'union fait la force", vernacularTranslation: "Lisanga ezali nguya", pronunciation: "Li-sa-nga e-za-li ngu-ya", audioFile: "/audios/massango_lunion_fait_la_force.mp3" }, 
      { french: "Un enfant bien élevé honore sa famille", vernacularTranslation: "Mwana oyo abotami malamu akopesa libota na ye lokumu", pronunciation: "Mwa-na o-yo a-bo-ta-mi ma-la-mu a-ko-pe-sa li-bo-ta na ye lo-ku-mu", audioFile: "/audios/massango_un_enfant_bien_eleve_honore_sa_famille.mp3" }, 
      { french: "L'arbre ne pousse pas en un jour", vernacularTranslation: "Nzete ekoli te na mokolo moko", pronunciation: "Nze-te e-ko-li te na mo-ko-lo mo-ko", audioFile: "/audios/massango_larbre_ne_pousse_pas_en_un_jour.mp3" }, 
      { french: "Dis bonjour avant de parler", vernacularTranslation: "Loba mbote liboso ya koloba", pronunciation: "Lo-be-la mbo-te li-bo-so ya ko-lo-ba", audioFile: "/audios/massango_dis_bonjour_avant_de_parler.mp3" }, 
      { french: "Si tu ne sais pas, demande", vernacularTranslation: "Soki oyebi te, tuna", pronunciation: "So-ki o-ye-bi te, tu-na", audioFile: "/audios/massango_si_tu_ne_sais_pas_demande.mp3" }, 
    ],
    youtubeVideoId: "YOUR_YOUTUBE_ID_LECON_24"
  },
];

export const languageCourses: LanguageCourse[] = [
  {
    languageCode: 'fang',
    languageName: 'Fang',
    chapters: [
      {
        id: 1,
        title: "Chapitre 1 : Les Fondamentaux de la Communication",
        description: "Apprenez les bases pour saluer, vous présenter et parler de votre famille en Fang.",
        lessonIds: [1, 2, 3]
      },
      {
        id: 2,
        title: "Chapitre 2 : Éléments Pratiques et Numériques",
        description: "Maîtrisez les nombres et les phrases essentielles pour les situations pratiques en Fang.",
        lessonIds: [4, 5]
      },
      {
        id: 3,
        title: "Chapitre 3 : Maison et Objets du Quotidien",
        description: "Découvrez le vocabulaire de la maison et des objets courants en Fang.",
        lessonIds: [16]
      },
      {
        id: 4,
        title: "Chapitre 4 : École et Apprentissage",
        description: "Apprenez les termes et expressions liés à l'école et à l'apprentissage en Fang.",
        lessonIds: [17]
      },
      {
        id: 5,
        title: "Chapitre 5 : Expressions Culturelles et Proverbes",
        description: "Explorez la sagesse et la culture Fang à travers des expressions et proverbes.",
        lessonIds: [18]
      },
    ]
  },
  {
    languageCode: 'nzebi',
    languageName: 'Nzébi',
    chapters: [
      {
        id: 6,
        title: "Chapitre 1 : Les Fondamentaux de la Communication",
        description: "Apprenez les bases pour saluer, vous présenter et parler de votre famille en Nzébi.",
        lessonIds: [7, 8, 9]
      },
      {
        id: 7,
        title: "Chapitre 2 : Éléments Pratiques et Numériques",
        description: "Maîtrisez les nombres et les phrases essentielles pour les situations pratiques en Nzébi.",
        lessonIds: [10, 6]
      },
      {
        id: 8,
        title: "Chapitre 3 : Maison et Objets du Quotidien",
        description: "Découvrez le vocabulaire de la maison et des objets courants en Nzébi.",
        lessonIds: [19]
      },
      {
        id: 9,
        title: "Chapitre 4 : École et Apprentissage",
        description: "Apprenez les termes et expressions liés à l'école et à l'apprentissage en Nzébi.",
        lessonIds: [20]
      },
      {
        id: 10,
        title: "Chapitre 5 : Expressions Culturelles et Proverbes",
        description: "Explorez la sagesse et la culture Nzébi à travers des expressions et proverbes.",
        lessonIds: [21]
      },
    ]
  },
  {
    languageCode: 'massango',
    languageName: 'Massango',
    chapters: [
      {
        id: 11,
        title: "Chapitre 1 : Les Fondamentaux de la Communication",
        description: "Apprenez les bases pour saluer, vous présenter et parler de votre famille en Massango.",
        lessonIds: [11, 12, 13]
      },
      {
        id: 12,
        title: "Chapitre 2 : Éléments Pratiques et Numériques",
        description: "Maîtrisez les nombres et les phrases essentielles pour les situations pratiques en Massango.",
        lessonIds: [14, 15]
      },
      {
        id: 13,
        title: "Chapitre 3 : Maison et Objets du Quotidien",
        description: "Découvrez le vocabulaire de la maison et des objets courants en Massango.",
        lessonIds: [22]
      },
      {
        id: 14,
        title: "Chapitre 4 : École et Apprentissage",
        description: "Apprenez les termes et expressions liés à l'école et à l'apprentissage en Massango.",
        lessonIds: [23]
      },
      {
        id: 15,
        title: "Chapitre 5 : Expressions Culturelles et Proverbes",
        description: "Explorez la sagesse et la culture Massango à travers des expressions et proverbes.",
        lessonIds: [24]
      },
    ]
  },
];
