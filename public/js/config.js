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

// Course video infrastructure.
// For Google Drive embedded videos, use:
// https://drive.google.com/file/d/FILE_ID/preview
export const courseModules = [
  {
    title: "Módulo 01 - Bienvenida y presentación",
    description: "Primeros pasos para entender cómo aprovechar el curso WLF Trading.",
    lessons: [
      {
        title: "1 - Para Quién es este curso",
        description: "Primera lección de prueba para validar el reproductor privado dentro del dashboard.",
        url: "https://drive.google.com/file/d/1UelMigX0HXbUmJFZnUhIfdNlkFVciLxP/view",
        embedUrl: "https://drive.google.com/file/d/1UelMigX0HXbUmJFZnUhIfdNlkFVciLxP/preview",
        type: "video",
        status: "available"
      },
      {
        title: "2 - Curso WLF Trading Presentación",
        description: "Próxima lección del módulo.",
        url: "#",
        embedUrl: "#",
        type: "video",
        status: "pending"
      }
    ]
  },
  {
    title: "Módulo 02 - Bases importantes",
    description: "Ruido, rentabilidad, herramientas y conceptos base.",
    lessons: [
      {
        title: "2.2 - Ruido y confusión",
        description: "Próximamente.",
        url: "#",
        embedUrl: "#",
        type: "video",
        status: "pending"
      },
      {
        title: "3 - Rentabilidad",
        description: "Próximamente.",
        url: "#",
        embedUrl: "#",
        type: "video",
        status: "pending"
      },
      {
        title: "4 - Herramientas utilizadas",
        description: "Próximamente.",
        url: "#",
        embedUrl: "#",
        type: "video",
        status: "pending"
      }
    ]
  },
  {
    title: "Módulo 03 - Smart Money / Dinero Inteligente",
    description: "Primeros conceptos de dinero inteligente y lectura institucional.",
    lessons: [
      {
        title: "5 - Dinero Inteligente",
        description: "Próximamente.",
        url: "#",
        embedUrl: "#",
        type: "video",
        status: "pending"
      }
    ]
  }
];
