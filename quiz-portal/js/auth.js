// ============================================================
//  auth.js  –  Authentication & session management
// ============================================================

const AUTH = {

  // ── Session ───────────────────────────────────────────────

  getUser() {
    return localStorage.getItem("quizUsername");
  },

  login(username) {
    if (!username || username.trim().length < 2) return false;
    localStorage.setItem("quizUsername", username.trim());
    return true;
  },

  logout() {
    localStorage.removeItem("quizUsername");
    window.location.href = "index.html";
  },

  // ── Guard – call on protected pages ──────────────────────

  requireAuth() {
    if (!this.getUser()) {
      window.location.href = "index.html";
      return false;
    }
    return true;
  },

  // ── Redirect logged-in users away from login page ────────

  redirectIfLoggedIn() {
    if (this.getUser()) {
      window.location.href = "dashboard.html";
    }
  }
};
