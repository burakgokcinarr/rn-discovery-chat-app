import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationTR from "./lang/tr.json";
import translationEN from "./lang/en.json";
import translationPT from "./lang/pt.json";
import translationDE from "./lang/de.json";
import translationZH from "./lang/zh.json";

const resources = {
    "tr": { translation: translationTR },
    "en": { translation: translationEN },
    "pt": { translation: translationPT },
    "de": { translation: translationDE },
    "zh": { translation: translationZH },
};

const initI18n = async () => {
    let savedLanguage = await AsyncStorage.getItem("language");
    //console.log(savedLanguage)
    if (!savedLanguage) {
        savedLanguage = Localization.getLocales()[0].languageCode // tr, en, de vs...
    }

    i18n
    .use(initReactI18next).init({
        compatibilityJSON: "v3",
        resources,
        lng: savedLanguage,
        fallbackLng: "tr",
        interpolation: {
            escapeValue: false,
        },
    });
};

initI18n();

export default i18n;