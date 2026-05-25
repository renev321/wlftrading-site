import { courseModules } from "./config.js";
import { requireActiveUser } from "./auth.js";

function renderCourse() {
  const loadingBox = document.getElementById("loadingBox");
  const courseContent = document.getElementById("courseContent");

  if (!courseContent) return;

  courseContent.innerHTML = courseModules.map((module) => `
    <article class="course-module">
      <h3>${module.title}</h3>
      <p class="muted">${module.description}</p>
      <div class="lesson-list">
        ${module.lessons.map((lesson) => `
          <a class="lesson-link" href="${lesson.url}" target="_blank" rel="noopener">
            <span>${lesson.title}</span>
            <strong>Ver video</strong>
          </a>
        `).join("")}
      </div>
    </article>
  `).join("");

  loadingBox?.classList.add("hidden");
  courseContent.classList.remove("hidden");
}

requireActiveUser(() => {
  renderCourse();
});
