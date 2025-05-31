'use client';

// React
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';

// Lucide
import { UserRound, Camera, Bell, Globe, ArrowLeft, Save, SquarePen } from 'lucide-react';

// ShadCN UI
import SwitchButton from '@/components/ui/switchButton/SwitchButton';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// API
import { updateInfosUser } from '@/lib/api/users';

export default function Settings() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    language: 'Français',
    emailNotifications: true,
    pushNotifications: false
  });

  // Mettre à jour le formulaire quand les données de session sont chargées
  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user?.name || '',
        email: session.user?.email || ''
      }));
    }
  }, [session]);

  // Handle select language change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleEditMode = () => {
    if (editMode) {
      // Réinitialiser en cas d'annulation
      setFormData({
        name: session?.user?.name || '',
        email: session?.user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        language: formData.language,
        emailNotifications: formData.emailNotifications,
        pushNotifications: formData.pushNotifications
      });
    }
    setEditMode(!editMode);
  };

  const handleSaveChanges = () => {
    // Mettre appel API
    updateInfosUser(session?.user?.id || '', {
      name: formData.name,
      email: formData.email,
    }).then((updatedUser) => {
      if (updatedUser) {
        console.log('User updated successfully:', updatedUser);
      } else {
        console.error('Failed to update user');
      }
    }).catch((error) => {
      console.error('Error updating user:', error);
    });

    console.log('Modifications sauvegardées:', formData);
    setSaveSuccess(true);
    setEditMode(false);
    
    // Hide success message 
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  // Typage pour React Hook Form
  interface ProfileFormValues {
    name: string;
    email: string;
    image?: FileList;
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }
  const form = useForm<ProfileFormValues>({
    defaultValues: {
      name: formData.name,
      email: formData.email,
      image: undefined,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const onSubmit: SubmitHandler<ProfileFormValues> = (values) => {
    console.log('Submitted values:', values);
    handleSaveChanges();
  };

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header avec navigation retour */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/home" className="flex items-center text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="mr-2" size={20} />
              <span className="text-lg font-medium">Back to dashboard</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Titre de la page */}
          <div className="border-b border-gray-200">
            <h1 className="text-2xl font-bold text-primary p-6">Account settings</h1>
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
            <div className="md:w-3/4 p-6 overflow-y-auto max-h-[80vh]">
              {/* Onglet Profil */}
              {activeTab === 'profile' && (
                <div className=''>
                  {saveSuccess && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Modifications enregistrées avec succès!
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Profile info</h2>
                    <button 
                      onClick={handleToggleEditMode}
                      className={`flex items-center ${editMode ? 'bg-gray-200 text-gray-700' : 'bg-primary text-white'} rounded-md px-3 py-2 text-sm font-medium`}
                    >
                      {editMode ? (
                        <>Cancel</>
                      ) : (
                        <>
                          <SquarePen size={16} className="mr-2" />
                          Modify
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Formulaire d'informations personnelles */}
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      {/* Photo de profil gérée par React Hook Form */}
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-col items-center md:items-start mb-8">
                                <div className="relative mb-4">
                                  <Image
                                    src={
                                      field.value && field.value.length > 0
                                        ? URL.createObjectURL(field.value[0])
                                        : session?.user?.image || '/images/default-profile.png'
                                    }
                                    alt="Photo de profil"
                                    width={100}
                                    height={100}
                                    className="rounded-full object-cover aspect-square"
                                  />
                                  {editMode && (
                                    <>
                                      <input
                                        id="profile-image-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => e.target.files && field.onChange(e.target.files)}
                                      />
                                      <label
                                        htmlFor="profile-image-upload"
                                        className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer"
                                      >
                                        <Camera size={16} />
                                      </label>
                                    </>
                                  )}
                                </div>
                                {editMode && (
                                  <p className="text-sm text-gray-500">
                                    Formats acceptés: JPG, PNG. Taille max: 1MB
                                  </p>
                                )}
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                  
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom complet</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={!editMode}/>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Adresse email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} disabled={!editMode} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Password fields in editMode only */}
                      {editMode && (
                        <>
                          <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nouveau mot de passe</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirmer mot de passe</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                      <div className="pt-4">
                        <button
                          type="submit"
                          className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md flex items-center"
                          style={{ display: editMode ? 'flex' : 'none' }}
                        >
                          <Save size={16} className="mr-2" />
                          Sauvegarder les modifications
                        </button>
                      </div>
                    </form>
                  </Form>
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
