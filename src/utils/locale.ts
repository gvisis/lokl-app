import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enJson from '../assets/locale/en.json';
import ltJson from '../assets/locale/lt.json';

const resources = {
	en: enJson,
	lt: ltJson,
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: 'en',
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
