import { firebaseConfig } from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleBtn = document.getElementById("googleLogin");
const facebookBtn = document.getElementById("facebookLogin");
const logoutBtn = document.getElementById("logoutBtn");

async function checkAccess(email) {
  const response = await fetch("/api/check-access", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  if (!response.ok) {
    console.error("Access check failed:", response.status, await response.text());
    return false;
  }

  const data = await response.json();
  return Boolean(data.active);
}

async function afterLogin(user) {
  const email = user?.email;

  if (!email) {
    alert("No se pudo leer el correo de la cuenta.");
    window.location.href = "/denied.html";
    return;
  }

  const active = await checkAccess(email);

  if (active) {
    window.location.href = "/dashboard.html";
  } else {
    window.location.href = "/denied.html";
  }
}

if (googleBtn) {
  googleBtn.addEventListener("click", async () => {
    try {
      const provider = new GoogleAuthProvider();

      provider.setCustomParameters({
        prompt: "select_account"
      });

      const result = await signInWithPopup(auth, provider);
      await afterLogin(result.user);
    } catch (error) {
      console.error("Google login error:", error);
      alert(
        "Google login error:\n\n" +
        "Code: " + error.code + "\n\n" +
        "Message: " + error.message
      );
    }
  });
}

if (facebookBtn) {
  facebookBtn.addEventListener("click", async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await afterLogin(result.user);
    } catch (error) {
      console.error("Facebook login error:", error);
      alert(
        "Facebook login error:\n\n" +
        "Code: " + error.code + "\n\n" +
        "Message: " + error.message
      );
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "/login.html";
  });
}

export function requireActiveUser(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "/login.html";
      return;
    }

    const emailBox = document.getElementById("userEmail");
    if (emailBox) emailBox.textContent = user.email;

    const active = await checkAccess(user.email);

    if (!active) {
      window.location.href = "/denied.html";
      return;
    }

    callback(user);
  });
}