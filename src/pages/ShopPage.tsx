import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, CurrencyDollarIcon, FireIcon, BoltIcon } from '@heroicons/react/24/solid';

// Définition de l'interface pour un article de la boutique
interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  effect: 'streak_freeze' | 'double_xp' | 'extra_life'; // Type d'effet de l'article
  quantity?: number; // Pour les articles qui peuvent avoir une quantité (ex: Gel de série)
}

// Liste des articles disponibles dans la boutique
const shopItems: ShopItem[] = [
  {
    id: 'streak_freeze',
    name: 'Gel de série',
    description: 'Protège votre série de jours d\'apprentissage pour 1 jour.',
    price: 200,
    icon: <FireIcon className="h-10 w-10 text-red-400" />,
    effect: 'streak_freeze',
    quantity: 1, // Une utilisation par achat
  },
  {
    id: 'double_xp',
    name: 'Double XP',
    description: 'Double les XP gagnés pour la prochaine leçon complétée.',
    price: 300,
    icon: <BoltIcon className="h-10 w-10 text-yellow-400" />,
    effect: 'double_xp',
    quantity: 1, // Une utilisation par achat
  },
  // Vous pouvez ajouter d'autres articles ici
  // {
  //   id: 'extra_life',
  //   name: 'Vie supplémentaire',
  //   description: 'Vous donne une chance supplémentaire au quiz.',
  //   price: 150,
  //   icon: <HeartIcon className="h-10 w-10 text-pink-400" />,
  //   effect: 'extra_life',
  //   quantity: 1,
  // },
];

export default function ShopPage() {
  const [totalCoins, setTotalCoins] = useState(0);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Charger les pièces de l'utilisateur au montage du composant
  useEffect(() => {
    const coins = parseInt(localStorage.getItem('ndalang_coins') || '0', 10);
    setTotalCoins(coins);
  }, []);

  // Fonction pour afficher un message temporaire
  const showTemporaryMessage = (text: string, type: 'success' | 'error' | 'info') => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage(null);
    }, 3000); // Le message disparaît après 3 secondes
  };

  // Gérer l'achat d'un article
  const handlePurchase = (item: ShopItem) => {
    if (totalCoins >= item.price) {
      const newCoins = totalCoins - item.price;
      setTotalCoins(newCoins);
      localStorage.setItem('ndalang_coins', newCoins.toString());

      // Gérer l'effet de l'article acheté (pour l'instant, simple log ou mise à jour localStorage)
      let purchasedItems = JSON.parse(localStorage.getItem('ndalang_purchased_items') || '[]');
      const existingItemIndex = purchasedItems.findIndex((i: ShopItem) => i.id === item.id);

      if (existingItemIndex !== -1) {
        // Si l'article existe déjà, incrémenter la quantité
        purchasedItems[existingItemIndex].quantity = (purchasedItems[existingItemIndex].quantity || 0) + (item.quantity || 1);
      } else {
        // Sinon, ajouter le nouvel article
        purchasedItems.push({ ...item, quantity: item.quantity || 1 });
      }
      localStorage.setItem('ndalang_purchased_items', JSON.stringify(purchasedItems));

      showTemporaryMessage(`Vous avez acheté "${item.name}" pour ${item.price} pièces !`, 'success');
      console.log(`Article acheté: ${item.name}. Pièces restantes: ${newCoins}`);
      // Ici, vous implémenteriez la logique réelle pour activer l'effet de l'article (ex: activer un "Gel de série")
    } else {
      showTemporaryMessage('Vous n\'avez pas assez de pièces pour acheter cet article.', 'error');
      console.log('Pas assez de pièces.');
    }
  };

  return (
    // Arrière-plan avec un dégradé pour mettre en valeur l'effet de verre dépoli
    <div className="min-h-screen p-4 md:p-8 font-sans bg-gradient-to-br from-purple-500 to-indigo-600">
      
      {/* Conteneur principal avec le style "glassmorphism" */}
      <div className="max-w-4xl mx-auto my-8 p-6 md:p-10 lg:p-12 bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 transition-all duration-500 transform animate-fade-in-up">
        
        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-300 mb-6">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl font-bold text-center mb-6 text-white animate-slide-in-down">
          🛍️ Boutique NdaLang
        </h1>

        {/* Cadre des pièces avec un effet de verre */}
        <div className="flex items-center justify-center mb-8 p-4 bg-white/20 backdrop-blur-md rounded-xl shadow-lg border border-white/30 transform transition-transform duration-300 hover:scale-105">
          <CurrencyDollarIcon className="h-8 w-8 text-yellow-300 mr-3 animate-pulse" />
          <p className="text-2xl font-bold text-white">
            Vos Pièces : <span className="text-yellow-200">{totalCoins}</span>
          </p>
        </div>

        {message && (
          <div className={`
            p-3 rounded-md mb-4 text-center text-white font-medium animate-fade-in
            ${message.type === 'success' ? 'bg-green-500/50 border border-green-300' : ''}
            ${message.type === 'error' ? 'bg-red-500/50 border border-red-300' : ''}
            ${message.type === 'info' ? 'bg-blue-500/50 border border-blue-300' : ''}
          `}>
            {message.text}
          </div>
        )}

        <p className="text-lg text-white/80 mb-8 text-center animate-fade-in delay-200">
          Dépensez vos pièces durement gagnées pour obtenir des avantages et améliorer votre apprentissage !
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopItems.map((item) => (
            // Cartes des articles avec un effet de verre
            <div key={item.id} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105">
              <div className="mb-4 transform transition-transform duration-300 hover:rotate-6">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
              <p className="text-white/70 text-sm mb-4 flex-grow">{item.description}</p>
              <div className="flex items-center justify-center mb-4">
                <CurrencyDollarIcon className="h-6 w-6 text-yellow-300 mr-1" />
                <span className="text-2xl font-bold text-white">{item.price}</span>
              </div>
              <button
                onClick={() => handlePurchase(item)}
                disabled={totalCoins < item.price}
                className={`
                  w-full px-4 py-2 rounded-lg text-lg font-semibold shadow-md transition duration-300
                  ${totalCoins >= item.price ? 'bg-white/30 text-white hover:bg-white/40' : 'bg-white/10 text-white/50 cursor-not-allowed'}
                `}
              >
                Acheter
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
