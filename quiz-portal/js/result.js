// ============================================================
//  result.js  –  Result page: animations, canvas chart, leaderboard
// ============================================================

const ResultPage = (() => {

  function init() {
    const score     = parseInt(localStorage.getItem("quizScore")     || "0");
    const total     = parseInt(localStorage.getItem("quizTotal")     || "10");
    const timeTaken = parseInt(localStorage.getItem("quizTimeTaken") || "0");
    const catId     = localStorage.getItem("quizCategory");
    const category  = QUIZ_DATA.categories.find(c => c.id === catId);
    const pct       = Math.round((score / total) * 100);
    const passed    = pct >= 60;

    // Animate score counter
    animateCounter(document.getElementById("score-value"),  0, score, 1200);
    animateCounter(document.getElementById("score-total"),  0, total, 1200);
    animateCounter(document.getElementById("pct-display"),  0, pct,   1400);

    // Pass / Fail badge
    const badge = document.getElementById("result-badge");
    if (badge) {
      badge.textContent  = passed ? "🎉 Passed!" : "😔 Failed";
      badge.className    = `result-badge ${passed ? "pass" : "fail"}`;
    }

    // Time display
    const timeEl = document.getElementById("time-taken");
    if (timeEl) {
      const m = Math.floor(timeTaken / 60);
      const s = timeTaken % 60;
      timeEl.textContent = m > 0 ? `${m}m ${s}s` : `${s}s`;
    }

    // Category label
    const catEl = document.getElementById("result-category");
    if (catEl && category) catEl.textContent = category.title;

    // Canvas pie chart
    drawChart(score, total, pct, passed);

    // Leaderboard
    renderLeaderboard();
  }

  // ── Animated counter ──────────────────────────────────────
  function animateCounter(el, from, to, duration) {
    if (!el) return;
    const startTime = performance.now();
    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(from + (to - from) * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // ── Canvas donut chart ────────────────────────────────────
  function drawChart(score, total, pct, passed) {
    const canvas = document.getElementById("result-canvas");
    if (!canvas) return;
    const ctx    = canvas.getContext("2d");
    const cx     = canvas.width / 2;
    const cy     = canvas.height / 2;
    const radius = 70;
    const lineW  = 18;

    const correctAngle = (score / total) * 2 * Math.PI;
    const wrongAngle   = ((total - score) / total) * 2 * Math.PI;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Wrong segment (background)
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#fecaca";
    ctx.lineWidth   = lineW;
    ctx.stroke();

    // Correct segment (animated)
    let currentAngle = -Math.PI / 2;
    let progress     = 0;

    function animate() {
      progress = Math.min(progress + 0.03, 1);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Track
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = "#fecaca";
      ctx.lineWidth   = lineW;
      ctx.stroke();

      // Correct arc
      const endAngle = currentAngle + correctAngle * progress;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, currentAngle, endAngle);
      ctx.strokeStyle  = passed ? "#86efac" : "#fca5a5";
      ctx.lineWidth    = lineW;
      ctx.lineCap      = "round";
      ctx.stroke();

      // Centre text
      ctx.fillStyle  = "#334155";
      ctx.font       = "bold 22px 'Poppins', sans-serif";
      ctx.textAlign  = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${Math.round(pct * progress)}%`, cx, cy);

      if (progress < 1) requestAnimationFrame(animate);
    }
    animate();
  }

  // ── Leaderboard ───────────────────────────────────────────
  function renderLeaderboard() {
    const container = document.getElementById("leaderboard-body");
    if (!container) return;
    const lb = getLeaderboard();
    if (lb.length === 0) {
      container.innerHTML = `<tr><td colspan="5" class="lb-empty">No entries yet. Be the first!</td></tr>`;
      return;
    }
    container.innerHTML = lb.slice(0, 10).map((e, i) => `
      <tr class="${i === 0 ? 'lb-top' : ''}">
        <td><span class="lb-rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</span></td>
        <td class="lb-name">${escHtml(e.username)}</td>
        <td>${escHtml(e.category)}</td>
        <td><span class="lb-score">${e.score}/${e.total}</span></td>
        <td><span class="lb-pct ${e.pct >= 60 ? 'pass' : 'fail'}">${e.pct}%</span></td>
      </tr>
    `).join("");
  }

  function escHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
    }[c]));
  }

  return { init };

})();
