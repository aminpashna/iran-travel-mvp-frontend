import { en } from "./en";
import { fa } from "./fa";

export type Lang = "en" | "fa";

const translations = { en, fa };

type TranslationKey = keyof typeof en;

export function getLang(): Lang {
  const value = localStorage.getItem("lang");
  return value === "fa" ? "fa" : "en";
}

export function setLang(lang: Lang) {
  localStorage.setItem("lang", lang);
  applyDirection(lang);
  window.location.reload();
}

export function t(key: TranslationKey): string {
  const lang = getLang();
  return translations[lang][key] ?? key;
}

export function applyDirection(lang: Lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
}