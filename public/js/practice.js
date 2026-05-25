import { requireActiveUser } from "./auth.js";

const questions = [
  {
    category: "estructura",
    title: "Zona importante sin confirmación",
    context: "El precio llega a una zona donde ya reaccionó antes, pero todavía no muestra rechazo claro ni cierre fuerte.",
    options: ["Entrar inmediatamente porque tocó la zona", "Esperar reacción y contexto", "Aumentar el lotaje", "Ignorar la gestión porque la zona es buena"],
    correct: 1,
    explanation: "Una zona importante no es una entrada automática. Primero hay que ver reacción, contexto, invalidación y riesgo."
  },
  {
    category: "estructura",
    title: "Precio atrapado entre zonas",
    context: "El precio está justo en el medio de un rango amplio, lejos del soporte y lejos de la resistencia.",
    options: ["Es una zona de decisión clara", "Mejor esperar a extremos o confirmación", "Comprar porque está barato", "Vender porque ya subió"],
    correct: 1,
    explanation: "El centro del rango suele tener peor relación riesgo/contexto. En WLF buscamos zonas donde la decisión tenga más sentido."
  },
  {
    category: "estructura",
    title: "Ruptura que no sostiene",
    context: "Una vela rompe resistencia, pero la siguiente vela regresa al rango y cierra por debajo de la zona.",
    options: ["Ruptura limpia", "Posible falso rompimiento", "Confirmación total de compra", "Señal para quitar el stop"],
    correct: 1,
    explanation: "Una ruptura que no sostiene puede ser falsa. No basta con romper; importa cómo cierra y cómo reacciona después."
  },
  {
    category: "estructura",
    title: "Movimiento ordenado",
    context: "El precio crea máximos más altos y mínimos más altos durante varias velas.",
    options: ["Estructura alcista", "Estructura bajista", "Mercado sin dirección", "Canal roto automáticamente"],
    correct: 0,
    explanation: "Máximos y mínimos crecientes muestran estructura alcista mientras esa secuencia siga viva."
  },
  {
    category: "estructura",
    title: "Canal o túnel",
    context: "El precio se desplaza entre dos zonas relativamente paralelas, respetando techo y piso del movimiento.",
    options: ["FVG", "Canal", "Order Block", "Divergencia"],
    correct: 1,
    explanation: "Un canal aparece cuando soporte y resistencia se mantienen relativamente alineados, formando un túnel de precio."
  },

  {
    category: "fvg",
    title: "Impulso con espacio visible",
    context: "Después de un movimiento agresivo de tres velas, queda un espacio entre la primera y la tercera vela.",
    options: ["FVG / Imbalance", "Rango perfecto", "Soporte horizontal", "EMA"],
    correct: 0,
    explanation: "Ese espacio puede representar un FVG, la huella de un movimiento desequilibrado. Pero necesita contexto."
  },
  {
    category: "fvg",
    title: "Zona de imbalance sin ubicación clara",
    context: "Ves un FVG en medio de un rango, sin liquidez tomada, sin tendencia clara y lejos de zonas importantes.",
    options: ["Entrada automática", "Mejor esperar", "Aumentar contratos", "Confirmación institucional"],
    correct: 1,
    explanation: "Un FVG sin contexto puede ser solo ruido. La ubicación y la historia previa del precio importan mucho."
  },
  {
    category: "fvg",
    title: "Mitigación de zona",
    context: "El precio vuelve a una zona de imbalance, entra parcialmente y luego reacciona a favor del movimiento previo.",
    options: ["Posible mitigación del FVG", "La zona deja de existir siempre", "No tiene lectura posible", "Es una noticia"],
    correct: 0,
    explanation: "Cuando el precio vuelve a una zona de imbalance y reacciona, puede estar mitigando o balanceando esa zona."
  },
  {
    category: "fvg",
    title: "FVG cerca de liquidez tomada",
    context: "Primero hay barrida de liquidez y después aparece un FVG cerca de una zona importante.",
    options: ["Tiene más valor contextual", "No importa el contexto", "Siempre debe ignorarse", "Solo sirve en gráficos diarios"],
    correct: 0,
    explanation: "Un FVG gana valor cuando está conectado con contexto: liquidez, zona, estructura y reacción."
  },
  {
    category: "fvg",
    title: "Muchos huecos, poca claridad",
    context: "El gráfico muestra varios FVG seguidos, pero no hay estructura clara ni una zona principal de decisión.",
    options: ["Operar todos", "Filtrar y elegir solo los que tengan contexto", "Usar el más pequeño siempre", "Entrar sin stop"],
    correct: 1,
    explanation: "Más señales no significan mejor oportunidad. El trader necesita filtrar, no perseguir cada patrón."
  },

  {
    category: "orderblock",
    title: "Última zona antes del impulso",
    context: "Antes de un desplazamiento fuerte, el precio deja una pequeña zona de acumulación y luego sale con fuerza.",
    options: ["Posible Order Block", "Calendario económico", "Comisión", "Media móvil"],
    correct: 0,
    explanation: "Un Order Block puede representar una zona de actividad importante antes de un desplazamiento."
  },
  {
    category: "orderblock",
    title: "Zona que no reacciona",
    context: "El precio vuelve a una supuesta zona de Order Block, la atraviesa fuerte y cierra claramente en contra.",
    options: ["Zona respetada", "Posible invalidación", "Entrada segura", "Confirmación total"],
    correct: 1,
    explanation: "Si una zona no reacciona y el precio la rompe con intención, puede estar invalidada."
  },
  {
    category: "orderblock",
    title: "Barrida y reacción",
    context: "El precio toma liquidez por encima de un máximo anterior y luego cae con desplazamiento fuerte.",
    options: ["Barrida de liquidez", "Rango neutral", "Entrada sin contexto", "EMA 20"],
    correct: 0,
    explanation: "Tomar máximos o mínimos previos y luego rechazar puede indicar una barrida de liquidez."
  },
  {
    category: "orderblock",
    title: "Zona interesante, reacción ausente",
    context: "Hay una zona que podría ser importante, pero el precio aún no muestra rechazo ni confirmación.",
    options: ["Esperar", "Entrar full margen", "Quitar el stop", "Duplicar posición"],
    correct: 0,
    explanation: "Una zona no es una señal completa. Primero ubicación, luego reacción, luego gestión."
  },
  {
    category: "orderblock",
    title: "Contexto institucional",
    context: "El precio toma liquidez, deja desplazamiento fuerte y luego vuelve a una zona previa de reacción.",
    options: ["Puede tener contexto Smart Money", "No se analiza", "Siempre es compra", "Siempre es venta"],
    correct: 0,
    explanation: "La combinación de liquidez, desplazamiento y retorno a zona puede dar mejor contexto institucional."
  },

  {
    category: "riesgo",
    title: "Riesgo porcentual",
    context: "Tienes una cuenta de 50,000 y decides arriesgar 1% por operación.",
    options: ["50", "500", "5,000", "10,000"],
    correct: 1,
    explanation: "El 1% de 50,000 es 500. El riesgo debe estar claro antes de entrar."
  },
  {
    category: "riesgo",
    title: "Sin punto de invalidación",
    context: "Te gusta una operación, pero no sabes exactamente dónde tu idea queda invalidada.",
    options: ["Mejor no entrar todavía", "Entrar y luego decidir", "Quitar el stop", "Aumentar riesgo"],
    correct: 0,
    explanation: "Si no sabes dónde estás equivocado, no tienes una operación clara."
  },
  {
    category: "riesgo",
    title: "Relación poco atractiva",
    context: "Arriesgas $500 para intentar ganar $250.",
    options: ["Relación pobre si no hay una razón estadística fuerte", "Siempre es excelente", "No importa", "Es 5:1"],
    correct: 0,
    explanation: "Arriesgar más de lo que buscas ganar exige una justificación estadística. Si no existe, el trade es débil."
  },
  {
    category: "riesgo",
    title: "Cuenta fondeada con reglas",
    context: "Operas una cuenta con límite diario y drawdown. Ves una entrada buena, pero el riesgo rompe tus reglas.",
    options: ["Tomarla igual", "Adaptar el riesgo o no operar", "Ignorar el drawdown", "Duplicar para recuperar"],
    correct: 1,
    explanation: "En cuentas fondeadas, las reglas son parte del sistema. Una buena entrada con mal riesgo sigue siendo peligrosa."
  },
  {
    category: "riesgo",
    title: "Después de una pérdida",
    context: "Pierdes un trade y sientes urgencia por recuperar en la siguiente vela.",
    options: ["Señal emocional de peligro", "Plan perfecto", "Confirmación objetiva", "Mejor momento para duplicar"],
    correct: 0,
    explanation: "La urgencia por recuperar suele llevar a revenge trading. La pausa también es gestión."
  },

  {
    category: "psicologia",
    title: "Entrada tarde por miedo",
    context: "El precio se mueve sin ti. Entras tarde solo porque sientes que estás perdiendo la oportunidad.",
    options: ["FOMO", "Plan perfecto", "Gestión excelente", "Backtest"],
    correct: 0,
    explanation: "Entrar tarde por miedo a quedarse fuera es FOMO. La paciencia protege la cuenta."
  },
  {
    category: "psicologia",
    title: "No hay setup claro",
    context: "Pasó una hora y no aparece una entrada limpia según tu plan.",
    options: ["Forzar operación", "Esperar", "Operar por aburrimiento", "Subir lotaje"],
    correct: 1,
    explanation: "No operar también es una decisión profesional cuando no hay contexto."
  },
  {
    category: "psicologia",
    title: "Querer tener razón",
    context: "El precio va contra tu idea, pero mantienes la operación solo porque no quieres aceptar que te equivocaste.",
    options: ["Ego", "Disciplina", "Gestión objetiva", "Confirmación"],
    correct: 0,
    explanation: "El ego quiere tener razón. El proceso busca proteger capital."
  },
  {
    category: "psicologia",
    title: "Día emocional",
    context: "Después de varias operaciones malas, sigues entrando porque quieres terminar el día positivo.",
    options: ["Sobreoperación", "Paciencia", "Control", "Backtesting"],
    correct: 0,
    explanation: "Seguir operando por necesidad emocional suele empeorar el día."
  },
  {
    category: "psicologia",
    title: "Buena zona, mal riesgo",
    context: "La zona se ve interesante, pero el stop necesario es muy grande y el target es pequeño.",
    options: ["No entrar o esperar mejor precio", "Entrar igual", "Quitar stop", "Duplicar riesgo"],
    correct: 0,
    explanation: "Una buena zona con mala relación riesgo-beneficio puede seguir siendo una mala operación."
  }
];

let filteredQuestions = [...questions];
let currentIndex = 0;
let score = 0;
let answeredQuestions = new Set();

const loadingBox = document.getElementById("loadingBox");
const practiceApp = document.getElementById("practiceApp");
const practiceSummary = document.getElementById("practiceSummary");

const categoryBox = document.getElementById("questionCategory");
const titleBox = document.getElementById("questionTitle");
const contextBox = document.getElementById("questionContext");
const answersBox = document.getElementById("answersBox");
const feedbackBox = document.getElementById("feedbackBox");
const feedbackLabel = document.getElementById("feedbackLabel");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackText = document.getElementById("feedbackText");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("scoreText");
const summaryText = document.getElementById("summaryText");

const prevBtn = document.getElementById("prevQuestionBtn");
const nextBtn = document.getElementById("nextQuestionBtn");
const restartBtn = document.getElementById("restartBtn");

function normalizeCategory(category) {
  const labels = {
    estructura: "Estructura",
    fvg: "FVG / Imbalance",
    orderblock: "Order Blocks / Smart Money",
    riesgo: "Gestión de riesgo",
    psicologia: "Psicología"
  };

  return labels[category] || "Práctica";
}

function renderQuestion() {
  const question = filteredQuestions[currentIndex];

  if (!question) {
    showSummary();
    return;
  }

  feedbackBox.classList.add("hidden");

  categoryBox.textContent = normalizeCategory(question.category);
  titleBox.textContent = question.title;
  contextBox.textContent = question.context;

  progressText.textContent = `${currentIndex + 1} / ${filteredQuestions.length}`;
  scoreText.textContent = `Score: ${score}`;

  answersBox.innerHTML = question.options.map((option, index) => `
    <button class="answer-option" type="button" data-answer-index="${index}">
      <span>${String.fromCharCode(65 + index)}</span>
      ${option}
    </button>
  `).join("");

  document.querySelectorAll("[data-answer-index]").forEach((button) => {
    button.addEventListener("click", () => {
      selectAnswer(Number(button.dataset.answerIndex));
    });
  });

  prevBtn.disabled = currentIndex === 0;
  nextBtn.textContent = currentIndex === filteredQuestions.length - 1 ? "Finalizar" : "Siguiente";
}

function selectAnswer(answerIndex) {
  const question = filteredQuestions[currentIndex];
  const correct = answerIndex === question.correct;
  const questionKey = `${question.category}-${question.title}`;

  document.querySelectorAll("[data-answer-index]").forEach((button) => {
    button.disabled = true;

    const index = Number(button.dataset.answerIndex);

    if (index === question.correct) {
      button.classList.add("is-correct");
    }

    if (index === answerIndex && !correct) {
      button.classList.add("is-wrong");
    }
  });

  if (correct && !answeredQuestions.has(questionKey)) {
    score += 1;
    answeredQuestions.add(questionKey);
  }

  feedbackBox.classList.remove("hidden");
  feedbackLabel.textContent = correct ? "Correcto" : "Revisar";
  feedbackTitle.textContent = correct ? "Bien visto." : "No era la mejor lectura.";
  feedbackText.textContent = question.explanation;

  scoreText.textContent = `Score: ${score}`;
}

function showSummary() {
  practiceApp.classList.add("hidden");
  practiceSummary.classList.remove("hidden");

  summaryText.textContent = `Completaste ${filteredQuestions.length} preguntas. Score final: ${score} / ${filteredQuestions.length}. Recuerda: el objetivo no es memorizar respuestas, sino entrenar criterio.`;
}

function applyFilter(category) {
  filteredQuestions = category === "all"
    ? [...questions]
    : questions.filter((question) => question.category === category);

  currentIndex = 0;
  score = 0;
  answeredQuestions = new Set();

  practiceSummary.classList.add("hidden");
  practiceApp.classList.remove("hidden");

  renderQuestion();
}

document.querySelectorAll(".practice-filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".practice-filter").forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    applyFilter(button.dataset.category);
  });
});

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      renderQuestion();
    }
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (currentIndex >= filteredQuestions.length - 1) {
      showSummary();
      return;
    }

    currentIndex += 1;
    renderQuestion();
  });
}

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    currentIndex = 0;
    score = 0;
    answeredQuestions = new Set();
    practiceSummary.classList.add("hidden");
    practiceApp.classList.remove("hidden");
    renderQuestion();
  });
}

requireActiveUser(() => {
  loadingBox?.classList.add("hidden");
  practiceApp.classList.remove("hidden");
  renderQuestion();
});
