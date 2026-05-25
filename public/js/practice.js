import { requireActiveUser } from "./auth.js";

const questions = [
  // ESTRUCTURA
  {
    category: "estructura",
    title: "Zona de soporte con llegada agresiva",
    context: "El precio cae fuerte hacia un soporte marcado. La zona es importante, pero la vela de llegada es grande y cierra cerca del mínimo.",
    options: [
      "Comprar apenas toca el soporte porque la zona ya reaccionó antes.",
      "Esperar una reacción o pérdida de fuerza antes de considerar compra.",
      "Vender inmediatamente porque toda vela fuerte siempre continúa.",
      "Mover el soporte más abajo para que el precio lo respete."
    ],
    correct: 1,
    explanation: "Una zona importante no es una entrada automática. Si el precio llega con mucha agresividad, primero quieres ver rechazo o pérdida de fuerza."
  },
  {
    category: "estructura",
    title: "Ruptura de resistencia con cierre débil",
    context: "El precio rompe una resistencia, pero la vela deja mecha superior grande y cierra apenas dentro de la zona rota.",
    options: [
      "Entrar long porque técnicamente rompió la resistencia.",
      "Esperar confirmación: retest, aceptación o cierre más claro por encima.",
      "Entrar short automáticamente porque toda mecha superior es venta segura.",
      "Ignorar la resistencia porque las líneas nunca funcionan."
    ],
    correct: 1,
    explanation: "La ruptura por sí sola no basta. WLF busca ruptura + aceptación o reacción clara, no solo un toque por encima."
  },
  {
    category: "estructura",
    title: "Precio en mitad del rango",
    context: "El mercado está lateral. El precio se encuentra justo en el centro del rango, lejos del máximo y del mínimo.",
    options: [
      "Buscar entrada solo porque el rango ya está identificado.",
      "Esperar mejor ubicación cerca de extremos o una ruptura con intención.",
      "Comprar porque está a mitad de camino y puede subir.",
      "Vender porque está a mitad de camino y puede bajar."
    ],
    correct: 1,
    explanation: "En el centro del rango el riesgo suele ser peor y la dirección menos clara."
  },
  {
    category: "estructura",
    title: "Cambio de estructura después de tendencia",
    context: "El precio venía haciendo máximos y mínimos más altos. Luego rompe el último mínimo importante y no recupera la zona.",
    options: [
      "Seguir buscando compras porque la tendencia anterior era alcista.",
      "Considerar que la estructura alcista perdió fuerza y esperar nuevo contexto.",
      "Vender sin stop porque ya cambió todo.",
      "Ignorar el mínimo porque solo importan las resistencias."
    ],
    correct: 1,
    explanation: "Cuando un mínimo importante se rompe y no se recupera, la estructura puede estar cambiando."
  },
  {
    category: "estructura",
    title: "Canal respetado varias veces",
    context: "El precio respeta una línea superior y una inferior de un canal. Ahora llega a la parte alta con velas pequeñas y pérdida de impulso.",
    options: [
      "Buscar compra porque está cerca de la parte alta del canal.",
      "Observar posible rechazo o esperar ruptura real antes de decidir.",
      "Vender siempre en cualquier techo sin mirar contexto.",
      "Eliminar el canal porque las velas son pequeñas."
    ],
    correct: 1,
    explanation: "La parte alta del canal puede ser zona de decisión, pero no es venta automática."
  },

  // LIQUIDEZ
  {
    category: "liquidez",
    title: "Barrida de máximo anterior",
    context: "El precio supera por poco un máximo importante, activa stops o compras tardías y luego regresa rápidamente por debajo.",
    options: [
      "Asumir continuación automática porque el máximo fue roto.",
      "Reconocer posible toma de liquidez y esperar confirmación de rechazo.",
      "Comprar de inmediato porque el breakout ya ocurrió.",
      "Ignorar ese máximo porque ya no importa."
    ],
    correct: 1,
    explanation: "Cuando el precio toma un máximo y vuelve debajo, puede ser una barrida de liquidez. Aun así, necesitas contexto y confirmación."
  },
  {
    category: "liquidez",
    title: "Liquidez en rango",
    context: "En un rango claro, el precio se acerca al extremo superior donde muchos esperan venta.",
    options: [
      "Vender inmediatamente solo porque llegó al extremo.",
      "Pensar que ahí puede haber liquidez y observar si el precio la toma antes de decidir.",
      "Comprar porque el precio está fuerte.",
      "Eliminar el rango porque el precio tocó una vez más."
    ],
    correct: 1,
    explanation: "Los extremos de un rango suelen acumular liquidez. No se trata solo de tocar la zona, sino de ver si la liquidez es tomada y cómo reacciona luego."
  },
  {
    category: "liquidez",
    title: "Liquidez y desplazamiento",
    context: "El precio barre un mínimo anterior y después sale con una vela alcista amplia dejando desplazamiento claro.",
    options: [
      "Podría ser una buena pista si además hay zona y riesgo aceptable.",
      "Eso obliga a comprar sin mirar más nada.",
      "Lo correcto es vender porque los mínimos siempre se rompen otra vez.",
      "No importa la barrida si hubo una vela grande."
    ],
    correct: 0,
    explanation: "Liquidez tomada + desplazamiento puede ser una combinación potente, pero sigue necesitando ubicación y gestión."
  },
  {
    category: "liquidez",
    title: "Zona con muchos equal highs",
    context: "Ves varios máximos muy parecidos alineados antes de una resistencia mayor.",
    options: [
      "Eso puede representar liquidez por encima de esos máximos.",
      "Eso invalida la resistencia automáticamente.",
      "Significa que el precio no puede subir más nunca.",
      "No tiene ninguna lectura especial."
    ],
    correct: 0,
    explanation: "Equal highs suelen ser una zona donde se acumulan stops/liquidez. Puede atraer al precio antes de una reacción."
  },
  {
    category: "liquidez",
    title: "Confundir liquidez con entrada",
    context: "Identificas una zona de liquidez clara, pero el precio todavía no muestra reacción ni confirmación.",
    options: [
      "Entrar porque ver la liquidez ya es suficiente.",
      "Esperar a ver cómo el precio interactúa con esa liquidez.",
      "Quitar el stop para darle más espacio al concepto.",
      "Duplicar lotaje porque la idea suena institucional."
    ],
    correct: 1,
    explanation: "Detectar liquidez es una ventaja, pero no reemplaza la necesidad de ver reacción, estructura y riesgo."
  },

  // SWINGS
  {
    category: "swings",
    title: "Secuencia de swings alcistas",
    context: "El precio sigue dejando swing lows más altos y swing highs más altos.",
    options: [
      "La estructura sigue siendo alcista mientras esa secuencia no se rompa.",
      "Eso ya es debilidad bajista.",
      "Solo importan los candles, no los swings.",
      "Debe venderse porque ha subido mucho."
    ],
    correct: 0,
    explanation: "Los swings ayudan a leer el flujo del mercado. Mientras mantenga highs y lows crecientes, la estructura favorece al alza."
  },
  {
    category: "swings",
    title: "Swing high importante",
    context: "El precio rompe un swing high reciente, pero luego vuelve a meterse debajo muy rápido.",
    options: [
      "Asumir continuación sin dudas.",
      "Considerar que esa ruptura puede no haber sido aceptada.",
      "Eliminar ese swing del análisis.",
      "Comprar más porque ya lo rompió una vez."
    ],
    correct: 1,
    explanation: "No basta con romper un swing; importa si el mercado acepta esa ruptura o la rechaza rápidamente."
  },
  {
    category: "swings",
    title: "Swing low como referencia",
    context: "Estás buscando compras y tienes un swing low claro como punto de invalidación.",
    options: [
      "Ese swing puede servir como referencia lógica para el stop o invalidación.",
      "No sirve para nada, solo mira indicadores.",
      "Debes poner el stop en cualquier sitio más pequeño.",
      "Hay que ignorarlo porque el mercado es aleatorio."
    ],
    correct: 0,
    explanation: "Los swings bien definidos ayudan a estructurar la idea y a definir dónde deja de tener sentido."
  },
  {
    category: "swings",
    title: "Micro swing contra tendencia",
    context: "En una tendencia alcista fuerte aparece un pequeño swing bajista dentro del pullback.",
    options: [
      "Cambiar completamente a sesgo bajista.",
      "Diferenciar entre un swing menor y un cambio real de estructura.",
      "Vender porque cualquier swing bajista cambia todo.",
      "Ignorar toda estructura mayor para centrarte solo en el micro swing."
    ],
    correct: 1,
    explanation: "No todos los swings tienen el mismo peso. WLF diferencia entre retroceso menor y cambio estructural real."
  },
  {
    category: "swings",
    title: "Swings en consolidación",
    context: "Dentro de una consolidación aparecen muchos pequeños swings arriba y abajo sin dirección limpia.",
    options: [
      "Tomar cada micro swing como una operación fuerte.",
      "Reconocer que en consolidación los swings pueden generar ruido y falsas lecturas.",
      "Asumir tendencia solo por ver varios swings.",
      "Quitar toda gestión porque el mercado está lento."
    ],
    correct: 1,
    explanation: "En consolidaciones los swings pueden volverse ruidosos. El contexto general sigue siendo clave."
  },

  // TENDENCIAS
  {
    category: "tendencias",
    title: "Tendencia sana con retrocesos",
    context: "El mercado sube de forma ordenada, hace retrocesos controlados y luego continúa dejando nuevos máximos.",
    options: [
      "Eso describe una tendencia alcista saludable.",
      "Eso es una consolidación sin dirección.",
      "Eso ya es una reversa bajista inminente.",
      "Eso obliga a comprar en cualquier precio."
    ],
    correct: 0,
    explanation: "Una tendencia sana suele alternar impulsos y retrocesos sin perder su estructura principal."
  },
  {
    category: "tendencias",
    title: "Retroceso profundo en tendencia",
    context: "Una tendencia alcista entra en retroceso más profundo de lo normal y empieza a romper varios lows previos.",
    options: [
      "Comprar igual porque toda tendencia siempre vuelve.",
      "Vigilar posible debilitamiento y no asumir que la tendencia sigue intacta.",
      "Quitar el stop porque el mercado ya corregirá.",
      "Ignorar todos los lows rotos porque el sesgo era alcista antes."
    ],
    correct: 1,
    explanation: "Cuando el retroceso deja de ser normal y empieza a romper estructura previa, la tendencia puede estar perdiendo fuerza."
  },
  {
    category: "tendencias",
    title: "Tendencia bajista ordenada",
    context: "El precio deja máximos más bajos y mínimos más bajos durante varias secuencias.",
    options: [
      "Eso favorece continuación bajista mientras la secuencia siga viva.",
      "Eso es alcista porque ha bajado mucho.",
      "Eso ya invalida toda venta.",
      "Eso significa que nunca habrá pullbacks."
    ],
    correct: 0,
    explanation: "Máximos y mínimos descendentes muestran una estructura bajista ordenada."
  },
  {
    category: "tendencias",
    title: "Operar contra tendencia",
    context: "Ves una pequeña zona de venta dentro de una tendencia alcista limpia, pero no hay signos reales de agotamiento mayor.",
    options: [
      "Tomar la contra tendencia como si tuviera la misma calidad que operar a favor.",
      "Ser más exigente si vas contra la tendencia principal.",
      "Vender sin stop porque el precio ya subió mucho.",
      "Ignorar la tendencia porque cada zona vale lo mismo."
    ],
    correct: 1,
    explanation: "Operar contra tendencia suele requerir más contexto y mejor timing. No todas las zonas tienen el mismo peso."
  },
  {
    category: "tendencias",
    title: "Tendencia y paciencia",
    context: "Identificas una tendencia clara, pero el precio está demasiado extendido y lejos de una zona lógica de entrada.",
    options: [
      "Entrar tarde solo para no perder el movimiento.",
      "Esperar pullback o nueva estructura que ofrezca mejor ubicación.",
      "Comprar con stop enorme porque la tendencia es fuerte.",
      "Cambiar a venta solo porque está extendido."
    ],
    correct: 1,
    explanation: "Una buena tendencia no siempre significa buena entrada inmediata. La ubicación sigue siendo parte del edge."
  },

  // FVG
  {
    category: "fvg",
    title: "FVG después de desplazamiento fuerte",
    context: "El precio barre un mínimo previo, reacciona fuerte al alza y deja un FVG limpio en el desplazamiento.",
    options: [
      "Comprar cualquier regreso al FVG sin mirar dónde está el stop.",
      "Marcar el FVG como zona de interés y esperar reacción/riesgo aceptable.",
      "Ignorar el FVG porque todos los gaps se llenan sin importancia.",
      "Entrar short porque el precio dejó un hueco y debe cerrarlo."
    ],
    correct: 1,
    explanation: "El FVG puede ser una zona de interés porque aparece después de liquidez tomada y desplazamiento. Pero se necesita reacción y gestión."
  },
  {
    category: "fvg",
    title: "FVG en medio de consolidación",
    context: "Dentro de un rango lleno de velas cruzadas aparecen varios FVG pequeños, pero no hay dirección clara ni zona principal.",
    options: [
      "Operar todos los FVG porque más señales significan más oportunidades.",
      "Filtrar y esperar un FVG conectado con liquidez, estructura o extremo del rango.",
      "Escoger el FVG más pequeño porque será más preciso.",
      "Entrar en contra de todos los FVG por ser zona de manipulación."
    ],
    correct: 1,
    explanation: "Muchos FVG en una consolidación pueden ser ruido. El valor aparece cuando el imbalance tiene contexto."
  },
  {
    category: "fvg",
    title: "Retorno profundo al FVG",
    context: "El precio vuelve a un FVG alcista, entra muy profundo en la zona y no muestra rechazo; las velas empiezan a cerrar debajo.",
    options: [
      "Mantener la idea alcista sin cambios porque el FVG todavía existe.",
      "Tener cuidado: la reacción débil puede indicar pérdida de validez.",
      "Comprar más porque cuanto más profundo entra, mejor siempre.",
      "Cambiar automáticamente a venta sin esperar estructura."
    ],
    correct: 1,
    explanation: "Un FVG puede fallar. Si el precio entra profundo, no reacciona y empieza a cerrar debajo, la idea debe revisarse."
  },
  {
    category: "fvg",
    title: "FVG y zona premium/discount",
    context: "Ves un FVG bajista, pero está muy abajo después de una caída larga, cerca de un soporte mayor.",
    options: [
      "Venderlo igual porque todos los FVG bajistas son ventas.",
      "Evaluar si la ubicación es pobre para vender y esperar mejor precio/contexto.",
      "Comprar inmediatamente porque todo soporte funciona.",
      "Ignorar el soporte porque solo importa el FVG."
    ],
    correct: 1,
    explanation: "Un FVG bajista en una zona muy baja puede ofrecer mala ubicación para vender."
  },
  {
    category: "fvg",
    title: "Mitigación con confirmación",
    context: "El precio vuelve al 50% de un FVG, deja rechazo claro y la siguiente vela rompe un micro máximo a favor.",
    options: [
      "Es una posible reacción válida si el riesgo y el contexto acompañan.",
      "No sirve porque todo FVG debe llenarse al 100%.",
      "Es entrada obligatoria sin importar el stop.",
      "Es señal de venta porque tocó una zona de imbalance."
    ],
    correct: 0,
    explanation: "Una reacción desde zona de FVG con confirmación micro puede ser válida, siempre que el riesgo, la ubicación y el contexto general acompañen."
  },

  // ORDER BLOCK
  {
    category: "orderblock",
    title: "Order Block antes del desplazamiento",
    context: "Antes de una subida fuerte, hay una última vela bajista cerca de una zona donde también se tomó liquidez.",
    options: [
      "Puede ser zona de interés, pero se necesita reacción cuando el precio vuelva.",
      "Comprar inmediatamente aunque el precio esté lejos de la zona.",
      "Vender porque la última vela fue bajista.",
      "Ignorar la liquidez porque el color de la vela decide todo."
    ],
    correct: 0,
    explanation: "Un posible Order Block se vuelve más interesante si está conectado con liquidez y desplazamiento."
  },
  {
    category: "orderblock",
    title: "Order Block roto con intención",
    context: "El precio vuelve a un supuesto Order Block alcista, no reacciona, lo rompe y cierra fuerte por debajo.",
    options: [
      "Seguir comprando porque la zona era buena antes.",
      "Considerar invalidación y esperar nuevo contexto.",
      "Duplicar la posición para mejorar el precio medio.",
      "Mover la zona más abajo hasta que funcione."
    ],
    correct: 1,
    explanation: "Una zona que no reacciona y es rota con fuerza puede estar invalidada."
  },
  {
    category: "orderblock",
    title: "Barrida por encima del máximo",
    context: "El precio supera un máximo anterior, activa liquidez, deja rechazo fuerte y vuelve debajo del máximo.",
    options: [
      "Puede ser una barrida de liquidez, pero se necesita contexto para operar.",
      "Comprar porque rompió el máximo y toda ruptura es continuación.",
      "Vender sin esperar porque toda barrida siempre cae.",
      "Ignorar el máximo anterior porque ya fue roto."
    ],
    correct: 0,
    explanation: "Tomar un máximo y volver debajo puede ser una barrida de liquidez. Pero no se opera automáticamente."
  },
  {
    category: "orderblock",
    title: "Smart Money con mala ubicación",
    context: "Ves una posible zona institucional, pero está en el centro de un rango y el stop lógico queda demasiado grande.",
    options: [
      "Operar porque el concepto suena institucional.",
      "Esperar mejor ubicación o descartar por mala relación riesgo-contexto.",
      "Entrar con más contratos para compensar el stop grande.",
      "Quitar el stop porque la zona es institucional."
    ],
    correct: 1,
    explanation: "Una zona con nombre bonito no arregla una mala operación."
  },
  {
    category: "orderblock",
    title: "Retest después de desplazamiento",
    context: "El precio deja un desplazamiento bajista fuerte, crea un FVG y luego vuelve lentamente a la zona de origen del movimiento.",
    options: [
      "Buscar posible venta si aparece rechazo y el riesgo es lógico.",
      "Comprar porque volvió a una zona cara.",
      "Vender sin mirar confirmación porque el desplazamiento fue fuerte.",
      "Ignorar la reacción porque solo importa la primera vela."
    ],
    correct: 0,
    explanation: "Después de desplazamiento bajista, un retorno lento a zona de origen puede ser interesante para venta, pero necesitas rechazo y gestión."
  },

  // RIESGO
  {
    category: "riesgo",
    title: "Setup bueno, stop demasiado grande",
    context: "La zona se ve clara, pero el punto lógico de invalidación exige un stop muy grande para tu cuenta.",
    options: [
      "Reducir tamaño, esperar mejor precio o descartar la operación.",
      "Tomarla igual porque el análisis se ve bien.",
      "Quitar el stop para no perder tanto.",
      "Duplicar contratos porque la zona es clara."
    ],
    correct: 0,
    explanation: "Una buena lectura no justifica mal riesgo."
  },
  {
    category: "riesgo",
    title: "Pérdida cerca del límite diario",
    context: "Ya estás cerca del límite de pérdida diaria de tu cuenta fondeada. Aparece una entrada decente pero no perfecta.",
    options: [
      "Operarla porque hay que recuperar el día.",
      "Ser más selectivo o parar, porque el margen de error es pequeño.",
      "Subir contratos para salir más rápido del drawdown.",
      "Ignorar el límite porque solo importa el setup."
    ],
    correct: 1,
    explanation: "Cuando estás cerca del límite diario, el contexto de riesgo cambia."
  },
  {
    category: "riesgo",
    title: "Target menor que el riesgo",
    context: "Para tomar la entrada debes arriesgar 40 ticks, pero el próximo obstáculo importante está a 18 ticks.",
    options: [
      "La operación puede no compensar, aunque la zona sea interesante.",
      "Es perfecta porque el stop grande da más espacio.",
      "Entrar igual y mover el target después.",
      "Quitar el target y esperar milagro."
    ],
    correct: 0,
    explanation: "Si el primer obstáculo está muy cerca y el stop es grande, la relación riesgo-beneficio puede ser mala."
  },
  {
    category: "riesgo",
    title: "Reentrada después de stop",
    context: "Te sacan por stop y el precio vuelve a la zona. Tu impulso es entrar otra vez inmediatamente.",
    options: [
      "Reentrar solo si aparece una nueva razón objetiva, no por frustración.",
      "Entrar siempre porque la primera pérdida fue injusta.",
      "Duplicar para recuperar la pérdida anterior.",
      "Entrar sin stop porque ya te sacaron una vez."
    ],
    correct: 0,
    explanation: "Una reentrada necesita nueva lectura objetiva. Si nace de frustración, se convierte en revenge trading."
  },
  {
    category: "riesgo",
    title: "Tamaño de posición",
    context: "Tu análisis es bueno, pero estás usando más contratos de los que tu plan permite.",
    options: [
      "El análisis compensa el exceso de riesgo.",
      "El tamaño debe respetar el plan aunque el setup se vea bueno.",
      "Más contratos siempre significan más confianza.",
      "Solo importa ganar, no el tamaño."
    ],
    correct: 1,
    explanation: "Si el tamaño rompe tu plan, la operación ya está contaminada."
  },

  // PSICOLOGIA
  {
    category: "psicologia",
    title: "Entrada tarde por presión",
    context: "El movimiento salió sin ti. Entras tarde porque sientes que si no lo haces, vas a perder la oportunidad del día.",
    options: [
      "Esperar un nuevo setup o aceptar que se fue.",
      "Entrar porque todavía puede seguir.",
      "Duplicar para compensar la entrada tarde.",
      "Quitar el stop porque el movimiento tiene fuerza."
    ],
    correct: 0,
    explanation: "El mercado siempre dará más oportunidades. Entrar tarde por presión suele ser FOMO."
  },
  {
    category: "psicologia",
    title: "Necesidad de recuperar",
    context: "Después de dos pérdidas, empiezas a buscar cualquier señal para volver a positivo.",
    options: [
      "Reducir actividad o pausar porque la emoción está tomando control.",
      "Operar más para que la estadística se arregle rápido.",
      "Aumentar contratos porque necesitas recuperar.",
      "Entrar en temporalidades más pequeñas para encontrar algo."
    ],
    correct: 0,
    explanation: "Cuando buscas recuperar, tu lectura se contamina."
  },
  {
    category: "psicologia",
    title: "Tener razón vs proteger capital",
    context: "El precio invalida tu idea, pero sigues buscando argumentos para mantener la operación.",
    options: [
      "Aceptar invalidación y proteger capital.",
      "Mantener porque el análisis original era bueno.",
      "Mover el stop para darle más espacio.",
      "Promediar para mejorar entrada."
    ],
    correct: 0,
    explanation: "El trader profesional no necesita tener razón; necesita proteger capital."
  },
  {
    category: "psicologia",
    title: "Aburrimiento en sesión lenta",
    context: "La sesión está lenta, no hay noticias ni zonas claras, pero sientes ganas de hacer algo.",
    options: [
      "No operar hasta que aparezca una razón real.",
      "Tomar una operación pequeña por entretenimiento.",
      "Probar una estrategia nueva en vivo.",
      "Operar porque estar frente al gráfico obliga a hacer algo."
    ],
    correct: 0,
    explanation: "El aburrimiento no es señal de entrada."
  },
  {
    category: "psicologia",
    title: "Trade ganado por mala razón",
    context: "Entraste por ansiedad, sin plan claro, pero la operación terminó en ganancia.",
    options: [
      "Marcarlo como mala ejecución aunque haya ganado.",
      "Celebrarlo como setup perfecto.",
      "Aumentar lotaje porque funcionó.",
      "Repetirlo siempre porque dio dinero."
    ],
    correct: 0,
    explanation: "Un trade puede ganar y seguir siendo mala ejecución. WLF evalúa proceso, no solo resultado."
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
    liquidez: "Liquidez",
    swings: "Swings",
    tendencias: "Tendencias",
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
