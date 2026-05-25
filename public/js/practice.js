import { requireActiveUser } from "./auth.js";

const questions = [
  {
    category: "estructura",
    title: "Soporte y resistencia",
    context: "El precio llega a una zona donde anteriormente reaccionó varias veces y vuelve a mostrar rechazo.",
    options: ["Entrar sin esperar confirmación", "Ignorar la zona", "Observar reacción y contexto", "Cambiar de temporalidad sin razón"],
    correct: 2,
    explanation: "Una zona importante no es una entrada automática. Primero se observa reacción, contexto, liquidez y riesgo."
  },
  {
    category: "estructura",
    title: "Canal de mercado",
    context: "El precio se mueve entre dos líneas relativamente paralelas, respetando zona alta y zona baja.",
    options: ["FVG", "Canal", "Order Block", "EMA"],
    correct: 1,
    explanation: "Un canal aparece cuando soporte y resistencia se mantienen relativamente alineados, creando un túnel de precio."
  },
  {
    category: "estructura",
    title: "Precio en medio del rango",
    context: "El precio está justo en la mitad de un rango amplio, lejos de soporte y resistencia.",
    options: ["Comprar", "Vender", "Esperar", "Aumentar lotaje"],
    correct: 2,
    explanation: "El medio del rango suele ser una zona de peor decisión. WLF prioriza operar cerca de zonas con contexto."
  },
  {
    category: "estructura",
    title: "Ruptura sin confirmación",
    context: "Una vela rompe resistencia, pero cierra débil y regresa inmediatamente al rango.",
    options: ["Ruptura limpia", "Posible falso rompimiento", "Entrada obligatoria", "Confirmación alcista total"],
    correct: 1,
    explanation: "Una ruptura que no sostiene puede ser falsa. La reacción posterior importa más que el simple toque de la línea."
  },
  {
    category: "estructura",
    title: "Tendencia sana",
    context: "El precio crea máximos y mínimos más altos de forma ordenada.",
    options: ["Tendencia bajista", "Rango lateral", "Tendencia alcista", "Mercado sin estructura"],
    correct: 2,
    explanation: "Máximos y mínimos crecientes muestran estructura alcista mientras el patrón se mantenga."
  },
  {
    category: "fvg",
    title: "FVG básico",
    context: "Un movimiento impulsivo deja un espacio entre la vela 1 y la vela 3.",
    options: ["Soporte", "FVG / Imbalance", "Canal", "Divergencia"],
    correct: 1,
    explanation: "El FVG es la huella visible de un desequilibrio. No se opera solo; necesita contexto."
  },
  {
    category: "fvg",
    title: "FVG con contexto",
    context: "Hay un FVG cerca de una zona de reacción importante, después de una barrida de liquidez.",
    options: ["Tiene más valor contextual", "No importa", "Siempre falla", "Solo sirve en 1 minuto"],
    correct: 0,
    explanation: "Un FVG gana valor cuando aparece con contexto: liquidez, estructura, zona y reacción."
  },
  {
    category: "fvg",
    title: "FVG en zona aleatoria",
    context: "Ves un FVG en medio de un rango sin zona clara y sin dirección definida.",
    options: ["Entrada segura", "Mejor esperar", "Aumentar riesgo", "Ignorar gestión"],
    correct: 1,
    explanation: "Un FVG sin contexto puede ser solo ruido. La ubicación es clave."
  },
  {
    category: "fvg",
    title: "Balance del FVG",
    context: "El precio vuelve al FVG y lo mitiga antes de continuar.",
    options: ["Puede considerarse balanceado/mitigado", "Siempre invalida todo", "No tiene sentido", "Es una noticia"],
    correct: 0,
    explanation: "Cuando el precio regresa a una zona de imbalance y reacciona, puede estar mitigando o balanceando esa zona."
  },
  {
    category: "fvg",
    title: "FVG y ansiedad",
    context: "El estudiante entra en cada FVG que aparece sin revisar tendencia, zona o liquidez.",
    options: ["Buen proceso", "Sobreoperación", "Disciplina perfecta", "Entrada institucional"],
    correct: 1,
    explanation: "Operar cada FVG sin filtro es sobreoperar. WLF busca criterio, no perseguir cada patrón."
  },
  {
    category: "orderblock",
    title: "Order Block simple",
    context: "Antes de un movimiento fuerte, el precio deja una última zona de acumulación/reacción.",
    options: ["Order Block", "Media móvil", "Spread", "Comisión"],
    correct: 0,
    explanation: "Un Order Block puede ser una zona donde ocurrió actividad importante antes del desplazamiento."
  },
  {
    category: "orderblock",
    title: "OB sin reacción",
    context: "El precio vuelve a un supuesto Order Block, lo atraviesa sin rechazo y cierra fuerte en contra.",
    options: ["Zona respetada", "Posible invalidación", "Entrada segura", "Confirmación total"],
    correct: 1,
    explanation: "Si la zona no reacciona y el precio la atraviesa con fuerza, puede estar invalidada."
  },
  {
    category: "orderblock",
    title: "OB y liquidez",
    context: "El precio barre liquidez y luego reacciona desde una zona previa de impulso.",
    options: ["Más contexto para el OB", "Menos contexto", "No se analiza", "Siempre comprar"],
    correct: 0,
    explanation: "La combinación de liquidez tomada + zona de reacción puede dar más contexto a un OB."
  },
  {
    category: "orderblock",
    title: "Smart Money",
    context: "El precio toma liquidez sobre un máximo anterior y luego cae con fuerza.",
    options: ["Sweep de liquidez", "Canal alcista", "EMA 20", "Rango perfecto"],
    correct: 0,
    explanation: "Tomar máximos/mínimos antes de reaccionar puede ser una barrida de liquidez."
  },
  {
    category: "orderblock",
    title: "Zona vs señal",
    context: "Ves una zona interesante, pero no hay reacción ni confirmación.",
    options: ["Esperar", "Entrar full margen", "Ignorar riesgo", "Duplicar posición"],
    correct: 0,
    explanation: "Una zona no es una señal completa. WLF separa ubicación, reacción y gestión."
  },
  {
    category: "riesgo",
    title: "Riesgo por trade",
    context: "Tienes una cuenta de 50,000 y decides arriesgar 1% por operación.",
    options: ["50", "500", "5,000", "10,000"],
    correct: 1,
    explanation: "El 1% de 50,000 es 500. La gestión empieza con números claros."
  },
  {
    category: "riesgo",
    title: "Stop Loss",
    context: "Una operación no tiene punto claro de invalidación.",
    options: ["Mejor no entrar", "Entrar más fuerte", "Usar todo el margen", "Quitar el stop"],
    correct: 0,
    explanation: "Si no sabes dónde estás equivocado, no tienes operación clara."
  },
  {
    category: "riesgo",
    title: "Ratio riesgo-beneficio",
    context: "Arriesgas $500 para buscar $250.",
    options: ["Relación 2:1 a favor", "Relación pobre", "Siempre perfecto", "No importa"],
    correct: 1,
    explanation: "Arriesgar más de lo que buscas ganar puede ser mala relación, salvo que el sistema lo justifique con alta probabilidad."
  },
  {
    category: "riesgo",
    title: "Después de una pérdida",
    context: "Pierdes una operación y sientes ganas de recuperar inmediatamente.",
    options: ["Revenge trading", "Disciplina", "Gestión perfecta", "Backtesting"],
    correct: 0,
    explanation: "Querer recuperar de inmediato suele ser revenge trading. La pausa también es gestión."
  },
  {
    category: "riesgo",
    title: "Cuenta fondeada",
    context: "Operas una cuenta con reglas de drawdown y límite diario.",
    options: ["Ignorar reglas", "Leer reglas y adaptar riesgo", "Operar igual siempre", "Subir lotaje sin plan"],
    correct: 1,
    explanation: "En cuentas fondeadas, las reglas son parte del sistema. No basta con tener buena entrada."
  },
  {
    category: "psicologia",
    title: "FOMO",
    context: "El precio se mueve sin ti y entras tarde por miedo a perder la oportunidad.",
    options: ["FOMO", "Plan perfecto", "Gestión excelente", "Backtest"],
    correct: 0,
    explanation: "Entrar tarde por miedo a quedarse fuera es FOMO. La paciencia protege la cuenta."
  },
  {
    category: "psicologia",
    title: "Paciencia",
    context: "No hay setup claro durante una hora.",
    options: ["Forzar entrada", "Esperar", "Aumentar riesgo", "Operar por aburrimiento"],
    correct: 1,
    explanation: "No operar también es una decisión profesional cuando no hay contexto."
  },
  {
    category: "psicologia",
    title: "Ego",
    context: "El mercado va contra tu idea, pero mantienes la operación solo para tener razón.",
    options: ["Ego", "Disciplina", "Gestión objetiva", "Plan perfecto"],
    correct: 0,
    explanation: "El ego quiere tener razón. El trader con proceso quiere proteger capital."
  },
  {
    category: "psicologia",
    title: "Sobreoperación",
    context: "Después de 3 trades malos, sigues entrando porque quieres terminar el día positivo.",
    options: ["Sobreoperación", "Paciencia", "Control", "Plan correcto"],
    correct: 0,
    explanation: "Seguir operando por necesidad emocional suele empeorar el día."
  },
  {
    category: "psicologia",
    title: "Mentalidad WLF",
    context: "Ves una zona interesante, pero el riesgo no compensa.",
    options: ["No entrar", "Entrar igual", "Duplicar stop", "Quitar SL"],
    correct: 0,
    explanation: "Una buena zona con mal riesgo puede seguir siendo una mala operación."
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
