import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import enJson from '../assets/locale/en.json';
import ltJson from '../assets/locale/lt.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
const resources = {
  en: enJson,
  lt: ltJson,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'lt',
    fallbackLng: 'en',
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
