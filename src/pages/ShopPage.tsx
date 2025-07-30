// src/pages/ShopPage.tsx

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
    icon: <FireIcon className="h-10 w-10 text-red-500" />,
    effect: 'streak_freeze',
    quantity: 1, // Une utilisation par achat
  },
  {
    id: 'double_xp',
    name: 'Double XP',
    description: 'Double les XP gagnés pour la prochaine leçon complétée.',
    price: 300,
    icon: <BoltIcon className="h-10 w-10 text-yellow-500" />,
    effect: 'double_xp',
    quantity: 1, // Une utilisation par achat
  },
  // Vous pouvez ajouter d'autres articles ici
  // {
  //   id: 'extra_life',
  //   name: 'Vie supplémentaire',
  //   description: 'Vous donne une chance supplémentaire au quiz.',
  //   price: 150,
  //   icon: <HeartIcon className="h-10 w-10 text-pink-500" />,
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
    <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl my-8 pt-16">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Retour à l'accueil
      </Link>

      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
        🛍️ Boutique NdaLang
      </h1>

      <div className="flex items-center justify-center mb-8 p-4 bg-yellow-100 rounded-lg shadow-md">
        <CurrencyDollarIcon className="h-8 w-8 text-yellow-600 mr-3" />
        <p className="text-2xl font-bold text-gray-900">
          Vos Pièces : <span className="text-yellow-700">{totalCoins}</span>
        </p>
      </div>

      {message && (
        <div className={`
          p-3 rounded-md mb-4 text-center
          ${message.type === 'success' ? 'bg-green-100 text-green-700 border border-green-400' : ''}
          ${message.type === 'error' ? 'bg-red-100 text-red-700 border border-red-400' : ''}
          ${message.type === 'info' ? 'bg-blue-100 text-blue-700 border border-blue-400' : ''}
        `}>
          {message.text}
        </div>
      )}

      <p className="text-lg text-gray-700 mb-8 text-center">
        Dépensez vos pièces durement gagnées pour obtenir des avantages et améliorer votre apprentissage !
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shopItems.map((item) => (
          <div key={item.id} className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center">
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">{item.description}</p>
            <div className="flex items-center justify-center mb-4">
              <CurrencyDollarIcon className="h-6 w-6 text-yellow-600 mr-1" />
              <span className="text-2xl font-bold text-gray-900">{item.price}</span>
            </div>
            <button
              onClick={() => handlePurchase(item)}
              disabled={totalCoins < item.price}
              className={`
                w-full px-4 py-2 rounded-lg text-lg font-semibold shadow-md transition duration-300
                ${totalCoins >= item.price ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}
              `}
            >
              Acheter
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
