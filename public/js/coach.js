import { requireActiveUser } from "./auth.js";

const chatMessages = document.getElementById("chatMessages");
const coachForm = document.getElementById("coachForm");
const coachInput = document.getElementById("coachInput");
const loadingBox = document.getElementById("loadingBox");
const coachApp = document.getElementById("coachApp");

const greetingHtml = `
  <p>Hola, ¿qué tal? Soy tu WLF Coach.</p>
  <p>
    Puedes preguntarme sobre conceptos del curso, gestión, psicología o sobre cómo usar el portal.
  </p>
  <p>
    Ejemplos: “¿un R:R 1:3 después de liquidez es bueno?”, “estoy frustrado, dame un plan”,
    “¿cómo evito quemar una cuenta?”, “¿dónde está la biblioteca?”
  </p>
`;

const conceptMap = [
  {
    id: "liquidez",
    title: "Liquidez",
    keywords: ["liquidez", "liquidity", "ordenes", "órdenes", "stops", "stop", "equal highs", "equal lows"],
    answer: `
      <p>La liquidez es donde probablemente hay órdenes esperando: stops, entradas tardías o zonas obvias donde muchos traders toman decisiones.</p>
      <ul>
        <li>Highs y lows previos suelen acumular liquidez.</li>
        <li>Equal highs/equal lows pueden atraer al precio.</li>
        <li>No es entrada automática; primero mira cómo reacciona el precio después de tomar esa liquidez.</li>
      </ul>
    `
  },
  {
    id: "sweep",
    title: "Sweep / barrida",
    keywords: ["sweep", "barrida", "barre", "barrer", "toma de liquidez", "liquidez tomada", "fake breakout", "falso rompimiento"],
    answer: `
      <p>Un sweep ocurre cuando el precio rompe un high/low importante, toma liquidez y luego vuelve rápidamente a la zona previa.</p>
      <ul>
        <li>No toda ruptura es continuación.</li>
        <li>Si rompe y vuelve, puede ser trampa o toma de liquidez.</li>
        <li>La confirmación viene por reacción, cierre, desplazamiento y contexto.</li>
      </ul>
    `
  },
  {
    id: "swinghigh",
    title: "Swing High",
    keywords: ["swing high", "swinghigh", "maximo swing", "máximo swing", "high anterior", "maximo anterior", "máximo anterior"],
    answer: `
      <p>Un swing high es un máximo relevante donde el precio reaccionó hacia abajo.</p>
      <ul>
        <li>Puede servir como referencia de estructura.</li>
        <li>Puede acumular liquidez por encima.</li>
        <li>Si el precio lo rompe y vuelve debajo, puede indicar falta de aceptación.</li>
      </ul>
    `
  },
  {
    id: "swinglow",
    title: "Swing Low",
    keywords: ["swing low", "swinglow", "minimo swing", "mínimo swing", "low anterior", "minimo anterior", "mínimo anterior"],
    answer: `
      <p>Un swing low es un mínimo relevante donde el precio reaccionó hacia arriba.</p>
      <ul>
        <li>Puede servir como referencia de invalidación.</li>
        <li>Puede acumular liquidez por debajo.</li>
        <li>Si se rompe y recupera, puede mostrar barrida o rechazo.</li>
      </ul>
    `
  },
  {
    id: "swings",
    title: "Swings",
    keywords: ["swings", "swing", "hh", "hl", "lh", "ll", "higher high", "higher low", "lower high", "lower low"],
    answer: `
      <p>Los swings son puntos de giro que ayudan a leer estructura.</p>
      <ul>
        <li>Higher highs + higher lows = estructura alcista.</li>
        <li>Lower highs + lower lows = estructura bajista.</li>
        <li>No todos los swings tienen el mismo peso; diferencia micro swing de estructura importante.</li>
      </ul>
    `
  },
  {
    id: "tendencia",
    title: "Tendencia",
    keywords: ["tendencia", "trend", "alcista", "bajista", "uptrend", "downtrend"],
    answer: `
      <p>Una tendencia es una secuencia estructural, no solo una vela fuerte.</p>
      <ul>
        <li>Alcista: máximos y mínimos crecientes.</li>
        <li>Bajista: máximos y mínimos decrecientes.</li>
        <li>Una buena tendencia no siempre significa buena entrada inmediata; la ubicación importa.</li>
      </ul>
    `
  },
  {
    id: "rango",
    title: "Rango",
    keywords: ["rango", "range", "lateral", "consolidacion", "consolidación", "choppy"],
    answer: `
      <p>Un rango aparece cuando el precio se mueve entre zonas superiores e inferiores sin dirección clara.</p>
      <ul>
        <li>Los extremos suelen ser más importantes que el centro.</li>
        <li>El centro del rango suele tener peor riesgo y más ruido.</li>
        <li>Las rupturas necesitan aceptación; si rompen y vuelven, cuidado con falso rompimiento.</li>
      </ul>
    `
  },
  {
    id: "fvg",
    title: "FVG / Imbalance",
    keywords: ["fvg", "imbalance", "desequilibrio", "ineficiencia", "gap", "fair value gap"],
    answer: `
      <p>Un FVG es una huella de desequilibrio creada por un movimiento agresivo.</p>
      <ul>
        <li>Un FVG aislado no es suficiente.</li>
        <li>Gana valor si aparece después de liquidez tomada, desplazamiento y zona importante.</li>
        <li>Si el precio vuelve y no reacciona, la idea pierde fuerza.</li>
      </ul>
    `
  },
  {
    id: "orderblock",
    title: "Order Block",
    keywords: ["order block", "orderblock", "ob", "bloque", "bloque de orden"],
    answer: `
      <p>Un Order Block puede verse como una zona previa al desplazamiento donde el mercado dejó una decisión importante.</p>
      <ul>
        <li>No se opera solo por marcar la zona.</li>
        <li>Gana valor si se conecta con liquidez, desplazamiento y contexto.</li>
        <li>Si la zona se rompe sin reacción, puede estar invalidada.</li>
      </ul>
    `
  },
  {
    id: "rr",
    title: "Riesgo-beneficio / R:R",
    keywords: ["riesgo beneficio", "r:r", "rr", "1:1", "1:2", "1:3", "1:4", "risk reward", "ratio", "beneficio", "reward"],
    answer: `
      <p>R:R compara cuánto arriesgas contra cuánto podrías ganar.</p>
      <ul>
        <li>Arriesgar $100 para buscar $300 = 1:3.</li>
        <li>Un buen R:R no arregla una mala entrada.</li>
        <li>Una buena zona con mal R:R puede seguir siendo una mala operación.</li>
      </ul>
    `
  },
  {
    id: "fomo",
    title: "FOMO",
    keywords: ["fomo", "ansiedad", "ansioso", "tarde", "perder oportunidad", "chase", "chasing", "perseguir"],
    answer: `
      <p>FOMO aparece cuando entras por miedo a perder el movimiento, no porque el plan lo indique.</p>
      <ul>
        <li>Entrar tarde suele empeorar el stop y el R:R.</li>
        <li>Si ya se fue, acepta que se fue.</li>
        <li>El mercado siempre dará más oportunidades.</li>
      </ul>
    `
  },
  {
    id: "psicologia",
    title: "Psicología",
    keywords: ["psicologia", "psicología", "emocion", "emoción", "emocional", "disciplina", "mentalidad", "control"],
    answer: `
      <p>La psicología es ejecución bajo presión.</p>
      <ul>
        <li>No subir lotaje para recuperar.</li>
        <li>No mover el stop por ego.</li>
        <li>No convertir una pérdida normal en un día destruido.</li>
        <li>Evaluar proceso, no solo resultado.</li>
      </ul>
    `
  },
  {
    id: "contexto",
    title: "Contexto",
    keywords: ["contexto", "context", "confluencia", "ubicacion", "ubicación", "zona"],
    answer: `
      <p>Contexto es entender dónde ocurre una señal.</p>
      <ul>
        <li>Un FVG en medio del rango puede ser ruido.</li>
        <li>Un FVG después de sweep + desplazamiento puede tener más valor.</li>
        <li>Una resistencia en tendencia fuerte no se vende automáticamente.</li>
      </ul>
    `
  },
  {
    id: "checklist",
    title: "Checklist",
    keywords: ["checklist", "antes de entrar", "revisar", "entrada", "operar", "confirmacion", "confirmación"],
    answer: `
      <p>Antes de entrar, revisa:</p>
      <ol>
        <li>¿Estoy en una zona importante o en medio de la nada?</li>
        <li>¿Hay contexto: tendencia, rango, liquidez o estructura?</li>
        <li>¿Hay reacción o solo estoy adivinando?</li>
        <li>¿Dónde queda invalidada mi idea?</li>
        <li>¿El R:R tiene sentido?</li>
        <li>¿Estoy entrando por plan o por emoción?</li>
      </ol>
    `
  }
];

const intentRules = [
  {
    id: "rr-liquidez",
    title: "¿Un R:R 1:3 después de liquidez es bueno?",
    keywordsAll: [["1:3", "rr", "r:r", "riesgo beneficio"], ["liquidez", "sweep", "barrida"]],
    answer: `
      <p>Hola, ¿qué tal? Un <strong>R:R 1:3 después de una toma de liquidez puede ser muy interesante</strong>, pero no es bueno solo por el número.</p>
      <p>La lectura WLF sería:</p>
      <ol>
        <li><strong>Liquidez:</strong> ¿el precio realmente tomó un high/low importante o solo tocó una zona cualquiera?</li>
        <li><strong>Reacción:</strong> ¿hubo rechazo, desplazamiento o recuperación clara?</li>
        <li><strong>Invalidación:</strong> ¿tu stop está en un lugar lógico o solo pequeño para que el 1:3 se vea bonito?</li>
        <li><strong>Target:</strong> ¿el TP está antes de una zona importante o lo estás poniendo demasiado lejos?</li>
        <li><strong>Contexto:</strong> ¿estás a favor de estructura o peleando contra un movimiento fuerte?</li>
      </ol>
      <p><strong>Conclusión WLF:</strong> 1:3 es atractivo si la entrada nace de contexto + reacción + invalidación clara. Si solo es “liquidez + target lejano”, no es suficiente.</p>
    `
  },
  {
    id: "blow-account",
    title: "Cómo evitar quemar una cuenta",
    keywordsAny: ["quemar cuenta", "quemar una cuenta", "blow an account", "blow account", "explotar cuenta", "perder cuenta", "funded", "drawdown"],
    answer: `
      <p>Hola, ¿qué tal? Para evitar quemar una cuenta, el objetivo no es ganar más rápido; es <strong>dejar de destruirte en los días malos</strong>.</p>
      <ol>
        <li><strong>Límite diario:</strong> define una pérdida máxima diaria y respétala sin negociar.</li>
        <li><strong>Máximo de operaciones:</strong> limita la cantidad de trades para evitar sobreoperar.</li>
        <li><strong>Riesgo fijo:</strong> no subas lotaje para recuperar.</li>
        <li><strong>No revenge trading:</strong> después de una pérdida emocional, pausa.</li>
        <li><strong>Solo setups A/B:</strong> si la entrada es mediocre, no arriesgues la cuenta por ansiedad.</li>
        <li><strong>Registro:</strong> anota si perdiste por setup malo, mala ejecución o emoción.</li>
      </ol>
      <p><strong>Plan simple WLF:</strong> si pierdes 2 trades seguidos o llegas a tu límite diario, paras. La cuenta se protege primero; las oportunidades vuelven mañana.</p>
    `
  },
  {
    id: "frustrated-plan",
    title: "Plan cuando estás frustrado",
    keywordsAny: ["frustrado", "frustrada", "frustrating", "frustrated", "estoy mal", "me siento mal", "no puedo", "perdiendo", "perdidas", "pérdidas"],
    answer: `
      <p>Hola, ¿qué tal? Primero: respira. Si estás frustrado, no necesitas una entrada; necesitas recuperar control.</p>
      <p><strong>Plan WLF de 20 minutos:</strong></p>
      <ol>
        <li><strong>5 min fuera del gráfico:</strong> levántate, agua, respira. No mires velas.</li>
        <li><strong>5 min revisión:</strong> escribe qué pasó: ¿setup malo, mala gestión o emoción?</li>
        <li><strong>5 min reset:</strong> define una sola regla para volver: “solo entro si hay zona + reacción + R:R lógico”.</li>
        <li><strong>5 min decisión:</strong> si sigues con rabia o ansiedad, cierras la sesión.</li>
      </ol>
      <p><strong>Frase WLF:</strong> hoy no tienes que recuperar dinero; tienes que recuperar disciplina.</p>
    `
  },
  {
    id: "overtrading",
    title: "Cómo evitar sobreoperar",
    keywordsAny: ["sobreoperar", "overtrade", "overtrading", "muchas operaciones", "muchos trades", "entro mucho", "operar mucho"],
    answer: `
      <p>Hola, ¿qué tal? Sobreoperar casi siempre viene de ansiedad, aburrimiento o necesidad de recuperar.</p>
      <ol>
        <li>Define máximo de trades por sesión.</li>
        <li>Usa una checklist antes de cada entrada.</li>
        <li>No operes en el centro del rango.</li>
        <li>Después de una pérdida, espera al menos una nueva estructura clara.</li>
        <li>Si estás buscando señales en temporalidades cada vez más pequeñas, probablemente estás forzando.</li>
      </ol>
      <p><strong>Regla WLF:</strong> menos trades, más intención.</p>
    `
  },
  {
    id: "portal-help",
    title: "Cómo usar el portal WLF",
    keywordsAny: ["portal", "web", "pagina", "página", "sala vip", "vip", "donde", "dónde", "biblioteca", "practica", "práctica", "videos", "curso", "audiolibros", "coach", "lecturas"],
    answer: `
      <p>Hola, ¿qué tal? Te explico la estructura del portal WLF:</p>
      <ul>
        <li><strong>Sala VIP:</strong> es la página principal privada. Desde ahí navegas a todo.</li>
        <li><strong>Curso:</strong> videos y guías principales, como instalación de NinjaTrader.</li>
        <li><strong>Práctica:</strong> preguntas interactivas para entrenar criterio.</li>
        <li><strong>WLF Coach:</strong> este asistente para repasar conceptos del curso.</li>
        <li><strong>Biblioteca:</strong> libros y PDFs dentro del lector WLF.</li>
        <li><strong>Audiolibros:</strong> material complementario de mentalidad.</li>
        <li><strong>Comunidad:</strong> enlaces oficiales como Telegram y TikTok.</li>
      </ul>
      <p><strong>Ruta sugerida:</strong> Curso → Práctica → WLF Coach → Biblioteca.</p>
    `
  },
  {
    id: "ninjatrader",
    title: "Cómo instalar NinjaTrader",
    keywordsAny: ["ninjatrader", "ninja trader", "instalar ninja", "install ninja", "descargar ninja", "download ninja"],
    answer: `
      <p>Hola, ¿qué tal? En el curso tienes una guía llamada <strong>4.1 - Cómo instalar NinjaTrader Desktop</strong>.</p>
      <ol>
        <li>Entra a la Sala VIP.</li>
        <li>Abre el módulo del curso.</li>
        <li>Busca <strong>4.1 - Cómo instalar NinjaTrader Desktop</strong>.</li>
        <li>Ahí verás el resumen y el enlace oficial de NinjaTrader.</li>
      </ol>
      <p><strong>Nota:</strong> NinjaTrader Desktop es para Windows. Si usas firewall o antivirus, permite que NinjaTrader tenga acceso a internet.</p>
    `
  },
  {
    id: "login-access",
    title: "Acceso y login",
    keywordsAny: ["login", "entrar", "acceso", "no puedo entrar", "google", "gmail", "activar", "activado"],
    answer: `
      <p>Hola, ¿qué tal? El acceso al portal se activa manualmente con tu Gmail.</p>
      <ul>
        <li>Debes entrar usando el mismo Gmail que fue activado.</li>
        <li>Si el correo no está activo, el sistema puede bloquear el acceso.</li>
        <li>Si acabas de pagar, espera la confirmación de activación.</li>
      </ul>
      <p>Si sigues sin entrar, revisa que estás usando el Gmail correcto y contacta a WLF para validar tu acceso.</p>
    `
  }
];

const comboRules = [
  {
    ids: ["liquidez", "swinghigh"],
    title: "Liquidez sobre un Swing High",
    answer: `
      <p>Cuando hablas de liquidez sobre un <strong>swing high</strong>, estás mirando una zona donde muchos traders pueden tener stops o compras tardías.</p>
      <ul>
        <li>Si el precio rompe ese swing high y acepta por encima, puede haber continuación.</li>
        <li>Si rompe, toma liquidez y vuelve debajo, puede ser sweep o falso breakout.</li>
        <li>La clave no es solo el high: mira la reacción después de tomarlo.</li>
      </ul>
    `
  },
  {
    ids: ["liquidez", "swinglow"],
    title: "Liquidez debajo de un Swing Low",
    answer: `
      <p>La liquidez debajo de un <strong>swing low</strong> suele estar relacionada con stops de compradores o ventas tardías.</p>
      <ul>
        <li>Si el precio rompe y sigue aceptando abajo, puede continuar la presión bajista.</li>
        <li>Si rompe y recupera rápido, puede ser sweep bajista y rechazo.</li>
        <li>Busca desplazamiento o recuperación clara antes de sacar conclusión.</li>
      </ul>
    `
  },
  {
    ids: ["sweep", "fvg"],
    title: "Sweep + FVG",
    answer: `
      <p>La combinación <strong>sweep + FVG</strong> puede ser mucho más interesante que un FVG aislado.</p>
      <ul>
        <li>Primero el precio toma liquidez.</li>
        <li>Luego deja desplazamiento fuerte.</li>
        <li>Ese desplazamiento puede crear un FVG como zona de posible reacción.</li>
      </ul>
      <p><strong>WLF:</strong> el FVG gana valor porque viene después de una toma de liquidez y reacción fuerte.</p>
    `
  },
  {
    ids: ["liquidez", "orderblock"],
    title: "Liquidez + Order Block",
    answer: `
      <p>Un Order Block gana más contexto cuando aparece después de una toma de liquidez.</p>
      <ul>
        <li>La liquidez muestra dónde el mercado pudo limpiar órdenes.</li>
        <li>El desplazamiento muestra intención.</li>
        <li>El Order Block puede marcar una zona de posible reacción si el precio vuelve.</li>
      </ul>
      <p>No basta marcar el OB; espera reacción y riesgo aceptable.</p>
    `
  },
  {
    ids: ["rr", "fomo"],
    title: "FOMO y R:R",
    answer: `
      <p>Cuando entras por FOMO, normalmente el R:R se daña.</p>
      <ul>
        <li>El stop queda más grande porque entras tarde.</li>
        <li>El target queda más cerca porque el movimiento ya avanzó.</li>
        <li>Aunque aciertes la dirección, la operación puede estar mal construida.</li>
      </ul>
      <p><strong>WLF:</strong> si el R:R ya no tiene sentido, no persigas.</p>
    `
  },
  {
    ids: ["psicologia", "rr"],
    title: "Psicología y riesgo-beneficio",
    answer: `
      <p>La psicología afecta directamente tu R:R porque puede hacerte mover stops, cerrar temprano o entrar tarde.</p>
      <ul>
        <li>Ansiedad: entra tarde.</li>
        <li>Miedo: cierra antes del plan.</li>
        <li>Ego: mueve el stop para no aceptar pérdida.</li>
      </ul>
      <p>Buen trading no es solo análisis; es ejecutar el riesgo como fue planeado.</p>
    `
  }
];

const fallbackAnswer = {
  title: "Respuesta WLF",
  answer: `
    <p>Hola, ¿qué tal? No encontré una respuesta exacta, pero podemos razonarlo con el marco WLF:</p>
    <ol>
      <li>Define el contexto: tendencia, rango o zona importante.</li>
      <li>Busca liquidez: swing highs/lows, equal highs/lows o zonas obvias.</li>
      <li>Observa la reacción: aceptación, rechazo, sweep o desplazamiento.</li>
      <li>Define invalidación: dónde tu idea deja de tener sentido.</li>
      <li>Evalúa R:R antes de pensar en entrar.</li>
    </ol>
    <p>También puedes preguntarme cosas como: “cómo evito quemar una cuenta”, “estoy frustrado”, “dónde está la biblioteca”, “cómo instalo NinjaTrader”.</p>
  `
};

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s:.-]/g, " ");
}

function containsAny(normalizedQuestion, keywords) {
  return keywords.some((keyword) => normalizedQuestion.includes(normalizeText(keyword)));
}

function containsAllGroups(normalizedQuestion, groups) {
  return groups.every((group) => containsAny(normalizedQuestion, group));
}

function findIntentAnswer(question) {
  const normalizedQuestion = normalizeText(question);

  for (const rule of intentRules) {
    if (rule.keywordsAll && containsAllGroups(normalizedQuestion, rule.keywordsAll)) {
      return rule;
    }

    if (rule.keywordsAny && containsAny(normalizedQuestion, rule.keywordsAny)) {
      return rule;
    }
  }

  return null;
}

function detectConcepts(question) {
  const normalizedQuestion = normalizeText(question);

  return conceptMap
    .map((concept) => {
      const score = concept.keywords.reduce((total, keyword) => {
        const normalizedKeyword = normalizeText(keyword);
        return total + (normalizedQuestion.includes(normalizedKeyword) ? 1 : 0);
      }, 0);

      return { ...concept, score };
    })
    .filter((concept) => concept.score > 0)
    .sort((a, b) => b.score - a.score);
}

function findComboAnswer(detectedConcepts) {
  const ids = detectedConcepts.map((concept) => concept.id);

  return comboRules.find((rule) => rule.ids.every((id) => ids.includes(id)));
}

function buildSingleConceptAnswer(concept) {
  return {
    title: concept.title,
    answer: `
      <p>Hola, ¿qué tal? Buena pregunta.</p>
      ${concept.answer}
      <p><strong>Recuerda:</strong> el concepto por sí solo no es una señal. Siempre combínalo con contexto, reacción e invalidación.</p>
    `
  };
}

function buildMultiConceptAnswer(detectedConcepts) {
  const mainConcepts = detectedConcepts.slice(0, 3);

  return {
    title: `Relación: ${mainConcepts.map((item) => item.title).join(" + ")}`,
    answer: `
      <p>Hola, ¿qué tal? Aquí estás mezclando varios conceptos, así que la lectura debe hacerse por capas.</p>

      ${mainConcepts.map((concept) => `
        <div class="coach-mini-section">
          <strong>${concept.title}</strong>
          ${concept.answer}
        </div>
      `).join("")}

      <p><strong>Lectura WLF:</strong> cuando combines conceptos, no preguntes “¿compro o vendo?”. Pregunta:</p>
      <ol>
        <li>¿Dónde está la liquidez?</li>
        <li>¿Qué estructura domina?</li>
        <li>¿Qué reacción dejó el precio?</li>
        <li>¿Dónde queda mi invalidación?</li>
        <li>¿El R:R sigue teniendo sentido?</li>
      </ol>
    `
  };
}

function findAnswer(question) {
  const intentAnswer = findIntentAnswer(question);

  if (intentAnswer) {
    return {
      title: intentAnswer.title,
      answer: intentAnswer.answer
    };
  }

  const detectedConcepts = detectConcepts(question);

  if (detectedConcepts.length === 0) {
    return fallbackAnswer;
  }

  const comboAnswer = findComboAnswer(detectedConcepts);

  if (comboAnswer) {
    return {
      title: comboAnswer.title,
      answer: `<p>Hola, ¿qué tal? Buena combinación de conceptos.</p>${comboAnswer.answer}`
    };
  }

  if (detectedConcepts.length === 1) {
    return buildSingleConceptAnswer(detectedConcepts[0]);
  }

  return buildMultiConceptAnswer(detectedConcepts);
}

function addMessage(role, title, html) {
  const message = document.createElement("div");
  message.className = `coach-message ${role}`;

  message.innerHTML = `
    <div class="message-avatar">${role === "user" ? "Tú" : "W"}</div>
    <div class="message-bubble">
      <strong>${title}</strong>
      ${html}
    </div>
  `;

  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function submitQuestion(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;

  addMessage("user", "Pregunta", `<p>${cleanQuestion}</p>`);

  const response = findAnswer(cleanQuestion);

  setTimeout(() => {
    addMessage("bot", response.title, response.answer);
  }, 180);
}

coachForm.addEventListener("submit", (event) => {
  event.preventDefault();

  submitQuestion(coachInput.value);
  coachInput.value = "";
  coachInput.focus();
});

document.querySelectorAll(".coach-chip").forEach((button) => {
  button.addEventListener("click", () => {
    submitQuestion(button.dataset.question || button.textContent);
  });
});

function addInitialGreeting() {
  if (!chatMessages) return;

  chatMessages.innerHTML = "";
  addMessage("bot", "WLF Coach", greetingHtml);
}

requireActiveUser(() => {
  loadingBox?.classList.add("hidden");
  coachApp.classList.remove("hidden");
  addInitialGreeting();
});
