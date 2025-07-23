// src/pages/LeagueSimulationPage.tsx
import  { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, TrophyIcon } from '@heroicons/react/24/solid';

// Interface pour un joueur simulé
interface SimulatedPlayer {
  id: string;
  name: string;
  xp: number;
  flag: string; // Emoji de drapeau
  isCurrentUser?: boolean; // Pour identifier l'utilisateur actuel
}

export default function LeagueSimulationPage() {
  // Récupérer le score total de l'utilisateur actuel depuis localStorage
  const currentUserTotalScore = parseInt(localStorage.getItem('ndalang_total_score') || '0', 10);

  // Joueurs simulés (données statiques pour la démo frontend)
  const simulatedOpponents: SimulatedPlayer[] = useMemo(() => [
    { id: 'bot1', name: 'Le Lion Indomptable', xp: 450, flag: '🇨🇲' },
    { id: 'bot2', name: 'L’Aigle de Carthage', xp: 380, flag: '🇹🇳' },
    { id: 'bot3', name: 'La Panthère Noire', xp: 320, flag: '🇬🇦' }, // Un clin d'œil au Gabon
    { id: 'bot4', name: 'Le Pharaon du Nil', xp: 280, flag: '🇪🇬' },
    { id: 'bot5', name: 'Le Guerrier Zulu', xp: 200, flag: '🇿🇦' },
    { id: 'bot6', name: 'La Gazelle du Désert', xp: 150, flag: '🇩🇿' },
    { id: 'bot7', name: 'Le Sorcier de Timbuktu', xp: 100, flag: '🇲🇱' },
    { id: 'bot8', name: 'La Reine de Saba', xp: 80, flag: '🇪🇹' },
    { id: 'bot9', name: 'L’Éléphant d’Ivoire', xp: 50, flag: '🇨🇮' },
    { id: 'bot10', name: 'Le Dragon de Madagascar', xp: 20, flag: '🇲🇬' },
  ], []);

  // Combiner les joueurs simulés avec l'utilisateur actuel et trier par XP
  const leaderboard = useMemo(() => {
    const currentUser: SimulatedPlayer = {
      id: 'current_user',
      name: 'Vous (NdaLang Learner)', // Nom pour l'utilisateur actuel
      xp: currentUserTotalScore,
      flag: '🇬🇦', // Drapeau Gabonais pour l'utilisateur
      isCurrentUser: true,
    };

    const allPlayers = [...simulatedOpponents, currentUser];
    return allPlayers.sort((a, b) => b.xp - a.xp); // Tri décroissant par XP
  }, [currentUserTotalScore, simulatedOpponents]);

  // Déterminer la division actuelle (simulation simple)
  const divisionName = "Division Bronze"; // Pour la simulation, restons simple
  const promotionThreshold = 3; // Les 3 premiers sont promus (arbitraire)
  const daysRemaining = 3; // Jours restants dans la "semaine" de ligue simulée

  return (
    <div className="max-w-xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-xl my-8 pt-16">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeftIcon className="h-5 w-5 mr-1" />
        Retour à l'accueil
      </Link>

      <h1 className="text-3xl font-bold text-center mb-4 text-gray-900 flex items-center justify-center">
        <TrophyIcon className="h-8 w-8 text-yellow-500 mr-2" />
        {divisionName}
      </h1>
      <p className="text-sm text-gray-600 text-center mb-6">
        Les {promotionThreshold} premiers rejoignent la division supérieure.
        <span className="block mt-1 font-semibold">{daysRemaining} JOURS RESTANTS</span>
      </p>

      <div className="space-y-3">
        {leaderboard.map((player, index) => (
          <div
            key={player.id}
            className={`
              flex items-center justify-between p-3 rounded-lg shadow-sm
              ${player.isCurrentUser ? 'bg-blue-100 border-2 border-blue-500 font-bold' : 'bg-gray-50 border border-gray-200'}
              ${index < promotionThreshold && !player.isCurrentUser ? 'bg-yellow-50 border-2 border-yellow-400' : ''}
              ${index < promotionThreshold && player.isCurrentUser ? 'bg-green-100 border-2 border-green-500' : ''}
            `}
          >
            <div className="flex items-center">
              <span className={`text-xl font-extrabold mr-3 ${index < promotionThreshold ? 'text-yellow-600' : 'text-gray-600'}`}>
                {index + 1}.
              </span>
              <span className="text-2xl mr-3">{player.flag}</span>
              <span className="text-lg text-gray-800">{player.name}</span>
            </div>
            <span className={`text-xl font-bold ${player.isCurrentUser ? 'text-blue-700' : 'text-green-600'}`}>
              {player.xp} XP
            </span>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-8 text-center italic">
        Ceci est une simulation de ligue. Votre score est basé sur votre progression locale.
        Une fonctionnalité de ligue réelle nécessiterait un backend.
      </p>
    </div>
  );
}
