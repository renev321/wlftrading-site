import { requireActiveUser } from "./auth.js";

const loadingBox = document.getElementById("loadingBox");
const bookList = document.getElementById("bookList");

const readerEmpty = document.getElementById("readerEmpty");
const readerActive = document.getElementById("readerActive");
const readerTag = document.getElementById("readerTag");
const readerTitle = document.getElementById("readerTitle");
const readerDescription = document.getElementById("readerDescription");
const pdfViewer = document.getElementById("pdfViewer");
const closeReaderBtn = document.getElementById("closeReaderBtn");

// Local WLF book library.
// All files must exist inside: public/books/
const localBooks = [
  {
    title: "12 reglas para vivir",
    filename: "12 Reglas para Vivir - Un antídoto al caos.pdf",
    tag: "Mentalidad",
    description: "Lectura para trabajar orden, responsabilidad, carácter y disciplina personal."
  },
  {
    title: "Best loser wins",
    filename: "best_loser_wins_-_tom_hougaard-espanol.pdf",
    tag: "Psicología",
    description: "Psicología del trading, aceptación de pérdidas y mentalidad profesional."
  },
  {
    title: "Cómo no quemar una cuenta",
    filename: "Como_no_quemar_una_cuenta-Fernando-Arias.pdf",
    tag: "Riesgo",
    description: "Gestión, control emocional y errores que pueden destruir una cuenta."
  },
  {
    title: "Deja de ser tú",
    filename: "Deja_de_ser_tu.pdf",
    tag: "Mentalidad",
    description: "Material para trabajar identidad, hábitos mentales y transformación personal."
  },
  {
    title: "Mindset: La actitud del éxito",
    filename: "dokumen.pub_mindset-la-actitud-del-exito-9788417030490.pdf",
    tag: "Mentalidad",
    description: "Lectura sobre mentalidad de crecimiento, disciplina y mejora continua."
  },
  {
    title: "El Millonario de la puerta de al lado",
    filename: "El Millonario de la puerta de al lado.pdf",
    tag: "Finanzas",
    description: "Ideas sobre hábitos financieros, austeridad, patrimonio y visión a largo plazo."
  },
  {
    title: "El Trading como negocio",
    filename: "El Trading Como Negocio Alfredo Chaumerpdf (2).pdf",
    tag: "Trading",
    description: "Trading tratado como negocio: proceso, organización, riesgo y estructura."
  },
  {
    title: "El placebo eres tú",
    filename: "El_placebo_eres_tu_.pdf",
    tag: "Mentalidad",
    description: "Lectura complementaria sobre mente, creencias y cambio personal."
  },
  {
    title: "El poder de la autodisciplina",
    filename: "El_poder_de_la_autodisciplina_-_Lia_Murillo_.pdf",
    tag: "Disciplina",
    description: "Material para reforzar constancia, enfoque y control personal."
  },
  {
    title: "El Trading como negocio",
    filename: "El_Trading_Como_Negocio_Alfredo_Chaumerpdf_.pdf",
    tag: "Trading",
    description: "Versión adicional sobre trading como negocio y gestión del proceso."
  },
  {
    title: "Eres un chingón haciendo dinero",
    filename: "ERES UN CHINGON HACIENDO DINERO.pdf",
    tag: "Mentalidad",
    description: "Lectura de motivación financiera y cambio de mentalidad sobre dinero."
  },
  {
    title: "Eres un chingón",
    filename: "ERES UN CHINGON.pdf",
    tag: "Mentalidad",
    description: "Material de confianza, enfoque y desarrollo personal."
  },
  {
    title: "Espabila de una vez",
    filename: "Espabila_de_una_vez_-_Jose_Montanez.pdf",
    tag: "Mentalidad",
    description: "Lectura para despertar enfoque, responsabilidad y acción personal."
  },
  {
    title: "Hábitos Atómicos",
    filename: "Hábitos Atómicos James Clear.pdf",
    tag: "Hábitos",
    description: "Construcción de hábitos, sistemas, identidad y mejora diaria."
  },
  {
    title: "Hábitos Atómicos",
    filename: "Habitos_atomicos_James_Clear.pdf",
    tag: "Hábitos",
    description: "Versión adicional sobre hábitos, sistemas y mejora continua."
  },
  {
    title: "Hazlo tan bien que no puedan ignorarte",
    filename: "Hazlo_tan_bien_que_no_puedan_ignorarte_Spanish_Edition_Cal_Newport.pdf",
    tag: "Disciplina",
    description: "Enfoque, habilidad, trabajo profundo y construcción de valor real."
  },
  {
    title: "Sobrenatural",
    filename: "Joel_Dispenza_-_Sobrenatural.pdf",
    tag: "Mentalidad",
    description: "Lectura complementaria sobre mente, cambio personal y visualización."
  },
  {
    title: "La Psicología del Trading",
    filename: "La Psicologia del Trading.pdf",
    tag: "Psicología",
    description: "Psicología aplicada al trader, control emocional y consistencia."
  },
  {
    title: "La disciplina del inversor",
    filename: "La disciplina del inversor_Mark_Douglas.pdf",
    tag: "Disciplina",
    description: "Disciplina, probabilidades, ejecución y mentalidad de mercado."
  },
  {
    title: "La biblia de las velas",
    filename: "la-biblia-de-las-velas.pdf",
    tag: "Velas",
    description: "Lectura técnica para reforzar interpretación de velas y acción del precio."
  },
  {
    title: "Tráguese ese sapo",
    filename: "Libro Traguese Ese Sapo Brian Tracy.pdf",
    tag: "Productividad",
    description: "Productividad, enfoque y ejecución de tareas importantes."
  },
  {
    title: "Los magos del mercado",
    filename: "Los_magos_del_mercado_entrevistas_con_traders_legendarios.pdf",
    tag: "Trading",
    description: "Entrevistas y lecciones de traders legendarios."
  },
  {
    title: "Meditaciones",
    filename: "Marco_Aurelio-Meditaciones.pdf",
    tag: "Estoicismo",
    description: "Disciplina, calma, autocontrol y pensamiento estoico."
  },
  {
    title: "El trader disciplinado",
    filename: "Mark_Douglas_El_Trader_disciplinado.pdf",
    tag: "Psicología",
    description: "Psicología del trader, disciplina y ejecución objetiva."
  },
  {
    title: "No me puedes lastimar",
    filename: "No me puedes lastimar - David Goggins.pdf",
    tag: "Mentalidad",
    description: "Resistencia mental, disciplina extrema y superación personal."
  },
  {
    title: "Nunca terminar",
    filename: "Nunca-Terminar-David-Goggins.pdf",
    tag: "Mentalidad",
    description: "Mentalidad de resistencia, constancia y exigencia personal."
  },
  {
    title: "Patrones de cambios de tendencia",
    filename: "Patrones_de_Cambios_de_Tendencia_.pdf",
    tag: "Trading",
    description: "Patrones técnicos para estudiar cambios de dirección en el mercado."
  },
  {
    title: "Resetea tu mente",
    filename: "pdfcoffee.com_resetea-tu-mente-mario-alonso-puig-4-pdf-free.pdf",
    tag: "Mentalidad",
    description: "Lectura sobre enfoque mental, cambio interno y claridad."
  },
  {
    title: "Piense y hágase rico",
    filename: "Piense y hágase rico.pdf",
    tag: "Finanzas",
    description: "Clásico sobre mentalidad, metas, riqueza y persistencia."
  },
  {
    title: "Piense y hágase rico",
    filename: "PIENSE_Y_HAGASE_RICO.pdf",
    tag: "Finanzas",
    description: "Versión adicional del clásico sobre mentalidad y riqueza."
  },
  {
    title: "Psicotrading",
    filename: "Psicotrading_gestion_emocional_del_inversor_.pdf",
    tag: "Psicología",
    description: "Gestión emocional aplicada a decisiones de inversión y trading."
  },
  {
    title: "Trading en la zona",
    filename: "Trading_En_La_Zona_-_Douglas_Mark.pdf",
    tag: "Psicología",
    description: "Probabilidades, aceptación del riesgo y mentalidad profesional."
  },
  {
    title: "Trading al día",
    filename: "trading-al-dia-reflexiones-diarias_compress.pdf",
    tag: "Trading",
    description: "Reflexiones cortas para reforzar disciplina y proceso diario."
  }
];

function buildReaderUrl(book) {
  const file = encodeURIComponent(`/books/${book.filename}`);
  const title = encodeURIComponent(book.title);

  return `/pdf-reader.html?file=${file}&title=${title}`;
}

function renderBooks() {
  if (!bookList) return;

  bookList.innerHTML = localBooks.map((book, index) => {
    return `
      <article class="reading-card">
        <div class="reading-card-top">
          <span class="reading-tag">${book.tag || "Libro"}</span>
          <span class="reading-type">Lector WLF</span>
        </div>

        <h3>${book.title}</h3>
        <p>${book.description}</p>

        <button
          class="reading-link"
          type="button"
          data-book-index="${index}"
        >
          Abrir lector WLF
        </button>
      </article>
    `;
  }).join("");

  document.querySelectorAll("[data-book-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.bookIndex);
      const book = localBooks[index];

      if (!book) return;

      window.location.href = buildReaderUrl(book);
    });
  });
}

// These are kept for compatibility with the old embedded Google Drive viewer.
// The new local books open directly in /pdf-reader.html.
function closeReader() {
  if (!pdfViewer || !readerActive || !readerEmpty) return;

  pdfViewer.removeAttribute("src");
  readerActive.classList.add("hidden");
  readerEmpty.classList.remove("hidden");
}

if (closeReaderBtn) {
  closeReaderBtn.addEventListener("click", closeReader);
}

function renderReadingPage() {
  renderBooks();

  loadingBox?.classList.add("hidden");

  document.querySelectorAll(".reading-section").forEach((section) => {
    section.classList.remove("hidden");
  });
}

requireActiveUser(() => {
  renderReadingPage();
});
