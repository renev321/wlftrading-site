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
  },

  // ESTRUCTURA - EXTRA
  {
    category: "estructura",
    title: "Soporte que aguanta pero no impulsa",
    context: "El precio toca soporte tres veces. No rompe, pero cada rebote es más débil y con menos distancia.",
    options: [
      "Comprar porque el soporte se respetó tres veces y eso siempre es fuerza.",
      "Observar posible absorción/debilidad: que no rompa no significa que tenga fuerza para subir.",
      "Vender automáticamente porque el soporte tocado varias veces siempre cae.",
      "Mover el soporte a cada nuevo toque para que la idea siga viva."
    ],
    correct: 1,
    explanation: "Un soporte puede aguantar y aun así perder calidad. Si los rebotes son cada vez más débiles, puede haber absorción o falta de interés comprador."
  },
  {
    category: "estructura",
    title: "Ruptura limpia pero sin continuación",
    context: "El precio rompe una resistencia con buen cierre, pero las siguientes velas quedan laterales justo encima sin avanzar.",
    options: [
      "Asumir que la ruptura sigue siendo perfecta porque el primer cierre fue limpio.",
      "Esperar aceptación real o continuación; una ruptura sin avance puede convertirse en trampa.",
      "Entrar short sin mirar nada porque toda pausa después de ruptura es reversa.",
      "Comprar más fuerte porque mientras no vuelva debajo, no existe riesgo."
    ],
    correct: 1,
    explanation: "La ruptura limpia es una pista, pero la aceptación posterior confirma calidad. Si no hay continuación, conviene esperar más información."
  },
  {
    category: "estructura",
    title: "Zona vieja vs estructura actual",
    context: "Tienes marcada una resistencia antigua. El precio llega allí, pero la estructura actual viene con mínimos crecientes y presión constante.",
    options: [
      "Vender la resistencia antigua sin mirar la estructura actual.",
      "Pesar la zona antigua contra la estructura actual antes de tomar una decisión.",
      "Ignorar la resistencia porque toda tendencia rompe todo.",
      "Comprar justo en la resistencia porque la presión siempre gana."
    ],
    correct: 1,
    explanation: "Una zona histórica importa, pero no se analiza sola. La estructura actual puede aumentar o reducir la calidad de esa zona."
  },
  {
    category: "estructura",
    title: "Falsa comodidad en una línea perfecta",
    context: "Trazas una línea de tendencia muy limpia. El precio la toca otra vez, pero llega con una vela enorme y volumen/agresividad evidente.",
    options: [
      "Comprar solo porque la línea se ve perfecta.",
      "Esperar reacción: una línea bonita no cancela una llegada agresiva.",
      "Vender porque toda línea de tendencia se rompe al final.",
      "Eliminar la línea porque una vela grande invalida cualquier análisis."
    ],
    correct: 1,
    explanation: "La estética de una línea no es edge. Si la llegada es agresiva, la reacción manda más que el dibujo."
  },
  {
    category: "estructura",
    title: "Rango que empieza a inclinarse",
    context: "El mercado estaba lateral, pero los últimos mínimos dentro del rango empiezan a ser cada vez más altos.",
    options: [
      "Seguir tratando el rango exactamente igual sin notar el cambio interno.",
      "Reconocer presión interna alcista y esperar ruptura/aceptación o reacción en extremos.",
      "Comprar en cualquier punto del rango porque los mínimos suben.",
      "Vender cada mínimo más alto porque el rango todavía existe."
    ],
    correct: 1,
    explanation: "Dentro de un rango pueden aparecer pistas de presión. Mínimos crecientes no son entrada automática, pero sí cambian la lectura."
  },

  // LIQUIDEZ - EXTRA
  {
    category: "liquidez",
    title: "Barrida sin desplazamiento posterior",
    context: "El precio toma un máximo anterior y vuelve ligeramente debajo, pero no aparece desplazamiento fuerte ni rechazo claro.",
    options: [
      "Vender automáticamente porque ya tomó liquidez.",
      "Ser prudente: sin desplazamiento o reacción clara, la barrida todavía no confirma intención.",
      "Comprar porque si no cayó rápido, entonces debe subir mucho.",
      "Ignorar completamente la zona porque la liquidez ya fue tomada."
    ],
    correct: 1,
    explanation: "La toma de liquidez es solo una parte. Sin reacción clara, puede ser ruido o pausa antes de continuación."
  },
  {
    category: "liquidez",
    title: "Equal lows demasiado obvios",
    context: "Ves varios mínimos iguales. Todo el mundo en el chat habla de comprar allí porque el soporte se ve perfecto.",
    options: [
      "Comprar justo encima porque si todos lo ven, es más seguro.",
      "Considerar que debajo puede haber liquidez y esperar cómo reacciona si la toman.",
      "Vender antes de que llegue porque los equal lows siempre se rompen.",
      "Ignorar esos mínimos porque lo obvio nunca importa."
    ],
    correct: 1,
    explanation: "Los niveles muy obvios pueden acumular stops. La oportunidad puede aparecer después de la toma y reacción, no necesariamente antes."
  },
  {
    category: "liquidez",
    title: "Liquidez tomada contra tendencia fuerte",
    context: "En tendencia bajista fuerte, el precio barre un low y rebota un poco, pero la estructura mayor sigue bajista.",
    options: [
      "Comprar grande porque toda barrida de low es reversa.",
      "Exigir más confirmación si la idea va contra una tendencia fuerte.",
      "Vender sin plan porque la tendencia manda siempre.",
      "Ignorar la barrida porque en tendencia no existe liquidez."
    ],
    correct: 1,
    explanation: "Una barrida puede generar reacción, pero si va contra tendencia fuerte necesitas más pruebas y mejor ubicación."
  },
  {
    category: "liquidez",
    title: "Toma de liquidez antes de noticia",
    context: "El precio barre un high justo minutos antes de una noticia fuerte. La reacción inicial parece bajista.",
    options: [
      "Operar de inmediato porque sweep antes de noticia es señal perfecta.",
      "Ser cuidadoso: la noticia puede distorsionar la reacción y aumentar el riesgo.",
      "Ignorar la noticia si el patrón se ve claro.",
      "Aumentar contratos porque habrá más volatilidad."
    ],
    correct: 1,
    explanation: "La liquidez cerca de noticias puede ser peligrosa. El contexto de calendario cambia la calidad del setup."
  },
  {
    category: "liquidez",
    title: "Liquidez interna vs externa",
    context: "El precio está en rango. Acaba de tomar un pequeño high interno, pero todavía no llegó al high principal del rango.",
    options: [
      "Tratar la toma interna como si fuera el objetivo mayor del movimiento.",
      "Distinguir entre liquidez interna y externa antes de asumir reversa fuerte.",
      "Vender siempre en cualquier high interno.",
      "Comprar porque toda liquidez interna lleva al high externo sin excepción."
    ],
    correct: 1,
    explanation: "No toda liquidez tiene el mismo peso. La liquidez interna puede ser solo un paso antes de buscar niveles externos."
  },

  // SWINGS - EXTRA
  {
    category: "swings",
    title: "Rompimiento de swing con vela cerrando apenas encima",
    context: "El precio rompe un swing high por pocos ticks y cierra apenas encima, sin desplazamiento claro.",
    options: [
      "Asumir cambio total de estructura porque rompió por poco.",
      "Esperar aceptación o continuación antes de dar mucho peso a la ruptura.",
      "Vender automáticamente porque toda ruptura pequeña falla.",
      "Ignorar el swing porque fue roto aunque sea por poco."
    ],
    correct: 1,
    explanation: "Romper por poco no siempre significa aceptación. La calidad del cierre y la continuación importan."
  },
  {
    category: "swings",
    title: "Swing low protegido varias veces",
    context: "En tendencia alcista, el mismo swing low ha sido defendido varias veces, pero cada defensa sale con menos fuerza.",
    options: [
      "Comprar cada defensa porque el swing sigue vivo.",
      "Vigilar debilitamiento: protección repetida con rebotes débiles puede anticipar ruptura.",
      "Vender sin esperar ruptura porque seguro caerá.",
      "Mover el swing low más abajo para que siga protegido."
    ],
    correct: 1,
    explanation: "Un swing defendido puede seguir siendo válido, pero si la reacción pierde fuerza, hay que leer la calidad."
  },
  {
    category: "swings",
    title: "Swing menor que confunde el sesgo",
    context: "En gráfico de 5 minutos ves un swing bajista, pero en 1 hora la estructura sigue claramente alcista.",
    options: [
      "Cambiar todo el sesgo por el swing de 5 minutos.",
      "Separar estructura menor de estructura mayor antes de decidir.",
      "Ignorar el 5 minutos siempre porque solo importa 1 hora.",
      "Operar ambos sentidos sin plan para cubrir posibilidades."
    ],
    correct: 1,
    explanation: "Los swings se leen por jerarquía. Un swing menor puede ser solo pullback dentro de estructura mayor."
  },
  {
    category: "swings",
    title: "Swing high como target, no como entrada",
    context: "Ves un swing high limpio por encima. Tu entrada long está cerca, pero el swing high está a pocos ticks y podría reaccionar.",
    options: [
      "Ignorar el swing porque solo importa la entrada.",
      "Considerar ese swing como posible target/obstáculo y evaluar si el R:R compensa.",
      "Comprar más porque el swing atraerá precio y nunca rechazará.",
      "Vender directamente porque todo swing high es techo."
    ],
    correct: 1,
    explanation: "Un swing puede ser objetivo de liquidez y también obstáculo. Debe entrar en la evaluación del target."
  },
  {
    category: "swings",
    title: "Estructura rota pero no aceptada",
    context: "El precio rompe un swing low importante, pero rápidamente recupera el nivel y cierra por encima.",
    options: [
      "Confirmar tendencia bajista solo porque rompió.",
      "Considerar posible falsa ruptura/barrida y esperar nueva estructura.",
      "Comprar sin stop porque recuperó el nivel.",
      "Eliminar todos los swings anteriores."
    ],
    correct: 1,
    explanation: "La recuperación rápida de un swing roto puede cambiar la lectura hacia barrida o falta de aceptación."
  },

  // TENDENCIAS - EXTRA
  {
    category: "tendencias",
    title: "Pullback perfecto pero tendencia agotada",
    context: "El precio vuelve a una zona de pullback ideal, pero la tendencia previa venía con velas cada vez más pequeñas y divergencia de impulso.",
    options: [
      "Comprar igual porque la zona de pullback es perfecta.",
      "Ser más selectivo: una zona buena pierde calidad si la tendencia llega agotada.",
      "Vender automáticamente porque toda divergencia cambia tendencia.",
      "Ignorar el agotamiento porque solo importa la zona."
    ],
    correct: 1,
    explanation: "Un pullback técnico necesita contexto de fuerza. Si la tendencia está agotada, la entrada requiere más confirmación."
  },
  {
    category: "tendencias",
    title: "Tendencia fuerte cerca de resistencia mayor",
    context: "El mercado sube fuerte y ordenado, pero llega a una resistencia diaria importante.",
    options: [
      "Comprar sin esperar porque la tendencia siempre rompe resistencias.",
      "Reconocer tendencia, pero esperar reacción/aceptación en la resistencia mayor.",
      "Vender automáticamente porque resistencia diaria siempre manda.",
      "Ignorar la resistencia porque está en temporalidad mayor."
    ],
    correct: 1,
    explanation: "Tendencia fuerte y zona mayor pueden chocar. La decisión depende de aceptación o rechazo."
  },
  {
    category: "tendencias",
    title: "Tendencia con pullbacks demasiado violentos",
    context: "El precio sigue haciendo máximos más altos, pero cada pullback baja con velas muy agresivas.",
    options: [
      "Seguir considerando la tendencia igual de sana.",
      "Notar que la tendencia puede estar perdiendo calidad aunque aún no esté rota.",
      "Vender cada pullback porque una vela roja fuerte siempre cambia tendencia.",
      "Comprar más contratos porque los máximos siguen subiendo."
    ],
    correct: 1,
    explanation: "La secuencia puede seguir alcista, pero la calidad de los pullbacks revela presión contraria."
  },
  {
    category: "tendencias",
    title: "Entrada a favor de tendencia pero tarde",
    context: "La tendencia es alcista clara. Después de tres velas fuertes seguidas, piensas entrar long lejos de cualquier zona.",
    options: [
      "Entrar porque operar a favor de tendencia siempre es correcto.",
      "Esperar mejor ubicación; estar a favor de tendencia no justifica perseguir precio.",
      "Vender porque tres velas fuertes siempre retroceden.",
      "Usar stop enorme para compensar la mala entrada."
    ],
    correct: 1,
    explanation: "A favor de tendencia no significa a cualquier precio. La ubicación sigue siendo parte del edge."
  },
  {
    category: "tendencias",
    title: "Rango después de tendencia",
    context: "Tras una tendencia fuerte, el precio deja de hacer nuevos máximos y empieza a oscilar entre dos zonas.",
    options: [
      "Seguir operando como tendencia hasta que el rango sea imposible de ignorar.",
      "Adaptar la lectura: puede estar entrando en balance, no todo pullback será continuación.",
      "Vender todo porque la tendencia terminó.",
      "Comprar todo toque inferior con tamaño máximo."
    ],
    correct: 1,
    explanation: "Cuando la tendencia pasa a balance, la estrategia debe adaptarse. El contexto cambió."
  },

  // FVG - EXTRA
  {
    category: "fvg",
    title: "FVG muy limpio pero contra estructura",
    context: "Aparece un FVG alcista perfecto, pero la estructura mayor sigue bajista y el precio está cerca de resistencia.",
    options: [
      "Comprar porque el FVG se ve perfecto.",
      "Ser selectivo: un FVG limpio contra estructura necesita más confirmación.",
      "Vender automáticamente porque todo FVG contra tendencia falla.",
      "Ignorar la estructura porque el FVG manda."
    ],
    correct: 1,
    explanation: "La limpieza visual del FVG no supera por sí sola el contexto estructural."
  },
  {
    category: "fvg",
    title: "FVG que no ofrece R:R",
    context: "El precio vuelve a un FVG interesante, pero el stop lógico queda lejos y el primer obstáculo está cerca.",
    options: [
      "Tomarlo porque el FVG es bueno.",
      "Descartar o esperar mejor precio porque la relación riesgo-beneficio no compensa.",
      "Reducir el stop al azar para hacer que el R:R se vea mejor.",
      "Aumentar contratos porque el target está cerca."
    ],
    correct: 1,
    explanation: "Un FVG con mala relación riesgo-beneficio no es una buena operación solo por existir."
  },
  {
    category: "fvg",
    title: "FVG mitigado varias veces",
    context: "El precio ya entró varias veces en el mismo FVG y cada reacción fue más débil.",
    options: [
      "Confiar más porque la zona reaccionó muchas veces.",
      "Considerar que la zona puede estar perdiendo fuerza tras varias mitigaciones.",
      "Comprar siempre la tercera visita porque es más precisa.",
      "Ignorar las reacciones previas."
    ],
    correct: 1,
    explanation: "Una zona puede debilitarse tras múltiples visitas. La calidad de reacción importa."
  },
  {
    category: "fvg",
    title: "FVG y noticia cercana",
    context: "El precio está regresando a un FVG perfecto, pero faltan 3 minutos para una noticia de alto impacto.",
    options: [
      "Entrar porque la noticia dará el impulso necesario.",
      "Evitar o reducir exposición: la noticia puede invalidar la lectura técnica.",
      "Aumentar tamaño porque habrá volatilidad.",
      "Mover el stop más lejos sin cambiar tamaño."
    ],
    correct: 1,
    explanation: "La noticia puede convertir un setup técnico en una apuesta de volatilidad."
  },
  {
    category: "fvg",
    title: "FVG como confirmación, no como excusa",
    context: "Ya quieres comprar por sesgo personal. Encuentras un FVG pequeño y lo usas para justificar la entrada.",
    options: [
      "Entrar porque al final encontraste una razón técnica.",
      "Preguntarte si el FVG realmente tiene contexto o solo confirma tu sesgo.",
      "Ignorar todo FVG pequeño siempre.",
      "Subir lotaje porque hay confluencia."
    ],
    correct: 1,
    explanation: "Un concepto técnico no debe usarse para justificar una operación emocional. Primero contexto, luego setup."
  },

  // ORDER BLOCK - EXTRA
  {
    category: "orderblock",
    title: "OB bonito pero sin reacción",
    context: "El precio vuelve a un Order Block marcado. Toca la zona, pero no hay rechazo ni desplazamiento.",
    options: [
      "Entrar porque tocar la zona es suficiente.",
      "Esperar reacción: la zona por sí sola no confirma intención.",
      "Eliminar todos los OB del gráfico.",
      "Duplicar si entra más profundo en la zona."
    ],
    correct: 1,
    explanation: "El OB es una zona de interés. La reacción confirma si hay participación real."
  },
  {
    category: "orderblock",
    title: "OB después de manipulación dudosa",
    context: "Marcas un OB porque hubo una vela grande, pero no hubo liquidez previa ni cambio claro de estructura.",
    options: [
      "Tratarlo como institucional solo porque la vela fue grande.",
      "Dar menos peso al OB si no está conectado con liquidez o desplazamiento claro.",
      "Operarlo sin stop porque los OB grandes son fuertes.",
      "Cambiar el nombre del OB para que encaje mejor."
    ],
    correct: 1,
    explanation: "Un OB gana valor por contexto, no solo por el tamaño de una vela."
  },
  {
    category: "orderblock",
    title: "OB dentro de rango estrecho",
    context: "Dentro de un rango pequeño marcas varios OB alcistas y bajistas muy cerca unos de otros.",
    options: [
      "Operar cada OB porque hay muchas zonas.",
      "Reconocer ruido: demasiados OB dentro de rango estrecho pueden no tener edge.",
      "Elegir el OB más reciente siempre.",
      "Aumentar lotaje porque hay muchas oportunidades."
    ],
    correct: 1,
    explanation: "Cuando todo está muy comprimido, muchas zonas se solapan y pierden claridad."
  },
  {
    category: "orderblock",
    title: "OB como zona de invalidación",
    context: "Tienes una idea long desde un OB. El precio entra, reacciona poco y luego cierra fuerte debajo de la zona.",
    options: [
      "Aceptar que la idea puede estar invalidada.",
      "Mantener porque el OB original era claro.",
      "Promediar porque ahora está más barato.",
      "Mover el OB hacia abajo."
    ],
    correct: 0,
    explanation: "Si el precio rompe y acepta debajo del OB, la idea debe revisarse. No se mueve la zona para evitar aceptar pérdida."
  },
  {
    category: "orderblock",
    title: "OB y target bloqueado",
    context: "La entrada desde un OB se ve bien, pero justo antes del target hay un FVG contrario y un swing high fuerte.",
    options: [
      "Ignorar obstáculos porque el OB es fuerte.",
      "Evaluar si el target realista debe ajustarse antes de esas zonas.",
      "Cancelar todo análisis porque hay muchas zonas.",
      "Aumentar stop para buscar target más grande."
    ],
    correct: 1,
    explanation: "El target debe considerar obstáculos. Una buena entrada puede perder calidad si el camino está bloqueado."
  },

  // RIESGO - EXTRA
  {
    category: "riesgo",
    title: "R:R 1:5 en pullback",
    context: "Ves un pullback hacia una zona lógica. El R:R puede ser 1:5, pero el stop queda muy apretado debajo de una micro vela.",
    options: [
      "Tomarlo porque 1:5 siempre compensa.",
      "Revisar si el stop es una invalidación real o solo está forzado para lograr 1:5.",
      "Aumentar contratos porque el R:R es alto.",
      "Entrar sin target porque puede correr más."
    ],
    correct: 1,
    explanation: "Un R:R alto solo vale si el stop tiene sentido. Si está forzado, el número es una ilusión."
  },
  {
    category: "riesgo",
    title: "Riesgo bajo pero probabilidad pobre",
    context: "Puedes entrar con stop pequeño, pero la entrada está en medio del rango y sin contexto claro.",
    options: [
      "Tomarla porque el stop pequeño hace que sea buena.",
      "Evitar confundir poco riesgo en ticks con buena oportunidad.",
      "Aumentar tamaño porque el stop es pequeño.",
      "Tomar varias entradas pequeñas hasta que una funcione."
    ],
    correct: 1,
    explanation: "Un stop pequeño no convierte una mala ubicación en buen setup."
  },
  {
    category: "riesgo",
    title: "Parar después de ganar",
    context: "Ya alcanzaste tu objetivo diario. Aparece otro setup decente y quieres seguir operando.",
    options: [
      "Seguir porque el mercado está dando dinero.",
      "Considerar parar o reducir riesgo; proteger un buen día también es gestión.",
      "Aumentar lotaje porque estás en racha.",
      "Operar sin plan porque ya ganaste."
    ],
    correct: 1,
    explanation: "La gestión también aplica en días verdes. Devolver ganancias por exceso de confianza es común."
  },
  {
    category: "riesgo",
    title: "Mover stop a BE demasiado pronto",
    context: "La operación avanza un poco a favor. Mueves a break-even inmediatamente y el precio te saca antes de ir al target.",
    options: [
      "Mover a BE siempre apenas puedas.",
      "Evaluar si el BE prematuro corta operaciones normales antes de que respiren.",
      "Nunca mover a BE bajo ningún caso.",
      "Quitar el stop después de moverlo mal."
    ],
    correct: 1,
    explanation: "Break-even puede proteger, pero si se usa por miedo, puede destruir setups válidos."
  },
  {
    category: "riesgo",
    title: "Setup A+ con cuenta en drawdown",
    context: "Aparece un setup muy bueno, pero estás en drawdown emocional y vienes de romper reglas esta semana.",
    options: [
      "Operarlo más grande porque es A+ y puedes recuperar.",
      "Tomar tamaño reducido o no operar si tu estado psicológico está comprometido.",
      "Ignorar el estado emocional porque el setup manda.",
      "Entrar sin registrar nada para no presionarte."
    ],
    correct: 1,
    explanation: "El contexto no es solo mercado; también es tu estado. Buen setup + mala mente puede terminar mal."
  },

  // PSICOLOGIA - EXTRA
  {
    category: "psicologia",
    title: "Confianza después de una racha ganadora",
    context: "Llevas varios trades ganados. Empiezas a sentir que puedes leer cualquier movimiento.",
    options: [
      "Aumentar riesgo porque estás en buena racha.",
      "Mantener reglas: la confianza excesiva puede ser tan peligrosa como el miedo.",
      "Operar más setups porque estás caliente.",
      "Eliminar checklist para fluir mejor."
    ],
    correct: 1,
    explanation: "La euforia también rompe cuentas. Ganar no autoriza abandonar proceso."
  },
  {
    category: "psicologia",
    title: "Miedo después de una pérdida correcta",
    context: "Perdiste siguiendo tu plan. Ahora aparece el mismo setup válido, pero tienes miedo de tomarlo.",
    options: [
      "Evitarlo porque perder una vez invalida el sistema.",
      "Diferenciar pérdida correcta de mala ejecución antes de cambiar conducta.",
      "Duplicar para recuperar la pérdida anterior.",
      "Entrar tarde para sentir más confirmación."
    ],
    correct: 1,
    explanation: "Una pérdida dentro del plan no necesariamente indica error. El peligro es cambiar reglas por dolor emocional."
  },
  {
    category: "psicologia",
    title: "Cambiar de estrategia en medio de la sesión",
    context: "Tu estrategia no dio entrada. Ves otra idea en redes y quieres aplicarla en vivo.",
    options: [
      "Probarla porque si otros ganan con eso, debe funcionar.",
      "No mezclar estrategias en vivo; estudia y prueba fuera de sesión.",
      "Combinar ambas para tener más señales.",
      "Cambiar todo si tu estrategia está aburrida."
    ],
    correct: 1,
    explanation: "Cambiar de sistema por impulso suele venir de ansiedad. Lo nuevo se prueba fuera del riesgo real."
  },
  {
    category: "psicologia",
    title: "Culpar al mercado",
    context: "Después de una pérdida, dices que el mercado estuvo manipulado, pero no revisas si entraste tarde o sin confirmación.",
    options: [
      "Aceptar que toda pérdida fue manipulación.",
      "Revisar primero tu ejecución antes de culpar al mercado.",
      "Aumentar stop para evitar manipulaciones.",
      "Dejar de registrar trades porque te molesta."
    ],
    correct: 1,
    explanation: "Puede haber barridas y manipulación, pero tu responsabilidad es plan, entrada, stop y gestión."
  },
  {
    category: "psicologia",
    title: "Operar para sentirte productivo",
    context: "Pasaste dos horas sin entrada. Sientes que si no operas, perdiste el día.",
    options: [
      "Tomar un trade pequeño para justificar el tiempo.",
      "Aceptar que no operar también puede ser una decisión profesional.",
      "Buscar señales en temporalidades más bajas hasta encontrar algo.",
      "Entrar en cualquier ruptura para cerrar la sesión con acción."
    ],
    correct: 1,
    explanation: "No operar cuando no hay edge es parte del trabajo. Productividad no es cantidad de trades."
  },
  {
    "category": "patrones",
    "title": "Triángulo simétrico cerca de liquidez",
    "context": "El precio se comprime bajo varios equal highs. Aún no hay ruptura clara y el volumen disminuye.",
    "options": [
      "Comprar antes de la ruptura porque la compresión siempre explota al alza.",
      "Esperar ruptura, aceptación y reacción; los equal highs pueden ser liquidez.",
      "Vender porque todo triángulo bajo resistencia cae.",
      "Ignorar la liquidez porque el patrón ya lo dice todo."
    ],
    "correct": 1,
    "explanation": "Un triángulo muestra compresión, no dirección segura. Cerca de equal highs puede haber barrida antes de decidir."
  },
  {
    "category": "patrones",
    "title": "Cuña descendente después de caída extendida",
    "context": "Después de una caída fuerte, el precio sigue bajando pero cada impulso vendedor es más débil dentro de una cuña.",
    "options": [
      "Vender porque la figura sigue apuntando hacia abajo.",
      "Observar posible agotamiento y esperar ruptura/reacción antes de decidir.",
      "Comprar sin confirmación porque toda cuña descendente revierte.",
      "Quitar el stop porque el patrón tiene alta probabilidad."
    ],
    "correct": 1,
    "explanation": "La cuña descendente puede mostrar pérdida de presión vendedora, pero necesita confirmación y contexto."
  },
  {
    "category": "patrones",
    "title": "Cuña ascendente en resistencia",
    "context": "El precio sube dentro de una cuña ascendente y llega a una resistencia mayor con velas pequeñas.",
    "options": [
      "Comprar porque la cuña sube.",
      "Vigilar agotamiento comprador, pero esperar confirmación real.",
      "Vender sin confirmación porque toda cuña ascendente cae.",
      "Ignorar la resistencia porque la figura manda."
    ],
    "correct": 1,
    "explanation": "La cuña ascendente puede sugerir agotamiento comprador, pero no es venta automática."
  },
  {
    "category": "patrones",
    "title": "Bandera alcista con entrada tardía",
    "context": "El impulso alcista fue limpio, la bandera rompió, pero cuando entras el precio ya recorrió casi todo el target.",
    "options": [
      "Entrar igual porque la bandera era correcta.",
      "Revisar si el R:R todavía existe; si no, esperar otra oportunidad.",
      "Comprar más fuerte porque ya confirmó.",
      "Mover el stop lejos para evitar ruido."
    ],
    "correct": 1,
    "explanation": "Un patrón correcto puede dejar de ser operable si la entrada llega tarde y el R:R se daña."
  },
  {
    "category": "patrones",
    "title": "Bandera bajista con pullback débil",
    "context": "Después de un desplazamiento bajista, el precio retrocede lento y no recupera la estructura rota.",
    "options": [
      "Puede ser continuación si aparece rechazo y el riesgo es lógico.",
      "Comprar porque el precio ya bajó mucho.",
      "Vender sin confirmación porque el impulso anterior fue fuerte.",
      "Ignorar el contexto y operar solo la forma."
    ],
    "correct": 0,
    "explanation": "Un pullback débil tras impulso bajista puede ser bandera de continuación, pero requiere rechazo y gestión."
  },
  {
    "category": "patrones",
    "title": "HCH sin neckline rota",
    "context": "Ves algo parecido a hombro-cabeza-hombro, pero el precio aún no rompe neckline ni pierde estructura.",
    "options": [
      "Vender porque la figura se parece a HCH.",
      "Esperar confirmación; sin ruptura puede ser solo ruido visual.",
      "Entrar con más contratos porque el patrón es famoso.",
      "Mover la neckline hasta que la figura se vea perfecta."
    ],
    "correct": 1,
    "explanation": "El parecido visual no confirma un patrón. La validación importa más que el nombre."
  },
  {
    "category": "patrones",
    "title": "HCH invertido después de barrida",
    "context": "El precio barre mínimos, recupera fuerte y empieza a formar HCH invertido cerca de demanda.",
    "options": [
      "Puede tener lectura alcista si confirma neckline y mantiene invalidación clara.",
      "Comprar antes de completarse porque siempre funciona.",
      "Vender porque la tendencia previa era bajista.",
      "Ignorar la barrida porque solo importa la figura."
    ],
    "correct": 0,
    "explanation": "La barrida agrega contexto, pero la entrada necesita confirmación e invalidación clara."
  },
  {
    "category": "patrones",
    "title": "Rectángulo en mitad de rango",
    "context": "Aparece un rectángulo pequeño en el centro de un rango mayor, lejos de extremos importantes.",
    "options": [
      "Operar la ruptura del rectángulo sin más contexto.",
      "Ser cauteloso: en mitad del rango puede ser ruido y mala ubicación.",
      "Comprar porque los rectángulos rompen arriba.",
      "Vender porque los rectángulos rompen abajo."
    ],
    "correct": 1,
    "explanation": "La ubicación pesa mucho. Un patrón en el centro del rango suele tener menor calidad."
  },
  {
    "category": "patrones",
    "title": "Taza con asa con resistencia cercana",
    "context": "La taza con asa se ve limpia, pero el primer obstáculo está muy cerca en una resistencia fuerte.",
    "options": [
      "Tomar la entrada porque el patrón se ve bonito.",
      "Revisar si el recorrido real compensa antes de operar.",
      "Ignorar la resistencia porque el patrón manda.",
      "Aumentar contratos para compensar poco recorrido."
    ],
    "correct": 1,
    "explanation": "Un patrón bueno puede tener mal trade si el target está bloqueado por una zona cercana."
  },
  {
    "category": "patrones",
    "title": "Patrón correcto en mala condición",
    "context": "El patrón está bien formado, pero aparece justo antes de una noticia fuerte y sin zona clara.",
    "options": [
      "Operar porque el patrón está bien dibujado.",
      "Descartar o esperar; patrón sin contexto puede ser trampa.",
      "Operar con más tamaño porque se ve claro.",
      "Ignorar la noticia porque solo importan figuras."
    ],
    "correct": 1,
    "explanation": "WLF no opera dibujos aislados. Contexto, noticia, ubicación y riesgo pesan más."
  },
  {
    "category": "pullbacks",
    "title": "Pullback a resistencia rota",
    "context": "El precio rompe resistencia, avanza y vuelve a la zona rota dejando rechazo claro.",
    "options": [
      "Puede ser válido si stop y R:R son lógicos.",
      "Comprar solo porque tocó la zona.",
      "Vender porque volver a la zona invalida todo.",
      "Entrar cuando ya recorrió todo el target."
    ],
    "correct": 0,
    "explanation": "Ruptura + retorno + reacción puede ser válido, pero solo si el riesgo sigue compensando."
  },
  {
    "category": "pullbacks",
    "title": "Pullback que rompe estructura",
    "context": "Buscas continuación alcista, pero el retroceso rompe varios swing lows y no recupera.",
    "options": [
      "Comprar igual porque era pullback.",
      "Reevaluar: el retroceso puede haber dejado de ser sano.",
      "Duplicar para mejorar precio.",
      "Ignorar los lows rotos por el sesgo inicial."
    ],
    "correct": 1,
    "explanation": "Un pullback sano no debería destruir la estructura que justifica la idea."
  },
  {
    "category": "pullbacks",
    "title": "Retest débil tras ruptura bajista",
    "context": "Después de romper soporte con intención, el precio vuelve lento con velas pequeñas.",
    "options": [
      "Buscar posible venta si aparece rechazo y riesgo lógico.",
      "Comprar porque volvió a soporte.",
      "Vender sin confirmación porque la ruptura fue fuerte.",
      "Ignorar la zona porque ya fue rota."
    ],
    "correct": 0,
    "explanation": "Un retest débil a zona rota puede ser continuación, pero necesita rechazo y gestión."
  },
  {
    "category": "pullbacks",
    "title": "Retest demasiado profundo",
    "context": "El precio rompe al alza y vuelve, pero entra profundo bajo la zona rota sin recuperar.",
    "options": [
      "Mantener sesgo alcista sin cambios.",
      "Cuidado: la ruptura puede estar fallando si no recupera.",
      "Comprar más porque profundo es mejor.",
      "Quitar stop para darle espacio."
    ],
    "correct": 1,
    "explanation": "Un retest profundo sin reacción puede mostrar falta de aceptación de la ruptura."
  },
  {
    "category": "pullbacks",
    "title": "Pullback en tendencia sana",
    "context": "La tendencia alcista mantiene swing lows mayores y retrocesos controlados.",
    "options": [
      "Buscar compras con zona, reacción y R:R.",
      "Vender cada retroceso porque subió mucho.",
      "Comprar cualquier vela roja.",
      "Ignorar stop porque la tendencia es sana."
    ],
    "correct": 0,
    "explanation": "En tendencia sana el pullback puede ser oportunidad, pero debe construirse con gestión."
  },
  {
    "category": "pullbacks",
    "title": "Pullback en mitad de rango",
    "context": "El mercado está lateral y el retroceso ocurre justo en el centro del rango.",
    "options": [
      "Operarlo como pullback de alta calidad.",
      "Esperar mejor ubicación; el centro suele ser ruido.",
      "Aumentar tamaño por stop corto.",
      "Tomar cualquier dirección."
    ],
    "correct": 1,
    "explanation": "Un pullback en mitad de rango no tiene la misma calidad que uno en zona relevante."
  },
  {
    "category": "pullbacks",
    "title": "Retest con FVG y liquidez",
    "context": "El precio toma liquidez, desplaza fuerte y vuelve a una zona donde coinciden FVG y retest.",
    "options": [
      "Es zona de interés, pero se necesita reacción y riesgo lógico.",
      "Entrar sin mirar porque hay muchas confluencias.",
      "Ignorar FVG porque ya hubo liquidez.",
      "Vender siempre que el precio vuelva a un FVG."
    ],
    "correct": 0,
    "explanation": "Las confluencias ayudan, pero no reemplazan confirmación, invalidación y gestión."
  },
  {
    "category": "pullbacks",
    "title": "Pullback con R:R pobre",
    "context": "La zona es buena, pero el stop lógico es grande y el target cercano está bloqueado.",
    "options": [
      "Tomar la operación porque la zona es buena.",
      "Descartar o esperar mejor precio porque el R:R no compensa.",
      "Reducir el stop sin lógica.",
      "Aumentar contratos para que valga la pena."
    ],
    "correct": 1,
    "explanation": "Una buena zona con mal R:R puede seguir siendo una mala operación."
  },
  {
    "category": "pullbacks",
    "title": "Pullback después de noticia",
    "context": "Después de una noticia fuerte, el precio vuelve a una zona técnica, pero las velas siguen erráticas.",
    "options": [
      "Entrar porque la zona sigue válida.",
      "Esperar estabilización; la volatilidad puede distorsionar la lectura.",
      "Operar con más tamaño.",
      "Ignorar spread y velocidad."
    ],
    "correct": 1,
    "explanation": "Después de noticias, velocidad y spread pueden dañar incluso zonas buenas."
  },
  {
    "category": "pullbacks",
    "title": "Retest válido pero tarde",
    "context": "El retest fue limpio, pero cuando lo notas el precio ya recorrió gran parte del movimiento.",
    "options": [
      "Entrar tarde para no perderlo.",
      "Aceptar que se fue y esperar otra estructura.",
      "Entrar con stop más grande.",
      "Duplicar porque confirmó."
    ],
    "correct": 1,
    "explanation": "Un setup válido deja de ser operable si lo tomas tarde y sin R:R."
  },
  {
    "category": "entrada",
    "title": "Stop bajo liquidez obvia",
    "context": "La entrada tiene sentido, pero el stop queda justo bajo equal lows muy visibles.",
    "options": [
      "Puede estar mal ubicado aunque la entrada sea buena.",
      "Es perfecto porque queda pequeño.",
      "Quitar el stop para evitar barrida.",
      "Entrar con más contratos por stop corto."
    ],
    "correct": 0,
    "explanation": "El stop debe ir donde se invalida la idea, no donde se ve cómodo y obvio."
  },
  {
    "category": "entrada",
    "title": "Stop demasiado pequeño",
    "context": "Quieres operar una zona amplia, pero colocas el stop dentro del ruido normal.",
    "options": [
      "El stop pequeño siempre mejora el trade.",
      "Puede ser un stop artificial que no respeta estructura.",
      "La zona no importa si el R:R se ve alto.",
      "Hay que entrar sin target."
    ],
    "correct": 1,
    "explanation": "Forzar un stop pequeño crea un R:R falso si no respeta la estructura."
  },
  {
    "category": "entrada",
    "title": "Stop lógico pero grande",
    "context": "La invalidación real queda lejos y respetarla excede el riesgo permitido de tu cuenta.",
    "options": [
      "Reducir tamaño, esperar mejor entrada o descartar.",
      "Tomar el trade porque el análisis es bueno.",
      "Usar el mismo lotaje y aceptar.",
      "Mover stop a un sitio cómodo sin lógica."
    ],
    "correct": 0,
    "explanation": "Si el stop lógico no cabe en tu gestión, no rompes el plan: ajustas o descartas."
  },
  {
    "category": "entrada",
    "title": "Target con obstáculos",
    "context": "Tu target está después de varias zonas donde el precio puede reaccionar antes.",
    "options": [
      "Mantener target porque el patrón lo proyecta.",
      "Evaluar obstáculos reales antes del objetivo.",
      "Quitar target y esperar milagro.",
      "Aumentar contratos para compensar."
    ],
    "correct": 1,
    "explanation": "El camino hacia el TP importa. Las zonas intermedias pueden cambiar la calidad."
  },
  {
    "category": "entrada",
    "title": "Target fantasía",
    "context": "El setup es decente, pero tu TP está muy lejos y sin estructura que lo justifique.",
    "options": [
      "Es bueno porque el R:R se ve grande.",
      "Puede ser un target irreal que maquilla la operación.",
      "Entrar más fuerte por más recompensa.",
      "Mover stop más cerca."
    ],
    "correct": 1,
    "explanation": "Un target lejano sin contexto no es edge; es ilusión matemática."
  },
  {
    "category": "entrada",
    "title": "Zona sin reacción",
    "context": "El precio llega a una zona interesante, pero aún no hay rechazo ni desplazamiento.",
    "options": [
      "Entrar porque la zona basta.",
      "Esperar reacción; zona sin respuesta no confirma nada.",
      "Duplicar por entrada temprana.",
      "Ignorar stop hasta ver qué pasa."
    ],
    "correct": 1,
    "explanation": "Una zona es una hipótesis. La reacción valida si el mercado la respeta."
  },
  {
    "category": "entrada",
    "title": "Entrada después de confirmación completa",
    "context": "El precio rompe, retestea, reacciona y ya avanzó mucho antes de tu entrada.",
    "options": [
      "Puede ser baja calidad si el R:R ya se dañó.",
      "Es mejor porque hay más confirmación.",
      "Siempre es válido entrar al final.",
      "Aumentar target para arreglar ratio."
    ],
    "correct": 0,
    "explanation": "Confirmación no significa perseguir. Si el trade ya corrió, la oportunidad cambió."
  },
  {
    "category": "entrada",
    "title": "Stop en zona de barrida",
    "context": "Pones stop justo debajo de un mínimo anterior porque queda barato.",
    "options": [
      "Puede ser peligroso si ese mínimo acumula stops.",
      "Es perfecto porque el mercado lo respeta siempre.",
      "No importa si el target es grande.",
      "La solución es no usar stop."
    ],
    "correct": 0,
    "explanation": "Los mínimos obvios pueden ser liquidez. Stop barato no siempre es stop lógico."
  },
  {
    "category": "entrada",
    "title": "Resistencia bloqueando target",
    "context": "La entrada reacciona bien, pero a pocos ticks hay una resistencia repetida.",
    "options": [
      "Ignorarla porque la entrada fue buena.",
      "Considerar que el espacio real puede ser insuficiente.",
      "Aumentar target más allá.",
      "Mover stop para mejorar ratio."
    ],
    "correct": 1,
    "explanation": "Una buena entrada necesita espacio para desarrollarse."
  },
  {
    "category": "entrada",
    "title": "Buena lectura, mala ejecución",
    "context": "El análisis fue correcto, pero entraste tarde con stop improvisado y target emocional.",
    "options": [
      "Marcarlo como buen trade por acertar dirección.",
      "Evaluarlo como mala ejecución aunque la idea fuera buena.",
      "Repetirlo porque pudo ganar.",
      "Aumentar tamaño la próxima vez."
    ],
    "correct": 1,
    "explanation": "Lectura y ejecución son cosas distintas. Una puede estar bien y la otra mal."
  },
  {
    "category": "riskreward",
    "title": "R:R 1:5 en pullback válido",
    "context": "El precio vuelve a una zona lógica, reacciona, y el target 1:5 coincide con liquidez previa.",
    "options": [
      "Puede ser válido si el recorrido al target tiene sentido.",
      "Es malo porque 1:5 siempre es ambicioso.",
      "Es obligatorio tomarlo por ser 1:5.",
      "Mover stop más cerca para hacerlo 1:8."
    ],
    "correct": 0,
    "explanation": "Un 1:5 es bueno si nace de contexto, invalidación lógica y target alcanzable."
  },
  {
    "category": "riskreward",
    "title": "R:R 1:3 después de liquidez",
    "context": "El precio barre un mínimo, recupera fuerte y ofrece 1:3 hacia zona limpia.",
    "options": [
      "Interesante si hay reacción, contexto y stop lógico.",
      "Comprar siempre que exista 1:3.",
      "Descartarlo porque toda liquidez manipula.",
      "Subir lotaje porque el ratio es bueno."
    ],
    "correct": 0,
    "explanation": "Liquidez + reacción + R:R razonable puede ser potente, pero no automático."
  },
  {
    "category": "riskreward",
    "title": "R:R alto con obstáculos",
    "context": "La entrada marca 1:6, pero el target ignora varias zonas de reacción previas.",
    "options": [
      "El ratio alto valida el trade.",
      "El R:R puede ser falso si ignora obstáculos reales.",
      "Mover stop más cerca.",
      "Aumentar contratos por recompensa."
    ],
    "correct": 1,
    "explanation": "R:R debe ser realista. Obstáculos intermedios pueden invalidar el cálculo."
  },
  {
    "category": "riskreward",
    "title": "R:R bajo con buena reacción",
    "context": "La zona reacciona perfecto, pero el primer obstáculo solo permite 1:0.8.",
    "options": [
      "Tomarlo porque la reacción fue buena.",
      "Reconocer que puede no compensar por R:R bajo.",
      "Aumentar tamaño.",
      "Quitar target para buscar más."
    ],
    "correct": 1,
    "explanation": "Reacción no basta si la recompensa no compensa el riesgo."
  },
  {
    "category": "riskreward",
    "title": "R:R bueno, stop sin sentido",
    "context": "El trade muestra 1:4, pero el stop está dentro del ruido normal del mercado.",
    "options": [
      "Es buen trade porque 1:4 es alto.",
      "El R:R está forzado si el stop no invalida la idea.",
      "Tomarlo con más confianza.",
      "Mover target más lejos."
    ],
    "correct": 1,
    "explanation": "Un ratio bonito con stop mal colocado es maquillaje, no gestión."
  },
  {
    "category": "riskreward",
    "title": "Entrada tardía cambia el ratio",
    "context": "El setup daba 1:3, pero entras tarde y ahora solo queda 1:1.",
    "options": [
      "Entrar porque la idea original era buena.",
      "Aceptar que la oportunidad cambió y esperar.",
      "Mantener target original aunque ya esté lejos.",
      "Reducir stop sin lógica."
    ],
    "correct": 1,
    "explanation": "El R:R real es el que tienes al entrar, no el que existía antes."
  },
  {
    "category": "riskreward",
    "title": "R:R contra zona semanal",
    "context": "Quieres comprar con target alto, pero encima hay resistencia semanal fuerte.",
    "options": [
      "Ignorarla por el R:R proyectado.",
      "Revisar si esa zona reduce la calidad del target.",
      "Aumentar target por encima.",
      "Entrar sin stop para aguantar."
    ],
    "correct": 1,
    "explanation": "Una zona fuerte cercana puede reducir la expectativa real del trade."
  },
  {
    "category": "riskreward",
    "title": "R:R correcto con emoción",
    "context": "La operación tiene 1:3 real, pero vienes de dos pérdidas y quieres recuperar.",
    "options": [
      "Tomarla igual porque el R:R es correcto.",
      "Evaluar tu estado emocional antes de ejecutar.",
      "Duplicar para recuperar.",
      "Mover stop al primer ruido."
    ],
    "correct": 1,
    "explanation": "Una operación puede ser técnica, pero la ejecución emocional la contamina."
  },
  {
    "category": "riskreward",
    "title": "R:R bueno cerca del límite diario",
    "context": "Aparece un 1:4, pero si falla te deja casi en límite diario de pérdida.",
    "options": [
      "Tomarlo porque 1:4 justifica.",
      "Reducir riesgo o esperar porque el contexto de cuenta importa.",
      "Subir contratos por premio alto.",
      "Ignorar el límite si el setup es bueno."
    ],
    "correct": 1,
    "explanation": "El contexto de cuenta también forma parte del riesgo."
  },
  {
    "category": "riskreward",
    "title": "R:R sin contexto",
    "context": "El trade ofrece 1:2, pero ocurre en mitad de rango sin liquidez ni reacción clara.",
    "options": [
      "Tomarlo porque 1:2 basta.",
      "Esperar contexto; el ratio no reemplaza una idea clara.",
      "Aumentar tamaño porque no es alto.",
      "Operarlo por stop pequeño."
    ],
    "correct": 1,
    "explanation": "R:R es una capa del análisis, no la razón principal para entrar."
  },
  {
    "category": "noticias",
    "title": "Setup limpio antes de CPI",
    "context": "Tienes un setup claro, pero faltan 3 minutos para CPI de alto impacto.",
    "options": [
      "Entrar porque el setup manda.",
      "Evitar o reducir riesgo; la noticia puede destruir la lectura.",
      "Duplicar porque habrá movimiento.",
      "Quitar stop para evitar mecha."
    ],
    "correct": 1,
    "explanation": "Noticias fuertes pueden generar barridas, spread y movimientos erráticos."
  },
  {
    "category": "noticias",
    "title": "Vela gigante post FOMC",
    "context": "Después de FOMC aparece una vela enorme y sientes FOMO.",
    "options": [
      "Entrar inmediatamente porque la dirección es clara.",
      "Esperar estabilización; la primera reacción puede ser falsa.",
      "Aumentar lotaje por volatilidad.",
      "Poner stop dentro de la vela gigante."
    ],
    "correct": 1,
    "explanation": "La primera reacción de noticia puede revertir violentamente."
  },
  {
    "category": "noticias",
    "title": "Primera reacción falsa",
    "context": "El precio rompe arriba en noticia, toma liquidez y vuelve debajo del rango.",
    "options": [
      "Comprar porque rompió arriba primero.",
      "Reconocer posible barrida y esperar nueva estructura.",
      "Vender sin stop porque volvió.",
      "Ignorar la noticia porque ya pasó."
    ],
    "correct": 1,
    "explanation": "En noticias, la reacción posterior importa más que el primer impulso."
  },
  {
    "category": "noticias",
    "title": "Mercado comprimido antes de NFP",
    "context": "La hora previa a NFP el precio está lento y comprimido.",
    "options": [
      "Forzar entradas porque el rango está claro.",
      "Entender que puede estar esperando noticia y evitar ruido.",
      "Duplicar en el centro del rango.",
      "Operar cada micro ruptura."
    ],
    "correct": 1,
    "explanation": "Antes de noticias grandes, la compresión puede generar falsas señales."
  },
  {
    "category": "noticias",
    "title": "Barrida doble durante noticia",
    "context": "El precio barre máximo y mínimo del rango en segundos.",
    "options": [
      "Tomar la segunda barrida como segura.",
      "Esperar estabilización; puede ser volatilidad extrema.",
      "Entrar en ambas direcciones.",
      "Quitar stops por velocidad."
    ],
    "correct": 1,
    "explanation": "No toda toma de liquidez durante noticia es operable."
  },
  {
    "category": "noticias",
    "title": "Spread dañando el stop",
    "context": "Durante noticia, el spread se amplía y tu stop técnico queda demasiado cerca.",
    "options": [
      "Operar igual porque el gráfico se ve limpio.",
      "Considerar que ejecución real puede ser peor que la visual.",
      "Aumentar contratos por volatilidad.",
      "Poner stop más cerca para perder menos."
    ],
    "correct": 1,
    "explanation": "La ejecución real importa tanto como el gráfico."
  },
  {
    "category": "noticias",
    "title": "Estructura después de noticia",
    "context": "Tras la noticia, las velas se normalizan y aparecen swings más claros.",
    "options": [
      "Ahora puede tener más sentido buscar estructura operable.",
      "Ya es tarde para operar cualquier cosa.",
      "Entrar sin plan porque la noticia pasó.",
      "Operar el primer tick sin contexto."
    ],
    "correct": 0,
    "explanation": "Esperar estructura después de volatilidad inicial puede mejorar la calidad."
  },
  {
    "category": "noticias",
    "title": "Trade abierto antes de NFP",
    "context": "Tienes una operación abierta con ligera ganancia y faltan minutos para NFP.",
    "options": [
      "Ignorar la noticia porque ya estás dentro.",
      "Gestionar: reducir, cerrar o proteger según plan.",
      "Aumentar posición antes de noticia.",
      "Quitar stop para evitar barrida."
    ],
    "correct": 1,
    "explanation": "Antes de eventos fuertes, proteger la cuenta puede pesar más que exprimir el trade."
  },
  {
    "category": "noticias",
    "title": "Noticia menor o alto impacto",
    "context": "Ves una noticia en calendario, pero no revisas su nivel de impacto.",
    "options": [
      "Todas las noticias son iguales.",
      "Diferenciar impacto ayuda a ajustar riesgo.",
      "Ignorar todas.",
      "Operar más fuerte en cualquier noticia."
    ],
    "correct": 1,
    "explanation": "No todas las noticias mueven igual el mercado."
  },
  {
    "category": "noticias",
    "title": "Horario peligroso recurrente",
    "context": "Tu setup aparece en un horario donde históricamente pierdes por volatilidad.",
    "options": [
      "Reducir tamaño o exigir más confirmación puede ser prudente.",
      "Usar más contratos por velocidad.",
      "Ignorar tu historial.",
      "No usar stop para evitar ruido."
    ],
    "correct": 0,
    "explanation": "Adaptar riesgo al horario y a tu historial es gestión profesional."
  },
  {
    "category": "fondeo",
    "title": "Setup B cerca del límite diario",
    "context": "Estás cerca del límite diario y aparece un setup decente, pero no perfecto.",
    "options": [
      "Tomarlo para recuperar.",
      "Ser selectivo o parar; el margen de error es pequeño.",
      "Subir contratos por urgencia.",
      "Ignorar reglas si el gráfico se ve bien."
    ],
    "correct": 1,
    "explanation": "En fondeo, la condición de la cuenta cambia la decisión."
  },
  {
    "category": "fondeo",
    "title": "Consistencia del challenge",
    "context": "Estás cerca de pasar, pero casi toda la ganancia viene de un solo día.",
    "options": [
      "Celebrarlo porque llegaste al objetivo.",
      "Revisar reglas de consistencia antes de asumir que está bien.",
      "Duplicar para terminar.",
      "Ignorar porque ganancia es ganancia."
    ],
    "correct": 1,
    "explanation": "Las reglas de consistencia pueden afectar evaluación o payout."
  },
  {
    "category": "fondeo",
    "title": "Trailing drawdown",
    "context": "Después de una buena ganancia, quieres seguir agresivo en cuenta con trailing drawdown.",
    "options": [
      "Seguir igual porque hay colchón.",
      "Proteger ganancias; devolver demasiado puede acercar el límite.",
      "Aumentar contratos por confianza.",
      "Quitar stops porque vas verde."
    ],
    "correct": 1,
    "explanation": "El trailing drawdown exige proteger avances."
  },
  {
    "category": "fondeo",
    "title": "Duplicar para recuperar evaluación",
    "context": "Tras dos pérdidas duplicas contratos para volver rápido al objetivo.",
    "options": [
      "Es razonable si el setup se ve claro.",
      "Es peligroso: estás cambiando riesgo por emoción.",
      "Es obligatorio en fondeo.",
      "Reduce drawdown automáticamente."
    ],
    "correct": 1,
    "explanation": "Subir tamaño para recuperar suele quemar evaluaciones."
  },
  {
    "category": "fondeo",
    "title": "Regla de noticia prohibida",
    "context": "La firma restringe noticias, pero aparece un setup perfecto en ese horario.",
    "options": [
      "Operarlo porque el setup es perfecto.",
      "Respetar la regla; incumplir puede ser peor que perder.",
      "Usar menos contratos.",
      "Abrir antes para evitar regla."
    ],
    "correct": 1,
    "explanation": "En fondeo, las reglas del programa son parte del trade."
  },
  {
    "category": "fondeo",
    "title": "Último trade desesperado",
    "context": "Faltan 20 minutos y estás cerca del límite diario.",
    "options": [
      "Tomar un último trade para salvar el día.",
      "Parar; el riesgo emocional y de regla es alto.",
      "Aumentar tamaño por poco tiempo.",
      "Operar sin stop."
    ],
    "correct": 1,
    "explanation": "El último trade por desesperación suele ser peligroso."
  },
  {
    "category": "fondeo",
    "title": "Proteger un día verde",
    "context": "Ya alcanzaste buen profit diario y aparece otro setup medio.",
    "options": [
      "Tomarlo igual porque estás en racha.",
      "Proteger el día o reducir riesgo puede ser más profesional.",
      "Duplicar para maximizar.",
      "Ignorar plan por confianza."
    ],
    "correct": 1,
    "explanation": "Cerrar un buen día también es habilidad."
  },
  {
    "category": "fondeo",
    "title": "Día rojo borra semana",
    "context": "Varios días verdes pequeños quedan borrados por un solo día rojo grande.",
    "options": [
      "Indica posible falta de límite diario efectivo.",
      "Es normal y no requiere revisión.",
      "La solución es más trades verdes.",
      "Solo importa win rate."
    ],
    "correct": 0,
    "explanation": "La supervivencia en fondeo depende de controlar días rojos."
  },
  {
    "category": "fondeo",
    "title": "Saber cuándo parar",
    "context": "Ya cumpliste objetivo parcial del día, pero el mercado sigue moviéndose.",
    "options": [
      "Seguir porque hay movimiento.",
      "Parar o reducir actividad si tu plan ya se cumplió.",
      "Aumentar contratos por confianza.",
      "Cambiar estrategia para aprovechar."
    ],
    "correct": 1,
    "explanation": "No estás obligado a operar todo lo que se mueve."
  },
  {
    "category": "fondeo",
    "title": "Tamaño según drawdown",
    "context": "El setup parece fuerte, pero el tamaño te deja muy cerca del drawdown si falla.",
    "options": [
      "Usar ese tamaño porque el setup es fuerte.",
      "Elegir tamaño según regla y supervivencia.",
      "Quitar stop para evitar drawdown.",
      "Entrar más fuerte para pasar rápido."
    ],
    "correct": 1,
    "explanation": "En fondeo, el tamaño debe respetar reglas antes que confianza."
  },
  {
    "category": "plan",
    "title": "Operar sin checklist",
    "context": "Ves una zona interesante y entras sin revisar tendencia, liquidez, stop, target ni noticia.",
    "options": [
      "Es válido si tienes experiencia.",
      "Es ejecución incompleta; el checklist evita impulsos.",
      "Mientras gane no importa.",
      "El checklist solo sirve a principiantes."
    ],
    "correct": 1,
    "explanation": "El checklist reduce errores evitables y entradas emocionales."
  },
  {
    "category": "plan",
    "title": "Cambiar estrategia por dos pérdidas",
    "context": "Tu plan tuvo dos pérdidas normales y cambias de estrategia en mitad de sesión.",
    "options": [
      "Puede ser reacción emocional si estaban dentro del plan.",
      "Es obligatorio cambiar después de dos pérdidas.",
      "Significa que el plan no sirve.",
      "La solución es otro mercado sin revisar."
    ],
    "correct": 0,
    "explanation": "Dos pérdidas no invalidan un plan si estaban contempladas."
  },
  {
    "category": "plan",
    "title": "Plan prohíbe noticias",
    "context": "Tu plan dice no operar noticias, pero aparece un setup limpio.",
    "options": [
      "Tomarlo porque es excepcional.",
      "Respetar el plan; se modifica fuera de sesión.",
      "Entrar con más tamaño.",
      "Quitar la regla en ese momento."
    ],
    "correct": 1,
    "explanation": "El plan se cambia en revisión, no frente a una vela atractiva."
  },
  {
    "category": "plan",
    "title": "Setup B como setup A",
    "context": "La entrada tiene confluencias, pero no cumple todos los criterios del setup principal.",
    "options": [
      "Operarlo con el mismo riesgo que setup A.",
      "Reducir riesgo, esperar más confirmación o descartar.",
      "Aumentar lotaje para compensar.",
      "Llamarlo setup A para sentir confianza."
    ],
    "correct": 1,
    "explanation": "No todos los setups tienen la misma calidad ni merecen el mismo riesgo."
  },
  {
    "category": "plan",
    "title": "Sin pérdida máxima diaria",
    "context": "No defines cuánto puedes perder antes de parar.",
    "options": [
      "Es peligroso porque la emoción puede decidir.",
      "Es mejor porque da libertad.",
      "No hace falta con buen análisis.",
      "Solo importa el stop de cada trade."
    ],
    "correct": 0,
    "explanation": "El límite diario protege de días emocionalmente peligrosos."
  },
  {
    "category": "plan",
    "title": "Sin horario operativo",
    "context": "Operas cualquier hora, incluso cansado o en mercado lento.",
    "options": [
      "Más horas siempre son más oportunidad.",
      "Definir horario filtra fatiga y malas condiciones.",
      "El mejor trader opera todo el día.",
      "No importa horario si hay velas."
    ],
    "correct": 1,
    "explanation": "Un horario operativo reduce ruido y decisiones por cansancio."
  },
  {
    "category": "plan",
    "title": "Saltar de mercado por ansiedad",
    "context": "NQ está lento, cambias a ES, oro y petróleo buscando acción.",
    "options": [
      "Es adaptación profesional.",
      "Puede ser ansiedad disfrazada de oportunidad.",
      "Aumenta consistencia automáticamente.",
      "Evita necesidad de plan."
    ],
    "correct": 1,
    "explanation": "Cambiar de mercado sin criterio puede ser sobreoperación."
  },
  {
    "category": "plan",
    "title": "No registrar operaciones",
    "context": "Operas todos los días sin anotar razones, gestión ni emociones.",
    "options": [
      "Es difícil mejorar lo que no registras.",
      "No hace falta si recuerdas.",
      "Solo se registran ganadoras.",
      "El registro no ayuda con buenos indicadores."
    ],
    "correct": 0,
    "explanation": "El diario revela errores que la memoria suele esconder."
  },
  {
    "category": "plan",
    "title": "Buen análisis, mala rutina",
    "context": "Lees bien el gráfico, pero duermes mal y operas sin preparación.",
    "options": [
      "El análisis compensa la mala rutina.",
      "La rutina afecta ejecución, paciencia y disciplina.",
      "Solo importa saber dirección.",
      "La preparación es opcional."
    ],
    "correct": 1,
    "explanation": "Trading no es solo análisis; el estado del trader afecta ejecución."
  },
  {
    "category": "plan",
    "title": "Revisión final del día",
    "context": "Terminas y solo miras dinero ganado/perdido, sin revisar proceso.",
    "options": [
      "El resultado es lo único importante.",
      "Revisar proceso ayuda aunque el día sea verde o rojo.",
      "Si ganaste no hay nada que revisar.",
      "Si perdiste cambia estrategia."
    ],
    "correct": 1,
    "explanation": "La mejora viene de revisar decisiones, no solo PnL."
  },
  {
    "category": "riskcontrol",
    "title": "Dos pérdidas y urgencia",
    "context": "Pierdes dos trades y quieres tomar otro rápido para volver a positivo.",
    "options": [
      "Ese impulso puede ser señal para pausar.",
      "Es momento de subir tamaño.",
      "El tercer trade tiene más probabilidad.",
      "Hay que operar antes de perder confianza."
    ],
    "correct": 0,
    "explanation": "El deseo de recuperar suele indicar emoción tomando control."
  },
  {
    "category": "riskcontrol",
    "title": "Reducir lotaje tras drawdown",
    "context": "Vienes de varios días malos y quieres mantener tamaño para recuperar más rápido.",
    "options": [
      "Mantener tamaño siempre es disciplina.",
      "Reducir lotaje puede proteger mientras recuperas claridad.",
      "Aumentar tamaño es mejor.",
      "Quitar stops reduce presión."
    ],
    "correct": 1,
    "explanation": "Reducir riesgo en drawdown ayuda a sobrevivir."
  },
  {
    "category": "riskcontrol",
    "title": "Trade gana rompiendo regla",
    "context": "Entraste fuera del plan y el trade va en ganancia.",
    "options": [
      "Celebrarlo si termina verde.",
      "Marcarlo como error de proceso aunque gane.",
      "Repetirlo porque funcionó.",
      "Aumentar tamaño."
    ],
    "correct": 1,
    "explanation": "Ganar rompiendo reglas refuerza malos hábitos."
  },
  {
    "category": "riskcontrol",
    "title": "Mover stop por esperanza",
    "context": "El precio se acerca a tu stop y lo mueves más lejos porque “seguro vuelve”.",
    "options": [
      "Es gestión flexible.",
      "Puede convertir pérdida normal en peligrosa.",
      "Siempre es correcto si la idea era buena.",
      "Mejora el R:R."
    ],
    "correct": 1,
    "explanation": "Mover stop por esperanza rompe el control de riesgo."
  },
  {
    "category": "riskcontrol",
    "title": "Promediar idea invalidada",
    "context": "El precio rompe tu invalidación y agregas otra posición para mejorar precio medio.",
    "options": [
      "Es peligroso si la idea ya fue invalidada.",
      "Siempre mejora la operación.",
      "Reduce riesgo automáticamente.",
      "Es profesional si tienes convicción."
    ],
    "correct": 0,
    "explanation": "Promediar una idea invalidada puede destruir cuentas rápido."
  },
  {
    "category": "riskcontrol",
    "title": "Cortar sesión emocional",
    "context": "Tras una pérdida injusta sientes rabia y quieres entrar de nuevo rápido.",
    "options": [
      "Pausar o cerrar sesión puede ser la mejor gestión.",
      "Entrar rápido evita perder oportunidad.",
      "Duplicar recupera confianza.",
      "No pasa nada si el setup parece bueno."
    ],
    "correct": 0,
    "explanation": "Cuando la emoción domina, el mejor trade puede ser no operar."
  },
  {
    "category": "riskcontrol",
    "title": "Proteger profit diario",
    "context": "Vas muy bien, pero sigues tomando trades medianos y devuelves gran parte.",
    "options": [
      "Puede indicar falta de regla para proteger ganancias.",
      "Es normal devolver todo.",
      "La solución es operar más.",
      "No hay que proteger ganancias."
    ],
    "correct": 0,
    "explanation": "El control de riesgo también aplica cuando vas ganando."
  },
  {
    "category": "riskcontrol",
    "title": "Pérdida normal",
    "context": "Pierdes un trade que cumplía plan, riesgo y ejecución.",
    "options": [
      "Es una pérdida normal del sistema.",
      "Significa cambiar todo.",
      "Debes recuperar inmediatamente.",
      "Debes aumentar contratos."
    ],
    "correct": 0,
    "explanation": "No toda pérdida es error. El problema es perder fuera del plan."
  },
  {
    "category": "riskcontrol",
    "title": "Riesgo total del día",
    "context": "Arriesgas poco por trade, pero haces muchas entradas y superas la pérdida diaria.",
    "options": [
      "El riesgo por trade es lo único importante.",
      "También necesitas controlar riesgo total del día.",
      "Muchas pérdidas pequeñas no importan.",
      "La solución es subir tamaño."
    ],
    "correct": 1,
    "explanation": "El riesgo diario controla la suma de decisiones."
  },
  {
    "category": "riskcontrol",
    "title": "Sobrevivir primero",
    "context": "Quieres crecer rápido, pero tu gestión puede quemar la cuenta en pocos trades malos.",
    "options": [
      "Priorizar supervivencia antes que velocidad.",
      "Aumentar riesgo para avanzar.",
      "Ignorar drawdown si el método es bueno.",
      "Operar sin límite diario."
    ],
    "correct": 0,
    "explanation": "Primero sobrevives, luego mejoras. Sin cuenta, no hay proceso."
  }
];

let filteredQuestions = [...questions];
let currentCategory = "all";
let currentIndex = 0;
let score = 0;
let answeredQuestions = new Set();
let currentResultCard = null;

const RESULT_CARD_ASSETS = {
  backgrounds: [
    "/assets/practice-cards/backgrounds/BG1.png",
    "/assets/practice-cards/backgrounds/BG2.png",
    "/assets/practice-cards/backgrounds/BG3.png",
    "/assets/practice-cards/backgrounds/BG4.png",
    "/assets/practice-cards/backgrounds/BG5.png",
    "/assets/practice-cards/backgrounds/BG6.png"
  ],
  borders: [
    "/assets/practice-cards/borders/Border1.png",
    "/assets/practice-cards/borders/Border2.png",
    "/assets/practice-cards/borders/Border3.png",
    "/assets/practice-cards/borders/Border4.png"
  ],
  badges: {
    wolf: "/assets/practice-cards/badges/BadgeWolf.png",
    solid: "/assets/practice-cards/badges/Badge1.png",
    advance: "/assets/practice-cards/badges/Badge2.png",
    training: "/assets/practice-cards/badges/Badge3.png",
    improve: "/assets/practice-cards/badges/Badge4.png"
  }
};

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
const summaryTitle = document.getElementById("summaryTitle");
const summaryText = document.getElementById("summaryText");
const summaryScorePill = document.getElementById("summaryScorePill");
const summaryTopicPill = document.getElementById("summaryTopicPill");
const resultCardPreview = document.getElementById("resultCardPreview");
const resultCanvas = document.getElementById("resultCanvas");
const shareToggleBtn = document.getElementById("shareToggleBtn");
const shareFeedback = document.getElementById("shareFeedback");
const downloadCardBtn = document.getElementById("downloadCardBtn");
const copyResultBtn = document.getElementById("copyResultBtn");

const prevBtn = document.getElementById("prevQuestionBtn");
const nextBtn = document.getElementById("nextQuestionBtn");
const restartBtn = document.getElementById("restartBtn");

function shuffleArray(items) {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function chooseRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function buildQuestionList(category) {
  const baseList = category === "all"
    ? [...questions]
    : questions.filter((question) => question.category === category);

  return shuffleArray(baseList);
}

function buildShuffledOptions(question) {
  return shuffleArray(
    question.options.map((option, originalIndex) => ({
      option,
      originalIndex,
      isCorrect: originalIndex === question.correct
    }))
  );
}

function normalizeCategory(category) {
  const labels = {
    estructura: "Estructura",
    liquidez: "Liquidez",
    swings: "Swings",
    tendencias: "Tendencias",
    fvg: "FVG / Imbalance",
    orderblock: "Order Blocks / Smart Money",
    riesgo: "Gestión de riesgo",
    psicologia: "Psicología",
    patrones: "Patrones de precio",
    pullbacks: "Pullbacks / Retests",
    entrada: "Entrada, stop y target",
    riskreward: "Risk Reward",
    noticias: "Noticias y volatilidad",
    fondeo: "Cuentas de fondeo",
    plan: "Plan de trading",
    riskcontrol: "Risk Control"
  };

  return labels[category] || "Práctica";
}

function getCurrentTopicLabel() {
  return currentCategory === "all" ? "Práctica general" : normalizeCategory(currentCategory);
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function getScoreProfile(scoreValue, totalQuestions) {
  const ratio = totalQuestions > 0 ? scoreValue / totalQuestions : 0;

  if (ratio >= 0.999) {
    return {
      key: "wolf",
      title: "Mente WLF",
      phrase: "Contexto primero. Entrada después. Riesgo siempre."
    };
  }

  if (ratio >= 0.9) {
    return {
      key: "solid",
      title: "Lectura sólida",
      phrase: "Buen criterio. Sigue afinando la ejecución."
    };
  }

  if (ratio >= 0.8) {
    return {
      key: "advance",
      title: "Buen avance",
      phrase: "Vas construyendo lectura real de mercado."
    };
  }

  if (ratio >= 0.6) {
    return {
      key: "training",
      title: "Sigue entrenando",
      phrase: "La práctica constante afila la mente del trader."
    };
  }

  return {
    key: "improve",
    title: "Zona de mejora",
    phrase: "No es fallo. Es feedback para crecer."
  };
}

function getBadgeForProfile(profile) {
  const mapping = {
    wolf: RESULT_CARD_ASSETS.badges.wolf,
    solid: RESULT_CARD_ASSETS.badges.solid,
    advance: RESULT_CARD_ASSETS.badges.advance,
    training: RESULT_CARD_ASSETS.badges.training,
    improve: RESULT_CARD_ASSETS.badges.improve
  };

  return mapping[profile.key] || RESULT_CARD_ASSETS.badges.wolf;
}


function titleCaseWords(value) {
  return String(value || "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function getResultCardStudentName() {
  const emailNode = document.getElementById("userEmail");
  const raw = (emailNode?.textContent || "").trim();

  if (!raw || /validando/i.test(raw)) {
    return "Trader WLF";
  }

  if (raw.includes("@")) {
    const localPart = raw.split("@")[0];
    const pretty = localPart
      .replace(/[._-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return pretty ? titleCaseWords(pretty) : "Trader WLF";
  }

  const cleaned = raw.replace(/\s+/g, " ").trim();
  return cleaned || "Trader WLF";
}

function buildResultText() {
  const total = filteredQuestions.length;
  const profile = getScoreProfile(score, total);
  const topicLabel = getCurrentTopicLabel();
  const studentName = getResultCardStudentName();

  return [
    "🔥 Resultado WLF",
    `Alumno: ${studentName}`,
    `${score} / ${total}`,
    `Tema: ${topicLabel}`,
    profile.title,
    profile.phrase,
    "",
    "WLF Trading"
  ].join("\n");
}

function setShareFeedback(message) {
  if (shareFeedback) {
    shareFeedback.textContent = message || "";
  }
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
    image.src = src;
  });
}

function coverImage(ctx, img, x, y, width, height) {
  const scale = Math.max(width / img.width, height / img.height);
  const scaledWidth = img.width * scale;
  const scaledHeight = img.height * scale;
  const dx = x + (width - scaledWidth) / 2;
  const dy = y + (height - scaledHeight) / 2;
  ctx.drawImage(img, dx, dy, scaledWidth, scaledHeight);
}

function fillRoundedRect(ctx, x, y, width, height, radius, fillStyle) {
  ctx.save();
  ctx.beginPath();
  const r = Math.min(radius, width / 2, height / 2);
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.restore();
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    const tentative = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(tentative).width <= maxWidth) {
      currentLine = tentative;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

async function canvasToBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png", 1);
  });
}

async function ensureResultCard() {
  if (currentResultCard?.blob && currentResultCard?.dataUrl) {
    return currentResultCard;
  }

  return generateResultCard();
}

async function generateResultCard() {
  const totalQuestions = filteredQuestions.length;
  const topicLabel = getCurrentTopicLabel();
  const profile = getScoreProfile(score, totalQuestions);
  const studentName = getResultCardStudentName();
  const backgroundPath = chooseRandom(RESULT_CARD_ASSETS.backgrounds);
  const borderPath = chooseRandom(RESULT_CARD_ASSETS.borders);
  const badgePath = getBadgeForProfile(profile);

  let background = null;
  let border = null;
  let badge = null;

  try { background = await loadImage(backgroundPath); } catch (error) { console.warn(error); }
  try { border = await loadImage(borderPath); } catch (error) { console.warn(error); }
  try { badge = await loadImage(badgePath); } catch (error) { console.warn(error); }

  const canvas = resultCanvas;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  // Dark premium base, so the card never looks empty.
  const baseGradient = ctx.createLinearGradient(0, 0, width, height);
  baseGradient.addColorStop(0, "#030705");
  baseGradient.addColorStop(0.45, "#08120d");
  baseGradient.addColorStop(1, "#120d06");
  ctx.fillStyle = baseGradient;
  ctx.fillRect(0, 0, width, height);

  // Background asset.
  if (background) {
    ctx.save();
    ctx.globalAlpha = 0.98;
    coverImage(ctx, background, 0, 0, width, height);
    ctx.restore();
  }

  // Cinematic dark layer, no visible text box.
  const cinematic = ctx.createLinearGradient(0, 0, width, height);
  cinematic.addColorStop(0, "rgba(0, 0, 0, 0.38)");
  cinematic.addColorStop(0.45, "rgba(0, 0, 0, 0.22)");
  cinematic.addColorStop(1, "rgba(0, 0, 0, 0.34)");
  ctx.fillStyle = cinematic;
  ctx.fillRect(0, 0, width, height);

  // Soft center glow only for readability. It is not a rectangle/box.
  const textGlow = ctx.createRadialGradient(width / 2, height * 0.50, 40, width / 2, height * 0.50, 560);
  textGlow.addColorStop(0, "rgba(0, 0, 0, 0.48)");
  textGlow.addColorStop(0.48, "rgba(0, 0, 0, 0.28)");
  textGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = textGlow;
  ctx.fillRect(0, 0, width, height);

  // Badge: centered above the text, small enough to feel premium, not invasive.
  if (badge) {
    ctx.save();
    ctx.globalAlpha = 0.96;
    ctx.shadowColor = "rgba(0, 0, 0, 0.72)";
    ctx.shadowBlur = 22;
    ctx.shadowOffsetY = 8;
    ctx.drawImage(badge, (width / 2) - 70, 112, 140, 140);
    ctx.restore();
  }

  // Border frames the final card.
  if (border) {
    ctx.save();
    ctx.globalAlpha = 0.95;
    ctx.drawImage(border, 0, 0, width, height);
    ctx.restore();
  }

  // Centered premium text.
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.shadowColor = "rgba(0, 0, 0, 0.92)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 6;

  const centerX = width / 2;

  ctx.fillStyle = "#d6b25b";
  ctx.font = "800 34px Arial, sans-serif";
  ctx.fillText("RESULTADO WLF", centerX, 292);

  ctx.fillStyle = "rgba(255, 243, 214, 0.96)";
  ctx.font = "700 28px Arial, sans-serif";
  ctx.fillText(studentName, centerX, 340);

  ctx.fillStyle = "#fff7e6";
  ctx.font = "900 108px Arial, sans-serif";
  ctx.fillText(`${score} / ${totalQuestions}`, centerX, 468);

  ctx.fillStyle = "#f4e4b6";
  ctx.font = "800 50px Arial, sans-serif";
  ctx.fillText(profile.title, centerX, 560);

  ctx.fillStyle = "rgba(255, 248, 232, 0.96)";
  ctx.font = "700 28px Arial, sans-serif";
  ctx.fillText(`Tema: ${topicLabel}`, centerX, 620);

  ctx.fillStyle = "rgba(255, 248, 232, 0.92)";
  ctx.font = "650 30px Arial, sans-serif";
  const phraseLines = wrapText(ctx, profile.phrase, 900);
  phraseLines.slice(0, 2).forEach((line, index) => {
    ctx.fillText(line, centerX, 685 + index * 38);
  });

  ctx.font = "800 24px Arial, sans-serif";
  ctx.fillStyle = "rgba(214, 178, 91, 0.96)";
  ctx.fillText("WLF Trading", centerX, 785);

  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.textAlign = "start";

  const blob = await canvasToBlob(canvas);
  const dataUrl = canvas.toDataURL("image/png", 1);
  const fileName = `wlf-resultado-${slugify(topicLabel)}-${score}-${totalQuestions}.png`;
  const file = blob ? new File([blob], fileName, { type: "image/png" }) : null;
  const resultText = buildResultText();

  if (resultCardPreview) {
    resultCardPreview.src = dataUrl;
  }

  currentResultCard = {
    backgroundPath,
    borderPath,
    badgePath,
    profile,
    blob,
    dataUrl,
    fileName,
    file,
    text: resultText,
    topicLabel,
    totalQuestions,
    score
  };

  return currentResultCard;
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

  question.shuffledOptions = buildShuffledOptions(question);

  answersBox.innerHTML = question.shuffledOptions.map((answer, index) => `
    <button class="answer-option" type="button" data-answer-index="${index}">
      <span>${String.fromCharCode(65 + index)}</span>
      ${answer.option}
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
  const selectedAnswer = question.shuffledOptions?.[answerIndex];
  const correct = Boolean(selectedAnswer?.isCorrect);
  const questionKey = `${question.category}-${question.title}`;

  document.querySelectorAll("[data-answer-index]").forEach((button) => {
    button.disabled = true;

    const index = Number(button.dataset.answerIndex);
    const answer = question.shuffledOptions?.[index];

    if (answer?.isCorrect) {
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

async function showSummary() {
  practiceApp.classList.add("hidden");
  practiceSummary.classList.remove("hidden");
  setShareFeedback("");
  currentResultCard = null;

  const totalQuestions = filteredQuestions.length;
  const topicLabel = getCurrentTopicLabel();
  const profile = getScoreProfile(score, totalQuestions);

  if (summaryTitle) {
    summaryTitle.textContent = profile.title;
  }

  if (summaryText) {
    summaryText.textContent = `Completaste ${totalQuestions} preguntas. Score final: ${score} / ${totalQuestions}. Tu objetivo no es memorizar respuestas, sino fortalecer criterio, lectura y disciplina.`;
  }

  if (summaryScorePill) {
    summaryScorePill.textContent = `Score: ${score} / ${totalQuestions}`;
  }

  if (summaryTopicPill) {
    summaryTopicPill.textContent = `Tema: ${topicLabel}`;
  }

  if (resultCardPreview) {
    resultCardPreview.removeAttribute("src");
    resultCardPreview.alt = "Generando tarjeta de resultado";
  }

  try {
    await generateResultCard();
  } catch (error) {
    console.error(error);
    setShareFeedback("No se pudo generar la imagen ahora mismo. Puedes reiniciar o volver a intentarlo.");
  }
}

function applyFilter(category) {
  currentCategory = category || "all";
  filteredQuestions = buildQuestionList(currentCategory);

  currentIndex = 0;
  score = 0;
  answeredQuestions = new Set();
  currentResultCard = null;

  practiceSummary.classList.add("hidden");
  practiceApp.classList.remove("hidden");
  setShareFeedback("");

  renderQuestion();
}

async function handleDownloadCard() {
  try {
    const result = await ensureResultCard();
    const link = document.createElement("a");
    link.href = result.dataUrl;
    link.download = result.fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setShareFeedback("Imagen descargada. Ya la puedes compartir donde quieras.");
  } catch (error) {
    console.error(error);
    setShareFeedback("No se pudo descargar la imagen en este momento.");
  }
}

async function handleCopyResult() {
  try {
    const result = await ensureResultCard();
    await navigator.clipboard.writeText(result.text);
    setShareFeedback("Resultado copiado. Ya lo puedes pegar donde quieras.");
  } catch (error) {
    console.error(error);
    setShareFeedback("No se pudo copiar el resultado automáticamente.");
  }
}

async function handleNativeShare() {
  try {
    const result = await ensureResultCard();

    // Share image only. Text stays separated in "Copiar texto".
    if (navigator.canShare && result.file && navigator.canShare({ files: [result.file] })) {
      await navigator.share({
        files: [result.file],
        title: "Resultado WLF"
      });
      setShareFeedback("Imagen compartida con éxito.");
      return;
    }

    await handleDownloadCard();
    setShareFeedback("Tu navegador no soporta compartir la imagen directamente. Descargué la imagen para que la puedas enviar.");
  } catch (error) {
    if (error?.name !== "AbortError") {
      console.error(error);
      await handleDownloadCard();
      setShareFeedback("No se pudo compartir directo. Descargué la imagen para que la puedas enviar.");
    }
  }
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
    applyFilter(currentCategory);
  });
}

if (shareToggleBtn) {
  shareToggleBtn.addEventListener("click", handleNativeShare);
}

if (downloadCardBtn) {
  downloadCardBtn.addEventListener("click", handleDownloadCard);
}

if (copyResultBtn) {
  copyResultBtn.addEventListener("click", handleCopyResult);
}




let practiceInitialized = false;

function startPracticeApp() {
  if (practiceInitialized) {
    return;
  }

  practiceInitialized = true;

  if (loadingBox) {
    loadingBox.classList.add("hidden");
  }

  if (practiceApp) {
    practiceApp.classList.remove("hidden");
  }

  applyFilter(currentCategory);
}

try {
  requireActiveUser(function () {
    startPracticeApp();
  });
} catch (error) {
  console.error("Practice auth startup error:", error);

  if (loadingBox) {
    loadingBox.textContent = "Error validando tu acceso. Revisa la consola.";
  }
}

setTimeout(function () {
  if (practiceInitialized) {
    return;
  }

  console.warn("Practice auth callback delayed. Starting practice UI fallback.");
  startPracticeApp();
}, 3000);
