import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from '../locales/en';
import { ua } from '../locales/ua';

const resources = {
  ua: {
    translation: ua,
  },
  en: {
    translation: en,
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ua',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
