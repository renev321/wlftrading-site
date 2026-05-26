import { auth, requireActiveUser } from "./auth.js";

async function getIdToken() {
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken();
}

async function checkAdminLink() {
  const adminLink = document.getElementById("adminPanelLink");
  if (!adminLink) return;

  try {
    const token = await getIdToken();
    if (!token) return;

    const response = await fetch("/api/admin/me", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) return;

    const data = await response.json();

    if (data.isAdmin) {
      adminLink.classList.remove("hidden");
    }
  } catch (error) {
    console.warn("Admin link check failed:", error);
  }
}

requireActiveUser(() => {
  checkAdminLink();
});
