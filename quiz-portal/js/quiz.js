// ============================================================
//  quiz.js  –  Quiz engine: timer, navigation, submission
// ============================================================

const Quiz = (() => {

  // ── State ─────────────────────────────────────────────────
  let state = {
    category:     null,
    questions:    [],
    current:      0,
    answers:      {},        // { questionIndex: optionIndex }
    timeLeft:     0,
    timerInterval: null,
    startTime:    null,
    soundEnabled: true
  };

  // ── Audio (simple beep via AudioContext) ──────────────────
  function beep(freq = 440, dur = 80, vol = 0.15) {
    if (!state.soundEnabled) return;
    try {
      const ctx  = new (window.AudioContext || window.webkitAudioContext)();
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur / 1000);
      osc.start(); osc.stop(ctx.currentTime + dur / 1000);
    } catch(_) {}
  }

  // ── Init ──────────────────────────────────────────────────
  function init() {
    const catId = localStorage.getItem("quizCategory");
    if (!catId) { window.location.href = "dashboard.html"; return; }

    state.category  = QUIZ_DATA.categories.find(c => c.id === catId);
    if (!state.category) { window.location.href = "dashboard.html"; return; }

    state.questions = state.category.questions;
    state.timeLeft  = state.category.time;
    state.current   = 0;
    state.answers   = {};
    state.startTime = Date.now();
    state.soundEnabled = localStorage.getItem("quizSound") !== "false";

    render();
    startTimer();
  }

  // ── Timer ─────────────────────────────────────────────────
  function startTimer() {
    renderTimer();
    state.timerInterval = setInterval(() => {
      state.timeLeft--;
      renderTimer();
      if (state.timeLeft <= 10) beep(600, 60);
      if (state.timeLeft <= 0) { clearInterval(state.timerInterval); submitQuiz(); }
    }, 1000);
  }

  function renderTimer() {
    const mins = String(Math.floor(state.timeLeft / 60)).padStart(2, "0");
    const secs = String(state.timeLeft % 60).padStart(2, "0");
    const el   = document.getElementById("timer-display");
    if (el) el.textContent = `${mins}:${secs}`;

    // Circular SVG progress
    const circle = document.getElementById("timer-circle");
    if (circle) {
      const total    = state.category.time;
      const pct      = state.timeLeft / total;
      const circumf  = 2 * Math.PI * 36;
      const offset   = circumf * (1 - pct);
      circle.style.strokeDashoffset = offset;
      circle.style.stroke = state.timeLeft <= 30
        ? "#f87171"
        : state.timeLeft <= 60 ? "#fde68a" : "#a5b4fc";
    }
  }

  // ── Render question ───────────────────────────────────────
  function render() {
    const q   = state.questions[state.current];
    const n   = state.questions.length;
    const idx = state.current;

    // Progress bar
    const bar = document.getElementById("progress-bar");
    if (bar) bar.style.width = `${((idx + 1) / n) * 100}%`;

    // Counter
    const ctr = document.getElementById("question-counter");
    if (ctr) ctr.textContent = `Question ${idx + 1} of ${n}`;

    // Question text
    const qEl = document.getElementById("question-text");
    if (qEl) {
      qEl.style.opacity = 0;
      setTimeout(() => {
        qEl.textContent = q.question;
        qEl.style.opacity = 1;
      }, 150);
    }

    // Options
    const optsEl = document.getElementById("options-container");
    if (optsEl) {
      optsEl.style.opacity = 0;
      setTimeout(() => {
        optsEl.innerHTML = "";
        q.options.forEach((opt, i) => {
          const btn = document.createElement("button");
          btn.className = "option-btn";
          btn.innerHTML = `<span class="opt-letter">${String.fromCharCode(65 + i)}</span><span class="opt-text">${opt}</span>`;

          // Restore saved answer
          if (state.answers[idx] === i) btn.classList.add("selected");

          btn.addEventListener("click", () => selectOption(i));
          optsEl.appendChild(btn);
        });
        optsEl.style.opacity = 1;
      }, 150);
    }

    // Nav buttons
    const prevBtn = document.getElementById("btn-prev");
    const nextBtn = document.getElementById("btn-next");
    const subBtn  = document.getElementById("btn-submit");
    if (prevBtn) prevBtn.disabled = idx === 0;
    if (nextBtn) nextBtn.style.display = idx < n - 1 ? "flex" : "none";
    if (subBtn)  subBtn.style.display  = idx === n - 1 ? "flex" : "none";

    // Dots nav
    renderDots();
  }

  function renderDots() {
    const dotsEl = document.getElementById("question-dots");
    if (!dotsEl) return;
    dotsEl.innerHTML = "";
    state.questions.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "q-dot";
      if (i === state.current)          dot.classList.add("active");
      else if (state.answers[i] !== undefined) dot.classList.add("answered");
      dot.addEventListener("click", () => goTo(i));
      dotsEl.appendChild(dot);
    });
  }

  // ── Selection ─────────────────────────────────────────────
  function selectOption(optIdx) {
    beep(520, 60);
    state.answers[state.current] = optIdx;
    document.querySelectorAll(".option-btn").forEach((btn, i) => {
      btn.classList.toggle("selected", i === optIdx);
    });
    renderDots();
  }

  // ── Navigation ────────────────────────────────────────────
  function goTo(idx) {
    state.current = idx;
    render();
  }

  function next() {
    if (state.current < state.questions.length - 1) {
      state.current++;
      render();
    }
  }

  function prev() {
    if (state.current > 0) {
      state.current--;
      render();
    }
  }

  // ── Submit ────────────────────────────────────────────────
  function submitQuiz() {
    clearInterval(state.timerInterval);

    // Calculate score
    let score = 0;
    state.questions.forEach((q, i) => {
      if (state.answers[i] === q.answer) score++;
    });

    const timeTaken = Math.round((Date.now() - state.startTime) / 1000);

    // Persist results
    localStorage.setItem("quizScore",     score);
    localStorage.setItem("quizTotal",     state.questions.length);
    localStorage.setItem("quizAnswers",   JSON.stringify(state.answers));
    localStorage.setItem("quizQuestions", JSON.stringify(state.questions));
    localStorage.setItem("quizTimeTaken", timeTaken);

    // Add to leaderboard
    const user = localStorage.getItem("quizUsername") || "Anonymous";
    addLeaderboardEntry(user, score, state.questions.length, state.category.title, timeTaken);

    beep(880, 200);
    window.location.href = "result.html";
  }

  // ── Public API ────────────────────────────────────────────
  return { init, next, prev, submitQuiz, goTo };

})();
