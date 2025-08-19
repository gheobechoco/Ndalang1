import React, { useEffect, useRef, useState, useMemo } from 'react';

// Définition des props pour le composant
interface FloatingBubblesBackgroundProps {
  // Mise à jour pour inclure 'myene' et supprimer 'massango'/'massango-new'
  currentLessonLanguageCode: 'fang' | 'guissir' | 'myene' | 'fr';
}

const FloatingBubblesBackground: React.FC<FloatingBubblesBackgroundProps> = ({ currentLessonLanguageCode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Définir les couleurs des bulles en fonction de la langue
  const bubbleColors = useMemo(() => {
    switch (currentLessonLanguageCode) {
      case 'fang':
        return ['rgba(255, 165, 0, 0.4)', 'rgba(255, 200, 0, 0.4)', 'rgba(255, 180, 0, 0.4)']; // Tons orangés
      case 'guissir':
        return ['rgba(0, 128, 0, 0.4)', 'rgba(50, 205, 50, 0.4)', 'rgba(34, 139, 34, 0.4)']; // Tons verts
      case 'myene': // Nouvelle couleur pour Myene
        return ['rgba(138, 43, 226, 0.4)', 'rgba(186, 85, 211, 0.4)', 'rgba(147, 112, 219, 0.4)']; // Tons violets
      case 'fr':
      default:
        return ['rgba(0, 111, 205, 0.4)', 'rgba(0, 150, 255, 0.4)', 'rgba(0, 191, 255, 0.4)']; // Tons bleus par défaut
    }
  }, [currentLessonLanguageCode]);

  // Interface pour une bulle individuelle
  interface Bubble {
    x: number;
    y: number;
    radius: number;
    dx: number;
    dy: number;
    color: string;
  }

  // Fonction pour créer une nouvelle bulle
  const createBubble = (canvas: HTMLCanvasElement): Bubble => {
    const radius = Math.random() * 15 + 5; // Taille de 5 à 20
    const x = Math.random() * canvas.width;
    const y = canvas.height + radius; // Commence en bas de l'écran
    const speed = Math.random() * 1 + 0.5; // Vitesse de 0.5 à 1.5
    const angle = Math.random() * Math.PI / 2 + Math.PI / 4; // Angle entre 45 et 135 degrés pour monter
    const dx = Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1) * 0.5; // Mouvement latéral plus doux
    const dy = -Math.sin(angle) * speed;
    const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];

    return { x, y, radius, dx, dy, color };
  };

  // Fonction pour dessiner les bulles sur le canvas
  const drawBubbles = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    bubbles.forEach(bubble => {
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.fillStyle = bubble.color;
      ctx.fill();
      ctx.closePath();
    });
  };

  // Fonction pour mettre à jour la position des bulles
  const updateBubbles = (canvas: HTMLCanvasElement) => {
    setBubbles(prevBubbles => {
      const updatedBubbles = prevBubbles.map(bubble => {
        bubble.x += bubble.dx;
        bubble.y += bubble.dy;

        // Réinitialiser la bulle si elle sort de l'écran
        if (bubble.y + bubble.radius < 0 || bubble.x + bubble.radius < 0 || bubble.x - bubble.radius > canvas.width) {
          return createBubble(canvas);
        }
        return bubble;
      });
      return updatedBubbles;
    });
  };

  // Effet pour initialiser et animer les bulles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajuster la taille du canvas à celle de la fenêtre
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Recréer les bulles lors du redimensionnement pour s'adapter à la nouvelle taille
      setBubbles(Array.from({ length: 50 }, () => createBubble(canvas))); // Ajustez le nombre de bulles si nécessaire
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Appel initial

    // Créer les bulles initiales
    setBubbles(Array.from({ length: 50 }, () => createBubble(canvas)));

    const animate = () => {
      updateBubbles(canvas);
      drawBubbles(ctx);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    // Nettoyage lors du démontage du composant
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [bubbleColors]); // Re-déclenche l'effet si les couleurs changent (donc si la langue change)

  return (
    <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
  );
};

export default FloatingBubblesBackground;
