// WLF Trading config

export const firebaseConfig = {
  apiKey: "AIzaSyD6fHQLMVOMYH89HyfwEEYeNfds0eFEm4Q",
  authDomain: "wlftrading-site.firebaseapp.com",
  projectId: "wlftrading-site",
  storageBucket: "wlftrading-site.firebasestorage.app",
  messagingSenderId: "803315870572",
  appId: "1:803315870572:web:f74a737773ba7f6e2b2149"
};

export const CONTACT_EMAIL = "contacto@wlftrading.com";

export const communityLinks = [
  {
    title: "Grupo privado de Telegram",
    description: "Acceso al grupo oficial para miembros WLF. Aquí se compartirán avisos, recursos y actualizaciones.",
    url: "https://t.me/+zAEyxCd7oU5mMzhk",
    tag: "Comunidad"
  },
  {
    title: "TikTok WLF",
    description: "Contenido corto, ideas, ejemplos y clips para reforzar conceptos de trading.",
    url: "https://www.tiktok.com/@condewlf?is_from_webapp=1&sender_device=pc",
    tag: "Social"
  }
];

export const audiobookLinks = [
  {
    title: "Audiolibro 01 - Mentalidad y disciplina",
    description: "Material complementario para reforzar paciencia, enfoque y control emocional dentro del trading.",
    url: "https://youtu.be/qNEqRFwiHNY",
    tag: "Audiolibro"
  },
  {
    title: "Audiolibro 02",
    description: "Próximo material recomendado para el grupo WLF.",
    url: "#",
    tag: "Próximamente"
  }
];

export const toolLinks = [
  {
    title: "Herramienta WLF 01",
    description: "Espacio para indicadores, calculadoras, plantillas o recursos privados del grupo.",
    url: "#",
    tag: "Próximamente"
  },
  {
    title: "Checklist de entrada",
    description: "Podemos agregar una checklist para revisar contexto, riesgo y zona antes de operar.",
    url: "#",
    tag: "Idea"
  }
];

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
