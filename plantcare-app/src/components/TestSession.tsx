"use client"

import { useSession, signIn, signOut } from 'next-auth/react';

export default function MonComposant() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Chargement…</p>;
  }
  if (!session) {
    return (
      <button onClick={() => signIn('google')}>
        Se connecter avec Google
      </button>
    );
  }

  return (
    <div>
      <p>Connecté en tant que {session.user?.name} ({session.user?.email})</p>
      <button onClick={() => signOut()}>Se déconnecter</button>
    </div>
  );
}