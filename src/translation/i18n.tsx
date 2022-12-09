import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './english/translation.json';
import de from './german/translation.json';

const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
};

// eslint-disable-next-line import/prefer-default-export
export const availableLanguages = Object.keys(resources);

i18n.use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'de',
  });
