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
    description: "Espacio reservado para futuros recursos privados del grupo.",
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

// Course infrastructure.
// Supported lesson types:
// - video
// - article
//
// IMPORTANT:
// Lesson numbers are local per module.
// We do not use the raw Google Drive / folder numbering as the public lesson title.
export const courseModules = [
  {
    title: "Módulo 01 - Bienvenida y método de estudio",
    description: "Primeros pasos para entender el enfoque del curso, cómo estudiarlo y cómo aprovechar mejor cada módulo.",
    lessons: [
      {
        title: "1 - Para quién es este curso",
        description: "A quién está dirigido el curso, qué esperar y cómo aprovechar el contenido.",
        url: "https://drive.google.com/file/d/1UelMigX0HXbUmJFZnUhIfdNlkFVciLxP/view",
        embedUrl: "https://drive.google.com/file/d/1UelMigX0HXbUmJFZnUhIfdNlkFVciLxP/preview",
        type: "video",
        status: "available"
      },
      {
        title: "2 - Cómo aprovechar el curso WLF Trading",
        description: "Cómo estudiar el contenido, avanzar con orden y sacarle más valor al método WLF.",
        url: "https://drive.google.com/file/d/1TdZeijseEQy_dpo_WNEUv1hqYgl6cWR-/view",
        embedUrl: "https://drive.google.com/file/d/1TdZeijseEQy_dpo_WNEUv1hqYgl6cWR-/preview",
        type: "video",
        status: "available"
      }
    ]
  },
  {
    title: "Módulo 02 - Mentalidad base del trader",
    description: "Fundamentos mentales y prácticos para estudiar trading con más claridad, proceso y disciplina.",
    lessons: [
      {
        title: "1 - El ruido que confunde al trader",
        description: "Cómo identificar y reducir el ruido que afecta la lectura del mercado y la toma de decisiones.",
        url: "https://drive.google.com/file/d/13_ibb4WDTqXrZd85nY5iTswnJz-ZuhLb/view",
        embedUrl: "https://drive.google.com/file/d/13_ibb4WDTqXrZd85nY5iTswnJz-ZuhLb/preview",
        type: "video",
        status: "available"
      },
      {
        title: "2 - La rentabilidad como proceso",
        description: "Por qué la rentabilidad no nace de una sola operación, sino de proceso, repetición, riesgo y consistencia.",
        url: "https://drive.google.com/file/d/1nKV8Ij1JRwCNkAN9xbYVEVIe9W44A-IZ/view",
        embedUrl: "https://drive.google.com/file/d/1nKV8Ij1JRwCNkAN9xbYVEVIe9W44A-IZ/preview",
        type: "video",
        status: "available"
      },
      {
        title: "3 - Herramientas que usaremos en el curso",
        description: "Revisión de las herramientas principales del curso y para qué sirve cada una dentro del proceso WLF.",
        url: "https://drive.google.com/file/d/1qNthYJR_f_lLRXJazxealdqMZWTBhb2C/view",
        embedUrl: "https://drive.google.com/file/d/1qNthYJR_f_lLRXJazxealdqMZWTBhb2C/preview",
        type: "video",
        status: "available"
      },
      {
        title: "4 - Instalación de NinjaTrader Desktop",
        description: "Guía rápida para descargar e instalar NinjaTrader Desktop en Windows usando la guía oficial.",
        type: "article",
        status: "available",
        tag: "Guía oficial",
        externalUrl: "https://support.ninjatrader.com/s/article/NinjaTrader-Desktop-Installation-Guide?language=en_US",
        externalLabel: "Ver guía oficial de NinjaTrader",
        article: {
          intro: "Después de conocer las herramientas que utilizaremos, el siguiente paso es instalar NinjaTrader Desktop correctamente.",
          sections: [
            {
              title: "Para instalar NinjaTrader Desktop en Windows:",
              items: [
                "Inicia sesión en tu Panel de NinjaTrader.",
                "Haz clic en Download desde la página principal o desde el menú de tu cuenta.",
                "En Most Recent Release, selecciona Download Now para descargar el instalador.",
                "Ejecuta el archivo descargado y sigue los pasos del asistente de instalación.",
                "Cuando termine la instalación, abre NinjaTrader e inicia sesión con tu cuenta."
              ]
            },
            {
              title: "Notas importantes:",
              items: [
                "NinjaTrader Desktop está diseñado para Windows.",
                "Si usas firewall o antivirus, asegúrate de permitir que NinjaTrader tenga acceso a internet para evitar problemas al iniciar sesión.",
                "Para móvil, descarga la app desde la tienda de iOS o Google Play.",
                "Usa siempre la guía oficial si la plataforma cambia algún paso de instalación."
              ]
            }
          ],
          footer: "Esta lección es una guía rápida. Para cualquier cambio reciente o detalle técnico, revisa siempre la documentación oficial de NinjaTrader."
        }
      }
    ]
  },
  {
    title: "Módulo 03 - Introducción al Smart Money",
    description: "Introducción a la idea de dinero inteligente y cómo usarla como contexto sin operar conceptos aislados.",
    lessons: [
      {
        title: "1 - Qué es el dinero inteligente",
        description: "Qué significa dinero inteligente, cómo interpretarlo y por qué debe combinarse con estructura, liquidez y riesgo.",
        url: "https://drive.google.com/file/d/1IzCU8kMCeyFMv_fA4BLmtQVAl8_WJXdY/view",
        embedUrl: "https://drive.google.com/file/d/1IzCU8kMCeyFMv_fA4BLmtQVAl8_WJXdY/preview",
        type: "video",
        status: "available"
      }
    ]
  },
  {
    title: "Módulo 04 - Preparación de la plataforma",
    description: "Preparación inicial de NinjaTrader para estudiar, practicar y seguir el curso con una plataforma ordenada.",
    lessons: [
      {
        title: "1 - Conociendo NinjaTrader",
        description: "Primer contacto con NinjaTrader, sus áreas principales y los elementos básicos que necesitas reconocer.",
        url: "https://drive.google.com/file/d/1Wr3Hc4GVRtMsrWlqErMkhMNUPxiu10La/view",
        embedUrl: "https://drive.google.com/file/d/1Wr3Hc4GVRtMsrWlqErMkhMNUPxiu10La/preview",
        type: "video",
        status: "available"
      },
      {
        title: "2 - Navegación básica de la plataforma",
        description: "Cómo moverte dentro de NinjaTrader y ubicar las secciones principales sin perderte en la plataforma.",
        url: "https://drive.google.com/file/d/1vOkzaj21UkPqVHAcyld5r1Iz_fAz6InP/view",
        embedUrl: "https://drive.google.com/file/d/1vOkzaj21UkPqVHAcyld5r1Iz_fAz6InP/preview",
        type: "video",
        status: "available"
      },
      {
        title: "3 - Configuración inicial de NinjaTrader",
        description: "Ajustes iniciales para dejar NinjaTrader más limpio, cómodo y preparado para el proceso de aprendizaje.",
        url: "https://drive.google.com/file/d/14JzxxWfpyegzTjyDkSOvvLUZYHKWGx4_/view",
        embedUrl: "https://drive.google.com/file/d/14JzxxWfpyegzTjyDkSOvvLUZYHKWGx4_/preview",
        type: "video",
        status: "available"
      }
    ]
  },
  {
    title: "Módulo 05 - Lectura del precio y estructura",
    description: "Aprende a leer el precio desde sus bases: velas, swings, estructura, zonas y contexto.",
    lessons: [
      {
        title: "1 - Anatomía de una vela",
        description: "Cómo leer una vela desde su cuerpo, mechas, intención, presión y reacción del precio.",
        url: "https://drive.google.com/file/d/1sYxSoPK4BTgQvy0cYY_PLZ-1WRUWHtkS/view",
        embedUrl: "https://drive.google.com/file/d/1sYxSoPK4BTgQvy0cYY_PLZ-1WRUWHtkS/preview",
        type: "video",
        status: "available"
      },
      {
        title: "2 - Introducción al Order Book",
        description: "Primer acercamiento al Order Book y cómo usarlo como apoyo sin desconectarte del contexto del precio.",
        url: "https://drive.google.com/file/d/1XQixOveJs2QQH7Zfl4Cu6DpeUwDmrc7g/view",
        embedUrl: "https://drive.google.com/file/d/1XQixOveJs2QQH7Zfl4Cu6DpeUwDmrc7g/preview",
        type: "video",
        status: "available"
      },
      {
        title: "3 - Qué son los swings del mercado",
        description: "Qué son los swings, por qué importan y cómo ayudan a ordenar la lectura de la estructura.",
        url: "https://drive.google.com/file/d/1B8VwJQpk4t4_Ddlc6OMzM7Oh3GDUhUVx/view",
        embedUrl: "https://drive.google.com/file/d/1B8VwJQpk4t4_Ddlc6OMzM7Oh3GDUhUVx/preview",
        type: "video",
        status: "available"
      },
      {
        title: "4 - Cómo identificar swings en el gráfico",
        description: "Cómo reconocer swings visualmente en el gráfico y diferenciar puntos de giro relevantes de ruido.",
        url: "https://drive.google.com/file/d/1jCCMgH8Y2K2PEShWDQ501mnkFhsMn6G_/view",
        embedUrl: "https://drive.google.com/file/d/1jCCMgH8Y2K2PEShWDQ501mnkFhsMn6G_/preview",
        type: "video",
        status: "available"
      },
      {
        title: "5 - Validación de swings importantes",
        description: "Cómo validar swings con criterio y evitar tratar cualquier movimiento pequeño como estructura importante.",
        url: "https://drive.google.com/file/d/120Knlf97mHdX4XyKn8OzCUuyvjjWQfdr/view",
        embedUrl: "https://drive.google.com/file/d/120Knlf97mHdX4XyKn8OzCUuyvjjWQfdr/preview",
        type: "video",
        status: "available"
      },
      {
        title: "6 - Lecturas correctas e incorrectas de swings",
        description: "Comparación práctica entre buenas y malas lecturas de swings para entrenar criterio.",
        url: "https://drive.google.com/file/d/1JGKOMvcqGHmHA98QP7kjG1wwWNZiuWHP/view",
        embedUrl: "https://drive.google.com/file/d/1JGKOMvcqGHmHA98QP7kjG1wwWNZiuWHP/preview",
        type: "video",
        status: "available"
      },
      {
        title: "7 - Soportes y resistencias con contexto",
        description: "Cómo interpretar soportes y resistencias como zonas de decisión, liquidez y reacción, no como líneas mágicas.",
        url: "https://drive.google.com/file/d/15-QK9t5sbyt2mSvrd6VwxLVYv0kjRDaF/view",
        embedUrl: "https://drive.google.com/file/d/15-QK9t5sbyt2mSvrd6VwxLVYv0kjRDaF/preview",
        type: "video",
        status: "available"
      }
    ]
  }
];
