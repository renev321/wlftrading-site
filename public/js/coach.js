import { requireActiveUser } from "./auth.js";

const chatMessages = document.getElementById("chatMessages");
const coachForm = document.getElementById("coachForm");
const coachInput = document.getElementById("coachInput");
const loadingBox = document.getElementById("loadingBox");
const coachApp = document.getElementById("coachApp");

const links = {
  ninjaInstall: "https://support.ninjatrader.com/s/article/NinjaTrader-Desktop-Installation-Guide?language=en_US",
  nciNews: "https://www.nci-marketstructure.com/economic-news",
  investingCalendar: "https://www.investing.com/economic-calendar/",
  tradingEconomics: "https://tradingeconomics.com/calendar",
  apex: "https://apextraderfunding.com/",
  takeProfit: "https://takeprofittrader.com/",
  lucid: "https://lucidtrading.com/",
  topstep: "https://www.topstep.com/",
  tradeify: "https://tradeify.co/",
  myFundedFutures: "https://myfundedfutures.com/"
};

const greetingHtml = `
  <p>Hey, ¿qué vola? Soy tu WLF Coach 😄</p>
  <p>
    Puedes preguntarme sobre liquidez, swings, FVG, Order Blocks, R:R,
    pullbacks, psicología, cuentas de fondeo, NinjaTrader, noticias, futuros,
    opciones y cómo usar el portal.
  </p>
  <p>
    Ejemplos: “¿un R:R 1:5 es bueno en pullback?”, “quemé mi cuenta, ¿qué hago?”,
    “¿qué pasa si barre un swing high?”, “¿dónde veo noticias?”
  </p>
`;

const responses = [
  {
    id: "greeting",
    title: "WLF Coach",
    priority: 1000,
    mode: "only",
    keywordsAny: [
      "hola", "hello", "hi", "hey", "sup", "que vola", "qué vola", "k vola", "q vola",
      "buenas", "buenos dias", "buenos días", "buenas tardes", "buenas noches",
      "que tal", "qué tal", "saludos"
    ],
    answer: `
      <p>Hey, ¿qué vola? 😄 Soy tu WLF Coach.</p>
      <p>
        Estoy aquí para ayudarte a estudiar y razonar mejor:
        liquidez, estructura, R:R, psicología, cuentas de fondeo, NinjaTrader,
        noticias y uso del portal.
      </p>
      <p><strong>Pregúntame algo como:</strong> “¿un R:R 1:5 es bueno en pullback?” o “acabo de quemar mi cuenta, ¿qué hago?”</p>
    `
  },
  {
    id: "thanks",
    title: "De nada bro",
    priority: 999,
    mode: "only",
    keywordsAny: ["gracias", "thanks", "thank you", "ok gracias", "perfecto gracias", "muchas gracias"],
    answer: `
      <p>De nada bro 😄</p>
      <p>Sigue con calma. La meta no es operar más, es operar mejor.</p>
      <p><strong>WLF reminder:</strong> contexto primero, riesgo después, entrada al final.</p>
    `
  },
  {
    id: "bye",
    title: "Nos vemos",
    priority: 998,
    mode: "only",
    keywordsAny: ["bye", "adios", "adiós", "nos vemos", "hasta luego", "chao", "ciao", "goodbye", "see you"],
    answer: `
      <p>Nos vemos bro 😄</p>
      <p>Buen estudio. Y recuerda: si no hay claridad, no hay prisa.</p>
    `
  },

  {
    id: "rr-pullback-high",
    title: "¿Un R:R 1:5 es bueno en pullback?",
    priority: 950,
    keywordsAll: [
      ["1:5", "1 5", "uno a cinco", "rr alto", "r:r alto", "riesgo beneficio alto"],
      ["pullback", "retroceso", "retest", "vuelve", "correccion", "corrección"]
    ],
    answer: `
      <p>Hola, ¿qué tal? Un <strong>R:R 1:5 en un pullback puede ser excelente</strong>, pero también puede ser una trampa si el target es fantasía.</p>
      <p><strong>Lectura WLF:</strong></p>
      <ol>
        <li><strong>Pullback válido:</strong> el retroceso debe venir hacia una zona lógica, no a cualquier precio.</li>
        <li><strong>Estructura:</strong> si estás a favor de tendencia, el pullback tiene más sentido.</li>
        <li><strong>Reacción:</strong> espera rechazo, desplazamiento o confirmación. No basta con tocar la zona.</li>
        <li><strong>Stop real:</strong> si el stop está demasiado apretado solo para fabricar 1:5, no es buen R:R.</li>
        <li><strong>Target realista:</strong> el TP debe estar antes de una zona donde el precio pueda reaccionar fuerte.</li>
      </ol>
      <p><strong>Conclusión:</strong> 1:5 es bueno si el pullback tiene contexto, reacción e invalidación clara. Si solo se ve bonito en la calculadora, cuidado.</p>
    `
  },
  {
    id: "rr-liquidity",
    title: "¿Un R:R alto después de liquidez es bueno?",
    priority: 940,
    keywordsAll: [
      ["rr", "r:r", "riesgo beneficio", "risk reward", "1:2", "1:3", "1:4", "1:5", "ratio"],
      ["liquidez", "sweep", "barrida", "barre", "toma de liquidez"]
    ],
    answer: `
      <p>Hola, ¿qué tal? Un buen R:R después de tomar liquidez puede ser muy atractivo, pero el número no valida la operación.</p>
      <p><strong>Preguntas WLF:</strong></p>
      <ol>
        <li>¿La liquidez tomada era importante o era un nivel menor?</li>
        <li>¿El precio reaccionó con fuerza después del sweep?</li>
        <li>¿Hay desplazamiento o cambio de carácter?</li>
        <li>¿El stop está detrás de una invalidación lógica?</li>
        <li>¿El target está antes de la próxima zona problemática?</li>
      </ol>
      <p><strong>Conclusión:</strong> R:R alto + liquidez es interesante solo si hay contexto y reacción. R:R alto sin calidad es solo ilusión matemática.</p>
    `
  },
  {
    id: "pullback",
    title: "Pullback / Retroceso",
    priority: 800,
    keywordsAny: ["pullback", "retroceso", "retest", "correccion", "corrección", "vuelve a la zona", "volver a la zona"],
    answer: `
      <p>Hola, ¿qué tal? Un pullback es un retroceso del precio hacia una zona donde podría continuar la estructura previa.</p>
      <p><strong>Checklist WLF para pullbacks:</strong></p>
      <ol>
        <li>¿La tendencia o estructura previa es clara?</li>
        <li>¿El precio vuelve a una zona lógica: FVG, OB, soporte/resistencia o zona de ruptura?</li>
        <li>¿Hay reacción real o solo estás anticipando?</li>
        <li>¿El stop queda detrás de una invalidación clara?</li>
        <li>¿El R:R sigue siendo atractivo sin forzarlo?</li>
      </ol>
      <p><strong>Idea clave:</strong> no todo retroceso es oportunidad. Un buen pullback necesita contexto y reacción.</p>
    `
  },
  {
    id: "burned-account",
    title: "Quemé una cuenta / fallé una cuenta",
    priority: 930,
    keywordsAny: [
      "queme una cuenta", "quemé una cuenta", "queme mi cuenta", "quemé mi cuenta",
      "acabo de quemar", "perdi mi cuenta", "perdí mi cuenta", "failed account",
      "burned account", "blown account", "blow account", "blow an account",
      "explotar cuenta", "explote mi cuenta", "exploté mi cuenta",
      "perdi la fondeada", "perdí la fondeada", "failed challenge", "perdi el challenge"
    ],
    answer: `
      <p>Hola, ¿qué tal? Primero: respira. Quemar una cuenta duele, pero no significa que tú no sirvas para esto.</p>
      <p>Lo importante ahora es no saltar inmediatamente a otra cuenta con la misma mentalidad.</p>
      <p><strong>Plan WLF después de quemar una cuenta:</strong></p>
      <ol>
        <li><strong>No compres otra cuenta hoy.</strong> Espera al menos 24 horas.</li>
        <li><strong>Identifica la causa real:</strong> sobreoperación, lotaje alto, revenge, noticia, no respetar stop o mala lectura.</li>
        <li><strong>Escribe la regla rota.</strong> Sé específico.</li>
        <li><strong>Reduce riesgo.</strong> Vuelve con tamaño mínimo y objetivo de consistencia.</li>
        <li><strong>Define límites duros:</strong> pérdida diaria, máximo de trades y hora de parar.</li>
      </ol>
      <p><strong>Recomendado:</strong> Trading en la Zona, El Trader Disciplinado, Best Loser Wins y Práctica → Psicología / Riesgo.</p>
    `
  },
  {
    id: "frustrated-plan",
    title: "Estoy frustrado: plan WLF",
    priority: 920,
    keywordsAny: [
      "frustrado", "frustrada", "frustrating", "frustrated", "estoy mal",
      "me siento mal", "rabia", "molesto", "molesta", "no puedo", "perdiendo",
      "perdidas", "pérdidas", "vengo perdiendo", "mal dia", "mal día"
    ],
    answer: `
      <p>Hola, ¿qué tal? Si estás frustrado, no necesitas otra entrada; necesitas recuperar control.</p>
      <p><strong>Plan WLF de 20 minutos:</strong></p>
      <ol>
        <li><strong>5 minutos fuera del gráfico:</strong> agua, respirar, caminar. Cero velas.</li>
        <li><strong>5 minutos de revisión:</strong> ¿mala entrada, mal riesgo, noticia, ansiedad o revenge?</li>
        <li><strong>5 minutos de regla:</strong> “solo opero si hay zona + reacción + R:R lógico”.</li>
        <li><strong>5 minutos de decisión:</strong> si sigues con rabia, paras la sesión.</li>
      </ol>
      <p><strong>Frase WLF:</strong> hoy no tienes que recuperar dinero; tienes que recuperar disciplina.</p>
    `
  },
  {
    id: "overtrading",
    title: "Cómo evitar sobreoperar",
    priority: 900,
    keywordsAny: [
      "sobreoperar", "sobre operar", "overtrade", "overtrading", "muchas operaciones",
      "muchos trades", "entro mucho", "operar mucho", "no paro", "no puedo parar"
    ],
    answer: `
      <p>Hola, ¿qué tal? Sobreoperar casi siempre viene de ansiedad, aburrimiento o necesidad de recuperar.</p>
      <ol>
        <li>Define máximo de trades por sesión.</li>
        <li>No operes en el centro del rango.</li>
        <li>Después de una pérdida, espera una nueva estructura clara.</li>
        <li>Si bajas temporalidades para encontrar algo, probablemente estás forzando.</li>
        <li>Usa checklist antes de cada entrada.</li>
      </ol>
      <p><strong>Regla WLF:</strong> menos trades, más intención.</p>
    `
  },
  {
    id: "sweep-swinghigh",
    title: "Sweep sobre Swing High",
    priority: 870,
    keywordsAll: [
      ["sweep", "barrida", "barre", "rompe y vuelve", "toma liquidez", "toma de liquidez"],
      ["swing high", "high anterior", "maximo anterior", "máximo anterior", "maximo swing", "máximo swing"]
    ],
    answer: `
      <p>Hola, ¿qué tal? Si el precio barre un swing high, está entrando en una zona donde probablemente había stops y compras tardías.</p>
      <ul>
        <li>Si rompe y acepta por encima, puede haber continuación.</li>
        <li>Si rompe y vuelve debajo, puede ser sweep o falso breakout.</li>
        <li>La clave es la reacción después de tomar la liquidez.</li>
      </ul>
      <p><strong>WLF:</strong> liquidity above swing high = zona de atención, no entrada automática.</p>
    `
  },
  {
    id: "sweep-fvg",
    title: "Sweep + FVG",
    priority: 860,
    keywordsAll: [
      ["sweep", "barrida", "toma de liquidez", "barre"],
      ["fvg", "imbalance", "desequilibrio", "fair value gap"]
    ],
    answer: `
      <p>Hola, ¿qué tal? Sweep + FVG puede ser una combinación interesante porque une liquidez + desplazamiento.</p>
      <ol>
        <li>Primero el precio toma liquidez.</li>
        <li>Luego desplaza con fuerza.</li>
        <li>Ese desplazamiento puede dejar un FVG.</li>
        <li>Si el precio vuelve al FVG y reacciona, la idea gana valor.</li>
      </ol>
      <p><strong>Ojo:</strong> si el precio vuelve al FVG y no reacciona, la zona pierde fuerza.</p>
    `
  },
  {
    id: "liquidity",
    title: "Liquidez",
    priority: 600,
    keywordsAny: ["liquidez", "liquidity", "equal highs", "equal lows", "stops", "ordenes", "órdenes"],
    answer: `
      <p>Hola, ¿qué tal? La liquidez es donde probablemente hay órdenes esperando: stops, entradas tardías o zonas obvias donde muchos traders toman decisiones.</p>
      <ul>
        <li>Highs y lows previos suelen acumular liquidez.</li>
        <li>Equal highs/equal lows pueden atraer al precio.</li>
        <li>No es entrada automática; primero mira cómo reacciona el precio después de tomarla.</li>
      </ul>
    `
  },
  {
    id: "fvg",
    title: "FVG / Imbalance",
    priority: 590,
    keywordsAny: ["fvg", "imbalance", "desequilibrio", "ineficiencia", "gap", "fair value gap"],
    answer: `
      <p>Hola, ¿qué tal? Un FVG es una huella de desequilibrio creada por un movimiento agresivo.</p>
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
    priority: 580,
    keywordsAny: ["order block", "orderblock", "ob", "bloque", "bloque de orden"],
    answer: `
      <p>Hola, ¿qué tal? Un Order Block puede verse como una zona previa al desplazamiento donde el mercado dejó una decisión importante.</p>
      <ul>
        <li>No se opera solo por marcar la zona.</li>
        <li>Gana valor si se conecta con liquidez, desplazamiento y contexto.</li>
        <li>Si la zona se rompe sin reacción, puede estar invalidada.</li>
      </ul>
    `
  },
  {
    id: "generic-rr",
    title: "Riesgo-beneficio / R:R",
    priority: 570,
    keywordsAny: ["rr", "r:r", "riesgo beneficio", "risk reward", "ratio", "1:1", "1:2", "1:3", "1:4", "1:5"],
    answer: `
      <p>Hola, ¿qué tal? R:R compara cuánto arriesgas contra cuánto podrías ganar.</p>
      <ul>
        <li>1:2 significa arriesgar 1 para buscar 2.</li>
        <li>1:5 puede ser muy bueno, pero solo si el contexto y el target son realistas.</li>
        <li>Un buen R:R no arregla una mala entrada.</li>
      </ul>
      <p><strong>WLF:</strong> el R:R debe salir de una entrada lógica, no de forzar el stop o soñar el target.</p>
    `
  },
  {
    id: "news",
    title: "Noticias económicas",
    priority: 850,
    keywordsAny: [
      "noticias", "news", "calendario", "economic calendar", "nci", "cpi", "fomc",
      "nfp", "fed", "powell", "inflacion", "inflación", "datos economicos", "datos económicos"
    ],
    answer: `
      <p>Hola, ¿qué tal? Antes de operar, revisa si hay noticias importantes. Una buena zona puede fallar si entra volatilidad fuerte de noticia.</p>
      <ul>
        <li><a href="${links.nciNews}" target="_blank" rel="noopener">NCI Economic News</a></li>
        <li><a href="${links.investingCalendar}" target="_blank" rel="noopener">Investing Economic Calendar</a></li>
        <li><a href="${links.tradingEconomics}" target="_blank" rel="noopener">Trading Economics Calendar</a></li>
      </ul>
      <p><strong>WLF:</strong> si hay noticia fuerte cerca, reduce riesgo, espera la primera reacción o evita operar el ruido inicial.</p>
    `
  },
  {
    id: "ninjatrader",
    title: "NinjaTrader",
    priority: 840,
    keywordsAny: [
      "ninjatrader", "ninja trader", "ninja", "instalar ninja", "install ninja",
      "descargar ninja", "download ninja", "plataforma"
    ],
    answer: `
      <p>Hola, ¿qué tal? Para NinjaTrader tienes una guía dentro del curso:</p>
      <ol>
        <li>Entra a <strong>Sala VIP</strong>.</li>
        <li>Abre <strong>Curso</strong>.</li>
        <li>Busca <strong>4.1 - Cómo instalar NinjaTrader Desktop</strong>.</li>
      </ol>
      <p><a href="${links.ninjaInstall}" target="_blank" rel="noopener">Ver guía oficial de instalación de NinjaTrader</a></p>
    `
  },
  {
    id: "funding",
    title: "Cuentas de fondeo",
    priority: 830,
    keywordsAny: [
      "fondeo", "fondeada", "cuentas de fondeo", "cuenta de fondeo", "funded",
      "prop firm", "propfirm", "apex", "topstep", "take profit", "lucid", "tradeify", "myfundedfutures"
    ],
    answer: `
      <p>Hola, ¿qué tal? Las cuentas de fondeo son útiles, pero debes tratarlas como un juego de reglas, no solo como trading.</p>
      <ol>
        <li>Drawdown máximo.</li>
        <li>Límite diario.</li>
        <li>Reglas de consistencia.</li>
        <li>Noticias permitidas o restringidas.</li>
        <li>Tamaño máximo de posición.</li>
        <li>Reglas de payout.</li>
      </ol>
      <ul>
        <li><a href="${links.apex}" target="_blank" rel="noopener">Apex Trader Funding</a></li>
        <li><a href="${links.takeProfit}" target="_blank" rel="noopener">Take Profit Trader</a></li>
        <li><a href="${links.topstep}" target="_blank" rel="noopener">Topstep</a></li>
      </ul>
    `
  },
  {
    id: "futures",
    title: "¿Qué son los futuros?",
    priority: 760,
    keywordsAny: ["que son futuros", "qué son futuros", "futuros", "futures", "contratos futuros", "mercado de futuros"],
    answer: `
      <p>Hola, ¿qué tal? Los futuros son contratos financieros donde se negocia el precio de un activo para una fecha futura.</p>
      <ul>
        <li><strong>NQ / MNQ:</strong> Nasdaq 100.</li>
        <li><strong>ES / MES:</strong> S&P 500.</li>
        <li><strong>YM / MYM:</strong> Dow Jones.</li>
        <li><strong>CL / MCL:</strong> petróleo.</li>
      </ul>
      <p><strong>WLF:</strong> futuros permiten operar con apalancamiento. Eso puede amplificar ganancias, pero también pérdidas.</p>
    `
  },
  {
    id: "options",
    title: "¿Qué son las opciones?",
    priority: 750,
    keywordsAny: ["que son opciones", "qué son opciones", "opciones", "options", "call", "put", "strike", "premium"],
    answer: `
      <p>Hola, ¿qué tal? Las opciones son contratos que dan el derecho, pero no la obligación, de comprar o vender un activo a un precio específico.</p>
      <ul>
        <li><strong>Call:</strong> derecho a comprar.</li>
        <li><strong>Put:</strong> derecho a vender.</li>
        <li><strong>Strike:</strong> precio de ejercicio.</li>
        <li><strong>Premium:</strong> precio de la opción.</li>
      </ul>
      <p><strong>WLF:</strong> opciones no dependen solo de dirección; también importan tiempo, volatilidad y vencimiento.</p>
    `
  },
  {
    id: "portal",
    title: "Cómo usar el portal WLF",
    priority: 740,
    keywordsAny: [
      "portal", "web", "pagina", "página", "sala vip", "vip", "donde", "dónde",
      "biblioteca", "practica", "práctica", "videos", "curso", "audiolibros",
      "coach", "lecturas", "libros"
    ],
    answer: `
      <p>Hola, ¿qué tal? Te explico la estructura del portal WLF:</p>
      <ul>
        <li><strong>Sala VIP:</strong> página principal privada.</li>
        <li><strong>Curso:</strong> videos y guías principales.</li>
        <li><strong>Práctica:</strong> preguntas interactivas.</li>
        <li><strong>WLF Coach:</strong> este asistente.</li>
        <li><strong>Biblioteca:</strong> libros y PDFs.</li>
        <li><strong>Audiolibros:</strong> mentalidad y disciplina.</li>
      </ul>
      <p><strong>Ruta sugerida:</strong> Curso → Práctica → WLF Coach → Biblioteca.</p>
    `
  }
];

const fallbackAnswer = {
  title: "Respuesta WLF",
  answer: `
    <p>Hola, ¿qué tal? No encontré una respuesta exacta, pero podemos razonarlo con el marco WLF:</p>
    <ol>
      <li>Define contexto: tendencia, rango o zona importante.</li>
      <li>Busca liquidez: swing highs/lows o zonas obvias.</li>
      <li>Observa reacción: aceptación, rechazo, sweep o desplazamiento.</li>
      <li>Define invalidación: dónde tu idea deja de tener sentido.</li>
      <li>Evalúa R:R sin forzar el stop ni soñar el target.</li>
    </ol>
    <p>Prueba con: “R:R 1:5 en pullback”, “quemé mi cuenta”, “noticias”, “NinjaTrader”, “FVG con sweep”.</p>
  `
};

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!,;()]/g, " ")
    .replace(/[^\w\s:.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsAny(q, keywords) {
  return keywords.some((keyword) => q.includes(normalizeText(keyword)));
}

function containsAllGroups(q, groups) {
  return groups.every((group) => containsAny(q, group));
}

function isOnlyModeMatch(q, rule) {
  const wordCount = q.split(/\s+/).filter(Boolean).length;
  return wordCount <= 3 && containsAny(q, rule.keywordsAny || []);
}

function scoreRule(q, rule) {
  if (rule.mode === "only") {
    return isOnlyModeMatch(q, rule) ? rule.priority : -1;
  }

  if (rule.keywordsAll && !containsAllGroups(q, rule.keywordsAll)) {
    return -1;
  }

  if (rule.keywordsAny && !containsAny(q, rule.keywordsAny)) {
    return -1;
  }

  let score = rule.priority || 0;

  if (rule.keywordsAll) {
    for (const group of rule.keywordsAll) {
      for (const keyword of group) {
        if (q.includes(normalizeText(keyword))) score += 8;
      }
    }
  }

  if (rule.keywordsAny) {
    for (const keyword of rule.keywordsAny) {
      if (q.includes(normalizeText(keyword))) score += 4;
    }
  }

  return score;
}

function findAnswer(question) {
  const q = normalizeText(question);

  let bestRule = null;
  let bestScore = -1;

  for (const rule of responses) {
    const score = scoreRule(q, rule);
    if (score > bestScore) {
      bestScore = score;
      bestRule = rule;
    }
  }

  if (!bestRule || bestScore < 0) {
    return fallbackAnswer;
  }

  return bestRule;
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
  const cleanQuestion = String(question || "").trim();
  if (!cleanQuestion) return;

  addMessage("user", "Pregunta", `<p>${cleanQuestion}</p>`);

  const response = findAnswer(cleanQuestion);

  setTimeout(() => {
    addMessage("bot", response.title, response.answer);
  }, 160);
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
