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
  },

  // VOLUMEN / VOLUME PROFILE / VWAP / EMA / SUPPLY-DEMAND / CME / NINJATRADER / GESTIÓN AVANZADA / PSICOLOGÍA - FINAL EXPANSION
  {
    "category": "volumen",
    "title": "Ruptura con volumen decreciente",
    "context": "El precio rompe una resistencia menor, pero el volumen cae durante la ruptura y las velas cierran con poco avance real.",
    "options": [
      "Comprar porque toda ruptura por encima de resistencia confirma continuación.",
      "Ser prudente: ruptura sin participación puede fallar o necesitar aceptación adicional.",
      "Vender automáticamente porque volumen bajo siempre significa reversa.",
      "Ignorar el cierre porque solo importa que el precio tocó arriba."
    ],
    "correct": 1,
    "explanation": "El volumen ayuda a leer participación. Una ruptura con poco interés necesita más confirmación antes de asumir continuación."
  },
  {
    "category": "volumen",
    "title": "Volumen alto en zona de rechazo",
    "context": "El precio llega a resistencia, aparece volumen alto, pero la vela deja mecha superior grande y cierra debajo de la zona.",
    "options": [
      "Asumir compra fuerte porque el volumen fue alto.",
      "Leer posible absorción/rechazo y esperar confirmación antes de vender o descartar longs.",
      "Comprar sin stop porque el volumen confirma intención alcista.",
      "Ignorar la mecha porque el volumen decide todo."
    ],
    "correct": 1,
    "explanation": "Volumen alto no siempre es compra. En resistencia, con mecha y cierre débil, puede mostrar absorción o rechazo."
  },
  {
    "category": "volumen",
    "title": "Impulso con volumen sano",
    "context": "El mercado rompe estructura alcista con velas amplias, cierres cerca del máximo y volumen creciente frente a las velas previas.",
    "options": [
      "Puede confirmar intención si además la ubicación y el riesgo son lógicos.",
      "Obliga a comprar aunque el precio esté lejos de cualquier zona.",
      "Significa que ya no puede retroceder.",
      "Invalida cualquier retest porque el volumen fue alto."
    ],
    "correct": 0,
    "explanation": "Volumen creciente con desplazamiento puede apoyar la lectura, pero no elimina la necesidad de buena entrada, stop y contexto."
  },
  {
    "category": "volumen",
    "title": "Volumen climático después de movimiento extendido",
    "context": "Después de una subida larga, aparece una vela enorme con volumen extremo justo en resistencia diaria.",
    "options": [
      "Comprar porque el volumen extremo confirma que todos quieren subir.",
      "Considerar posible clímax o toma de liquidez y esperar reacción posterior.",
      "Vender sin confirmación porque volumen alto siempre marca techo.",
      "Eliminar la resistencia porque el volumen fue grande."
    ],
    "correct": 1,
    "explanation": "En zonas extendidas, volumen extremo puede ser continuación o clímax. La reacción posterior ayuda a diferenciarlo."
  },
  {
    "category": "volumen",
    "title": "Volumen bajo en pullback ordenado",
    "context": "La tendencia es alcista. El precio retrocede lentamente hacia una zona de interés con volumen menor que el impulso previo.",
    "options": [
      "Puede ser un pullback sano si luego aparece reacción compradora.",
      "Es señal de venta obligatoria porque el volumen bajó.",
      "Comprar cualquier vela del retroceso sin esperar reacción.",
      "Ignorar la tendencia porque el volumen bajo invalida todo."
    ],
    "correct": 0,
    "explanation": "Un retroceso con menos volumen puede mostrar poca presión contraria. Aun así, la entrada necesita reacción y riesgo lógico."
  },
  {
    "category": "volumen",
    "title": "Volumen alto pero sin desplazamiento",
    "context": "Durante varios minutos aparece mucho volumen, pero el precio apenas se mueve dentro de una zona estrecha.",
    "options": [
      "Pensar que puede haber absorción o batalla entre compradores y vendedores.",
      "Asumir continuación inmediata en cualquier dirección.",
      "Entrar al azar porque mucho volumen significa oportunidad segura.",
      "Quitar el stop porque el precio está comprimido."
    ],
    "correct": 0,
    "explanation": "Mucho volumen sin avance puede indicar absorción. La dirección se aclara mejor con ruptura, aceptación o rechazo."
  },
  {
    "category": "volumen",
    "title": "Divergencia entre precio y volumen",
    "context": "El precio hace un nuevo máximo, pero el volumen es menor que en el máximo anterior y la vela cierra débil.",
    "options": [
      "Comprar porque nuevo máximo siempre confirma fuerza.",
      "Vigilar posible agotamiento; el nuevo high no muestra la misma participación.",
      "Vender automáticamente sin esperar estructura.",
      "Ignorar el volumen porque solo importan los máximos."
    ],
    "correct": 1,
    "explanation": "Un nuevo máximo con menor participación y cierre débil puede advertir agotamiento, no una entrada automática."
  },
  {
    "category": "volumen",
    "title": "Volumen de confirmación en retest",
    "context": "El precio rompe soporte, vuelve a testearlo desde abajo y aparece rechazo con aumento de volumen vendedor.",
    "options": [
      "Puede apoyar una continuación bajista si el stop y el target tienen sentido.",
      "Comprar porque volvió a soporte y soporte siempre sostiene.",
      "Vender sin mirar obstáculos porque el volumen subió.",
      "Ignorar el retest porque la ruptura ya pasó."
    ],
    "correct": 0,
    "explanation": "Volumen en el rechazo del retest puede confirmar participación, pero la operación sigue dependiendo de gestión y ubicación."
  },
  {
    "category": "volumen",
    "title": "Volumen en horario muerto",
    "context": "Ves una vela con volumen algo mayor durante una hora de baja liquidez, pero sigue dentro de rango y sin zona clara.",
    "options": [
      "Entrar porque cualquier aumento de volumen es señal suficiente.",
      "Comparar contra el contexto horario y esperar estructura; puede ser ruido relativo.",
      "Aumentar contratos porque el mercado está tranquilo.",
      "Ignorar la sesión y operar como noticia de alto impacto."
    ],
    "correct": 1,
    "explanation": "El volumen debe leerse relativo a la sesión y al contexto. Un aumento aislado en rango no basta."
  },
  {
    "category": "volumen",
    "title": "Volumen como filtro, no como gatillo único",
    "context": "Tu setup técnico no está completo, pero el volumen empieza a subir y sientes ganas de anticiparte.",
    "options": [
      "Entrar porque el volumen se adelantó al patrón.",
      "Usar el volumen como filtro, no como excusa para saltarte confirmaciones.",
      "Quitar la checklist porque el volumen es más avanzado.",
      "Operar con más tamaño antes de que otros entren."
    ],
    "correct": 1,
    "explanation": "El volumen aporta lectura, pero no reemplaza estructura, zona, confirmación y gestión."
  },
  {
    "category": "volumeprofile",
    "title": "POC en mitad de rango",
    "context": "El Volume Profile muestra el POC justo en el centro del rango del día, mientras el precio también está en esa zona.",
    "options": [
      "Operar ahí porque el POC siempre da entradas fuertes.",
      "Reconocer zona de valor/negociación y esperar extremos o desplazamiento claro.",
      "Comprar porque el POC atrae precio hacia arriba.",
      "Vender porque el POC rechaza todo movimiento."
    ],
    "correct": 1,
    "explanation": "El POC suele marcar área de mayor negociación. En mitad de rango puede ser zona de ruido, no necesariamente entrada."
  },
  {
    "category": "volumeprofile",
    "title": "Precio rechaza VAL con contexto alcista",
    "context": "La estructura intradía es alcista. El precio vuelve a VAL, rechaza con mecha y recupera rápidamente el valor.",
    "options": [
      "Puede ser zona interesante si hay reacción, stop lógico y target hacia VAH/POC.",
      "Comprar siempre todo toque de VAL sin mirar tendencia.",
      "Vender porque VAL significa que el precio debe caer más.",
      "Ignorar el perfil porque la estructura ya basta."
    ],
    "correct": 0,
    "explanation": "VAL puede actuar como zona de decisión. Con estructura alcista y rechazo, puede ayudar a construir una idea, no garantizarla."
  },
  {
    "category": "volumeprofile",
    "title": "Aceptación fuera del área de valor",
    "context": "El precio rompe por encima de VAH y en vez de volver al rango, empieza a construir velas cerrando fuera del área de valor.",
    "options": [
      "Asumir falsa ruptura porque todo precio vuelve al value area.",
      "Considerar aceptación fuera de valor y posible expansión si el contexto acompaña.",
      "Vender automáticamente en VAH sin mirar cierres.",
      "Ignorar VAH porque solo importa el último candle."
    ],
    "correct": 1,
    "explanation": "Cerrar y sostenerse fuera del área de valor puede mostrar aceptación, distinto de una simple barrida."
  },
  {
    "category": "volumeprofile",
    "title": "HVN como zona de fricción",
    "context": "Tu long tiene buen entry, pero justo arriba hay un HVN grande donde el precio ya pasó mucho tiempo antes.",
    "options": [
      "Ignorar el HVN porque el target original es más alto.",
      "Considerar que el HVN puede frenar el avance y ajustar gestión/target.",
      "Aumentar tamaño porque el HVN atraerá precio sin resistencia.",
      "Quitar el target para ver si rompe todo."
    ],
    "correct": 1,
    "explanation": "Un HVN puede actuar como zona de fricción o aceptación previa. Debe considerarse en el recorrido del trade."
  },
  {
    "category": "volumeprofile",
    "title": "LVN y movimiento rápido",
    "context": "El precio rompe una zona y entra en un LVN donde históricamente negoció poco volumen.",
    "options": [
      "Puede moverse rápido por esa zona si hay aceptación del rompimiento.",
      "Siempre debe rechazar el LVN al primer toque.",
      "No se puede operar cerca de LVN bajo ningún caso.",
      "El LVN garantiza target completo sin gestión."
    ],
    "correct": 0,
    "explanation": "Las zonas de bajo volumen pueden facilitar desplazamiento si el mercado acepta moverse a través de ellas."
  },
  {
    "category": "volumeprofile",
    "title": "POC anterior como imán",
    "context": "El precio abre lejos del POC del día anterior y empieza a rotar sin dirección clara hacia esa zona.",
    "options": [
      "El POC anterior puede actuar como referencia, pero no como entrada automática.",
      "Comprar solo porque el POC está arriba.",
      "Vender solo porque el precio está debajo del POC.",
      "Ignorar el contexto actual porque el POC antiguo manda siempre."
    ],
    "correct": 0,
    "explanation": "Un POC previo puede ser un imán o referencia de valor, pero necesita estructura actual para convertirse en operación."
  },
  {
    "category": "volumeprofile",
    "title": "Perfil fino y tendencia fuerte",
    "context": "El día construye un perfil delgado con poco balance y el precio sigue haciendo nuevos extremos en la misma dirección.",
    "options": [
      "Tratarlo como rango normal y vender cada extremo.",
      "Reconocer posible día tendencial y ser cuidadoso con operaciones contra el flujo.",
      "Comprar cualquier vela sin esperar pullback.",
      "Ignorar el perfil porque solo sirve en rangos."
    ],
    "correct": 1,
    "explanation": "Un perfil delgado puede reflejar distribución direccional. En días tendenciales, fade de extremos puede ser peligroso."
  },
  {
    "category": "volumeprofile",
    "title": "Perfil balanceado después de noticia",
    "context": "Después de una noticia fuerte, el precio vuelve al área de valor y empieza a construir mucho volumen alrededor del POC.",
    "options": [
      "Asumir continuación inmediata por la noticia anterior.",
      "Leer posible balance temporal y esperar ruptura/aceptación fuera del valor.",
      "Operar cada toque del POC como señal perfecta.",
      "Aumentar lotaje porque el mercado se calmó."
    ],
    "correct": 1,
    "explanation": "Después de volatilidad, el mercado puede entrar en balance. El POC puede volverse centro de negociación, no gatillo solo."
  },
  {
    "category": "volumeprofile",
    "title": "VAH como target realista",
    "context": "Tomas un long desde VAL con buena reacción. El target emocional está muy arriba, pero VAH está cerca y coincide con resistencia menor.",
    "options": [
      "Evaluar VAH como objetivo parcial o zona de gestión.",
      "Ignorar VAH porque los targets grandes pagan más.",
      "Cerrar todo inmediatamente en POC siempre.",
      "Mover el stop más lejos para buscar más distancia."
    ],
    "correct": 0,
    "explanation": "VAH puede ser un target lógico dentro de un día balanceado, especialmente si coincide con otra zona técnica."
  },
  {
    "category": "volumeprofile",
    "title": "Volume Profile sin contexto temporal",
    "context": "Ves un POC fuerte de una sesión anterior, pero no revisas si pertenece a una noticia, overnight o sesión regular.",
    "options": [
      "Usarlo igual porque todo POC tiene el mismo peso.",
      "Revisar de qué sesión viene y si sigue siendo relevante para el contexto actual.",
      "Eliminar todos los POC antiguos siempre.",
      "Entrar apenas el precio lo toque."
    ],
    "correct": 1,
    "explanation": "La relevancia del perfil depende de sesión, contexto y actualidad. No todos los POC pesan igual."
  },
  {
    "category": "vwap",
    "title": "Precio sobre VWAP pero extendido",
    "context": "El precio está por encima de VWAP y la tendencia intradía es alcista, pero ya está muy lejos de la media y cerca de resistencia.",
    "options": [
      "Comprar porque estar arriba de VWAP siempre es long.",
      "Evitar perseguir precio; esperar pullback, aceptación o mejor ubicación.",
      "Vender automáticamente porque está lejos de VWAP.",
      "Ignorar resistencia porque VWAP manda."
    ],
    "correct": 1,
    "explanation": "VWAP ayuda al sesgo intradía, pero una entrada extendida cerca de resistencia puede tener mal riesgo."
  },
  {
    "category": "vwap",
    "title": "Reclaim de VWAP después de barrida",
    "context": "El precio barre mínimos, recupera fuerte y cierra nuevamente por encima de VWAP con desplazamiento.",
    "options": [
      "Puede sugerir cambio de control si además hay estructura y riesgo aceptable.",
      "Comprar siempre cualquier cierre sobre VWAP.",
      "Vender porque antes estaba debajo de VWAP.",
      "Ignorar la barrida porque VWAP es suficiente."
    ],
    "correct": 0,
    "explanation": "Recuperar VWAP tras barrida puede ser potente, pero la confluencia y la gestión siguen siendo necesarias."
  },
  {
    "category": "vwap",
    "title": "VWAP plana en rango",
    "context": "VWAP está casi plana y el precio cruza arriba y abajo muchas veces dentro de un rango estrecho.",
    "options": [
      "Tomar cada cruce como señal de entrada.",
      "Reconocer que VWAP puede perder claridad direccional en rango y buscar extremos/contexto.",
      "Comprar solo arriba y vender solo abajo sin filtros.",
      "Aumentar frecuencia porque hay muchas señales."
    ],
    "correct": 1,
    "explanation": "Cuando VWAP está plana y el precio la cruza repetidamente, puede generar ruido si se usa como gatillo único."
  },
  {
    "category": "vwap",
    "title": "Rechazo de VWAP en tendencia bajista",
    "context": "El mercado viene bajista. El precio vuelve a VWAP desde abajo, deja rechazo y no logra cerrar por encima.",
    "options": [
      "Puede ser zona de continuación bajista si aparece confirmación y R:R.",
      "Comprar porque VWAP siempre actúa como soporte.",
      "Vender sin stop porque rechazó una vez.",
      "Ignorar la tendencia porque VWAP fue tocada."
    ],
    "correct": 0,
    "explanation": "En tendencia bajista, VWAP puede actuar como referencia de valor para buscar continuación, no de forma automática."
  },
  {
    "category": "vwap",
    "title": "Cruce de VWAP sin volumen",
    "context": "El precio cruza VWAP por pocos ticks, con vela pequeña y volumen bajo, justo en mitad de rango.",
    "options": [
      "Comprar porque el cruce activa señal alcista.",
      "Esperar más aceptación; un cruce débil en rango suele ser ruido.",
      "Vender porque todo cruce débil falla.",
      "Aumentar tamaño porque el stop será corto."
    ],
    "correct": 1,
    "explanation": "El cruce por sí solo no basta. La aceptación y el contexto deciden si VWAP aporta valor."
  },
  {
    "category": "vwap",
    "title": "VWAP como zona de gestión",
    "context": "Estás long desde un pullback. El precio se acerca a VWAP desde abajo y allí coincide un swing high menor.",
    "options": [
      "Considerar VWAP como posible obstáculo o zona para gestionar parcial/stop.",
      "Ignorarla porque tu target está más arriba.",
      "Comprar más justo debajo de VWAP sin confirmación.",
      "Cerrar solo si VWAP se rompe por 1 tick."
    ],
    "correct": 0,
    "explanation": "VWAP puede funcionar como referencia de valor y fricción. Conviene integrarla en la gestión, no usarla aislada."
  },
  {
    "category": "vwap",
    "title": "VWAP y noticia de alto impacto",
    "context": "El precio está respetando VWAP, pero faltan dos minutos para una noticia de alto impacto.",
    "options": [
      "Entrar porque VWAP hará de soporte aunque salga la noticia.",
      "Ser prudente: la volatilidad de la noticia puede invalidar la lectura de VWAP.",
      "Aumentar tamaño porque VWAP da precisión.",
      "Quitar stop para evitar spikes."
    ],
    "correct": 1,
    "explanation": "Cerca de noticias, las referencias intradía pueden ser atravesadas por volatilidad. El riesgo cambia."
  },
  {
    "category": "vwap",
    "title": "VWAP y apertura con gap",
    "context": "El mercado abre con gap fuerte y VWAP empieza a formarse lejos del cierre anterior. Los primeros minutos son muy volátiles.",
    "options": [
      "Usar VWAP como verdad absoluta desde el primer tick.",
      "Esperar que VWAP tenga más datos y observar aceptación inicial antes de decidir.",
      "Operar cada toque porque el gap aumenta precisión.",
      "Ignorar completamente VWAP por todo el día."
    ],
    "correct": 1,
    "explanation": "Al inicio, VWAP tiene poca información y puede moverse rápido. Esperar contexto mejora la lectura."
  },
  {
    "category": "vwap",
    "title": "Precio bajo VWAP pero en soporte mayor",
    "context": "El precio está bajo VWAP, pero llega a soporte diario y muestra rechazo fuerte con barrida de mínimos.",
    "options": [
      "Vender porque bajo VWAP siempre es bearish.",
      "No simplificar: soporte mayor y barrida pueden exigir más contexto antes de vender.",
      "Comprar sin confirmación porque el soporte diario manda siempre.",
      "Eliminar VWAP del gráfico porque contradice el soporte."
    ],
    "correct": 1,
    "explanation": "VWAP es una referencia intradía. Una zona mayor puede cambiar la lectura; se necesita confluencia y confirmación."
  },
  {
    "category": "vwap",
    "title": "VWAP como excusa emocional",
    "context": "Querías entrar long por FOMO. Ves que el precio está sobre VWAP y lo usas como única justificación.",
    "options": [
      "Entrar porque VWAP confirma el sesgo.",
      "Revisar si VWAP realmente forma parte del setup o solo estás justificando una emoción.",
      "Aumentar tamaño porque hay una señal técnica.",
      "Ignorar el plan si el precio se escapa."
    ],
    "correct": 1,
    "explanation": "VWAP no debe usarse para decorar una entrada emocional. Debe tener función dentro del plan."
  },
  {
    "category": "ema",
    "title": "EMA 20 como guía, no soporte mágico",
    "context": "El precio toca la EMA 20 en tendencia alcista, pero llega con vela bajista fuerte y rompe micro estructura.",
    "options": [
      "Comprar porque la EMA 20 siempre sostiene tendencia.",
      "Esperar reacción; la EMA orienta, pero no invalida una llegada agresiva.",
      "Vender automáticamente porque tocó la EMA.",
      "Quitar el stop porque la media protege."
    ],
    "correct": 1,
    "explanation": "La EMA puede guiar el flujo, pero la acción del precio alrededor de ella sigue mandando."
  },
  {
    "category": "ema",
    "title": "EMA 20 y EMA 200 alineadas",
    "context": "El precio está por encima de EMA 20 y EMA 200, ambas inclinadas al alza, pero el precio está lejos de la EMA 20.",
    "options": [
      "Comprar inmediatamente porque las EMAs están alineadas.",
      "Mantener sesgo alcista, pero esperar mejor ubicación o pullback.",
      "Vender porque estar lejos de la EMA siempre revierte.",
      "Ignorar las EMAs porque solo sirven para principiantes."
    ],
    "correct": 1,
    "explanation": "La alineación ayuda al sesgo, pero no justifica perseguir precio extendido."
  },
  {
    "category": "ema",
    "title": "Cruce de EMAs dentro de rango",
    "context": "EMA rápida cruza por encima de EMA lenta, pero el precio sigue atrapado entre soporte y resistencia con mechas constantes.",
    "options": [
      "Comprar porque el cruce confirma nueva tendencia.",
      "Filtrar: en rango los cruces pueden generar señales falsas.",
      "Vender porque todo cruce en rango falla.",
      "Operar cada cruce para capturar el inicio."
    ],
    "correct": 1,
    "explanation": "Los cruces funcionan peor en consolidación. El contexto de rango reduce su calidad."
  },
  {
    "category": "ema",
    "title": "EMA 200 como zona de decisión",
    "context": "El precio cae hacia EMA 200, que coincide con soporte mayor. La llegada es rápida, pero aparece rechazo inicial.",
    "options": [
      "Comprar solo porque tocó EMA 200.",
      "Observar si el rechazo confirma defensa real y ofrece riesgo lógico.",
      "Vender porque una llegada rápida siempre rompe la EMA.",
      "Ignorar el soporte porque la EMA es suficiente."
    ],
    "correct": 1,
    "explanation": "La confluencia EMA 200 + soporte puede importar, pero el trade nace de reacción y gestión."
  },
  {
    "category": "ema",
    "title": "Pendiente de EMA cambiando",
    "context": "La EMA 20 venía subiendo, pero empieza a aplanarse mientras el precio falla en hacer nuevos máximos.",
    "options": [
      "Seguir comprando igual porque la EMA aún está debajo del precio.",
      "Leer posible pérdida de momentum y esperar nueva confirmación.",
      "Vender sin confirmación porque la EMA se aplanó.",
      "Cambiar el periodo hasta que se vea mejor."
    ],
    "correct": 1,
    "explanation": "La pendiente de la EMA aporta lectura de ritmo. Aplanamiento con fallos de máximos puede mostrar pausa o agotamiento."
  },
  {
    "category": "ema",
    "title": "Precio entre EMAs importantes",
    "context": "El precio está entre EMA 20 bajista y EMA 200 plana, sin estructura clara y con velas cruzadas.",
    "options": [
      "Operar cada toque de EMA porque hay muchas referencias.",
      "Aceptar que el contexto está mixto y esperar salida o mejor zona.",
      "Comprar porque está sobre una de las EMAs.",
      "Vender porque está debajo de la otra EMA."
    ],
    "correct": 1,
    "explanation": "Entre medias importantes el precio puede comprimirse. Una señal aislada puede tener baja calidad."
  },
  {
    "category": "ema",
    "title": "EMA como trailing mental",
    "context": "Vas en una operación ganadora a favor de tendencia. El precio respeta EMA 20 en cada pullback, pero aún no rompe estructura.",
    "options": [
      "Usar la EMA como referencia de gestión, sin salir por cualquier toque pequeño.",
      "Cerrar en cada toque de EMA porque es peligro.",
      "Mover stop al azar encima/debajo de la EMA sin plan.",
      "Aumentar tamaño cada vez que toca la EMA."
    ],
    "correct": 0,
    "explanation": "La EMA puede ayudar a gestionar una tendencia, pero debe combinarse con estructura y plan de salida."
  },
  {
    "category": "ema",
    "title": "EMA y temporalidades mezcladas",
    "context": "En 5 minutos la EMA 20 se ve bajista, pero en 1 hora el precio sigue sobre EMA 200 y estructura alcista.",
    "options": [
      "Cambiar todo el sesgo por la EMA de 5 minutos.",
      "Separar lectura menor y mayor antes de decidir si es pullback o reversa.",
      "Ignorar siempre las EMAs de temporalidad menor.",
      "Operar ambos sentidos para no perder oportunidad."
    ],
    "correct": 1,
    "explanation": "Las EMAs deben leerse por jerarquía temporal. Una señal menor puede ser solo retroceso dentro de estructura mayor."
  },
  {
    "category": "ema",
    "title": "EMA después de noticia",
    "context": "Una noticia atraviesa EMA 20 y EMA 200 en segundos, dejando mechas enormes y spreads amplios.",
    "options": [
      "Operar el primer cruce porque es señal fuerte.",
      "Esperar estabilización; la noticia puede romper referencias técnicas temporalmente.",
      "Aumentar lotaje porque hay movimiento.",
      "Eliminar stops porque las mechas son normales."
    ],
    "correct": 1,
    "explanation": "Durante noticias, las medias pueden perder valor operativo inmediato por volatilidad y ejecución difícil."
  },
  {
    "category": "ema",
    "title": "EMA para justificar entrada tarde",
    "context": "El precio ya subió fuerte. Quieres entrar tarde y notas que sigue por encima de EMA 20.",
    "options": [
      "Entrar porque estar sobre EMA confirma fuerza.",
      "No usar la EMA para justificar FOMO; evaluar ubicación, stop y recorrido.",
      "Comprar más grande porque la EMA está inclinada.",
      "Mover el target más lejos para compensar entrada mala."
    ],
    "correct": 1,
    "explanation": "Una EMA favorable no arregla una entrada perseguida. El precio, el riesgo y la ubicación siguen importando."
  },
  {
    "category": "supplydemand",
    "title": "Demanda fresca vs demanda testeada",
    "context": "El precio vuelve a una zona de demanda que ya reaccionó tres veces y cada rebote fue más débil.",
    "options": [
      "Comprar con más confianza porque la zona funcionó varias veces.",
      "Considerar que la zona puede estar debilitándose por múltiples visitas.",
      "Vender automáticamente porque toda tercera visita rompe.",
      "Mover la demanda más abajo para mantener la idea."
    ],
    "correct": 1,
    "explanation": "Las zonas pueden perder fuerza tras varias mitigaciones. No basta con que hayan funcionado antes."
  },
  {
    "category": "supplydemand",
    "title": "Oferta con desplazamiento real",
    "context": "Antes de una caída fuerte hubo una pequeña consolidación. Luego el precio rompe estructura con velas amplias y deja una zona de oferta clara.",
    "options": [
      "Marcarla como posible zona de interés para un retest con rechazo.",
      "Vender inmediatamente aunque el precio esté lejos.",
      "Comprar porque la consolidación fue pequeña.",
      "Ignorar el desplazamiento porque solo importa el color de la última vela."
    ],
    "correct": 0,
    "explanation": "Una zona de oferta gana valor cuando origina desplazamiento y cambio de estructura, pero se opera al retorno con confirmación."
  },
  {
    "category": "supplydemand",
    "title": "Zona en mitad de balance",
    "context": "Identificas una demanda dentro del centro de un rango amplio, con oferta cercana justo encima.",
    "options": [
      "Tomarla como zona premium porque se ve limpia.",
      "Ser selectivo: en mitad de balance el recorrido puede estar bloqueado.",
      "Comprar con más contratos por stop pequeño.",
      "Ignorar las zonas cercanas porque la demanda manda."
    ],
    "correct": 1,
    "explanation": "Una zona limpia puede tener mala ubicación. En mitad del rango, el R:R y los obstáculos suelen empeorar."
  },
  {
    "category": "supplydemand",
    "title": "Demanda rota con aceptación",
    "context": "El precio entra en demanda, no reacciona, cierra debajo y luego la retestea desde abajo como resistencia.",
    "options": [
      "Mantener compras porque la zona original era buena.",
      "Considerar que la demanda se invalidó y puede actuar como oferta/flip.",
      "Promediar porque ahora el precio está más barato.",
      "Eliminar el stop para esperar recuperación."
    ],
    "correct": 1,
    "explanation": "Una zona rota y aceptada puede cambiar de función. No se defiende una idea invalidada."
  },
  {
    "category": "supplydemand",
    "title": "Oferta fresca pero contra tendencia fuerte",
    "context": "Aparece una oferta limpia, pero el mercado viene haciendo máximos y mínimos crecientes con fuerte presión compradora.",
    "options": [
      "Vender porque toda oferta fresca debe reaccionar.",
      "Exigir más confirmación si la zona va contra una tendencia dominante.",
      "Ignorar la tendencia porque la zona está fresca.",
      "Vender sin stop por ser zona institucional."
    ],
    "correct": 1,
    "explanation": "La frescura ayuda, pero no vence automáticamente una tendencia fuerte. Contra flujo se necesita más evidencia."
  },
  {
    "category": "supplydemand",
    "title": "Zona amplia y tamaño de posición",
    "context": "La demanda es válida, pero mide muchos ticks y el stop lógico queda demasiado grande para tu plan.",
    "options": [
      "Reducir tamaño, esperar entrada más fina o descartar.",
      "Tomarla igual porque la zona es buena.",
      "Poner el stop dentro de la zona al azar para reducir riesgo.",
      "Aumentar contratos porque la zona amplia protege."
    ],
    "correct": 0,
    "explanation": "Una zona válida no justifica romper el riesgo. El tamaño y la invalidación deben tener sentido."
  },
  {
    "category": "supplydemand",
    "title": "Supply y liquidez encima",
    "context": "El precio se acerca a oferta, pero justo encima hay equal highs muy claros que aún no han sido tomados.",
    "options": [
      "Vender al primer toque de oferta sin mirar la liquidez.",
      "Considerar que el precio puede barrer esos highs antes de reaccionar.",
      "Comprar porque toda liquidez encima garantiza continuación.",
      "Eliminar la oferta porque hay equal highs."
    ],
    "correct": 1,
    "explanation": "La liquidez cercana puede cambiar el timing. Una zona puede reaccionar después de una barrida, no siempre al primer toque."
  },
  {
    "category": "supplydemand",
    "title": "Demanda con reacción débil",
    "context": "El precio llega a demanda, rebota pocos ticks y vuelve rápidamente a la zona con velas bajistas fuertes.",
    "options": [
      "Comprar más porque la zona está dando mejor precio.",
      "Tener cuidado: la reacción débil puede anticipar ruptura o absorción.",
      "Cerrar los ojos al contexto porque la demanda sigue marcada.",
      "Subir lotaje para compensar el segundo toque."
    ],
    "correct": 1,
    "explanation": "La calidad de la reacción importa. Si la zona no impulsa, puede estar perdiendo defensa."
  },
  {
    "category": "supplydemand",
    "title": "Origen del movimiento vs última vela",
    "context": "Quieres marcar demanda. La última vela bajista existe, pero el origen real del desplazamiento parece estar en una base más amplia justo debajo.",
    "options": [
      "Marcar siempre solo la última vela sin pensar.",
      "Evaluar el origen completo del desplazamiento y la zona que realmente causó el movimiento.",
      "Marcar todo el gráfico para no fallar.",
      "Ignorar bases porque solo importan velas individuales."
    ],
    "correct": 1,
    "explanation": "Supply/Demand no es solo pintar la última vela. Importa identificar dónde nació la intención real."
  },
  {
    "category": "supplydemand",
    "title": "Demanda y target bloqueado",
    "context": "La entrada desde demanda se ve buena, pero antes del target hay POC, VWAP y un swing high reciente.",
    "options": [
      "Ignorar obstáculos porque la demanda es fuerte.",
      "Ajustar expectativa: el camino al target tiene zonas de fricción.",
      "Aumentar stop para buscar target más alto.",
      "Cerrar la operación antes de entrar porque hay demasiadas herramientas."
    ],
    "correct": 1,
    "explanation": "Una buena zona de entrada necesita recorrido limpio o gestión realista. Los obstáculos reducen calidad."
  },
  {
    "category": "cmestrikes",
    "title": "Strike cercano como referencia, no señal",
    "context": "El precio se acerca a un strike importante del CME, pero no hay reacción, volumen ni estructura clara alrededor.",
    "options": [
      "Entrar porque el strike por sí solo es señal suficiente.",
      "Usarlo como referencia y esperar comportamiento del precio alrededor.",
      "Vender siempre debajo de un strike importante.",
      "Comprar siempre encima de un strike importante."
    ],
    "correct": 1,
    "explanation": "Un strike puede ser zona de interés, pero no reemplaza confirmación de precio, liquidez y riesgo."
  },
  {
    "category": "cmestrikes",
    "title": "Strike con confluencia de liquidez",
    "context": "Un strike relevante coincide con equal highs y resistencia intradía. El precio barre la zona y vuelve debajo con rechazo.",
    "options": [
      "Puede ser una lectura interesante si aparece confirmación y stop lógico.",
      "Vender sin esperar porque strike + equal highs nunca falla.",
      "Comprar porque tocar strike garantiza continuación.",
      "Ignorar la barrida porque solo importa el nivel del strike."
    ],
    "correct": 0,
    "explanation": "La confluencia puede mejorar la lectura, pero la entrada debe construirse con confirmación y gestión."
  },
  {
    "category": "cmestrikes",
    "title": "Precio magnetizado hacia strike",
    "context": "Durante la sesión, el precio rota varias veces hacia un strike redondo y el mercado pierde dirección clara.",
    "options": [
      "Operar cada llegada al strike como entrada automática.",
      "Reconocer posible zona de atracción/balance y esperar ruptura o rechazo claro.",
      "Aumentar frecuencia porque el nivel se toca muchas veces.",
      "Ignorar el rango porque el strike resolverá la dirección."
    ],
    "correct": 1,
    "explanation": "Un strike puede actuar como imán, pero si el precio balancea alrededor, las entradas pueden volverse ruidosas."
  },
  {
    "category": "cmestrikes",
    "title": "Strike lejano y sesgo forzado",
    "context": "Ves un strike importante lejos del precio y empiezas a buscar entradas solo porque quieres que el mercado llegue allí.",
    "options": [
      "Construir el trade solo por el objetivo del strike.",
      "Evitar forzar sesgo; el camino hasta el strike debe tener estructura y oportunidad real.",
      "Entrar con stop grande porque el objetivo está lejos.",
      "Ignorar zonas intermedias para no perder el movimiento."
    ],
    "correct": 1,
    "explanation": "Un nivel objetivo no crea una operación por sí mismo. El trayecto importa tanto como el destino."
  },
  {
    "category": "cmestrikes",
    "title": "Strike y noticia de volatilidad",
    "context": "El precio está cerca de un strike relevante, pero falta una noticia capaz de expandir volatilidad y spreads.",
    "options": [
      "Entrar antes porque el strike dará precisión.",
      "Reducir confianza operativa: la noticia puede atravesar niveles técnicos con facilidad.",
      "Aumentar contratos porque habrá movimiento.",
      "Quitar stop para evitar barridas."
    ],
    "correct": 1,
    "explanation": "Los strikes pueden importar, pero en noticias la ejecución y la volatilidad alteran el riesgo."
  },
  {
    "category": "cmestrikes",
    "title": "Strike roto con aceptación",
    "context": "El precio atraviesa un strike importante, retestea desde arriba y sigue cerrando por encima con volumen decente.",
    "options": [
      "Asumir que debe volver debajo porque todo strike rechaza.",
      "Considerar aceptación por encima si estructura y gestión acompañan.",
      "Vender sin mirar la aceptación porque el strike era fuerte.",
      "Ignorar el retest porque ya rompió una vez."
    ],
    "correct": 1,
    "explanation": "Un strike no siempre rechaza. Si el mercado acepta por encima, puede cambiar de referencia."
  },
  {
    "category": "cmestrikes",
    "title": "Dos strikes cercanos",
    "context": "El precio se mueve entre dos strikes cercanos y las velas muestran indecisión, sin romper ninguno con intención.",
    "options": [
      "Tomar muchas operaciones pequeñas entre ambos sin plan.",
      "Esperar que uno sea aceptado o rechazado con claridad antes de dar peso direccional.",
      "Comprar en el strike inferior siempre.",
      "Vender en el strike superior siempre."
    ],
    "correct": 1,
    "explanation": "Entre referencias cercanas puede haber ruido. La claridad aparece con aceptación, rechazo o salida del balance."
  },
  {
    "category": "cmestrikes",
    "title": "Strike contra zona mayor",
    "context": "Un strike sugiere posible atracción alcista, pero antes de llegar hay una oferta diaria fuerte y estructura débil.",
    "options": [
      "Ignorar la oferta porque el strike atrae precio.",
      "Pesar el strike contra las zonas mayores y no asumir recorrido libre.",
      "Comprar con target al strike sin mirar obstáculos.",
      "Eliminar el strike porque hay oferta."
    ],
    "correct": 1,
    "explanation": "Los strikes son una referencia más. Las zonas mayores y la estructura pueden bloquear el camino."
  },
  {
    "category": "cmestrikes",
    "title": "Strike usado como stop exacto",
    "context": "Quieres poner el stop exactamente en el strike porque parece un número limpio y todos lo ven.",
    "options": [
      "Ponerlo ahí porque los números limpios son más seguros.",
      "Evitar stops demasiado obvios; la invalidación debe venir de estructura, no solo del número.",
      "Quitar stop porque el strike protege.",
      "Aumentar tamaño porque el stop es fácil de recordar."
    ],
    "correct": 1,
    "explanation": "Los niveles obvios pueden ser zonas de liquidez. El stop debe responder a invalidación real."
  },
  {
    "category": "cmestrikes",
    "title": "Strike como parte del mapa",
    "context": "Tienes estructura, liquidez, VWAP y un strike relevante alineados en la misma zona de decisión.",
    "options": [
      "Usar el strike como una confluencia adicional, no como razón única.",
      "Entrar sin esperar reacción porque hay muchas herramientas.",
      "Ignorar todo lo demás y operar solo el strike.",
      "Aumentar riesgo porque hay más confluencias."
    ],
    "correct": 0,
    "explanation": "La confluencia suma, pero no elimina el proceso. La reacción y el riesgo siguen decidiendo."
  },
  {
    "category": "ninjatrader",
    "title": "ATM no confirmado antes de entrar",
    "context": "Vas a entrar en vivo y notas que el ATM seleccionado no es el que usas normalmente para esa estrategia.",
    "options": [
      "Entrar igual y corregir después si hace falta.",
      "Detenerte y confirmar ATM, stop, target y tamaño antes de enviar la orden.",
      "Entrar con mercado rápido para no perder la oportunidad.",
      "Quitar el ATM y gestionar mentalmente."
    ],
    "correct": 1,
    "explanation": "La plataforma forma parte del riesgo. Un ATM incorrecto puede convertir un buen setup en mala ejecución."
  },
  {
    "category": "ninjatrader",
    "title": "Sim vs Live confundidos",
    "context": "Tu gráfico se ve listo para operar, pero no confirmaste si estás en cuenta Sim o Live antes de presionar Buy/Sell.",
    "options": [
      "Operar porque el setup es más importante que la cuenta.",
      "Confirmar cuenta activa antes de cada sesión o cambio de workspace.",
      "Entrar pequeño y revisar después.",
      "Desactivar confirmaciones para ir más rápido."
    ],
    "correct": 1,
    "explanation": "Confundir cuenta Sim/Live es error operativo serio. La validación previa evita pérdidas innecesarias."
  },
  {
    "category": "ninjatrader",
    "title": "Chart Trader con cantidad incorrecta",
    "context": "Después de practicar, el Quantity quedó en 5 contratos, pero tu plan live permite solo 1.",
    "options": [
      "Entrar y cerrar rápido si va mal.",
      "Corregir cantidad antes de cualquier orden; el tamaño es parte del plan.",
      "Mantener 5 porque el setup se ve bueno.",
      "Quitar stop para compensar el tamaño alto."
    ],
    "correct": 1,
    "explanation": "El tamaño incorrecto rompe gestión incluso si el análisis es bueno."
  },
  {
    "category": "ninjatrader",
    "title": "Orden pendiente olvidada",
    "context": "Terminaste una idea anterior y cambiaste de análisis, pero queda una limit order activa cerca del precio.",
    "options": [
      "Dejarla porque quizá todavía sirve.",
      "Cancelar órdenes pendientes que ya no pertenecen al plan actual.",
      "Moverla rápido sin revisar contexto.",
      "Duplicarla para mejorar probabilidad."
    ],
    "correct": 1,
    "explanation": "Una orden olvidada puede ejecutarse sin intención actual. La limpieza operativa evita accidentes."
  },
  {
    "category": "ninjatrader",
    "title": "Conexión inestable en sesión",
    "context": "NinjaTrader muestra retrasos o reconexiones mientras estás por entrar en una noticia o movimiento rápido.",
    "options": [
      "Operar igual porque el setup puede irse.",
      "Evitar nuevas entradas hasta confirmar conexión, datos y ejecución estable.",
      "Aumentar stop para cubrir retrasos.",
      "Enviar órdenes más grandes para asegurar llenado."
    ],
    "correct": 1,
    "explanation": "La ejecución es parte del riesgo. Conexión inestable puede generar slippage, órdenes duplicadas o mala gestión."
  },
  {
    "category": "ninjatrader",
    "title": "Indicador no cargó correctamente",
    "context": "Abres el workspace y una herramienta clave no muestra zonas/valores como normalmente, pero el precio se mueve rápido.",
    "options": [
      "Operar sin revisar porque ya conoces la estrategia.",
      "Pausar y validar datos, indicador y configuración antes de operar.",
      "Cambiar de temporalidad hasta que se vea algo parecido.",
      "Entrar con menos análisis para no perder tiempo."
    ],
    "correct": 1,
    "explanation": "Si una herramienta clave falla, la lectura puede estar incompleta. Primero se valida el entorno."
  },
  {
    "category": "ninjatrader",
    "title": "Stop manual movido por emoción",
    "context": "Tu ATM colocó el stop correcto, pero al ver una mecha acercarse lo alejas manualmente sin nueva invalidación técnica.",
    "options": [
      "Es correcto porque protegerse de mechas requiere flexibilidad.",
      "Es romper el plan si no hay razón objetiva para cambiar la invalidación.",
      "Siempre se debe alejar el stop cuando el precio se acerca.",
      "Moverlo demuestra confianza en la idea."
    ],
    "correct": 1,
    "explanation": "Mover stops por miedo convierte gestión en improvisación. La plataforma permite hacerlo, pero el plan decide cuándo."
  },
  {
    "category": "ninjatrader",
    "title": "Market order en spread amplio",
    "context": "El mercado está rápido y el spread se abre. Quieres entrar con market porque temes perder el movimiento.",
    "options": [
      "Entrar market siempre que haya momentum.",
      "Evaluar slippage/spread; una mala ejecución puede destruir el R:R.",
      "Aumentar contratos para compensar peor fill.",
      "Quitar target porque el fill será incierto."
    ],
    "correct": 1,
    "explanation": "En mercados rápidos, el fill real importa. Una entrada técnica buena puede volverse mala por ejecución."
  },
  {
    "category": "ninjatrader",
    "title": "Workspace saturado",
    "context": "Tienes muchos gráficos, indicadores y pestañas abiertas. La plataforma se siente lenta justo durante la sesión.",
    "options": [
      "Seguir operando porque más información siempre ayuda.",
      "Simplificar workspace y priorizar estabilidad durante ejecución live.",
      "Abrir más gráficos para confirmar señales.",
      "Ignorar la lentitud hasta que ocurra un error."
    ],
    "correct": 1,
    "explanation": "Un entorno limpio reduce errores. La estabilidad operativa es parte del edge."
  },
  {
    "category": "ninjatrader",
    "title": "Registro de trades incompleto",
    "context": "Tomaste una operación y ganaste, pero no guardaste captura, motivo, ATM usado ni estado emocional.",
    "options": [
      "No importa porque fue ganadora.",
      "Registrar también ganadoras; el proceso se mejora con datos completos.",
      "Solo registrar pérdidas para ahorrar tiempo.",
      "Cambiar reglas si el resultado fue bueno."
    ],
    "correct": 1,
    "explanation": "El journal no es castigo. Es herramienta para repetir buenas ejecuciones y detectar malas victorias."
  },
  {
    "category": "tradegestion",
    "title": "Parcial demasiado temprano",
    "context": "La operación apenas avanza unos ticks y cierras parcial por miedo, aunque el plan pedía esperar la primera zona lógica.",
    "options": [
      "Es buena gestión porque asegurar algo siempre es profesional.",
      "Revisar si el parcial nace del plan o del miedo a perder ganancia flotante.",
      "Cerrar todo siempre que se vea verde.",
      "Aumentar tamaño después del parcial para recuperar recorrido."
    ],
    "correct": 1,
    "explanation": "Tomar parciales puede ser sano, pero si se hace por miedo puede reducir el edge del sistema."
  },
  {
    "category": "tradegestion",
    "title": "Dejar correr sin estructura",
    "context": "Tu trade llega al target principal, pero decides no cerrar nada porque sientes que puede dar mucho más, sin nueva estructura a favor.",
    "options": [
      "Dejarlo correr siempre porque las grandes ganancias nacen así.",
      "Gestionar según plan; extender target necesita razón objetiva, no esperanza.",
      "Quitar el stop para darle espacio.",
      "Aumentar contratos en el target."
    ],
    "correct": 1,
    "explanation": "Dejar correr requiere reglas: trailing, estructura o contexto. Sin eso, puede ser codicia disfrazada de gestión."
  },
  {
    "category": "tradegestion",
    "title": "Break-even después de confirmación",
    "context": "El precio rompe un micro nivel a favor, deja un nuevo swing protegido y ya avanzó suficiente según tu plan.",
    "options": [
      "Mover a BE o reducir riesgo puede ser válido si forma parte de la gestión definida.",
      "Nunca mover stop aunque el trade confirme.",
      "Mover BE antes de que el trade respire siempre.",
      "Cerrar la operación porque tocar BE es miedo."
    ],
    "correct": 0,
    "explanation": "Reducir riesgo puede tener sentido cuando el mercado ya confirmó y el plan lo contempla."
  },
  {
    "category": "tradegestion",
    "title": "Trailing demasiado ajustado",
    "context": "Vas en tendencia ganadora, pero tu trailing queda tan cerca que cualquier vela normal te saca antes de continuar.",
    "options": [
      "Ajustar trailing a la volatilidad/estructura, no solo al deseo de proteger cada tick.",
      "Poner trailing de 1 tick para no devolver nada.",
      "Quitar trailing y nunca proteger ganancias.",
      "Cerrar y reentrar muchas veces para evitar retrocesos."
    ],
    "correct": 0,
    "explanation": "Un trailing útil respeta el comportamiento normal del mercado. Si es demasiado ajustado, corta ganadores."
  },
  {
    "category": "tradegestion",
    "title": "Escalar posición después de confirmación",
    "context": "Tu primera entrada está en positivo y el mercado crea nueva estructura a favor. Piensas añadir contratos.",
    "options": [
      "Añadir solo si el plan permite escala, el riesgo total sigue controlado y la nueva entrada tiene invalidación clara.",
      "Añadir porque ya vas ganando y no puedes perder.",
      "Añadir sin stop para no complicar el promedio.",
      "Duplicar siempre después de cualquier vela a favor."
    ],
    "correct": 0,
    "explanation": "Escalar puede ser avanzado, pero requiere reglas. Si aumenta riesgo sin control, deja de ser gestión profesional."
  },
  {
    "category": "tradegestion",
    "title": "Reducir riesgo antes de noticia",
    "context": "Estás en una operación abierta con ganancia parcial y faltan minutos para noticia fuerte.",
    "options": [
      "Mantener todo porque el análisis técnico fue bueno.",
      "Considerar cerrar parcial, ajustar riesgo o salir según plan de noticias.",
      "Aumentar tamaño porque habrá volatilidad.",
      "Quitar stop para evitar spike."
    ],
    "correct": 1,
    "explanation": "Una noticia cambia el entorno de riesgo. La gestión debe anticipar volatilidad y ejecución."
  },
  {
    "category": "tradegestion",
    "title": "Reentrada tras salida correcta",
    "context": "Cerraste en target según plan. Luego el precio sigue y sientes ganas de perseguirlo sin nuevo setup.",
    "options": [
      "Reentrar porque el cierre fue demasiado conservador.",
      "Aceptar la salida correcta y esperar una nueva estructura antes de reentrar.",
      "Entrar con más tamaño para capturar lo perdido.",
      "Mover mentalmente el target anterior para justificar entrada."
    ],
    "correct": 1,
    "explanation": "Una salida correcta no se convierte en error porque el precio siguió. Reentrar requiere nuevo plan."
  },
  {
    "category": "tradegestion",
    "title": "Gestión de trade contra zona mayor",
    "context": "Tu long va en ganancia, pero se aproxima a resistencia diaria y el impulso empieza a perder fuerza.",
    "options": [
      "Ignorar resistencia porque ya estás dentro.",
      "Evaluar parcial, trailing o salida según reacción en la zona mayor.",
      "Aumentar tamaño justo debajo de resistencia.",
      "Mover stop más lejos para buscar ruptura."
    ],
    "correct": 1,
    "explanation": "Las zonas mayores importan también después de entrar. La gestión debe adaptarse al recorrido real."
  },
  {
    "category": "tradegestion",
    "title": "Trade en ganancia que vuelve a entrada",
    "context": "El precio llegó cerca del target, no lo tomó, y vuelve a tu entrada sin que hayas gestionado nada.",
    "options": [
      "Preguntarte si tu plan define gestión al acercarse al target o ante rechazo.",
      "No hacer nada nunca hasta target o stop, aunque el contexto cambie.",
      "Mover el target más lejos para evitar frustración.",
      "Aumentar tamaño porque volvió al precio inicial."
    ],
    "correct": 0,
    "explanation": "La gestión avanzada define qué hacer cuando el precio casi cumple el objetivo pero muestra rechazo o pérdida de fuerza."
  },
  {
    "category": "tradegestion",
    "title": "Convertir scalp en swing por esperanza",
    "context": "Entraste con plan de scalp intradía. El trade va en contra, y decides mantenerlo más tiempo porque quizá se recupera.",
    "options": [
      "Es válido cambiar horizonte si no quieres aceptar pérdida.",
      "No convertir una operación corta en swing para evitar cerrar mal; eso rompe el plan.",
      "Mover el stop al marco temporal mayor sin recalcular riesgo.",
      "Promediar para mejorar la entrada."
    ],
    "correct": 1,
    "explanation": "Cambiar la naturaleza del trade por esperanza suele aumentar pérdidas. El plan original define la invalidación."
  },
  {
    "category": "psicologia",
    "title": "Calidad de decisión después de esperar mucho",
    "context": "Esperaste toda la sesión por una entrada. Cuando aparece algo parecido, no es perfecto, pero sientes que mereces operar por haber esperado.",
    "options": [
      "Tomarlo porque la paciencia debe recompensarse con una operación.",
      "Separar espera de calidad: el mercado no te debe un trade por haber estado presente.",
      "Aumentar tamaño porque hubo mucha paciencia.",
      "Entrar aunque falte confirmación para no desperdiciar el día."
    ],
    "correct": 1,
    "explanation": "La paciencia no se cobra con operaciones forzadas. Se cobra evitando malas decisiones."
  },
  {
    "category": "psicologia",
    "title": "Identidad atada al resultado",
    "context": "Pierdes una operación bien ejecutada y empiezas a pensar que no sirves para trading.",
    "options": [
      "Evaluar la ejecución antes de juzgar tu capacidad como trader.",
      "Cambiar de estrategia inmediatamente.",
      "Operar más para demostrarte que sí puedes.",
      "Ocultar la pérdida del journal para no sentirte mal."
    ],
    "correct": 0,
    "explanation": "Un resultado individual no define tu identidad. Lo profesional es revisar proceso, no atacarte emocionalmente."
  },
  {
    "category": "psicologia",
    "title": "Ganancia que tapa una mala regla",
    "context": "Rompiste tu límite de riesgo, pero la operación terminó ganando. Te sientes validado.",
    "options": [
      "Marcarlo como mala ejecución ganadora, no como prueba de que la regla sobra.",
      "Subir el límite porque funcionó.",
      "Repetirlo solo cuando te sientas seguro.",
      "Eliminar la regla de riesgo porque era demasiado estricta."
    ],
    "correct": 0,
    "explanation": "Ganar rompiendo reglas es peligroso porque entrena el comportamiento equivocado."
  },
  {
    "category": "psicologia",
    "title": "Miedo a perder una buena entrada",
    "context": "El setup aparece, pero tienes miedo por la pérdida anterior. Empiezas a buscar confirmación extra hasta entrar demasiado tarde.",
    "options": [
      "Diferenciar prudencia de miedo: si cumple el plan, ejecutar con tamaño correcto.",
      "Esperar siempre cinco confirmaciones más.",
      "Entrar tarde para sentirte más seguro aunque el R:R empeore.",
      "No operar nunca después de una pérdida."
    ],
    "correct": 0,
    "explanation": "La confirmación extra puede ser prudencia o miedo. Si destruye el R:R, ya no mejora la operación."
  },
  {
    "category": "psicologia",
    "title": "Compararte con otros traders",
    "context": "Ves capturas de ganancias de otros y empiezas a sentir que tu progreso es demasiado lento.",
    "options": [
      "Aumentar riesgo para alcanzar resultados parecidos.",
      "Volver a tus métricas, plan y etapa actual; las capturas ajenas no muestran todo el riesgo.",
      "Cambiar de método cada vez que alguien gane más.",
      "Operar más horas para no quedarte atrás."
    ],
    "correct": 1,
    "explanation": "Compararte con resultados filtrados puede empujarte a romper tu proceso. Tu referencia debe ser tu plan y tus datos."
  },
  {
    "category": "psicologia",
    "title": "Confundir intuición con impulso",
    "context": "Sientes que el mercado va a romper, pero no puedes explicar estructura, liquidez, zona ni riesgo.",
    "options": [
      "Entrar porque la intuición siempre precede al análisis.",
      "Pedirle al plan que confirme la idea; si no puedes explicarla, puede ser impulso.",
      "Aumentar tamaño porque la sensación es fuerte.",
      "Operar rápido antes de que la mente dude."
    ],
    "correct": 1,
    "explanation": "La intuición útil suele venir de experiencia estructurada. Si no puedes justificarla, puede ser ansiedad."
  },
  {
    "category": "psicologia",
    "title": "Necesidad de terminar verde",
    "context": "Vas ligeramente negativo y falta poco para cerrar sesión. Aparece una entrada mediocre que podría dejarte en verde.",
    "options": [
      "Tomarla porque terminar verde mejora la confianza.",
      "Evitar que el color del día decida la calidad del setup.",
      "Subir contratos para que valga la pena.",
      "Operar sin registrar si sale mal."
    ],
    "correct": 1,
    "explanation": "Querer terminar verde puede convertir una sesión controlada en un error grande."
  },
  {
    "category": "psicologia",
    "title": "Sobreanalizar hasta bloquearte",
    "context": "El setup cumple tu checklist, pero sigues agregando herramientas y terminas sin ejecutar nunca.",
    "options": [
      "Aceptar que demasiada confirmación puede ser miedo disfrazado de análisis.",
      "Agregar más indicadores para estar 100% seguro.",
      "No operar ningún setup que no tenga diez confluencias.",
      "Cambiar el plan cada vez que dudes."
    ],
    "correct": 0,
    "explanation": "El análisis debe ayudar a decidir, no bloquear. La certeza total no existe."
  },
  {
    "category": "psicologia",
    "title": "Cambiar reglas después de un solo trade",
    "context": "Una operación válida pierde y quieres modificar la estrategia completa esa misma noche.",
    "options": [
      "Cambiar todo porque el mercado demostró que no sirve.",
      "Esperar muestra suficiente y revisar datos antes de alterar reglas.",
      "Eliminar stops porque fueron el problema.",
      "Añadir más filtros cada vez que aparece una pérdida."
    ],
    "correct": 1,
    "explanation": "Una pérdida aislada no invalida un sistema. Las reglas se ajustan con datos, no con dolor inmediato."
  },
  {
    "category": "psicologia",
    "title": "Miedo a devolver ganancias",
    "context": "Vas positivo en el día. Aparece un setup A+ dentro de tu plan, pero te paraliza la idea de perder parte de la ganancia.",
    "options": [
      "Evaluar si tu plan permite seguir operando y con qué riesgo; no decidir solo por miedo.",
      "No operar nunca después de ganar algo.",
      "Operar doble para aprovechar la buena racha.",
      "Cerrar la plataforma siempre que el día esté verde, sin importar plan."
    ],
    "correct": 0,
    "explanation": "Proteger ganancias es válido si está en el plan. Decidir solo por miedo puede cortar oportunidades de calidad."
  },
  {
    "category": "psicologia",
    "title": "Rabia silenciosa después de slippage",
    "context": "Tu pérdida fue mayor por slippage. Aunque intentas verte tranquilo, empiezas a operar más rápido y con menos filtro.",
    "options": [
      "Reconocer la activación emocional y pausar antes de tomar otra decisión.",
      "Recuperar rápido porque la pérdida fue injusta.",
      "Subir contratos para compensar el slippage.",
      "Ignorar el estado emocional si el gráfico se ve claro."
    ],
    "correct": 0,
    "explanation": "La rabia no siempre se siente explosiva. A veces aparece como prisa y baja calidad de decisiones."
  },
  {
    "category": "psicologia",
    "title": "Apego a una predicción pública",
    "context": "Comentaste tu sesgo alcista en el grupo. Luego el mercado muestra señales bajistas, pero te cuesta cambiar porque ya opinaste.",
    "options": [
      "Mantener el sesgo para no quedar mal.",
      "Actualizar la lectura si el mercado cambia; proteger capital vale más que proteger ego.",
      "Operar más pequeño pero seguir alcista por orgullo.",
      "Ignorar señales contrarias hasta que sea demasiado tarde."
    ],
    "correct": 1,
    "explanation": "El ego se apega a opiniones. El trader se adapta a información nueva."
  },
  {
    "category": "psicologia",
    "title": "Operar cansado",
    "context": "Dormiste poco, estás irritable y te cuesta concentrarte, pero quieres operar porque la sesión puede moverse.",
    "options": [
      "Reducir exposición o no operar si tu estado afecta la ejecución.",
      "Operar igual porque las oportunidades no esperan.",
      "Tomar café y aumentar tamaño para concentrarte.",
      "Quitar reglas para simplificar decisiones."
    ],
    "correct": 0,
    "explanation": "Tu estado físico afecta el criterio. No todos los días estás en condición de ejecutar bien."
  },
  {
    "category": "psicologia",
    "title": "Buscar una señal para validar deseo",
    "context": "Quieres comprar porque te gusta la idea. Empiezas a cambiar temporalidades hasta encontrar una señal que apoye tu deseo.",
    "options": [
      "Eso es buen análisis multidimensional.",
      "Puede ser sesgo de confirmación; primero define el contexto, luego busca entrada.",
      "Mientras encuentres una señal, la operación es válida.",
      "Aumentar confluencias visuales siempre mejora el trade."
    ],
    "correct": 1,
    "explanation": "Buscar pruebas para una conclusión ya tomada es distinto a analizar objetivamente."
  },
  {
    "category": "psicologia",
    "title": "Aceptar un día sin oportunidad",
    "context": "La sesión termina sin ningún setup de calidad. Sientes frustración porque no ganaste ni perdiste.",
    "options": [
      "Considerarlo un día bien gestionado si respetaste tu plan.",
      "Buscar una última entrada para justificar el tiempo.",
      "Cambiar de activo para encontrar movimiento.",
      "Operar en sim y luego contar como experiencia live."
    ],
    "correct": 0,
    "explanation": "Un día sin trade puede ser profesional. La meta no es actividad, es calidad."
  },
  {
    "category": "psicologia",
    "title": "Euforia después de recuperar pérdidas",
    "context": "Estabas negativo, recuperaste y quedaste ligeramente verde. Te sientes poderoso y quieres seguir.",
    "options": [
      "Seguir porque recuperaste momentum emocional.",
      "Pausar y revisar: la euforia post-recuperación puede llevar a devolver todo.",
      "Aumentar contratos porque ya estás en sintonía.",
      "Ignorar el límite diario porque ahora el día mejoró."
    ],
    "correct": 1,
    "explanation": "Recuperar puede disparar euforia. Ese estado también reduce disciplina."
  },
  {
    "category": "psicologia",
    "title": "Confundir disciplina con rigidez",
    "context": "El mercado cambió por noticia y volatilidad, pero sigues aplicando exactamente el mismo plan intradía sin adaptar riesgo.",
    "options": [
      "Mantener reglas sin pensar porque eso es disciplina.",
      "Distinguir disciplina de rigidez: respetar el plan también incluye saber cuándo el entorno cambió.",
      "Aumentar riesgo porque la volatilidad da más oportunidad.",
      "Eliminar la estrategia porque hubo noticia."
    ],
    "correct": 1,
    "explanation": "La disciplina no es operar ciego. Es seguir un marco que reconoce condiciones distintas."
  },
  {
    "category": "psicologia",
    "title": "Dolor por cerrar antes del movimiento grande",
    "context": "Cerraste correctamente según tu plan. Después el mercado hizo un movimiento enorme sin ti y te sientes tonto.",
    "options": [
      "Evaluar la salida por el plan disponible en ese momento, no por el resultado posterior.",
      "Cambiar todos los targets para que no vuelva a pasar.",
      "Reentrar tarde para quitarte la frustración.",
      "Prometer no cerrar parciales nunca más."
    ],
    "correct": 0,
    "explanation": "La gestión se juzga con la información y reglas del momento. El hindsight puede castigar decisiones correctas."
  },
  {
    "category": "psicologia",
    "title": "Cuando el plan se siente aburrido",
    "context": "Tu plan da pocas entradas y muchas sesiones son de espera. Empiezas a pensar que necesitas algo más emocionante.",
    "options": [
      "Recordar que un plan aburrido pero ejecutable puede ser más rentable que uno emocionante y caótico.",
      "Agregar señales rápidas para sentir acción.",
      "Cambiar a temporalidad menor cada vez que te aburras.",
      "Operar noticias para subir adrenalina."
    ],
    "correct": 0,
    "explanation": "El trading profesional muchas veces se siente repetitivo. Buscar emoción suele dañar consistencia."
  },
  {
    "category": "psicologia",
    "title": "Revisión honesta de una mala entrada",
    "context": "La entrada perdió. Al revisarla, notas que no cumplía tu checklist, pero quieres clasificarla como pérdida normal.",
    "options": [
      "Ser honesto y marcarla como error de ejecución, no como pérdida del sistema.",
      "Ocultarla porque todas las pérdidas duelen igual.",
      "Cambiar el checklist para que encaje.",
      "Culpar la volatilidad y seguir."
    ],
    "correct": 0,
    "explanation": "El journal solo sirve si es honesto. Mezclar errores con pérdidas válidas contamina tus estadísticas."
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
    riskcontrol: "Risk Control",
    volumen: "Volumen",
    volumeprofile: "Volume Profile",
    vwap: "VWAP",
    ema: "EMA",
    supplydemand: "Supply / Demand",
    cmestrikes: "CME Strikes",
    ninjatrader: "NinjaTrader / Plataforma",
    tradegestion: "Gestión avanzada de trade"
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


let studentDisplayName = "Trader WLF";
let studentNameLoadPromise = null;

function cleanStudentName(value) {
  const cleaned = String(value || "").replace(/\s+/g, " ").trim();

  if (!cleaned || cleaned.includes("@") || /validando/i.test(cleaned)) {
    return "";
  }

  return cleaned;
}

function setStudentDisplayNameFromData(data) {
  const possibleName = cleanStudentName(
    data?.name ||
    data?.student?.name ||
    data?.user?.name ||
    data?.profile?.name ||
    data?.member?.name
  );

  if (possibleName) {
    studentDisplayName = possibleName;
    currentResultCard = null;
  }

  return studentDisplayName;
}

async function loadStudentDisplayName() {
  if (studentNameLoadPromise) {
    return studentNameLoadPromise;
  }

  studentNameLoadPromise = fetch("/api/check-access", { credentials: "include" })
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => setStudentDisplayNameFromData(data || {}))
    .catch((error) => {
      console.warn("Could not load student name for result card:", error);
      return studentDisplayName;
    });

  return studentNameLoadPromise;
}

function getResultCardStudentName() {
  return cleanStudentName(studentDisplayName) || "Trader WLF";
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
  await loadStudentDisplayName();

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
  requireActiveUser(function (accessData) {
    setStudentDisplayNameFromData(accessData || {});
    loadStudentDisplayName();
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
