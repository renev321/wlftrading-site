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

function renderCourse() {
  const loadingBox = document.getElementById("loadingBox");
  const courseContent = document.getElementById("courseContent");

  if (!courseContent) return;

  courseContent.innerHTML = courseModules.map((module) => `
    <article class="course-module">
      <h3>${module.title}</h3>
      <p class="muted">${module.description}</p>

      <div class="lesson-list">
        ${module.lessons.map((lesson) => {
          const disabled = !lesson.url || lesson.url === "#" || lesson.url.includes("PASTE_GOOGLE_DRIVE_LINK_HERE");

          return `
            <a
              class="lesson-link ${disabled ? "is-disabled" : ""}"
              href="${disabled ? "#" : lesson.url}"
              target="${disabled ? "_self" : "_blank"}"
              rel="noopener"
            >
              <span>${lesson.title}</span>
              <strong>${disabled ? "Pendiente" : "Ver video"}</strong>
            </a>
          `;
        }).join("")}
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
