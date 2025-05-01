import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar archivos de traducción (los crearemos después)
import translationES from './locales/es/translation.json';
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';

// Configuración de i18next
i18n
  // Detecta el idioma del usuario
  .use(LanguageDetector)
  // Pasa la instancia de i18n a react-i18next
  .use(initReactI18next)
  // Inicializa i18next
  .init({
    debug: true, // Activar logs en consola (útil para desarrollo)
    fallbackLng: 'es', // Idioma por defecto si no se detecta o falta traducción
    interpolation: {
      escapeValue: false, // React ya escapa los valores, no es necesario para él
    },
    resources: {
      es: {
        translation: translationES
      },
      en: {
        translation: translationEN
      },
      fr: {
        translation: translationFR
      }
    },
    // Opciones para LanguageDetector (opcional)
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'], // Orden de detección
      caches: ['localStorage'], // Dónde guardar el idioma seleccionado
    }
  });

export default i18n; 