

import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import HomeClient from './HomeClient';

export default async function Home() {
    // Vérification de l'authentification côté serveur
    const session = await auth();
    
    // Si l'utilisateur n'est pas authentifié, redirection vers la page de connexion
    if (!session) {
        redirect('/signin');
    }
    
    // Si l'utilisateur est authentifié, rendu du composant client
    return <HomeClient />;
}
