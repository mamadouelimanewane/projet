import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('projet-elite-lang') || 'fr';
  });
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    loadTranslations(language);
  }, [language]);

  const loadTranslations = async (lang) => {
    try {
      const response = await fetch(`/locales/${lang}/translation.json`);
      const data = await response.json();
      setTranslations(data);
      localStorage.setItem('projet-elite-lang', lang);
      document.documentElement.lang = lang;
    } catch (error) {
      console.error(`Failed to load ${lang} translations:`, error);
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Composant Sélecteur de Langue
export const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: 'fr', name: '🇫🇷 Français', flag: '🇫🇷' },
    { code: 'en', name: '🇬🇧 English', flag: '🇬🇧' },
    { code: 'es', name: '🇪🇸 Español', flag: '🇪🇸' },
    { code: 'ar', name: '🇸🇦 العربية', flag: '🇸🇦' },
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-sm font-bold text-white">
        <span>{languages.find(l => l.code === language)?.flag || '🌐'}</span>
        <span className="hidden md:inline">{language.toUpperCase()}</span>
      </button>
      <div className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {languages.map(lang => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              language === lang.code 
                ? 'bg-indigo-600 text-white' 
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};
