'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { UserRound, Camera, Bell, Globe, ArrowLeft, Save } from 'lucide-react';
import SwitchButton from '@/components/ui/switchButton/SwitchButton';

export default function Settings() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    language: 'Français',
    emailNotifications: true,
    pushNotifications: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header avec navigation retour */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/home" className="flex items-center text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="mr-2" size={20} />
              <span className="text-lg font-medium">Retour au tableau de bord</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Titre de la page */}
          <div className="border-b border-gray-200">
            <h1 className="text-2xl font-bold text-primary p-6">Paramètres du compte</h1>
          </div>
          
          {/* Structure en deux colonnes sur grands écrans */}
          <div className="flex flex-col md:flex-row">
            {/* Menu latéral */}
            <div className="md:w-1/4 bg-gray-50 p-4">
              <nav>
                <ul>
                  <li>
                    <button 
                      onClick={() => setActiveTab('profile')}
                      className={`flex items-center w-full text-left p-3 rounded-md ${activeTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
                    >
                      <UserRound size={18} className="mr-2" />
                      <span>Profil</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('notifications')}
                      className={`flex items-center w-full text-left p-3 rounded-md mt-1 ${activeTab === 'notifications' ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
                    >
                      <Bell size={18} className="mr-2" />
                      <span>Notifications</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('preferences')}
                      className={`flex items-center w-full text-left p-3 rounded-md mt-1 ${activeTab === 'preferences' ? 'bg-primary text-white' : 'hover:bg-gray-200'}`}
                    >
                      <Globe size={18} className="mr-2" />
                      <span>Préférences</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Contenu principal */}
            <div className="md:w-3/4 p-6">
              {/* Onglet Profil */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Informations du profil</h2>
                  
                  {/* Photo de profil */}
                  <div className="flex flex-col items-center md:items-start mb-8">
                    <div className="relative mb-4">
                      {session?.user?.image ? (
                        <Image 
                          src={session.user.image} 
                          alt="Photo de profil"
                          width={100}
                          height={100}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                          <UserRound size={40} className="text-gray-400" />
                        </div>
                      )}
                      <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full">
                        <Camera size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Formats acceptés: JPG, PNG. Taille max: 1MB
                    </p>
                  </div>
                  
                  {/* Formulaire d'informations personnelles */}
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Adresse email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="button"
                        className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md flex items-center"
                      >
                        <Save size={16} className="mr-2" />
                        Sauvegarder les modifications
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Onglet Notifications */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Préférences de notifications</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">Alertes par email</h3>
                        <p className="text-sm text-gray-500">Recevez des rappels d&apos;arrosage par email</p>
                      </div>
                      <SwitchButton />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">Notifications d&apos;entretien</h3>
                        <p className="text-sm text-gray-500">Recevez des alertes sur l&apos;entretien de vos plantes</p>
                      </div>
                      <SwitchButton />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium">Conseils hebdomadaires</h3>
                        <p className="text-sm text-gray-500">Recevez des astuces pour prendre soin de vos plantes</p>
                      </div>
                      <SwitchButton />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="button"
                        className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md flex items-center"
                      >
                        <Save size={16} className="mr-2" />
                        Sauvegarder les préférences
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Onglet Préférences */}
              {activeTab === 'preferences' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Préférences générales</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                        Langue
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="Français">Français</option>
                        <option value="English">English</option>
                        <option value="Español">Español</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mt-6">
                      <div>
                        <h3 className="font-medium">Mode sombre</h3>
                        <p className="text-sm text-gray-500">Activer le thème sombre</p>
                      </div>
                      <SwitchButton />
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="button"
                        className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md flex items-center"
                      >
                        <Save size={16} className="mr-2" />
                        Sauvegarder les préférences
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
