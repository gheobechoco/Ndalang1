// src/components/FloatingBubblesBackground.tsx
import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Text } from '@react-three/drei';
import { Vector3, Color, Mesh } from 'three';
import { lessons } from '../data/lessons'; // Correction ici : 'type Lesson'

// Fonction utilitaire pour obtenir un nombre aléatoire dans une plage
const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

// Pre-traitement de TOUS LES MOTS ET PHRASES par langue, une seule fois au chargement
const wordsByLanguage: { [key: string]: string[] } = {};
lessons.forEach(lesson => {
  if (!wordsByLanguage[lesson.languageCode]) {
    wordsByLanguage[lesson.languageCode] = [];
  }
  lesson.entries.forEach(entry => {
    // Utiliser vernacularTranslation puisque c'est le nouveau nom de la propriété
    if (entry.vernacularTranslation && entry.vernacularTranslation.length > 0) {
      wordsByLanguage[lesson.languageCode].push(entry.vernacularTranslation);
    }
  });
});

// Interface pour les propriétés d'une bulle individuelle
interface BubbleProps {
  initialPosition: [number, number, number];
  initialWord: string; // Mot initial pour cette bulle
  bubbleColor: string;
  wordColor: string;
  languageSpecificWords: string[]; // Liste des mots disponibles pour la langue actuelle
  fallbackWord: string; // Mot de secours si aucune traduction n'est disponible
}

// Composant pour une bulle individuelle
const Bubble: React.FC<BubbleProps> = ({ 
  initialPosition, 
  initialWord, 
  bubbleColor, 
  wordColor, 
  languageSpecificWords, 
  fallbackWord 
}) => {
  const meshRef = useRef<Mesh>(null!);
  const [currentPhrase, setCurrentPhrase] = useState(initialWord);
  const [position] = useState(() => new Vector3(...initialPosition));
  const [scale] = useState(randomRange(0.8, 1.8));

  // Fonction pour obtenir un nouveau mot aléatoire de la liste spécifique à la langue
  const getNewRandomWord = useMemo(() => () => {
    return languageSpecificWords.length > 0 
      ? languageSpecificWords[Math.floor(Math.random() * languageSpecificWords.length)]
      : fallbackWord;
  }, [languageSpecificWords, fallbackWord]);

  useFrame((_state, delta) => {
    // Fait flotter la bulle vers le haut (vitesse augmentée)
    position.y += randomRange(0.01, 0.08) * delta;

    // Si la bulle sort de l'écran par le haut, la repositionne en bas avec un nouveau mot
    if (position.y > 10) { 
      position.y = -10; 
      position.x = randomRange(-15, 15); 
      position.z = randomRange(-15, 15); 
      // Sélectionne un nouveau mot de la langue appropriée lors du repositionnement
      setCurrentPhrase(getNewRandomWord());
    }

    if (meshRef.current) {
      meshRef.current.position.copy(position);
    }
  });

  return (
    <Sphere args={[scale, 32, 32]} ref={meshRef} position={initialPosition}>
      {/* Matériau de la bulle : style ballon brillant */}
      <meshPhysicalMaterial
        color={new Color(bubbleColor)}
        transparent
        opacity={0.8}
        roughness={0.1}
        metalness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.05}
        emissive={new Color(0x000000)}
        flatShading={false}
      />
      {/* Texte 3D affiché à l'intérieur de la bulle */}
      <Text
        position={[0, 0, 0]}
        fontSize={scale * 0.25}
        color={wordColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-VariableFont_opsz,wght.ttf"
        maxWidth={scale * 1.6}
        lineHeight={1.2}
        textAlign="center"
      >
        {currentPhrase}
      </Text>
    </Sphere>
  );
};

// Composant principal de l'arrière-plan avec bulles flottantes
interface FloatingBubblesBackgroundProps {
  currentLessonLanguageCode: 'fang' | 'nzebi' | 'massango' | 'fr'; // 'massango' est correctement ajouté ici
}

const FloatingBubblesBackground: React.FC<FloatingBubblesBackgroundProps> = ({ currentLessonLanguageCode }) => {
  const numberOfBubbles = 30;
  // Définition des couleurs exactes du drapeau gabonais
  const gabonFlagColors = useMemo(() => [
    '#009B48', // Vert
    '#FCD116', // Jaune
    '#006FCD', // Bleu
  ], []);

  // Couleurs de texte à utiliser pour un bon contraste (blanc ou noir)
  const textColorsPalette = useMemo(() => [
    '#FFFFFF', // Blanc (bon sur le vert et le bleu foncé)
    '#000000', // Noir (bon sur le jaune)
  ], []);

  // Filtrer les mots disponibles en fonction du code de langue actuel
  const availableWordsForLanguage = useMemo(() => {
    // S'assurer que wordsByLanguage[currentLessonLanguageCode] existe et est un tableau
    return wordsByLanguage[currentLessonLanguageCode] || [];
  }, [currentLessonLanguageCode]);

  // Mot de secours si aucune traduction n'est disponible pour la langue sélectionnée
  const fallbackWord = 'NdaLang'; 

  const bubbles = useMemo(() => {
    const generatedBubbles = [];
    for (let i = 0; i < numberOfBubbles; i++) {
      const initialPosition: [number, number, number] = [
        randomRange(-15, 15),
        randomRange(-15, 15),
        randomRange(-15, 15),
      ];

      // Sélectionne un mot initial pour la bulle en fonction de la langue
      const initialRandomPhrase = availableWordsForLanguage.length > 0
        ? availableWordsForLanguage[Math.floor(Math.random() * availableWordsForLanguage.length)]
        : fallbackWord;
      
      const randomBubbleColor = gabonFlagColors[Math.floor(Math.random() * gabonFlagColors.length)];
      const randomTextColor = textColorsPalette[Math.floor(Math.random() * textColorsPalette.length)];

      generatedBubbles.push(
        <Bubble
          key={i}
          initialPosition={initialPosition}
          initialWord={initialRandomPhrase} // Passe le mot initial
          bubbleColor={randomBubbleColor}
          wordColor={randomTextColor}
          languageSpecificWords={availableWordsForLanguage} // Passe le tableau de mots spécifiques à la langue
          fallbackWord={fallbackWord} // Passe le mot de secours
        />
      );
    }
    return generatedBubbles;
  }, [numberOfBubbles, availableWordsForLanguage, fallbackWord, gabonFlagColors, textColorsPalette]);

  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: 'transparent',
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[15, 15, 15]} intensity={3.0} />
      <pointLight position={[-15, -15, -15]} intensity={2.5} />
      <directionalLight position={[0, 0, 5]} intensity={1.5} />

      {bubbles}
    </Canvas>
  );
};

export default FloatingBubblesBackground;
