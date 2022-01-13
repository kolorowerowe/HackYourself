import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import descriptionEN from './locales/en/description.json'
import descriptionPL from './locales/pl/description.json'

import generalEN from './locales/en/general.json'
import generalPL from './locales/pl/general.json'

const resources = {
    en: {
        general: generalEN,
        description: descriptionEN
    },
    pl: {
        general: generalPL,
        description: descriptionPL
    }
};

if (!localStorage.getItem("languageCode")){
    localStorage.setItem("languageCode", "en")
}

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: localStorage.getItem("languageCode"),
        fallbackLng: "en",
        keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n; 