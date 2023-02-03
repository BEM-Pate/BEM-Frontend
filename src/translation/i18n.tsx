import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './english/translation.json';
import de from './german/translation.json';
import tr from './turkish/translation.json';
import fr from './french/translation.json';
import es from './spanish/translation.json';
import pl from './polish/translation.json';
import ua from './ukranian/translation.json';

const resources = {
  Deutsch: {
    translation: de,
    country_code: 'DE',
  },
  English: {
    translation: en,
    country_code: 'EN',
  },
  Türkçe: {
    translation: tr,
    country_code: 'TR',
  },
  Français: {
    translation: fr,
    country_code: 'FR',
  },
  Español: {
    translation: es,
    country_code: 'ES',
  },
  Polska: {
    translation: pl,
    country_code: 'PL',
  },
  Українська: {
    translation: ua,
    country_code: 'UA',
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
