const quotes = [
  { text: "La paciencia también es una posición.", author: "WLF Trading" },
  { text: "Si no hay contexto, no hay prisa.", author: "WLF Trading" },
  { text: "El mercado no te debe una entrada; tú le debes disciplina a tu cuenta.", author: "WLF Trading" },
  { text: "Una buena zona con mal riesgo sigue siendo una mala operación.", author: "WLF Trading" },
  { text: "El trader que espera bien ya está ganando antes de entrar.", author: "WLF Trading" },
  { text: "No operes para sentir algo; opera cuando el plan diga algo.", author: "WLF Trading" },
  { text: "La claridad vale más que la cantidad de trades.", author: "WLF Trading" },
  { text: "Tu primera defensa no es el stop; es no entrar mal.", author: "WLF Trading" },
  { text: "El precio habla más claro cuando tú estás más tranquilo.", author: "WLF Trading" },
  { text: "No busques tener razón; busca proteger capital.", author: "WLF Trading" },

  { text: "El riesgo viene de no saber lo que estás haciendo.", author: "Warren Buffett" },
  { text: "La bolsa transfiere dinero del impaciente al paciente.", author: "Warren Buffett" },
  { text: "Corta tus pérdidas y deja correr tus ganancias.", author: "David Ricardo" },
  { text: "No hay nada nuevo en Wall Street.", author: "Jesse Livermore" },
  { text: "El mercado nunca se equivoca; las opiniones sí.", author: "Jesse Livermore" },
  { text: "El dinero se hace esperando, no operando todo el tiempo.", author: "Jesse Livermore" },
  { text: "El objetivo del trader es ejecutar bien, no tener razón siempre.", author: "Mark Douglas" },
  { text: "Piensa en probabilidades, no en certezas.", author: "Mark Douglas" },
  { text: "La consistencia nace de controlar el riesgo.", author: "Mark Douglas" },
  { text: "El mercado puede hacer cualquier cosa en cualquier momento.", author: "Mark Douglas" },

  { text: "Protege tu capital primero; las oportunidades vuelven.", author: "Paul Tudor Jones" },
  { text: "No te enfoques en ganar dinero; enfócate en proteger lo que tienes.", author: "Paul Tudor Jones" },
  { text: "Cuando estoy perdiendo, reduzco tamaño.", author: "Paul Tudor Jones" },
  { text: "La mejor operación a veces es no operar.", author: "Linda Raschke" },
  { text: "La supervivencia es la primera regla del trader.", author: "Linda Raschke" },
  { text: "El control emocional es una ventaja competitiva.", author: "Brett Steenbarger" },
  { text: "Tu estado mental también forma parte de tu sistema.", author: "Brett Steenbarger" },
  { text: "Los grandes traders son grandes gestores del riesgo.", author: "Van K. Tharp" },
  { text: "No predices el mercado; administras posibilidades.", author: "Van K. Tharp" },
  { text: "El tamaño de posición puede destruir una buena idea.", author: "Van K. Tharp" },

  { text: "La disciplina es elegir lo que quieres más sobre lo que quieres ahora.", author: "Abraham Lincoln" },
  { text: "No es que tengamos poco tiempo; perdemos mucho.", author: "Séneca" },
  { text: "La tranquilidad viene de enfocarte en lo que controlas.", author: "Epicteto" },
  { text: "La acción correcta no necesita ruido.", author: "Marco Aurelio" },
  { text: "La paciencia es amarga, pero su fruto es dulce.", author: "Aristóteles" },
  { text: "La excelencia es un hábito, no un acto aislado.", author: "Aristóteles" },
  { text: "Conócete a ti mismo.", author: "Sócrates" },
  { text: "El que domina sus emociones domina su camino.", author: "Inspiración estoica" },
  { text: "La calma no es debilidad; es precisión.", author: "WLF Trading" },
  { text: "Una mente apurada convierte señales en excusas.", author: "WLF Trading" },

  { text: "El mercado premia al preparado, no al desesperado.", author: "WLF Trading" },
  { text: "No confundas movimiento con oportunidad.", author: "WLF Trading" },
  { text: "El setup correcto también necesita el momento correcto.", author: "WLF Trading" },
  { text: "Entrar tarde es pagar caro por ansiedad.", author: "WLF Trading" },
  { text: "El stop no es fracaso; es una frontera.", author: "WLF Trading" },
  { text: "El análisis sin gestión es solo una opinión cara.", author: "WLF Trading" },
  { text: "Más indicadores no significan más claridad.", author: "WLF Trading" },
  { text: "La zona importa, pero la reacción decide.", author: "WLF Trading" },
  { text: "La liquidez atrae; la reacción confirma.", author: "WLF Trading" },
  { text: "No todo FVG merece tu dinero.", author: "WLF Trading" },

  { text: "La oportunidad perdida duele menos que la pérdida forzada.", author: "WLF Trading" },
  { text: "No necesitas operar todos los días para ser trader.", author: "WLF Trading" },
  { text: "Tu plan debe ser más fuerte que tu impulso.", author: "WLF Trading" },
  { text: "La cuenta no se rompe por una pérdida; se rompe por perder el control.", author: "WLF Trading" },
  { text: "La mejor entrada es inútil si el riesgo es absurdo.", author: "WLF Trading" },
  { text: "No persigas velas; espera decisiones.", author: "WLF Trading" },
  { text: "Un trader serio no negocia con su disciplina.", author: "WLF Trading" },
  { text: "La paciencia es parte del edge.", author: "WLF Trading" },
  { text: "Si la operación necesita suerte, probablemente no es tu operación.", author: "WLF Trading" },
  { text: "El mercado no premia al más activo, premia al más preparado.", author: "WLF Trading" }
];

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuoteBtn");

let currentIndex = -1;

function getRandomIndex() {
  if (quotes.length <= 1) return 0;

  let nextIndex = Math.floor(Math.random() * quotes.length);
  while (nextIndex === currentIndex) {
    nextIndex = Math.floor(Math.random() * quotes.length);
  }

  return nextIndex;
}

function showQuote() {
  currentIndex = getRandomIndex();
  const quote = quotes[currentIndex];

  if (!quoteText || !quoteAuthor) return;

  quoteText.style.opacity = "0";
  quoteAuthor.style.opacity = "0";

  setTimeout(() => {
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = quote.author;
    quoteText.style.opacity = "1";
    quoteAuthor.style.opacity = "1";
  }, 140);
}

if (quoteText && quoteAuthor) {
  quoteText.style.transition = "opacity 0.18s ease";
  quoteAuthor.style.transition = "opacity 0.18s ease";
  showQuote();
}

if (newQuoteBtn) {
  newQuoteBtn.addEventListener("click", showQuote);
}
