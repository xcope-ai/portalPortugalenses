'use client';

import { useTranslation } from 'react-i18next';
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface I18nContextType {
  t: (key: string) => string;
  changeLanguage: (lang: string) => void;
  currentLanguage: string;
  languages: string[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const languages = ['en', 'pt', 'it'];
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    i18n.changeLanguage(savedLanguage);
    setCurrentLanguage(savedLanguage);
  }, [i18n]);
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };
  
  return (
    <I18nContext.Provider value={{ t, changeLanguage, currentLanguage, languages }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
