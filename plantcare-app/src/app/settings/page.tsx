'use client';

// React
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User} from '@/types/user';
import { heicTo } from "heic-to";

// Lucide
import { UserRound, Camera, Bell, Globe, ArrowLeft, Save, SquarePen, Loader2 } from 'lucide-react';

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

// Traductions
const translations = {
  fr: {
    backToDashboard: "Retour au tableau de bord",
    accountSettings: "Paramètres du compte",
    profile: "Profil",
    notifications: "Notifications",
    preferences: "Préférences",
    profileInfo: "Informations du profil",
    modify: "Modifier",
    cancel: "Annuler",
    saveProfile: "Sauvegarder le profil",
    fullName: "Nom complet",
    email: "Adresse email",
    newPassword: "Nouveau mot de passe",
    confirmPassword: "Confirmer mot de passe",
    acceptedFormats: "Formats acceptés: JPG, PNG. Taille max: 1MB",
    saveSuccess: "Modifications enregistrées avec succès!",
    notifSuccess: "Paramètres de notifications enregistrés !",
    prefSuccess: "Préférences enregistrées !",
    emailAlerts: "Alertes par email",
    emailAlertsDesc: "Recevez des rappels d'arrosage par email",
    maintenanceNotifs: "Notifications d'entretien",
    maintenanceNotifsDesc: "Recevez des alertes sur l'entretien de vos plantes",
    weeklyTips: "Conseils hebdomadaires",
    weeklyTipsDesc: "Recevez des astuces pour prendre soin de vos plantes",
    save: "Sauvegarder",
    language: "Langue",
    darkMode: "Mode sombre",
    darkModeDesc: "Activez le mode sombre pour une meilleure visibilité la nuit",
    loading: "Chargement...",
  },
  en: {
    backToDashboard: "Back to dashboard",
    accountSettings: "Account settings",
    profile: "Profile",
    notifications: "Notifications",
    preferences: "Preferences",
    profileInfo: "Profile info",
    modify: "Modify",
    cancel: "Cancel",
    saveProfile: "Save profile",
    fullName: "Full name",
    email: "Email address",
    newPassword: "New password",
    confirmPassword: "Confirm password",
    acceptedFormats: "Accepted formats: JPG, PNG. Max size: 1MB",
    saveSuccess: "Changes successfully saved!",
    notifSuccess: "Notification settings saved!",
    prefSuccess: "Preferences saved!",
    emailAlerts: "Email alerts",
    emailAlertsDesc: "Receive watering reminders by email",
    maintenanceNotifs: "Maintenance notifications",
    maintenanceNotifsDesc: "Receive alerts about your plants' maintenance",
    weeklyTips: "Weekly tips",
    weeklyTipsDesc: "Receive tips on how to take care of your plants",
    save: "Save",
    language: "Language",
    darkMode: "Dark mode",
    darkModeDesc: "Activate dark mode for better visibility at night",
    loading: "Loading...",
  }
};

export default function Settings() {
  const { data: session, update: refreshSession } = useSession();

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'preferences'>('profile');
  const [editMode, setEditMode] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [preferencesLoading, setPreferencesLoading] = useState(false);

  // Mode thème - Light ou Dark selon la préférence utilisateur
  const isDarkMode = session?.user?.theme === "dark";
  
  // Langue - FR ou EN selon la préférence utilisateur
  const userLanguage = session?.user?.language || 'fr';
  const t = translations[userLanguage as 'fr' | 'en'];

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
    setProfileLoading(true);
    try {
      await updateInfosUser(session.user.id, payload);
      setSaveSuccess(true);
      await refreshSession();
    } finally {
      setProfileLoading(false);
    }
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
    setNotificationsLoading(true);
    try {
      await updateInfosUser(session.user.id, payload);
      setSaveSuccess(true);
      await refreshSession();
    } finally {
      setNotificationsLoading(false);
    }
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
    setPreferencesLoading(true);
    if (!session?.user?.id) return;
    const payload: Partial<User> = { language: vals.language, theme: vals.darkMode?'dark':'light' };
    try {
      const test = await updateInfosUser(session.user.id, payload);
      if (test) {
        setSaveSuccess(true);
        await refreshSession();
        console.log("Preferences updated successfully.");
      }
    }
    catch (error) {
      console.error("Error updating preferences:", error);
    }
    finally {
      setPreferencesLoading(false);
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
    <div className={`w-full min-h-screen ${isDarkMode ? "bg-bgDarker" : "bg-[#f8f9fa]"} p-4 md:p-10`}>
      <div className="max-w-5xl mx-auto">
        {/* Header avec navigation retour */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link href="/home" className={`flex items-center ${isDarkMode ? "text-secondary hover:text-secondary/80" : "text-primary hover:text-primary/80"} transition-colors`}>
              <ArrowLeft className="mr-2" size={20} />
              <span className="text-lg font-medium">{t.backToDashboard}</span>
            </Link>
          </div>
        </div>

        <div className={`${isDarkMode ? "bg-bgDarkSection border border-gray-700" : "bg-white"} rounded-xl shadow-md overflow-hidden`}>
          {/* Titre de la page */}
          <div className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
            <h1 className={`text-2xl font-bold ${isDarkMode ? "text-secondary" : "text-primary"} p-6`}>{t.accountSettings}</h1>
          </div>
          
          {/* Structure en deux colonnes sur grands écrans */}
          <div className="flex flex-col md:flex-row">
            {/* Menu latéral */}
            <div className={`md:w-1/4 ${isDarkMode ? "bg-bgDark" : "bg-gray-50"} p-4`}>
              <nav>
                <ul>
                  <li>
                    <button 
                      onClick={() => setActiveTab('profile')}
                      className={`flex items-center w-full text-left p-3 rounded-md ${activeTab === 'profile' ? 
                        isDarkMode ? 'bg-secondary text-black' : 'bg-primary text-white' 
                        : isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-200'}`}
                    >
                      <UserRound size={18} className="mr-2" />
                      <span>{t.profile}</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('notifications')}
                      className={`flex items-center w-full text-left p-3 rounded-md mt-1 ${activeTab === 'notifications' ? 
                        isDarkMode ? 'bg-secondary text-black' : 'bg-primary text-white' 
                        : isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-200'}`}
                    >
                      <Bell size={18} className="mr-2" />
                      <span>{t.notifications}</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => setActiveTab('preferences')}
                      className={`flex items-center w-full text-left p-3 rounded-md mt-1 ${activeTab === 'preferences' ? 
                        isDarkMode ? 'bg-secondary text-black' : 'bg-primary text-white' 
                        : isDarkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-200'}`}
                    >
                      <Globe size={18} className="mr-2" />
                      <span>{t.preferences}</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Contenu principal */}
            <div className={`md:w-3/4 p-6 overflow-y-auto max-h-[80vh] ${isDarkMode ? "text-white" : ""}`}>
              {/* Onglet Profil */}
              {activeTab === 'profile' && (
                <div className=''>
                  {saveSuccess && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {t.saveSuccess}
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className={`text-xl font-semibold ${isDarkMode ? "text-gray-200" : ""}`}>{t.profileInfo}</h2>
                    <button 
                      onClick={handleToggleEditMode}
                      className={`flex items-center ${editMode ? 
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700' 
                        : isDarkMode ? 'bg-secondary text-black' : 'bg-primary text-white'} rounded-md px-3 py-2 text-sm font-medium`}
                    >
                      {editMode ? (
                        <>{t.cancel}</>
                      ) : (
                        <>
                          <SquarePen size={16} className="mr-2" />
                          {t.modify}
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
                                        accept="image/*,.heic"
                                        className="hidden"
                                        onChange={async (e) => {
                                          if (e.target.files && e.target.files.length > 0) {
                                            const file = e.target.files[0];
                                            // If the file is a HEIC, use heicTo to convert it to JPEG
                                            if (file.name.toLowerCase().endsWith('.heic')) {
                                              try {
                                                const convertedBuffer = await heicTo({ blob: file, type: 'uint8array' });
                                                const jpegFile = new File(
                                                  [convertedBuffer],
                                                  file.name.replace(/\.heic$/i, '.jpg'),
                                                  { type: 'image/jpeg' }
                                                );
                                                // Pass the converted JPEG file as a FileList-like array
                                                field.onChange([jpegFile] as unknown as FileList);
                                              } catch (conversionError) {
                                                console.error('Error converting HEIC to JPEG:', conversionError);
                                                // Fallback to the original file if conversion fails
                                                field.onChange(e.target.files);
                                              }
                                            } else {
                                              field.onChange(e.target.files);
                                            }
                                          }
                                        }}
                                      />
                                      <label
                                        htmlFor="profile-image-upload"
                                        className={`absolute bottom-0 right-0 ${isDarkMode ? "bg-secondary text-black" : "bg-primary text-white"} p-2 rounded-full cursor-pointer`}
                                      >
                                        <Camera size={16} />
                                      </label>
                                    </>
                                  )}
                                </div>
                                {editMode && (
                                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    {t.acceptedFormats}
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
                            <FormLabel className={isDarkMode ? "text-gray-300" : ""}>{t.fullName}</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                disabled={!editMode}
                                className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}
                              />
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
                            <FormLabel className={isDarkMode ? "text-gray-300" : ""}>{t.email}</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                {...field} 
                                disabled={!editMode} 
                                className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}
                              />
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
                                <FormLabel className={isDarkMode ? "text-gray-300" : ""}>{t.newPassword}</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="password" 
                                    {...field}
                                    className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""} 
                                  />
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
                                <FormLabel className={isDarkMode ? "text-gray-300" : ""}>{t.confirmPassword}</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="password" 
                                    {...field}
                                    className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""} 
                                  />
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
                          disabled={!editMode || profileLoading}
                          className={`${isDarkMode ? "bg-secondary hover:bg-secondary/90 text-black" : "bg-primary hover:bg-primary/90 text-white"} px-5 py-2 rounded-md flex items-center`}
                          style={{ display: editMode ? 'flex' : 'none' }}
                        >
                          {profileLoading ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}  
                          {t.saveProfile}
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
                        {t.notifSuccess}
                      </div>
                    )}
                    <FormField
                      control={notificationsForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className={`flex items-center justify-between p-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} rounded-lg`}>
                          <div>
                            <FormLabel className={`font-medium ${isDarkMode ? "text-gray-200" : ""}`}>{t.emailAlerts}</FormLabel>
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{t.emailAlertsDesc}</p>
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
                        <FormItem className={`flex items-center justify-between p-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} rounded-lg`}>
                          <div>
                            <FormLabel className={isDarkMode ? "text-gray-200" : ""}>{t.maintenanceNotifs}</FormLabel>
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{t.maintenanceNotifsDesc}</p>
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
                        <FormItem className={`flex items-center justify-between p-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} rounded-lg`}>
                          <div>
                            <FormLabel className={isDarkMode ? "text-gray-200" : ""}>{t.weeklyTips}</FormLabel>
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{t.weeklyTipsDesc}</p>
                          </div>
                          <FormControl>
                            <SwitchButton checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={notificationsLoading}
                        className={`${isDarkMode ? "bg-secondary hover:bg-secondary/90 text-black" : "bg-primary hover:bg-primary/90 text-white"} px-5 py-2 rounded-md flex items-center`}
                      >
                        {notificationsLoading ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
                        {t.save}
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
                        {t.prefSuccess}
                      </div>
                    )}
                    <FormField
                      control={preferencesForm.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={isDarkMode ? "text-gray-300" : ""}>{t.language}</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              disabled={editMode}
                              className={`${isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white border-gray-300"} border rounded-md shadow-sm focus:ring-primary focus:border-primary w-full p-2.5`}
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
                        <FormItem className={`flex items-center justify-between p-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"} rounded-lg`}>
                          <div>
                            <FormLabel className={`font-medium ${isDarkMode ? "text-gray-200" : ""}`}>{t.darkMode}</FormLabel>
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{t.darkModeDesc}</p>
                          </div>
                          <FormControl>
                            <SwitchButton checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={preferencesLoading}
                        className={`${isDarkMode ? "bg-secondary hover:bg-secondary/90 text-black" : "bg-primary hover:bg-primary/90 text-white"} px-5 py-2 rounded-md flex items-center`}
                      >
                        {preferencesLoading ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Save size={16} className="mr-2" />}
                        {t.save}
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
