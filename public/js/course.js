import {
  courseModules,
  communityLinks,
  audiobookLinks,
  toolLinks
} from "./config.js";

import { requireActiveUser } from "./auth.js";

function safeUrl(url) {
  return url && url !== "#" ? url : "#";
}

function isAvailableLesson(lesson) {
  return lesson.status === "available" && lesson.embedUrl && lesson.embedUrl !== "#";
}

function renderCards(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = items.map((item) => {
    const disabled = !item.url || item.url === "#";

    return `
      <article class="member-resource-card ${disabled ? "is-disabled" : ""}">
        <div class="resource-tag">${item.tag || "WLF"}</div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a
          class="resource-link"
          href="${safeUrl(item.url)}"
          target="${disabled ? "_self" : "_blank"}"
          rel="noopener"
        >
          ${disabled ? "Próximamente" : "Abrir recurso"}
        </a>
      </article>
    `;
  }).join("");
}

function renderLesson(lesson) {
  const available = isAvailableLesson(lesson);

  if (!available) {
    return `
      <div class="lesson-card is-disabled">
        <div class="lesson-card-header">
          <div>
            <h4>${lesson.title}</h4>
            <p>${lesson.description || "Próximamente."}</p>
          </div>
          <span class="lesson-badge pending">Pendiente</span>
        </div>
      </div>
    `;
  }

  return `
    <article class="lesson-card">
      <div class="lesson-card-header">
        <div>
          <h4>${lesson.title}</h4>
          <p>${lesson.description || ""}</p>
        </div>
        <span class="lesson-badge available">Disponible</span>
      </div>

      <div class="video-frame">
        <iframe
          src="${lesson.embedUrl}"
          allow="autoplay; encrypted-media"
          allowfullscreen>
        </iframe>
      </div>

      <div class="lesson-actions">
        <a class="lesson-open-link" href="${lesson.url}" target="_blank" rel="noopener">
          Abrir en Google Drive
        </a>
      </div>
    </article>
  `;
}

function renderCourse() {
  const loadingBox = document.getElementById("loadingBox");
  const courseContent = document.getElementById("courseContent");

  if (!courseContent) return;

  courseContent.innerHTML = courseModules.map((module) => `
    <article class="course-module">
      <h3>${module.title}</h3>
      <p class="muted">${module.description}</p>

      <div class="lesson-list embedded-lessons">
        ${module.lessons.map(renderLesson).join("")}
      </div>
    </article>
  `).join("");

  renderCards("communityContent", communityLinks);
  renderCards("audiobookContent", audiobookLinks);
  renderCards("toolsContent", toolLinks);

  loadingBox?.classList.add("hidden");

  document.querySelectorAll(".member-section").forEach((section) => {
    section.classList.remove("hidden");
  });
}

requireActiveUser(() => {
  renderCourse();
});
