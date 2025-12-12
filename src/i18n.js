import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./i18n/en.json";
import si from "./i18n/si.json";
import ta from "./i18n/ta.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    si: { translation: si },
    ta: { translation: ta },
  },
  fallbackLng: "en",
  supportedLngs: ["en", "si", "ta"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
