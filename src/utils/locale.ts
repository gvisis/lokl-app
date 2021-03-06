import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enJson from '../assets/locale/en.json';
import ltJson from '../assets/locale/lt.json';
import { LANG } from './variables';

const resources = {
  en: enJson,
  lt: ltJson,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: LANG.EN,
    fallbackLng: LANG.EN,
    debug: true,

    interpolation: {
      escapeValue: false, // react already safes from xss
      formatSeparator: ',',
    },
    react: {
      useSuspense: true,
    },
  });

export const locale = i18n;
