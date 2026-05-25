import { bookLinks } from "./config.js";
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

function renderBooks() {
  if (!bookList) return;

  bookList.innerHTML = bookLinks.map((book, index) => {
    const available = book.status === "available" && book.embedUrl && book.embedUrl !== "#";

    return `
      <article class="reading-card ${available ? "" : "is-disabled"}">
        <div class="reading-card-top">
          <span class="reading-tag">${book.tag || "Libro"}</span>
          <span class="reading-type">${book.type || "PDF"}</span>
        </div>

        <h3>${book.title}</h3>
        <p>${book.description}</p>

        <button
          class="reading-link"
          type="button"
          data-book-index="${index}"
          ${available ? "" : "disabled"}
        >
          ${available ? "Leer dentro de WLF" : "Próximamente"}
        </button>
      </article>
    `;
  }).join("");

  document.querySelectorAll("[data-book-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.bookIndex);
      openBook(index);
    });
  });
}

function openBook(index) {
  const book = bookLinks[index];
  if (!book || !book.embedUrl || book.embedUrl === "#") return;

  readerTag.textContent = book.tag || "Lectura";
  readerTitle.textContent = book.title;
  readerDescription.textContent = book.description;
  pdfViewer.setAttribute("src", book.embedUrl);

  readerEmpty.classList.add("hidden");
  readerActive.classList.remove("hidden");

  document.getElementById("visor")?.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function closeReader() {
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
