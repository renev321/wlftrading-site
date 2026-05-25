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

function renderLesson(lesson, moduleIndex, lessonIndex) {
  const available = isAvailableLesson(lesson);
  const lessonId = `lesson-${moduleIndex}-${lessonIndex}`;

  if (!available) {
    return `
      <div class="lesson-row is-disabled">
        <div>
          <h4>${lesson.title}</h4>
          <p>${lesson.description || "Próximamente."}</p>
        </div>
        <span class="lesson-badge pending">Pendiente</span>
      </div>
    `;
  }

  return `
    <article class="lesson-accordion">
      <button class="lesson-toggle" type="button" aria-expanded="false" aria-controls="${lessonId}">
        <div>
          <h4>${lesson.title}</h4>
          <p>${lesson.description || ""}</p>
        </div>

        <div class="lesson-toggle-right">
          <span class="lesson-badge available">Disponible</span>
          <span class="lesson-arrow">+</span>
        </div>
      </button>

      <div class="lesson-panel" id="${lessonId}">
        <div class="video-frame">
          <iframe
            data-src="${lesson.embedUrl}"
            allow="autoplay; encrypted-media"
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </article>
  `;
}

function renderCourse() {
  const loadingBox = document.getElementById("loadingBox");
  const courseContent = document.getElementById("courseContent");

  if (!courseContent) return;

  courseContent.innerHTML = courseModules.map((module, moduleIndex) => `
    <details class="course-module course-module-collapsible" ${moduleIndex === 0 ? "open" : ""}>
      <summary class="module-summary">
        <div>
          <h3>${module.title}</h3>
          <p class="muted">${module.description}</p>
        </div>
        <span class="module-count">${module.lessons.length} lecciones</span>
      </summary>

      <div class="lesson-list embedded-lessons">
        ${module.lessons.map((lesson, lessonIndex) => renderLesson(lesson, moduleIndex, lessonIndex)).join("")}
      </div>
    </details>
  `).join("");

  setupLessonAccordions();

  renderCards("communityContent", communityLinks);
  renderCards("audiobookContent", audiobookLinks);
  renderCards("toolsContent", toolLinks);

  loadingBox?.classList.add("hidden");

  document.querySelectorAll(".member-section").forEach((section) => {
    section.classList.remove("hidden");
  });
}

function setupLessonAccordions() {
  const toggles = document.querySelectorAll(".lesson-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const panelId = toggle.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      const expanded = toggle.getAttribute("aria-expanded") === "true";

      // Close all other lesson panels to keep the page compact.
      document.querySelectorAll(".lesson-toggle").forEach((otherToggle) => {
        if (otherToggle !== toggle) {
          otherToggle.setAttribute("aria-expanded", "false");
        }
      });

      document.querySelectorAll(".lesson-panel").forEach((otherPanel) => {
        if (otherPanel !== panel) {
          otherPanel.classList.remove("is-open");

          const iframe = otherPanel.querySelector("iframe");
          if (iframe) {
            iframe.removeAttribute("src");
          }
        }
      });

      if (expanded) {
        toggle.setAttribute("aria-expanded", "false");
        panel?.classList.remove("is-open");

        const iframe = panel?.querySelector("iframe");
        if (iframe) {
          iframe.removeAttribute("src");
        }

        return;
      }

      toggle.setAttribute("aria-expanded", "true");
      panel?.classList.add("is-open");

      const iframe = panel?.querySelector("iframe");
      if (iframe && !iframe.getAttribute("src")) {
        iframe.setAttribute("src", iframe.dataset.src);
      }
    });
  });
}

requireActiveUser(() => {
  renderCourse();
});
