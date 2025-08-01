import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';

// Interface pour typer l'objet du formulaire
interface FormData {
  name: string;
  email: string;
  message: string;
}

// Union de types pour l'état du statut du formulaire
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Partenariat() {
  // L'état du formulaire avec les valeurs initiales
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  // L'état pour le statut de l'envoi du formulaire.
  const [status, setStatus] = useState<FormStatus>('idle');

  // Gestionnaire de changement pour tous les champs du formulaire
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Simulation d'une requête API
      console.log('Envoi des données:', formData);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simule un délai de 2 secondes
      
      // La logique d'envoi à une API réelle irait ici
      // const response = await fetch('/api/partnerships', { ... });
      // if (!response.ok) { throw new Error('Erreur lors de l\'envoi.'); }

      setStatus('success');
      console.log('Formulaire soumis avec succès!');

      // Réinitialiser le formulaire après succès
      setFormData({
        name: '',
        email: '',
        message: '',
      });

    } catch (error) {
      setStatus('error');
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };

  return (
    // Arrière-plan avec un dégradé pour mettre en valeur l'effet de verre dépoli
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 font-sans bg-gradient-to-br from-indigo-500 to-purple-600">
      {/* Conteneur principal avec le style "glassmorphism" */}
      <div className="max-w-4xl w-full bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl transition-all duration-500 transform hover:scale-105 p-6 md:p-10 lg:p-12 border border-white/20 animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2 animate-slide-in-down">Devenez Partenaire</h1>
          <p className="text-white/80 animate-fade-in-up delay-100">Rejoignez-nous pour promouvoir les langues gabonaises.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champs du formulaire avec des effets de transition et un style transparent */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/80">Nom Complet</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md bg-white/10 border border-white/30 shadow-sm text-white placeholder-white/50 focus:border-white/60 focus:ring-white/40 focus:ring-opacity-50 transition-all duration-300 ease-in-out p-3 transform focus:scale-102"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/80">Adresse Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md bg-white/10 border border-white/30 shadow-sm text-white placeholder-white/50 focus:border-white/60 focus:ring-white/40 focus:ring-opacity-50 transition-all duration-300 ease-in-out p-3 transform focus:scale-102"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white/80">Votre Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="mt-1 block w-full rounded-md bg-white/10 border border-white/30 shadow-sm text-white placeholder-white/50 focus:border-white/60 focus:ring-white/40 focus:ring-opacity-50 transition-all duration-300 ease-in-out p-3 transform focus:scale-102"
            ></textarea>
          </div>

          {/* Bouton de soumission avec une animation d'état */}
          <div className="text-center group">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out transform ${
                status === 'submitting'
                  ? 'bg-white/40 cursor-not-allowed'
                  : 'bg-white/20 hover:bg-white/30 hover:scale-105 active:scale-95 group-hover:shadow-lg'
              }`}
            >
              {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer ma demande'}
            </button>
          </div>

          {/* Messages de statut avec une animation de fondu */}
          {status === 'success' && (
            <div className="mt-4 p-4 rounded-lg bg-white/20 text-white text-center font-medium transition-all duration-500 animate-fade-in">
              Demande de partenariat envoyée avec succès !
            </div>
          )}
          {status === 'error' && (
            <div className="mt-4 p-4 rounded-lg bg-red-500/20 text-white text-center font-medium transition-all duration-500 animate-fade-in">
              Une erreur est survenue. Veuillez réessayer plus tard.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
