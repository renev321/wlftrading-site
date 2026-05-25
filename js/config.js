// WLF Trading Academy config
// 1) Create a Firebase project.
// 2) Enable Authentication > Google and Facebook.
// 3) Add your Firebase web config below.
// 4) Add authorized domains: wlftrading.com and your *.pages.dev domain.

export const firebaseConfig = {
  apiKey: "PASTE_FIREBASE_API_KEY_HERE",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  appId: "PASTE_FIREBASE_APP_ID"
};

export const CONTACT_EMAIL = "contacto@wlftrading.com";

// Keep Google Drive links private/restricted.
// These links are only shown after the user's email is active.
export const courseModules = [
  {
    title: "Módulo 01 - Introducción y base",
    description: "Primeros pasos, mentalidad y estructura del curso.",
    lessons: [
      { title: "Bienvenida al curso", url: "PASTE_GOOGLE_DRIVE_LINK_HERE" },
      { title: "Cómo estudiar el contenido", url: "PASTE_GOOGLE_DRIVE_LINK_HERE" }
    ]
  },
  {
    title: "Módulo 02 - Estructura del mercado",
    description: "Soportes, resistencias, canales, tendencias y rangos.",
    lessons: [
      { title: "Soporte y resistencia", url: "PASTE_GOOGLE_DRIVE_LINK_HERE" },
      { title: "Canales y contexto", url: "PASTE_GOOGLE_DRIVE_LINK_HERE" }
    ]
  },
  {
    title: "Módulo 03 - FVG, Order Blocks y gestión",
    description: "Lectura de imbalance, zonas de reacción y control del riesgo.",
    lessons: [
      { title: "FVG explicado simple", url: "PASTE_GOOGLE_DRIVE_LINK_HERE" },
      { title: "Order Blocks con contexto", url: "PASTE_GOOGLE_DRIVE_LINK_HERE" }
    ]
  }
];
