import {
  courseModules,
  communityLinks,
  audiobookLinks,
  toolLinks
} from "./config.js";

import { requireActiveUser } from "./auth.js";

function injectCourseStyles() {
  if (document.getElementById("wlf-course-article-styles")) return;

  const style = document.createElement("style");
  style.id = "wlf-course-article-styles";
  style.textContent = `
    .course-module-card {
      border: 1px solid var(--border);
      background: linear-gradient(135deg, rgba(255,255,255,0.075), rgba(255,255,255,0.035));
      border-radius: 28px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .course-module-card > p,
    .course-lesson-desc,
    .lesson-article-intro,
    .lesson-article-footer,
    .lesson-article-section li,
    .simple-resource-card p {
      color: var(--muted);
      line-height: 1.65;
    }
    .course-lessons {
      display: grid;
      gap: 12px;
      margin-top: 20px;
    }
    .course-lesson-header {
      width: 100%;
      cursor: pointer;
      border: 1px solid rgba(255,255,255,0.10);
      background: rgba(255,255,255,0.04);
      color: var(--text);
      border-radius: 18px;
      padding: 16px 18px;
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
      text-align: left;
    }
    .course-lesson-header:hover {
      background: rgba(51,209,96,0.065);
      border-color: rgba(51,209,96,0.20);
    }
    .course-lesson-title {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      font-weight: 950;
    }
    .course-lesson-desc {
      margin: 8px 0 0;
    }
    .lesson-status-pill {
      display: inline-flex;
      border-radius: 999px;
      padding: 8px 12px;
      font-size: 0.78rem;
      font-weight: 950;
      background: rgba(51,209,96,0.10);
      color: var(--green);
      border: 1px solid rgba(51,209,96,0.22);
      white-space: nowrap;
    }
    .lesson-type-pill {
      display: inline-flex;
      border-radius: 999px;
      padding: 7px 10px;
      font-size: 0.74rem;
      font-weight: 900;
      color: var(--gold);
      border: 1px solid rgba(214,168,80,0.24);
      background: rgba(214,168,80,0.08);
    }
    .lesson-panel {
      margin-top: 14px;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.04);
      border-radius: 22px;
      padding: 18px;
    }
    .lesson-hidden {
      display: none;
    }
    .lesson-video-frame {
      width: 100%;
      aspect-ratio: 16 / 9;
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(0,0,0,0.30);
    }
    .lesson-video-frame iframe {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
    }
    .lesson-article {
      display: grid;
      gap: 18px;
    }
    .lesson-article-section {
      border: 1px solid rgba(255,255,255,0.10);
      background: rgba(0,0,0,0.16);
      border-radius: 18px;
      padding: 18px;
    }
    .lesson-article-section h4 {
      margin: 0 0 12px;
      color: var(--text);
      font-size: 1.04rem;
    }
    .lesson-article-section ol,
    .lesson-article-section ul {
      margin: 0;
      padding-left: 22px;
    }
    .lesson-article-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
    }
    .member-card-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }
    .simple-resource-card {
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.045);
      border-radius: 22px;
      padding: 20px;
    }
    .simple-resource-card .tag {
      color: var(--gold);
      font-size: 0.78rem;
      font-weight: 950;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    @media (max-width: 760px) {
      .member-card-grid {
        grid-template-columns: 1fr;
      }
      .course-lesson-header {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `;

  document.head.appendChild(style);
}

function isAvailable(item) {
  return item.status === "available";
}

function getLessonTypeLabel(lesson) {
  if (lesson.type === "article") return "Guía";
  if (lesson.type === "video") return "Video";
  return "Recurso";
}

function closeOtherLessons(currentPanel) {
  document.querySelectorAll(".lesson-panel").forEach((panel) => {
    if (panel !== currentPanel) {
      panel.classList.add("lesson-hidden");
      const iframe = panel.querySelector("iframe");
      if (iframe) iframe.removeAttribute("src");
    }
  });
}

function renderArticle(lesson) {
  const article = lesson.article || {};
  const sections = article.sections || [];

  return `
    <div class="lesson-article">
      ${article.intro ? `<p class="lesson-article-intro">${article.intro}</p>` : ""}

      ${sections.map((section, sectionIndex) => {
        const listTag = sectionIndex === 0 ? "ol" : "ul";

        return `
          <div class="lesson-article-section">
            <h4>${section.title}</h4>
            <${listTag}>
              ${(section.items || []).map((item) => `<li>${item}</li>`).join("")}
            </${listTag}>
          </div>
        `;
      }).join("")}

      ${article.footer ? `<p class="lesson-article-footer">${article.footer}</p>` : ""}

      ${lesson.externalUrl ? `
        <div class="lesson-article-actions">
          <a class="btn primary" href="${lesson.externalUrl}" target="_blank" rel="noopener">
            ${lesson.externalLabel || "Abrir recurso oficial"}
          </a>
        </div>
      ` : ""}
    </div>
  `;
}

function renderLessonPanel(lesson, moduleIndex, lessonIndex) {
  const panelId = `lesson-panel-${moduleIndex}-${lessonIndex}`;

  if (!isAvailable(lesson)) {
    return `<div id="${panelId}" class="lesson-panel lesson-hidden">Próximamente.</div>`;
  }

  if (lesson.type === "article") {
    return `
      <div id="${panelId}" class="lesson-panel lesson-hidden">
        ${renderArticle(lesson)}
      </div>
    `;
  }

  return `
    <div id="${panelId}" class="lesson-panel lesson-hidden">
      <div class="lesson-video-frame">
        <iframe
          data-src="${lesson.embedUrl || ""}"
          allow="autoplay; fullscreen"
          allowfullscreen
          title="${lesson.title}"
        ></iframe>
      </div>
    </div>
  `;
}

function renderCourse() {
  const container = document.getElementById("courseContent");
  if (!container) return;

  container.innerHTML = courseModules.map((module, moduleIndex) => `
    <article class="course-module-card">
      <h3>${module.title}</h3>
      <p>${module.description}</p>

      <div class="course-lessons">
        ${(module.lessons || []).map((lesson, lessonIndex) => {
          const available = isAvailable(lesson);
          const panelId = `lesson-panel-${moduleIndex}-${lessonIndex}`;

          return `
            <div class="course-lesson">
              <button
                class="course-lesson-header"
                type="button"
                data-panel-id="${panelId}"
                ${available ? "" : "disabled"}
              >
                <div>
                  <div class="course-lesson-title">
                    <span>${lesson.title}</span>
                    <span class="lesson-type-pill">${getLessonTypeLabel(lesson)}</span>
                  </div>
                  <p class="course-lesson-desc">${lesson.description || ""}</p>
                </div>

                <span class="lesson-status-pill">
                  ${available ? "Disponible" : "Pendiente"}
                </span>
              </button>

              ${renderLessonPanel(lesson, moduleIndex, lessonIndex)}
            </div>
          `;
        }).join("")}
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-panel-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(button.dataset.panelId);
      if (!panel) return;

      const wasHidden = panel.classList.contains("lesson-hidden");
      closeOtherLessons(panel);

      if (wasHidden) {
        panel.classList.remove("lesson-hidden");
        const iframe = panel.querySelector("iframe");
        if (iframe && iframe.dataset.src && !iframe.getAttribute("src")) {
          iframe.setAttribute("src", iframe.dataset.src);
        }
      } else {
        panel.classList.add("lesson-hidden");
        const iframe = panel.querySelector("iframe");
        if (iframe) iframe.removeAttribute("src");
      }
    });
  });
}

function renderResourceCards(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = (items || []).map((item) => {
    const disabled = !item.url || item.url === "#";

    return `
      <article class="simple-resource-card">
        <span class="tag">${item.tag || "Recurso"}</span>
        <h3>${item.title}</h3>
        <p>${item.description || ""}</p>
        ${disabled ? `
          <span class="btn tiny ghost">Próximamente</span>
        ` : `
          <a class="btn tiny ghost" href="${item.url}" target="_blank" rel="noopener">Abrir</a>
        `}
      </article>
    `;
  }).join("");
}

function showMemberSections() {
  document.querySelectorAll(".member-section").forEach((section) => {
    section.classList.remove("hidden");
  });

  document.getElementById("loadingBox")?.classList.add("hidden");
}

function initDashboard() {
  injectCourseStyles();
  renderCourse();
  renderResourceCards("audiobookContent", audiobookLinks);
  renderResourceCards("toolsContent", toolLinks);
  renderResourceCards("communityContent", communityLinks);
  showMemberSections();
}

requireActiveUser(() => {
  initDashboard();
});
