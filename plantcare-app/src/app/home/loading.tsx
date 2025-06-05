'use client';

import { useSession } from 'next-auth/react';

export default function LoadingPage() {
  const { data: session } = useSession();
  
  // Mode thème - Light ou Dark selon la préférence utilisateur
  const isDarkMode = session?.user?.theme === "dark";
  
  // Langue - FR ou EN selon la préférence utilisateur
  const userLanguage = session?.user?.language || 'fr';
  
  const translations = {
    fr: {
      loading: "Chargement..."
    },
    en: {
      loading: "Loading..."
    }
  };
  
  const t = translations[userLanguage as 'fr' | 'en'];

  return (
    <div className={`flex items-center justify-center w-screen h-screen ${isDarkMode ? 'bg-bgDarker' : 'bg-[#F5F5F5]'}`}>
      <div className="flex flex-col items-center">
        <div className={`w-16 h-16 border-4 ${isDarkMode ? 'border-secondary' : 'border-[#87b57d]'} border-solid rounded-full border-t-transparent animate-spin`}></div>
        <p className={`mt-4 text-lg font-medium ${isDarkMode ? 'text-secondary' : 'text-[#3e663a]'}`}>{t.loading}</p>
      </div>
    </div>
  );
}
