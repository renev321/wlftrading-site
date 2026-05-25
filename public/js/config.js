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

// Book library.
// For Google Drive embedded PDFs, use:
// https://drive.google.com/file/d/FILE_ID/preview
export const bookLinks = [
  {
    title: "La biblia de las velas",
    description: "Lectura técnica para reforzar la interpretación de velas, estructura y reacción del precio.",
    url: "https://drive.google.com/file/d/1Dc2jtlOfeb7JuQGfSwPKl3JtHcAT_6oS/view",
    embedUrl: "https://drive.google.com/file/d/1Dc2jtlOfeb7JuQGfSwPKl3JtHcAT_6oS/preview",
    tag: "Velas",
    type: "PDF",
    status: "available"
  },
  {
    title: "12 reglas para vivir",
    description: "Material de mentalidad y disciplina personal para reforzar carácter, orden y responsabilidad.",
    url: "https://drive.google.com/file/d/1YMMWA3V__6li1GKiLa7RDF-NIuzVxmkz/view",
    embedUrl: "https://drive.google.com/file/d/1YMMWA3V__6li1GKiLa7RDF-NIuzVxmkz/preview",
    tag: "Mentalidad",
    type: "PDF",
    status: "available"
  },
  {
    title: "Cómo no quemar una cuenta",
    description: "Lectura enfocada en riesgo, control emocional y errores comunes que destruyen cuentas.",
    url: "https://drive.google.com/file/d/18CrXWWhd5oN7a-8fpCDHvh4t5gzmBf3m/view",
    embedUrl: "https://drive.google.com/file/d/18CrXWWhd5oN7a-8fpCDHvh4t5gzmBf3m/preview",
    tag: "Riesgo",
    type: "PDF",
    status: "available"
  }
];

export const summaryLinks = [
  {
    title: "Resumen 01 - Reglas de estudio",
    description: "Notas rápidas para estudiar el curso sin saltar de concepto en concepto.",
    url: "#",
    tag: "Resumen",
    type: "Nota"
  },
  {
    title: "Resumen 02 - Gestión de riesgo",
    description: "Espacio para checklist o resumen de gestión antes de operar.",
    url: "#",
    tag: "Resumen",
    type: "Nota"
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
