import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import Backend from 'i18next-xhr-backend';
import Cookies from "js-cookie";
import { initReactI18next } from "react-i18next";

const fallbackLng = ['en'];
const availableLanguages = ['en', 'ro','el'];

const options = {
    // order and from where user language should be detected
    order: ['navigator', 'htmlTag', 'path', 'subdomain'],

    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupSessionStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language on
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

    // optional expire and domain for set cookie
    cookieMinutes: 10,
    cookieDomain: 'myDomain',

    // only detect languages that are in the whitelist
    cookieOptions : {  path : '/ ' ,  sameSite : 'strict'  }

};

i18n
    .use(Backend)
    .use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        lng: Cookies.get('i18next'),
        fallbackLng: fallbackLng,
        whitelist: availableLanguages,
        detection: options,
        keySeparator: false, // we do not use keys in form messages.welcome
        backend: {
            loadPath: process.env.PUBLIC_URL + '/locales/{{lng}}/{{ns}}.json',
        },
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;