import { firebaseConfig } from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let isLoggedIn = false;

const loginLink = document.getElementById("loginLink");
const courseLink = document.getElementById("courseLink");
const homeLogoutBtn = document.getElementById("homeLogoutBtn");
const smartCourseLinks = document.querySelectorAll(".smart-course-link");

function refreshLinks() {
  smartCourseLinks.forEach((link) => {
    link.setAttribute("href", isLoggedIn ? "/dashboard.html" : "/login.html");
  });
}

onAuthStateChanged(auth, (user) => {
  isLoggedIn = Boolean(user);

  if (user) {
    loginLink?.classList.add("hidden");
    courseLink?.classList.remove("hidden");
    homeLogoutBtn?.classList.remove("hidden");
  } else {
    loginLink?.classList.remove("hidden");
    courseLink?.classList.add("hidden");
    homeLogoutBtn?.classList.add("hidden");
  }

  refreshLinks();
});

smartCourseLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = isLoggedIn ? "/dashboard.html" : "/login.html";
  });
});

if (homeLogoutBtn) {
  homeLogoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "/";
  });
}

refreshLinks();
