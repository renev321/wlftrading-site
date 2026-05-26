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

let allUsers = [];

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
    throw new Error(data.error || "API error");
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
    setStatus("Error de API", "No se pudo validar el acceso admin. Revisa el Worker/API.");
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
          <th>Usuario</th>
          <th>Status</th>
          <th>Features</th>
          <th>Roles</th>
          <th>Expira</th>
        </tr>
      </thead>
      <tbody>
        ${users.map((user) => {
          const features = (user.features || []).map((feature) => `
            <span class="feature-pill ${feature.isExpired ? "expired" : ""}">
              ${feature.feature_code}
            </span>
          `).join("");

          const roles = (user.roles || []).join(", ") || "-";

          return `
            <tr>
              <td>
                <strong>${user.email}</strong><br>
                ${user.name || ""}
              </td>
              <td>${user.status || "-"}</td>
              <td>${features || "-"}</td>
              <td>${roles}</td>
              <td>${user.expires_at || "-"}</td>
            </tr>
          `;
        }).join("")}
      </tbody>
    </table>
  `;
}

function filterUsers() {
  const search = (userSearchInput?.value || "").toLowerCase().trim();

  if (!search) {
    renderUsers(allUsers);
    return;
  }

  const filtered = allUsers.filter((user) => {
    return (
      (user.email || "").toLowerCase().includes(search) ||
      (user.name || "").toLowerCase().includes(search)
    );
  });

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

requireActiveUser(async () => {
  setupTabs();

  refreshUsersBtn?.addEventListener("click", loadUsers);
  userSearchInput?.addEventListener("input", filterUsers);
  grantAccessForm?.addEventListener("submit", submitGrant);
  clearGrantFormBtn?.addEventListener("click", clearGrantForm);

  const isAdmin = await validateAdmin();
  if (isAdmin) {
    await loadUsers();
  }
});
