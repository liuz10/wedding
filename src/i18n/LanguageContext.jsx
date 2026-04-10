import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import en from './en';
import zh from './zh';

const translations = { en, zh };
const STORAGE_KEY = 'wedding-lang';

const LanguageContext = createContext();

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'en';
    } catch {
      return 'en';
    }
  });

  const setLang = useCallback((newLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // localStorage unavailable
    }
  }, []);

  const t = useCallback(
    (key, fallback) => {
      const val = getNestedValue(translations[lang], key);
      if (val !== undefined) return val;
      // Fallback to English
      const enVal = getNestedValue(translations.en, key);
      if (enVal !== undefined) return enVal;
      return fallback || key;
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
