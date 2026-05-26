import {
  courseModules,
  communityLinks,
  audiobookLinks,
  toolLinks
} from "./config.js";

import { requireActiveUser } from "./auth.js";

function isAvailableLesson(lesson) {
  return lesson.status === "available";
}

function getLessonTypeLabel(lesson) {
  if (lesson.type === "article") return "Guía";
  if (lesson.type === "video") return "Video";
  return "Recurso";
}

function safeUrl(url) {
  return url && url !== "#" ? url : "#";
}

function renderCards(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = (items || []).map((item) => {
    const disabled = !item.url || item.url === "#";

    return `
      <article class="member-resource-card ${disabled ? "is-disabled" : ""}">
        <div class="resource-tag">${item.tag || "WLF"}</div>
        <h3>${item.title}</h3>
        <p>${item.description || ""}</p>
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

function renderArticleLesson(lesson) {
  const article = lesson.article || {};
  const sections = article.sections || [];

  return `
    <div class="article-lesson">
      ${article.intro ? `<p class="article-intro">${article.intro}</p>` : ""}

      ${sections.map((section, sectionIndex) => {
        const listTag = sectionIndex === 0 ? "ol" : "ul";

        return `
          <div class="article-section">
            <h4>${section.title}</h4>
            <${listTag}>
              ${(section.items || []).map((item) => `<li>${item}</li>`).join("")}
            </${listTag}>
          </div>
        `;
      }).join("")}

      ${article.footer ? `<p class="article-footer">${article.footer}</p>` : ""}

      ${lesson.externalUrl ? `
        <div class="article-actions">
          <a class="btn primary" href="${lesson.externalUrl}" target="_blank" rel="noopener">
            ${lesson.externalLabel || "Abrir recurso"}
          </a>
        </div>
      ` : ""}
    </div>
  `;
}

function renderLessonPanel(lesson, moduleIndex, lessonIndex) {
  const panelId = `lesson-${moduleIndex}-${lessonIndex}`;
  const available = isAvailableLesson(lesson);

  if (!available) {
    return `
      <div class="lesson-panel" id="${panelId}">
        <div class="article-lesson">
          <p class="article-intro">Esta lección estará disponible próximamente.</p>
        </div>
      </div>
    `;
  }

  if (lesson.type === "article") {
    return `
      <div class="lesson-panel" id="${panelId}">
        ${renderArticleLesson(lesson)}
      </div>
    `;
  }

  return `
    <div class="lesson-panel" id="${panelId}">
      <div class="video-frame">
        <iframe
          data-src="${lesson.embedUrl || ""}"
          allow="autoplay; encrypted-media"
          allowfullscreen
          title="${lesson.title}">
        </iframe>
      </div>
    </div>
  `;
}

function renderLesson(lesson, moduleIndex, lessonIndex) {
  const available = isAvailableLesson(lesson);
  const panelId = `lesson-${moduleIndex}-${lessonIndex}`;

  return `
    <article class="lesson-accordion ${available ? "" : "is-disabled"}">
      <button
        class="lesson-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="${panelId}"
        ${available ? "" : "disabled"}
      >
        <div>
          <h4>
            ${lesson.title}
            <span class="lesson-type-tag">${getLessonTypeLabel(lesson)}</span>
          </h4>
          <p>${lesson.description || ""}</p>
        </div>

        <div class="lesson-toggle-right">
          <span class="lesson-badge ${available ? "available" : "pending"}">
            ${available ? "Disponible" : "Pendiente"}
          </span>
          <span class="lesson-arrow">+</span>
        </div>
      </button>

      ${renderLessonPanel(lesson, moduleIndex, lessonIndex)}
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
        <span class="module-count">${(module.lessons || []).length} lecciones</span>
      </summary>

      <div class="lesson-list embedded-lessons">
        ${(module.lessons || []).map((lesson, lessonIndex) => renderLesson(lesson, moduleIndex, lessonIndex)).join("")}
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

function closeLesson(toggle, panel) {
  toggle.setAttribute("aria-expanded", "false");
  panel?.classList.remove("is-open");

  const iframe = panel?.querySelector("iframe");
  if (iframe) {
    iframe.removeAttribute("src");
  }
}

function openLesson(toggle, panel) {
  toggle.setAttribute("aria-expanded", "true");
  panel?.classList.add("is-open");

  const iframe = panel?.querySelector("iframe");
  if (iframe && iframe.dataset.src && !iframe.getAttribute("src")) {
    iframe.setAttribute("src", iframe.dataset.src);
  }
}

function setupLessonAccordions() {
  const toggles = document.querySelectorAll(".lesson-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const panelId = toggle.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);
      const expanded = toggle.getAttribute("aria-expanded") === "true";

      document.querySelectorAll(".lesson-toggle").forEach((otherToggle) => {
        const otherPanelId = otherToggle.getAttribute("aria-controls");
        const otherPanel = document.getElementById(otherPanelId);

        if (otherToggle !== toggle) {
          closeLesson(otherToggle, otherPanel);
        }
      });

      if (expanded) {
        closeLesson(toggle, panel);
      } else {
        openLesson(toggle, panel);
      }
    });
  });
}

function injectArticleStyles() {
  if (document.getElementById("wlf-article-lesson-style")) return;

  const style = document.createElement("style");
  style.id = "wlf-article-lesson-style";
  style.textContent = `
    .lesson-type-tag {
      display: inline-flex;
      margin-left: 8px;
      color: var(--gold);
      border: 1px solid rgba(214, 168, 80, 0.24);
      background: rgba(214, 168, 80, 0.08);
      border-radius: 999px;
      padding: 4px 8px;
      font-size: 0.72rem;
      font-weight: 950;
      vertical-align: middle;
    }

    .article-lesson {
      display: grid;
      gap: 16px;
      color: var(--muted);
      line-height: 1.7;
    }

    .article-intro,
    .article-footer {
      margin: 0;
      color: var(--muted);
    }

    .article-section {
      border: 1px solid rgba(255,255,255,0.10);
      background: rgba(0,0,0,0.16);
      border-radius: 18px;
      padding: 18px;
    }

    .article-section h4 {
      margin: 0 0 12px;
      color: var(--text);
      font-size: 1.04rem;
    }

    .article-section ol,
    .article-section ul {
      margin: 0;
      padding-left: 22px;
      color: var(--muted);
      line-height: 1.8;
    }

    .article-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 4px;
    }
  `;

  document.head.appendChild(style);
}

requireActiveUser(() => {
  injectArticleStyles();
  renderCourse();
});
