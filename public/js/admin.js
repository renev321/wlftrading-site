import { auth, requireActiveUser } from "./auth.js";

const loadingBox = document.getElementById("loadingBox");
const adminApp = document.getElementById("adminApp");
const adminDenied = document.getElementById("adminDenied");
const adminStatusCard = document.getElementById("adminStatusCard");

const usersTable = document.getElementById("usersTable");
const refreshUsersBtn = document.getElementById("refreshUsersBtn");
const userSearchInput = document.getElementById("userSearchInput");

const grantAccessForm = document.getElementById("grantAccessForm");
const grantResult = document.getElementById("grantResult");
const clearGrantFormBtn = document.getElementById("clearGrantFormBtn");

const editUserModal = document.getElementById("editUserModal");
const editModalBackdrop = document.getElementById("editModalBackdrop");
const closeEditModalBtn = document.getElementById("closeEditModalBtn");
const editUserForm = document.getElementById("editUserForm");
const editResult = document.getElementById("editResult");
const disableUserBtn = document.getElementById("disableUserBtn");
const deleteUserBtn = document.getElementById("deleteUserBtn");
const editFeatureChecks = document.getElementById("editFeatureChecks");

const FEATURES = [
  { code: "vip_course", label: "Curso VIP" },
  { code: "practice", label: "Práctica" },
  { code: "library", label: "Biblioteca" },
  { code: "audiobooks", label: "Audiolibros" },
  { code: "coach", label: "WLF Coach" },
  { code: "community", label: "Comunidad" },
  { code: "tools", label: "Tools / Toolkit" },
  { code: "admin_panel", label: "Admin Panel" }
];

let allUsers = [];
let currentEditUser = null;

async function getIdToken() {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in.");
  return user.getIdToken();
}

async function apiFetch(url, options = {}) {
  const token = await getIdToken();

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || data.error || "API error");
  }

  return data;
}

function setStatus(title, text) {
  if (!adminStatusCard) return;

  adminStatusCard.innerHTML = `
    <span class="status-dot"></span>
    <div>
      <strong>${title}</strong>
      <p>${text}</p>
    </div>
  `;
}

async function validateAdmin() {
  try {
    const data = await apiFetch("/api/admin/me");

    if (!data.isAdmin) {
      loadingBox?.classList.add("hidden");
      adminDenied.classList.remove("hidden");
      setStatus("Sin acceso admin", "Tu cuenta no tiene permisos de administrador.");
      return false;
    }

    loadingBox?.classList.add("hidden");
    adminApp.classList.remove("hidden");
    setStatus("Admin activo", "Puedes gestionar usuarios y permisos.");
    return true;
  } catch (error) {
    loadingBox?.classList.add("hidden");
    adminDenied.classList.remove("hidden");
    setStatus("Error de API", "No se pudo validar el acceso admin.");
    console.error(error);
    return false;
  }
}

function renderUsers(users) {
  if (!usersTable) return;

  if (!users.length) {
    usersTable.innerHTML = `<div style="padding:18px;color:var(--muted);">No hay usuarios para mostrar.</div>`;
    return;
  }

  usersTable.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr>
          <th class="admin-actions-head">Acciones</th>
          <th class="admin-user-cell">Usuario</th>
          <th>Status</th>
          <th>Roles</th>
          <th class="admin-features-cell">Features</th>
          <th>Expira curso</th>
          <th>Creado</th>
          <th>Actualizado</th>
          <th class="admin-raw-cell">Raw</th>
        </tr>
      </thead>
      <tbody>
        ${users.map((user) => {
          const features = (user.features || [])
            .filter((feature) => Number(feature.is_active) === 1)
            .map((feature) => `
              <span class="feature-pill ${feature.isExpired ? "expired" : ""}">
                ${feature.feature_code}
              </span>
            `).join("");

          const roles = (user.roles || []).map((role) => `
            <span class="role-pill">${role}</span>
          `).join("");

          const statusClass = String(user.status || "").toLowerCase();
          const toggleLabel = statusClass === "active" ? "Disable" : "Enable";

          return `
            <tr>
              <td class="admin-actions-cell">
                <div class="admin-row-actions">
                  <button class="admin-action" data-action="edit" data-email="${user.email}">Edit</button>
                  <button class="admin-action" data-action="toggle" data-email="${user.email}">${toggleLabel}</button>
                  <button class="admin-action danger" data-action="delete" data-email="${user.email}">Delete</button>
                </div>
              </td>
              <td class="admin-user-cell">
                <strong>${user.email}</strong><br>
                ${user.name || "<span style='opacity:.6'>No name</span>"}<br>
                <small>ID: ${user.student_id || "-"}</small>
              </td>
              <td>
                <span class="status-pill ${statusClass}">${user.status || "-"}</span><br>
                <small>course_access: ${Number(user.course_access || 0) === 1 ? "yes" : "no"}</small>
              </td>
              <td>${roles || "-"}</td>
              <td class="admin-features-cell">${features || "-"}</td>
              <td>${user.expires_at || "-"}</td>
              <td>${user.created_at || "-"}</td>
              <td>${user.updated_at || "-"}</td>
              <td class="admin-raw-cell">
                <button class="admin-action raw" data-action="raw" data-email="${user.email}">View raw</button>
              </td>
            </tr>
          `;
        }).join("")}
      </tbody>
    </table>
  `;

  usersTable.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      const email = button.dataset.email;
      const user = allUsers.find((item) => item.email === email);

      if (!user) return;

      if (action === "edit") openEditModal(user);
      if (action === "toggle") toggleUser(user);
      if (action === "delete") deleteUser(user);
      if (action === "raw") showRawUser(user);
    });
  });
}

function showRawUser(user) {
  const modal = document.createElement("div");
  modal.className = "admin-modal";

  modal.innerHTML = `
    <div class="admin-modal-backdrop"></div>
    <div class="admin-modal-card">
      <div class="admin-modal-header">
        <div>
          <p class="eyebrow">Raw data</p>
          <h2>${user.email}</h2>
        </div>
        <button class="btn tiny ghost" type="button" data-close-raw>Close</button>
      </div>
      <pre class="raw-data-pre">${escapeHtml(JSON.stringify(user, null, 2))}</pre>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("[data-close-raw]").addEventListener("click", () => modal.remove());
  modal.querySelector(".admin-modal-backdrop").addEventListener("click", () => modal.remove());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function filterUsers() {
  const search = (userSearchInput?.value || "").toLowerCase().trim();

  if (!search) {
    renderUsers(allUsers);
    return;
  }

  const filtered = allUsers.filter((user) => (
    (user.email || "").toLowerCase().includes(search) ||
    (user.name || "").toLowerCase().includes(search) ||
    (user.status || "").toLowerCase().includes(search)
  ));

  renderUsers(filtered);
}

async function loadUsers() {
  usersTable.innerHTML = `<div style="padding:18px;color:var(--muted);">Cargando usuarios...</div>`;

  try {
    const data = await apiFetch("/api/admin/users");
    allUsers = data.users || [];
    renderUsers(allUsers);
  } catch (error) {
    usersTable.innerHTML = `
      <div style="padding:18px;color:#ff9c9c;">
        Error cargando usuarios: ${error.message}
      </div>
    `;
  }
}

function setupTabs() {
  document.querySelectorAll(".admin-tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".admin-tab").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      const tab = button.dataset.tab;

      document.querySelectorAll("[data-panel]").forEach((panel) => {
        panel.classList.toggle("hidden", panel.dataset.panel !== tab);
      });
    });
  });
}

function showGrantResult(message, isError = false) {
  grantResult.textContent = message;
  grantResult.classList.remove("hidden");
  grantResult.classList.toggle("error", isError);
}

function showEditResult(message, isError = false) {
  editResult.textContent = message;
  editResult.classList.remove("hidden");
  editResult.classList.toggle("error", isError);
}

function clearGrantForm() {
  grantAccessForm.reset();
  grantResult.classList.add("hidden");
  grantResult.textContent = "";
  grantResult.classList.remove("error");
}

async function submitGrant(event) {
  event.preventDefault();

  const payload = {
    email: document.getElementById("grantEmail").value.trim(),
    name: document.getElementById("grantName").value.trim(),
    feature_code: document.getElementById("grantFeature").value,
    access_type: document.getElementById("grantAccessType").value,
    expires_at: document.getElementById("grantExpiresAt").value || null,
    notes: document.getElementById("grantNotes").value.trim()
  };

  try {
    await apiFetch("/api/admin/grant-access", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    showGrantResult("Acceso guardado correctamente.");
    await loadUsers();
  } catch (error) {
    showGrantResult(error.message, true);
  }
}

function buildFeatureChecks() {
  editFeatureChecks.innerHTML = FEATURES.map((feature) => `
    <label class="admin-check">
      <input type="checkbox" value="${feature.code}" data-feature-check />
      <span>${feature.label}</span>
    </label>
  `).join("");
}

function openEditModal(user) {
  currentEditUser = user;
  editResult.classList.add("hidden");
  editResult.textContent = "";

  document.getElementById("editModalTitle").textContent = user.email;
  document.getElementById("editOriginalEmail").value = user.email;
  document.getElementById("editEmail").value = user.email;
  document.getElementById("editName").value = user.name || "";
  document.getElementById("editStatus").value = user.status || "active";
  document.getElementById("editCourseAccess").checked = Number(user.course_access || 0) === 1;
  document.getElementById("editExpiresAt").value = user.expires_at || "";
  document.getElementById("editNotes").value = user.notes || "";

  const activeFeatures = new Set(
    (user.features || [])
      .filter((feature) => Number(feature.is_active) === 1)
      .map((feature) => feature.feature_code)
  );

  document.querySelectorAll("[data-feature-check]").forEach((check) => {
    check.checked = activeFeatures.has(check.value);
  });

  const roles = new Set(user.roles || []);
  document.getElementById("editRoleStudent").checked = roles.has("student");
  document.getElementById("editRoleAdmin").checked = roles.has("admin");

  editUserModal.classList.remove("hidden");
}

function closeEditModal() {
  editUserModal.classList.add("hidden");
  currentEditUser = null;
}

async function submitEdit(event) {
  event.preventDefault();

  const selectedFeatures = [...document.querySelectorAll("[data-feature-check]")]
    .filter((check) => check.checked)
    .map((check) => check.value);

  const selectedRoles = [];
  if (document.getElementById("editRoleStudent").checked) selectedRoles.push("student");
  if (document.getElementById("editRoleAdmin").checked) selectedRoles.push("admin");

  const payload = {
    original_email: document.getElementById("editOriginalEmail").value.trim(),
    email: document.getElementById("editEmail").value.trim(),
    name: document.getElementById("editName").value.trim(),
    status: document.getElementById("editStatus").value,
    course_access: document.getElementById("editCourseAccess").checked ? 1 : 0,
    expires_at: document.getElementById("editExpiresAt").value || null,
    notes: document.getElementById("editNotes").value.trim(),
    features: selectedFeatures,
    roles: selectedRoles
  };

  try {
    await apiFetch("/api/admin/update-user", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    showEditResult("Usuario actualizado correctamente.");
    await loadUsers();

    setTimeout(closeEditModal, 500);
  } catch (error) {
    showEditResult(error.message, true);
  }
}

async function toggleUser(user) {
  const isActive = String(user.status || "").toLowerCase() === "active";
  const action = isActive ? "disable" : "enable";

  const confirmed = confirm(`Are you sure you want to ${action} ${user.email}?`);
  if (!confirmed) return;

  try {
    await apiFetch("/api/admin/toggle-user", {
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        enabled: !isActive
      })
    });

    await loadUsers();
  } catch (error) {
    alert(error.message);
  }
}

async function deleteUser(user) {
  const firstConfirm = confirm(`Delete ${user.email}? This will remove the user and all permissions.`);
  if (!firstConfirm) return;

  const typed = prompt(`Type DELETE to confirm deleting ${user.email}`);
  if (typed !== "DELETE") return;

  try {
    await apiFetch("/api/admin/delete-user", {
      method: "POST",
      body: JSON.stringify({
        email: user.email
      })
    });

    await loadUsers();
  } catch (error) {
    alert(error.message);
  }
}

async function disableCurrentUser() {
  if (!currentEditUser) return;
  await toggleUser(currentEditUser);
  closeEditModal();
}

async function deleteCurrentUser() {
  if (!currentEditUser) return;
  await deleteUser(currentEditUser);
  closeEditModal();
}

requireActiveUser(async () => {
  setupTabs();
  buildFeatureChecks();

  refreshUsersBtn?.addEventListener("click", loadUsers);
  userSearchInput?.addEventListener("input", filterUsers);
  grantAccessForm?.addEventListener("submit", submitGrant);
  clearGrantFormBtn?.addEventListener("click", clearGrantForm);

  editUserForm?.addEventListener("submit", submitEdit);
  closeEditModalBtn?.addEventListener("click", closeEditModal);
  editModalBackdrop?.addEventListener("click", closeEditModal);
  disableUserBtn?.addEventListener("click", disableCurrentUser);
  deleteUserBtn?.addEventListener("click", deleteCurrentUser);

  const isAdmin = await validateAdmin();
  if (isAdmin) {
    await loadUsers();
  }
});
