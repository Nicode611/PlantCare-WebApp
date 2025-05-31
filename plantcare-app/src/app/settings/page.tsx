'use client';

// React
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '@/types/user';

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
import { updateInfosUser } from '@/lib/api';
import { uploadImageToVercel } from '@/lib/api';

export default function Settings() {
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'preferences'>('profile');
  const [editMode, setEditMode] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // 1) Profil
  interface ProfileFormValues { 
    name: string;
    email: string; 
    image?: FileList; 
    newPassword?: string; 
    confirmPassword?: string; 
  }
  const profileForm = useForm<ProfileFormValues>({
    defaultValues: { 
      name: session?.user?.name||'', 
      email: session?.user?.email||'', 
      image: undefined, newPassword: '',
      confirmPassword: '' }
  });
  const onProfileSubmit: SubmitHandler<ProfileFormValues> = async (vals) => {
    if (!session?.user?.id) return;
    // mot de passe
    if (vals.newPassword && vals.newPassword!==vals.confirmPassword) return;
    // upload image
    let imgUrl = session.user.image;
    if (vals.image && vals.image.length) {
      const url = await uploadImageToVercel(vals.image[0]); if (url) imgUrl=url;
    }
    const payload: Partial<User> = { name: vals.name, email: vals.email, image: imgUrl };
    if (vals.newPassword) payload.password=vals.newPassword;
    await updateInfosUser(session.user.id, payload);
    setSaveSuccess(true);
  };
  // 2) Notifications
  interface NotificationsFormValues { 
    emailNotifications: boolean; 
    maintenanceNotifications: boolean; 
    weeklyTips: boolean; 
  }
  const notificationsForm = useForm<NotificationsFormValues>({
    defaultValues: { 
      emailNotifications: session?.user?.acceptAnyMail||false,
      maintenanceNotifications: session?.user?.acceptPlantcareMail||false, 
      weeklyTips: session?.user?.acceptTipsMail||false 
    }
  });
  const onNotificationsSubmit: SubmitHandler<NotificationsFormValues> = async (vals) => {
    if (!session?.user?.id) return;
    const payload: Partial<User> = { acceptPlantcareMail: vals.emailNotifications, acceptAnyMail: vals.maintenanceNotifications, acceptTipsMail: vals.weeklyTips };
    await updateInfosUser(session.user.id, payload);
    setSaveSuccess(true);
  };
  // 3) Préférences
  interface PreferencesFormValues { 
    language: string; 
    darkMode: boolean; 
  }
  const preferencesForm = useForm<PreferencesFormValues>({ 
    defaultValues: { 
      language: session?.user?.language || 'fr', 
      darkMode: session?.user?.theme === 'dark' } 
    });
  const onPreferencesSubmit: SubmitHandler<PreferencesFormValues> = async (vals) => {
    if (!session?.user?.id) return;
    const payload: Partial<User> = { language: vals.language, theme: vals.darkMode?'dark':'light' };
    try {
    const test = await updateInfosUser(session.user.id, payload);
    if (test) {
      setSaveSuccess(true);
      console.log("Preferences updated successfully.");
    }
    }
    catch (error) {
      console.error("Error updating preferences:", error);
    }
  };

  // Mettre à jour le formulaire quand les données de session sont chargées
  useEffect(() => {
    if (session?.user) {
      profileForm.reset({
        name: session.user.name ?? '',
        email: session.user.email ?? '',
      });
      notificationsForm.reset({
        emailNotifications: session.user.acceptAnyMail,
        maintenanceNotifications: session.user.acceptPlantcareMail,
        weeklyTips: session.user.acceptTipsMail,
      });
      preferencesForm.reset({ language: session.user.language || 'fr', darkMode: session.user.theme === 'dark' });
    }
  }, [session, profileForm, notificationsForm, preferencesForm]);
  // Clear success message when changing tabs
  useEffect(() => {
    setSaveSuccess(false);
  }, [activeTab]);

  // Handle select language change
  /* const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    preferencesForm.setValue(name as keyof PreferencesFormValues, value);
  }; */

  const handleToggleEditMode = () => {
    if (editMode) {
      // Réinitialiser en cas d'annulation
      profileForm.reset({
        name: session?.user?.name ?? '',
        email: session?.user?.email ?? '',
        image: undefined,
        newPassword: '',
        confirmPassword: '',
      });
    }
    setEditMode(!editMode);
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
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                      {/* Photo de profil gérée par React Hook Form */}
                      <FormField
                        control={profileForm.control}
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
                        control={profileForm.control}
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
                        control={profileForm.control}
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
                            control={profileForm.control}
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
                            control={profileForm.control}
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
                          Sauvegarder le profil
                        </button>
                      </div>
                    </form>
                  </Form>
                </div>
              )}
              
              {/* Onglet Notifications */}
              {activeTab === 'notifications' && (
                <Form {...notificationsForm}>
                  <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                    {saveSuccess && (
                      <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Paramètres de notifications enregistrés !
                      </div>
                    )}
                    <FormField
                      control={notificationsForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                          <div>
                            <FormLabel className='font-medium'>Alertes par email</FormLabel>
                            <p className="text-sm text-gray-500">Recevez des rappels d&apos;arrosage par email</p>
                          </div>
                          <FormControl>
                            <SwitchButton checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="maintenanceNotifications"
                      render={({ field }) => (
                        <FormItem className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                          <div>
                            <FormLabel>Notifications d&apos;entretien</FormLabel>
                            <p className="text-sm text-gray-500">Recevez des alertes sur l&apos;entretien de vos plantes</p>
                          </div>
                          <FormControl>
                            <SwitchButton checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={notificationsForm.control}
                      name="weeklyTips"
                      render={({ field }) => (
                        <FormItem className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                          <div>
                            <FormLabel>Conseils hebdomadaires</FormLabel>
                            <p className="text-sm text-gray-500">Recevez des astuces pour prendre soin de vos plantes</p>
                          </div>
                          <FormControl>
                            <SwitchButton checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-4">
                      <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md flex items-center">
                        <Save size={16} className="mr-2" />
                        Sauvegarder
                      </button>
                    </div>
                  </form>
                </Form>
              )}

              {/* Onglet Préférences */}
              {activeTab === 'preferences' && (
                <Form {...preferencesForm}>
                  <form onSubmit={preferencesForm.handleSubmit(onPreferencesSubmit)} className="space-y-6">
                    {saveSuccess && (
                      <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Préférences enregistrées !
                      </div>
                    )}
                    <FormField
                      control={preferencesForm.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Langue</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              disabled={editMode}
                              className="bg-white border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary w-full p-2.5"
                            >
                              <option value="fr">Français</option>
                              <option value="en">English</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={preferencesForm.control}
                      name="darkMode"
                      render={({ field }) => (
                        <FormItem className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                          <div>
                            <FormLabel className='font-medium'>Mode sombre</FormLabel>
                            <p className="text-sm text-gray-500">Activez le mode sombre pour une meilleure visibilité la nuit</p>
                          </div>
                          <FormControl>
                            <SwitchButton checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-4">
                      <button type="submit" className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md flex items-center">
                        <Save size={16} className="mr-2" />
                        Sauvegarder
                      </button>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
