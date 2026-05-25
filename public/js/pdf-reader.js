import { requireActiveUser } from "./auth.js";

const DEFAULT_PDF = "/books/la-biblia-de-las-velas.pdf";
const DEFAULT_TITLE = "La biblia de las velas";

const params = new URLSearchParams(window.location.search);
const pdfUrl = params.get("file") || DEFAULT_PDF;
const bookTitle = params.get("title") || DEFAULT_TITLE;

const titleEl = document.getElementById("readerBookTitle");
const pageStatus = document.getElementById("pageStatus");
const canvas = document.getElementById("pdfCanvas");
const pageTextEl = document.getElementById("pageText");
const pageNumberInput = document.getElementById("pageNumberInput");

const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const goPageBtn = document.getElementById("goPageBtn");
const readPageBtn = document.getElementById("readPageBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const stopBtn = document.getElementById("stopBtn");

let pdfDoc = null;
let currentPage = 1;
let pageCount = 1;
let currentPageText = "";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

function setLoadingState(message) {
  pageTextEl.textContent = message;
}

async function renderPage(pageNumber) {
  if (!pdfDoc) return;

  const page = await pdfDoc.getPage(pageNumber);
  const containerWidth = document.querySelector(".pdf-canvas-shell").clientWidth;
  const unscaledViewport = page.getViewport({ scale: 1 });

  const scale = Math.min(
    containerWidth / unscaledViewport.width,
    1.55
  );

  const viewport = page.getViewport({ scale });
  const context = canvas.getContext("2d");

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({
    canvasContext: context,
    viewport
  }).promise;

  const textContent = await page.getTextContent();
  currentPageText = textContent.items
    .map((item) => item.str)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  pageTextEl.textContent = currentPageText || "No se pudo detectar texto en esta página. Puede ser una página escaneada como imagen.";

  currentPage = pageNumber;
  pageStatus.textContent = `Página ${currentPage} / ${pageCount}`;
  pageNumberInput.value = currentPage;

  prevPageBtn.disabled = currentPage <= 1;
  nextPageBtn.disabled = currentPage >= pageCount;
}

async function loadPdf() {
  titleEl.textContent = bookTitle;
  setLoadingState("Cargando PDF...");

  try {
    pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
    pageCount = pdfDoc.numPages;
    pageNumberInput.max = pageCount;
    await renderPage(1);
  } catch (error) {
    console.error(error);
    titleEl.textContent = "No se pudo cargar el PDF";
    pageStatus.textContent = "Error";
    pageTextEl.innerHTML = `
      No pude abrir el PDF.<br><br>
      Revisa que exista este archivo dentro del proyecto:<br>
      <strong>${pdfUrl}</strong>
    `;
  }
}

function speakText(text) {
  if (!("speechSynthesis" in window)) {
    alert("Este navegador no soporta lectura por voz.");
    return;
  }

  if (!text || text.length < 5) {
    alert("No hay texto suficiente para leer en esta página.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-ES";
  utterance.rate = 0.92;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}

prevPageBtn.addEventListener("click", async () => {
  if (currentPage > 1) {
    window.speechSynthesis.cancel();
    await renderPage(currentPage - 1);
  }
});

nextPageBtn.addEventListener("click", async () => {
  if (currentPage < pageCount) {
    window.speechSynthesis.cancel();
    await renderPage(currentPage + 1);
  }
});

goPageBtn.addEventListener("click", async () => {
  const page = Number(pageNumberInput.value);

  if (!Number.isInteger(page) || page < 1 || page > pageCount) {
    alert(`Elige una página entre 1 y ${pageCount}.`);
    return;
  }

  window.speechSynthesis.cancel();
  await renderPage(page);
});

readPageBtn.addEventListener("click", () => {
  speakText(currentPageText);
});

pauseBtn.addEventListener("click", () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.pause();
  }
});

resumeBtn.addEventListener("click", () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.resume();
  }
});

stopBtn.addEventListener("click", () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
});

window.addEventListener("beforeunload", () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
});

requireActiveUser(() => {
  loadPdf();
});
