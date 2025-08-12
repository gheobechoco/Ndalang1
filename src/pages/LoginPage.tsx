// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { supabase, supabaseAdmin } from '../../supabaseClient'; // Importez les deux clients

// Removed: import { useNavigate } from 'react-router-dom'; // No longer needed here

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Removed: const navigate = useNavigate(); // No longer needed here

    const handleAuth = async (event: React.FormEvent) => {
        event.preventDefault();
        setMessage(null);
        setMessageType(null);
        setIsLoading(true);

        try {
            if (isRegistering) {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/`
                    }
                });

                if (error) {
                    if (error.message.includes('User already registered')) {
                        setMessage('Un compte avec cet email existe déjà. Veuillez vous connecter.');
                        setMessageType('error');
                    } else {
                        setMessage(error.message);
                        setMessageType('error');
                    }
                } else if (data?.user) {
                    // UTILISEZ LE CLIENT ADMIN POUR LA CRÉATION DU PROFIL
                    const { error: profileError } = await supabaseAdmin
                        .from('profiles')
                        .insert({
                            id: data.user.id,
                            username: email.split('@')[0],
                        });

                    if (profileError) {
                        console.error('Erreur création profil:', profileError.message);
                        setMessage('Inscription réussie, mais échec création profil.');
                        setMessageType('error');
                        await supabase.auth.signOut();
                    } else {
                        setMessage('Inscription réussie ! Vérifiez votre email.');
                        setMessageType('success');
                        setIsRegistering(false);
                        setEmail('');
                        setPassword('');
                    }
                }
            } else {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) {
                    setMessage(error.message);
                    setMessageType('error');
                } else {
                    setMessage('Connexion réussie ! Redirection...');
                    setMessageType('success');
                }
            }
        } catch (error) { // Modifier 'err' en 'error' pour corriger l'avertissement ESLint
            console.error('Authentication error:', error);
            
            // Afficher un message d'erreur plus précis
            let errorMessage = 'Une erreur inattendue est survenue.';
            if (error instanceof Error) {
                errorMessage = error.message;
            } else if (typeof error === 'string') {
                errorMessage = error;
            }
            
            setMessage(errorMessage);
            setMessageType('error');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    {isRegistering ? 'Créer un compte' : 'Connexion'}
                </h2>
                <form onSubmit={handleAuth}>
                    <div className="mb-4 text-left">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email :
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-6 text-left">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Mot de passe :
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Chargement...' : (isRegistering ? 'S\'inscrire' : 'Se connecter')}
                    </button>
                    {message && (
                        <p className={`mt-4 text-sm ${messageType === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                            {message}
                        </p>
                    )}
                </form>
                <p className="mt-6 text-gray-600 text-sm">
                    {isRegistering ? 'Déjà un compte ?' : 'Pas encore de compte ?'}{' '}
                    <button
                        onClick={() => {
                            setIsRegistering(!isRegistering);
                            setMessage(null);
                            setMessageType(null);
                        }}
                        className="text-blue-600 hover:text-blue-800 font-bold focus:outline-none"
                        disabled={isLoading}
                    >
                        {isRegistering ? 'Se connecter' : 'S\'inscrire'}
                    </button>
                </p>
                {!isRegistering && (
                    <p className="mt-2 text-gray-600 text-sm">
                        <a href="#" onClick={(e) => { e.preventDefault(); alert("La fonctionnalité de réinitialisation de mot de passe sera implémentée dans une future mise à jour."); }} className="text-blue-600 hover:text-blue-800 font-bold">
                            Mot de passe oublié ?
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
