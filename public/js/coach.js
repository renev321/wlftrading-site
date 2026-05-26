import { requireActiveUser } from "./auth.js";

const chatMessages = document.getElementById("chatMessages");
const coachForm = document.getElementById("coachForm");
const coachInput = document.getElementById("coachInput");
const loadingBox = document.getElementById("loadingBox");
const coachApp = document.getElementById("coachApp");

const knowledgeBase = [
  {
    keywords: ["liquidez", "liquidity"],
    title: "Liquidez",
    answer: `
      <p>En WLF, liquidez es donde probablemente hay órdenes esperando: stops, compras tardías, ventas tardías o zonas donde muchos traders toman decisiones.</p>
      <ul>
        <li>Máximos y mínimos anteriores suelen acumular liquidez.</li>
        <li>Equal highs/equal lows pueden atraer al precio.</li>
        <li>No se opera solo porque hay liquidez; se observa cómo el precio reacciona después de tomarla.</li>
      </ul>
      <p><strong>Idea clave:</strong> la liquidez atrae; la reacción confirma.</p>
    `
  },
  {
    keywords: ["sweep", "barrida", "toma de liquidez", "liquidez tomada"],
    title: "Sweep de liquidez",
    answer: `
      <p>Un sweep ocurre cuando el precio rompe un high/low importante, toma liquidez y luego vuelve rápidamente al rango o a la zona previa.</p>
      <ul>
        <li>No toda ruptura es continuación.</li>
        <li>Si rompe y vuelve, puede ser trampa o toma de liquidez.</li>
        <li>Lo importante es mirar cierre, reacción, desplazamiento y contexto.</li>
      </ul>
      <p><strong>WLF:</strong> no vendas o compres solo por el sweep; espera confirmación y riesgo lógico.</p>
    `
  },
  {
    keywords: ["swing", "swings", "high", "low", "máximo", "mínimo"],
    title: "Swings",
    answer: `
      <p>Los swings son puntos donde el precio gira y deja referencias de estructura.</p>
      <ul>
        <li>Higher highs + higher lows = estructura alcista.</li>
        <li>Lower highs + lower lows = estructura bajista.</li>
        <li>Un swing importante puede servir como invalidación o referencia de stop.</li>
      </ul>
      <p><strong>Ojo:</strong> no todos los swings pesan igual. Un micro swing no siempre cambia la estructura mayor.</p>
    `
  },
  {
    keywords: ["tendencia", "trend", "alcista", "bajista"],
    title: "Tendencia",
    answer: `
      <p>Una tendencia no es solo que el precio suba o baje; es una secuencia estructural.</p>
      <ul>
        <li>Tendencia alcista: máximos y mínimos crecientes.</li>
        <li>Tendencia bajista: máximos y mínimos decrecientes.</li>
        <li>Una tendencia sana tiene impulsos y retrocesos, no una línea perfecta.</li>
      </ul>
      <p><strong>WLF:</strong> una buena tendencia no siempre significa buena entrada. La ubicación sigue importando.</p>
    `
  },
  {
    keywords: ["fvg", "imbalance", "desequilibrio", "gap"],
    title: "FVG / Imbalance",
    answer: `
      <p>Un FVG es una huella de desequilibrio creada por un movimiento agresivo. Puede marcar una zona donde el precio podría volver a reaccionar.</p>
      <ul>
        <li>Un FVG aislado no es suficiente.</li>
        <li>Gana valor si aparece con liquidez tomada, estructura y zona importante.</li>
        <li>Si el precio vuelve y no reacciona, la idea pierde fuerza.</li>
      </ul>
      <p><strong>WLF:</strong> no todo FVG merece tu dinero.</p>
    `
  },
  {
    keywords: ["order block", "orderblock", "ob", "bloque"],
    title: "Order Block",
    answer: `
      <p>Un Order Block puede verse como una zona previa al desplazamiento donde el mercado dejó una decisión importante.</p>
      <ul>
        <li>No se opera solo por marcar la zona.</li>
        <li>Gana valor si está conectado con liquidez, desplazamiento y contexto.</li>
        <li>Si el precio rompe la zona sin reacción, puede estar invalidada.</li>
      </ul>
      <p><strong>WLF:</strong> zona primero, reacción después, gestión siempre.</p>
    `
  },
  {
    keywords: ["riesgo beneficio", "rr", "r:r", "risk reward", "beneficio", "ratio"],
    title: "Riesgo-beneficio / R:R",
    answer: `
      <p>R:R compara cuánto arriesgas contra cuánto podrías ganar.</p>
      <ul>
        <li>Si arriesgas $100 para buscar $200, tienes 1:2.</li>
        <li>Si arriesgas $500 para buscar $250, la relación es pobre salvo que tu sistema lo justifique.</li>
        <li>Una buena zona con mal R:R puede seguir siendo una mala operación.</li>
      </ul>
      <p><strong>WLF:</strong> el análisis sin gestión es solo una opinión cara.</p>
    `
  },
  {
    keywords: ["fomo", "ansiedad", "tarde", "perder oportunidad"],
    title: "FOMO",
    answer: `
      <p>FOMO aparece cuando entras por miedo a perder el movimiento, no porque el plan lo indique.</p>
      <ul>
        <li>Entrar tarde suele empeorar el stop y el R:R.</li>
        <li>Si ya se fue, acepta que se fue.</li>
        <li>El mercado siempre dará más oportunidades.</li>
      </ul>
      <p><strong>WLF:</strong> entrar tarde es pagar caro por ansiedad.</p>
    `
  },
  {
    keywords: ["psicologia", "emocion", "emocional", "disciplina", "mentalidad"],
    title: "Psicología del trading",
    answer: `
      <p>La psicología no es motivación barata; es ejecución bajo presión.</p>
      <ul>
        <li>Respetar el stop aunque duela.</li>
        <li>No subir lotaje para recuperar.</li>
        <li>No convertir una pérdida normal en un día destruido.</li>
        <li>Evaluar el proceso, no solo el resultado.</li>
      </ul>
      <p><strong>WLF:</strong> un trade puede ganar y aun así ser mala ejecución.</p>
    `
  },
  {
    keywords: ["checklist", "antes de entrar", "revisar", "entrada", "operar"],
    title: "Checklist antes de entrar",
    answer: `
      <p>Antes de entrar, revisa:</p>
      <ol>
        <li>¿Estoy en una zona importante o en medio de la nada?</li>
        <li>¿Hay contexto: liquidez, estructura, tendencia o rango?</li>
        <li>¿La reacción confirma o solo estoy adivinando?</li>
        <li>¿Dónde queda invalidada mi idea?</li>
        <li>¿El R:R tiene sentido?</li>
        <li>¿Estoy entrando por plan o por emoción?</li>
      </ol>
      <p><strong>WLF:</strong> si no sabes dónde estás equivocado, no tienes operación clara.</p>
    `
  },
  {
    keywords: ["contexto", "context", "confluencia"],
    title: "Contexto",
    answer: `
      <p>Contexto es entender dónde está ocurriendo la señal, no mirar un patrón aislado.</p>
      <ul>
        <li>Un FVG en medio del rango puede ser ruido.</li>
        <li>Un FVG después de sweep + desplazamiento puede tener más valor.</li>
        <li>Una resistencia en tendencia fuerte no se vende automáticamente.</li>
      </ul>
      <p><strong>WLF:</strong> primero entiendes el mapa, después buscas la entrada.</p>
    `
  }
];

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function findAnswer(question) {
  const normalizedQuestion = normalizeText(question);

  let bestMatch = null;
  let bestScore = 0;

  for (const item of knowledgeBase) {
    const score = item.keywords.reduce((total, keyword) => {
      const normalizedKeyword = normalizeText(keyword);
      return total + (normalizedQuestion.includes(normalizedKeyword) ? 1 : 0);
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch) {
    return bestMatch;
  }

  return {
    title: "Respuesta WLF",
    answer: `
      <p>No encontré una respuesta exacta, pero puedo ayudarte a razonarlo con el marco WLF:</p>
      <ol>
        <li>Ubica el contexto: tendencia, rango o zona importante.</li>
        <li>Revisa liquidez: highs/lows previos, equal highs/lows o zonas obvias.</li>
        <li>Busca reacción: rechazo, aceptación, desplazamiento o falta de fuerza.</li>
        <li>Define invalidación: dónde tu idea deja de tener sentido.</li>
        <li>Evalúa riesgo-beneficio antes de pensar en entrar.</li>
      </ol>
      <p>Prueba preguntarme con una palabra clave como: liquidez, FVG, Order Block, swings, tendencia, R:R, FOMO o checklist.</p>
    `
  };
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

requireActiveUser(() => {
  loadingBox?.classList.add("hidden");
  coachApp.classList.remove("hidden");
});
