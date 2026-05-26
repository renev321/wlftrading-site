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
  <p>Hey, ¿qué tal? Soy tu WLF Coach 😄</p>
  <p>
    Puedo ayudarte con conceptos del curso, psicología, cuentas de fondeo, NinjaTrader,
    noticias, riesgo-beneficio y navegación del portal.
  </p>
  <p>
    Pregúntame cosas como: “quemé mi cuenta, ¿qué hago?”, “¿un R:R 1:3 después de liquidez es bueno?”,
    “¿dónde veo noticias?”, “¿cómo instalo NinjaTrader?”
  </p>
`;

const intentRules = [
  {
    id: "greeting",
    title: "WLF Coach",
    type: "greeting",
    keywordsAny: [
      "hola", "hello", "hi", "hey", "sup", "que vola", "qué vola", "k vola", "q vola",
      "buenas", "buenos dias", "buenos días", "buenas tardes", "buenas noches",
      "que tal", "qué tal", "saludos", "bro"
    ],
    answer: `
      <p>Hey, ¿qué vola? 😄 Soy tu WLF Coach.</p>
      <p>
        Estoy aquí para ayudarte a repasar el curso y pensar mejor antes de operar:
        liquidez, swings, FVG, Order Blocks, R:R, psicología, cuentas de fondeo,
        NinjaTrader, noticias y cómo usar el portal.
      </p>
      <p><strong>Pregúntame algo como:</strong> “¿cómo evito quemar una cuenta?” o “¿qué pasa si el precio barre un swing high?”</p>
    `
  },
  {
    id: "thanks",
    title: "De nada bro",
    type: "closing",
    keywordsAny: [
      "gracias", "thanks", "thank you", "perfecto", "ok gracias", "nice", "bravo",
      "genial", "muy bien", "super", "súper", "perfect"
    ],
    answer: `
      <p>De nada bro 😄</p>
      <p>
        Sigue estudiando con calma. Recuerda: la meta no es operar más, es operar mejor.
      </p>
      <p><strong>WLF reminder:</strong> contexto primero, riesgo después, entrada al final.</p>
    `
  },
  {
    id: "bye",
    title: "Nos vemos",
    type: "closing",
    keywordsAny: [
      "bye", "adios", "adiós", "nos vemos", "hasta luego", "chao", "ciao",
      "goodbye", "see you", "me voy"
    ],
    answer: `
      <p>Nos vemos bro 😄</p>
      <p>
        Buen estudio y recuerda: si no hay claridad, no hay prisa.
      </p>
    `
  },
  {
    id: "burned-account",
    title: "Quemé una cuenta / fallé una cuenta",
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
        <li><strong>No compres otra cuenta hoy.</strong> Espera al menos 24 horas para bajar la emoción.</li>
        <li><strong>Identifica la causa real:</strong> ¿fue sobreoperación, lotaje alto, revenge trading, noticia, no respetar stop o mala lectura?</li>
        <li><strong>Escribe la regla rota.</strong> No digas “el mercado me hizo”. Di exactamente qué regla rompiste.</li>
        <li><strong>Reduce el riesgo.</strong> Si vuelves, empieza con tamaño mínimo y objetivo de consistencia, no de recuperar.</li>
        <li><strong>Define límites duros:</strong> máximo de pérdida diaria, máximo de trades y hora de parar.</li>
      </ol>

      <p><strong>WLF reminder:</strong> una cuenta se puede perder por una operación, pero normalmente se quema por una cadena de decisiones emocionales.</p>

      <p><strong>Recomendado para estudiar:</strong></p>
      <ul>
        <li>Libro: <strong>Trading en la Zona</strong></li>
        <li>Libro: <strong>El Trader Disciplinado</strong></li>
        <li>Libro: <strong>Best Loser Wins</strong></li>
        <li>Sección: <strong>Práctica → Psicología / Riesgo</strong></li>
      </ul>
    `
  },
  {
    id: "avoid-blow-account",
    title: "Cómo evitar quemar una cuenta",
    keywordsAny: [
      "evitar quemar", "como no quemar", "cómo no quemar", "avoid blowing", "avoid blow",
      "proteger cuenta", "cuidar cuenta", "no perder cuenta", "no quemar cuenta",
      "cuenta fondeo", "cuenta de fondeo", "cuentas de fondeo", "funded account",
      "fondeada", "fondeo", "drawdown"
    ],
    answer: `
      <p>Hola, ¿qué tal? Para no quemar una cuenta, necesitas reglas que te detengan antes de que la emoción tome el control.</p>

      <ol>
        <li><strong>Límite diario:</strong> si llegas a tu pérdida máxima, paras sin negociar.</li>
        <li><strong>Máximo de trades:</strong> define cuántas operaciones puedes hacer por sesión.</li>
        <li><strong>Riesgo fijo:</strong> no subas lotaje para recuperar.</li>
        <li><strong>Evita noticias:</strong> si hay noticia fuerte cerca, reduce riesgo o espera.</li>
        <li><strong>No operes frustrado:</strong> frustración + mercado = decisiones caras.</li>
        <li><strong>Solo setups claros:</strong> zona + contexto + reacción + invalidación + R:R.</li>
      </ol>

      <p><strong>Regla simple WLF:</strong> si pierdes 2 trades seguidos o rompes una regla emocional, se termina la sesión.</p>

      <p><strong>Recursos recomendados:</strong></p>
      <ul>
        <li>Biblioteca: <strong>Cómo no quemar una cuenta</strong></li>
        <li>Biblioteca: <strong>Trading en la Zona</strong></li>
        <li>Práctica: <strong>Riesgo</strong> y <strong>Psicología</strong></li>
      </ul>
    `
  },
  {
    id: "rr-liquidity",
    title: "¿Un R:R 1:3 después de liquidez es bueno?",
    keywordsAll: [["1:3", "rr", "r:r", "riesgo beneficio", "risk reward"], ["liquidez", "sweep", "barrida"]],
    answer: `
      <p>Hola, ¿qué tal? Un R:R 1:3 después de una toma de liquidez puede ser muy atractivo, pero no es bueno solo por ser 1:3.</p>

      <p><strong>Preguntas WLF:</strong></p>
      <ol>
        <li>¿La liquidez tomada era importante o era un nivel menor?</li>
        <li>¿Hubo reacción clara después de tomarla?</li>
        <li>¿Hay desplazamiento o confirmación?</li>
        <li>¿El stop está en un lugar lógico o lo pusiste pequeño para forzar el 1:3?</li>
        <li>¿El target está antes de la próxima zona problemática?</li>
      </ol>

      <p><strong>Conclusión:</strong> 1:3 es bueno si nace de contexto real. Si solo estás haciendo que el número se vea bonito, no es edge.</p>
    `
  },
  {
    id: "frustrated-plan",
    title: "Estoy frustrado: plan WLF",
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
        <li><strong>5 minutos de revisión:</strong> escribe qué pasó: ¿mala entrada, mal riesgo, noticia, ansiedad o revenge?</li>
        <li><strong>5 minutos de regla:</strong> decide una sola regla para volver. Ejemplo: “solo opero si hay zona + reacción + R:R lógico”.</li>
        <li><strong>5 minutos de decisión:</strong> si sigues con rabia, paras la sesión.</li>
      </ol>

      <p><strong>Frase WLF:</strong> hoy no tienes que recuperar dinero; tienes que recuperar disciplina.</p>

      <p><strong>Recomendado:</strong></p>
      <ul>
        <li>Libro: <strong>Trading en la Zona</strong></li>
        <li>Libro: <strong>El Trader Disciplinado</strong></li>
        <li>Audiolibro: <strong>Mentalidad y disciplina</strong></li>
        <li>Práctica: <strong>Psicología</strong></li>
      </ul>
    `
  },
  {
    id: "overtrading",
    title: "Cómo evitar sobreoperar",
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
        <li>Si estás bajando temporalidades para encontrar algo, probablemente estás forzando.</li>
        <li>Usa una checklist antes de cada entrada.</li>
      </ol>

      <p><strong>Regla WLF:</strong> menos trades, más intención.</p>
    `
  },
  {
    id: "news",
    title: "Noticias económicas",
    keywordsAny: [
      "noticias", "news", "calendario", "economic calendar", "nci", "cpi", "fomc",
      "nfp", "fed", "powell", "inflacion", "inflación", "datos economicos", "datos económicos"
    ],
    answer: `
      <p>Hola, ¿qué tal? Antes de operar, revisa si hay noticias importantes. Una buena zona puede fallar si entra volatilidad fuerte de noticia.</p>

      <p><strong>Recursos:</strong></p>
      <ul>
        <li><a href="${links.nciNews}" target="_blank" rel="noopener">NCI Economic News</a></li>
        <li><a href="${links.investingCalendar}" target="_blank" rel="noopener">Investing Economic Calendar</a></li>
        <li><a href="${links.tradingEconomics}" target="_blank" rel="noopener">Trading Economics Calendar</a></li>
      </ul>

      <p><strong>WLF reminder:</strong> si hay noticia fuerte cerca, reduce riesgo, espera la primera reacción o evita operar el ruido inicial.</p>
    `
  },
  {
    id: "ninjatrader",
    title: "NinjaTrader",
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

      <p>También puedes revisar la guía oficial aquí:</p>
      <p><a href="${links.ninjaInstall}" target="_blank" rel="noopener">Ver guía oficial de instalación de NinjaTrader</a></p>

      <p><strong>Nota:</strong> NinjaTrader Desktop es para Windows. Si tienes firewall o antivirus, permite que NinjaTrader tenga acceso a internet.</p>
    `
  },
  {
    id: "funding-firms",
    title: "Cuentas de fondeo",
    keywordsAny: [
      "fondeo", "fondeada", "cuentas de fondeo", "cuenta de fondeo", "funded",
      "prop firm", "propfirm", "apex", "topstep", "take profit", "lucid", "tradeify", "myfundedfutures"
    ],
    answer: `
      <p>Hola, ¿qué tal? Las cuentas de fondeo pueden ser útiles, pero tienes que tratarlas como un juego de reglas, no solo como trading.</p>

      <p><strong>Antes de operar una fondeada revisa:</strong></p>
      <ol>
        <li>Drawdown máximo.</li>
        <li>Límite diario.</li>
        <li>Reglas de consistencia.</li>
        <li>Noticias permitidas o restringidas.</li>
        <li>Tamaño máximo de posición.</li>
        <li>Reglas de payout.</li>
      </ol>

      <p><strong>Recursos:</strong></p>
      <ul>
        <li><a href="${links.apex}" target="_blank" rel="noopener">Apex Trader Funding</a></li>
        <li><a href="${links.takeProfit}" target="_blank" rel="noopener">Take Profit Trader</a></li>
        <li><a href="${links.lucid}" target="_blank" rel="noopener">Lucid Trading</a></li>
        <li><a href="${links.topstep}" target="_blank" rel="noopener">Topstep</a></li>
        <li><a href="${links.tradeify}" target="_blank" rel="noopener">Tradeify</a></li>
        <li><a href="${links.myFundedFutures}" target="_blank" rel="noopener">MyFundedFutures</a></li>
      </ul>

      <p><strong>WLF reminder:</strong> en una fondeada, proteger reglas es tan importante como leer el mercado.</p>
    `
  },
  {
    id: "portal-help",
    title: "Cómo usar el portal WLF",
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
        <li><strong>Práctica:</strong> preguntas interactivas para entrenar criterio.</li>
        <li><strong>WLF Coach:</strong> este asistente para repasar conceptos.</li>
        <li><strong>Biblioteca:</strong> libros y PDFs dentro del lector WLF.</li>
        <li><strong>Audiolibros:</strong> material complementario de mentalidad.</li>
        <li><strong>Comunidad:</strong> enlaces oficiales como Telegram y TikTok.</li>
      </ul>

      <p><strong>Ruta sugerida:</strong> Curso → Práctica → WLF Coach → Biblioteca.</p>
    `
  },
  {
    id: "login-access",
    title: "Acceso y login",
    keywordsAny: [
      "login", "entrar", "acceso", "no puedo entrar", "google", "gmail",
      "activar", "activado", "no me deja", "no abre", "no funciona"
    ],
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

const comboRules = [
  {
    ids: ["liquidez", "swinghigh"],
    title: "Liquidez sobre un Swing High",
    answer: `
      <p>Hola, ¿qué tal? Cuando hablas de liquidez sobre un <strong>swing high</strong>, estás mirando una zona donde muchos traders pueden tener stops o compras tardías.</p>
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
      <p>Hola, ¿qué tal? La liquidez debajo de un <strong>swing low</strong> suele estar relacionada con stops de compradores o ventas tardías.</p>
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
      <p>Hola, ¿qué tal? La combinación <strong>sweep + FVG</strong> puede ser mucho más interesante que un FVG aislado.</p>
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
      <p>Hola, ¿qué tal? Un Order Block gana más contexto cuando aparece después de una toma de liquidez.</p>
      <ul>
        <li>La liquidez muestra dónde el mercado pudo limpiar órdenes.</li>
        <li>El desplazamiento muestra intención.</li>
        <li>El Order Block puede marcar una zona de posible reacción si el precio vuelve.</li>
      </ul>
      <p>No basta marcar el OB; espera reacción y riesgo aceptable.</p>
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
    <p>También puedes preguntarme: “quemé mi cuenta”, “estoy frustrado”, “noticias”, “NinjaTrader”, “cuentas de fondeo” o “dónde está la biblioteca”.</p>
  `
};

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s:.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsAny(normalizedQuestion, keywords) {
  return keywords.some((keyword) => normalizedQuestion.includes(normalizeText(keyword)));
}

function containsAllGroups(normalizedQuestion, groups) {
  return groups.every((group) => containsAny(normalizedQuestion, group));
}

function isOnlyGreeting(question) {
  const q = normalizeText(question);
  const greetingWords = [
    "hola", "hello", "hi", "hey", "sup", "que vola", "k vola", "q vola",
    "buenas", "buenos dias", "buenas tardes", "buenas noches", "que tal", "saludos"
  ];

  return greetingWords.some((word) => q === normalizeText(word) || q === `${normalizeText(word)} bro`);
}

function isOnlyClosing(question) {
  const q = normalizeText(question);
  const closings = [
    "bye", "adios", "nos vemos", "hasta luego", "chao", "ciao",
    "gracias", "thanks", "thank you", "ok gracias", "perfecto gracias"
  ];

  return closings.some((word) => q === normalizeText(word));
}

function findIntentAnswer(question) {
  const normalizedQuestion = normalizeText(question);

  if (isOnlyGreeting(question)) {
    return intentRules.find((rule) => rule.id === "greeting");
  }

  if (isOnlyClosing(question)) {
    if (containsAny(normalizedQuestion, ["gracias", "thanks", "thank you"])) {
      return intentRules.find((rule) => rule.id === "thanks");
    }

    return intentRules.find((rule) => rule.id === "bye");
  }

  for (const rule of intentRules) {
    if (rule.type === "greeting" || rule.type === "closing") continue;

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
        return total + (normalizedQuestion.includes(normalizeText(keyword)) ? 1 : 0);
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
      answer: comboAnswer.answer
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
