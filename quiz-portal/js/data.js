// ============================================================
//  data.js  –  Quiz questions, categories, and leaderboard
// ============================================================

const QUIZ_DATA = {
  categories: [
    {
      id: "javascript",
      title: "JavaScript Fundamentals",
      description: "Test your JS knowledge",
      icon: "⚡",
      gradient: "linear-gradient(135deg,#a5b4fc 0%,#fbcfe8 100%)",
      time: 600,        // seconds
      questions: shuffleArray([
        {
          id: 1,
          question: "Which keyword is used to declare a block-scoped variable in JavaScript?",
          options: ["var", "let", "define", "static"],
          answer: 1,
          explanation: "`let` declares a block-scoped variable, unlike `var` which is function-scoped."
        },
        {
          id: 2,
          question: "What does `typeof null` return in JavaScript?",
          options: ["null", "undefined", "object", "string"],
          answer: 2,
          explanation: "This is a long-standing bug in JavaScript — `typeof null` returns `'object'`."
        },
        {
          id: 3,
          question: "Which method converts a JSON string to a JavaScript object?",
          options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.decode()"],
          answer: 1,
          explanation: "`JSON.parse()` parses a JSON string and returns the corresponding JavaScript value."
        },
        {
          id: 4,
          question: "What is the output of `[] + []` in JavaScript?",
          options: ["[]", "0", "\"\"", "undefined"],
          answer: 2,
          explanation: "Both arrays are coerced to empty strings, resulting in an empty string `\"\"`."
        },
        {
          id: 5,
          question: "Which higher-order function creates a new array with filtered elements?",
          options: ["map()", "reduce()", "filter()", "forEach()"],
          answer: 2,
          explanation: "`filter()` creates a new array with elements that pass the test function."
        },
        {
          id: 6,
          question: "What does the `===` operator check?",
          options: ["Value only", "Type only", "Value and type", "Reference"],
          answer: 2,
          explanation: "`===` is strict equality — it checks both value AND type without coercion."
        },
        {
          id: 7,
          question: "Which method adds one or more elements to the END of an array?",
          options: ["unshift()", "push()", "splice()", "concat()"],
          answer: 1,
          explanation: "`push()` appends elements to the end of the array and returns the new length."
        },
        {
          id: 8,
          question: "What is a closure in JavaScript?",
          options: [
            "A way to close the browser",
            "A function with access to its outer scope variables",
            "A method to end a loop",
            "An error handling mechanism"
          ],
          answer: 1,
          explanation: "A closure is a function that retains access to variables from its lexical scope even after the outer function has returned."
        },
        {
          id: 9,
          question: "Which promise method runs all promises in parallel and resolves when ALL resolve?",
          options: ["Promise.race()", "Promise.any()", "Promise.all()", "Promise.allSettled()"],
          answer: 2,
          explanation: "`Promise.all()` waits for all promises to resolve, or rejects if any reject."
        },
        {
          id: 10,
          question: "What is the purpose of the `async/await` syntax?",
          options: [
            "To write synchronous code faster",
            "To handle asynchronous code more readably",
            "To create new threads",
            "To avoid using functions"
          ],
          answer: 1,
          explanation: "`async/await` is syntactic sugar over Promises, making async code look and behave more like synchronous code."
        }
      ])
    },
    {
      id: "css",
      title: "CSS Mastery",
      description: "Advanced styling concepts",
      icon: "🎨",
      gradient: "linear-gradient(135deg,#fbcfe8 0%,#fde68a 100%)",
      time: 480,
      questions: shuffleArray([
        {
          id: 1,
          question: "Which CSS property controls the stacking order of elements?",
          options: ["stack-order", "z-index", "layer", "depth"],
          answer: 1,
          explanation: "`z-index` determines the stack order of positioned elements."
        },
        {
          id: 2,
          question: "What does `box-sizing: border-box` do?",
          options: [
            "Adds a border around the box",
            "Includes padding and border in the element's total width/height",
            "Removes the default box model",
            "Creates a new block context"
          ],
          answer: 1,
          explanation: "With `border-box`, padding and border are included in the element's width and height."
        },
        {
          id: 3,
          question: "Which flexbox property aligns items along the cross axis?",
          options: ["justify-content", "align-items", "flex-direction", "flex-wrap"],
          answer: 1,
          explanation: "`align-items` aligns flex items along the cross axis (perpendicular to main axis)."
        },
        {
          id: 4,
          question: "What is the default value of `position` for HTML elements?",
          options: ["relative", "absolute", "static", "fixed"],
          answer: 2,
          explanation: "The default value of `position` is `static`, which means elements follow normal document flow."
        },
        {
          id: 5,
          question: "Which CSS unit is relative to the root element's font size?",
          options: ["em", "rem", "px", "vh"],
          answer: 1,
          explanation: "`rem` (root em) is relative to the font-size of the root (`html`) element."
        },
        {
          id: 6,
          question: "What does the CSS `::before` pseudo-element do?",
          options: [
            "Selects the element before a specific element",
            "Inserts content before the element's content",
            "Applies styles before other rules",
            "Creates a hover effect"
          ],
          answer: 1,
          explanation: "`::before` inserts generated content before the element's actual content."
        },
        {
          id: 7,
          question: "Which property creates a CSS Grid container?",
          options: ["display: flex", "display: grid", "position: grid", "grid: true"],
          answer: 1,
          explanation: "`display: grid` establishes a grid formatting context for a container."
        },
        {
          id: 8,
          question: "What does `overflow: hidden` do?",
          options: [
            "Hides the element",
            "Clips overflowing content and hides scrollbars",
            "Makes the element transparent",
            "Removes padding"
          ],
          answer: 1,
          explanation: "`overflow: hidden` clips any content that overflows the element's box and hides scrollbars."
        },
        {
          id: 9,
          question: "Which CSS property adds shadow to text?",
          options: ["box-shadow", "text-shadow", "shadow", "filter: shadow"],
          answer: 1,
          explanation: "`text-shadow` adds shadows to text, accepting offset-x, offset-y, blur-radius, and color."
        },
        {
          id: 10,
          question: "What is the purpose of CSS custom properties (variables)?",
          options: [
            "To create animations",
            "To store reusable values that can be referenced throughout a stylesheet",
            "To write JavaScript in CSS",
            "To import external stylesheets"
          ],
          answer: 1,
          explanation: "CSS custom properties (`--variable`) store reusable values, making styles more maintainable."
        }
      ])
    },
    {
      id: "html",
      title: "HTML & Web Basics",
      description: "Semantic HTML & web standards",
      icon: "🌐",
      gradient: "linear-gradient(135deg,#bbf7d0 0%,#a5b4fc 100%)",
      time: 420,
      questions: shuffleArray([
        {
          id: 1,
          question: "What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
          ],
          answer: 0,
          explanation: "HTML stands for HyperText Markup Language — the standard language for creating web pages."
        },
        {
          id: 2,
          question: "Which HTML5 element defines navigation links?",
          options: ["<navigation>", "<nav>", "<links>", "<menu>"],
          answer: 1,
          explanation: "The `<nav>` element defines a set of navigation links for the site."
        },
        {
          id: 3,
          question: "What attribute makes an input field required?",
          options: ["mandatory", "required", "validate", "must-fill"],
          answer: 1,
          explanation: "The `required` attribute prevents form submission if the field is empty."
        },
        {
          id: 4,
          question: "Which element is used for the largest heading?",
          options: ["<h6>", "<heading>", "<h1>", "<header>"],
          answer: 2,
          explanation: "`<h1>` represents the largest, most important heading. Headings go from h1 (largest) to h6 (smallest)."
        },
        {
          id: 5,
          question: "What does the `alt` attribute on an image tag do?",
          options: [
            "Sets alternate styling",
            "Provides alternative text for screen readers and broken images",
            "Adds an alternate link",
            "Changes the image source"
          ],
          answer: 1,
          explanation: "The `alt` attribute provides descriptive text for accessibility and when images can't load."
        },
        {
          id: 6,
          question: "Which HTML element is used for client-side scripting?",
          options: ["<code>", "<script>", "<js>", "<program>"],
          answer: 1,
          explanation: "The `<script>` element embeds or links to executable scripts, typically JavaScript."
        },
        {
          id: 7,
          question: "What is the correct HTML for creating a checkbox?",
          options: [
            "<input type='check'>",
            "<check>",
            "<input type='checkbox'>",
            "<checkbox>"
          ],
          answer: 2,
          explanation: "`<input type='checkbox'>` creates a checkbox input element."
        },
        {
          id: 8,
          question: "Which tag defines a table row?",
          options: ["<td>", "<th>", "<tr>", "<row>"],
          answer: 2,
          explanation: "`<tr>` defines a row in an HTML table. `<td>` is a data cell, `<th>` is a header cell."
        },
        {
          id: 9,
          question: "What is the purpose of the `<meta charset='UTF-8'>` tag?",
          options: [
            "Sets the page title",
            "Declares the character encoding of the page",
            "Links an external stylesheet",
            "Defines viewport settings"
          ],
          answer: 1,
          explanation: "This meta tag tells the browser which character encoding the HTML file uses — UTF-8 supports most characters."
        },
        {
          id: 10,
          question: "Which HTML5 semantic element represents the main content of a page?",
          options: ["<content>", "<body>", "<main>", "<section>"],
          answer: 2,
          explanation: "`<main>` represents the dominant content of the `<body>`, unique to the document."
        }
      ])
    }
  ]
};

// ── Helpers ──────────────────────────────────────────────────

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Leaderboard helpers ──────────────────────────────────────

function getLeaderboard() {
  return JSON.parse(localStorage.getItem("quizLeaderboard") || "[]");
}

function saveLeaderboard(entries) {
  localStorage.setItem("quizLeaderboard", JSON.stringify(entries));
}

function addLeaderboardEntry(username, score, total, category, timeTaken) {
  const lb   = getLeaderboard();
  const pct  = Math.round((score / total) * 100);
  const entry = {
    username,
    score,
    total,
    pct,
    category,
    timeTaken,
    date: new Date().toLocaleDateString()
  };
  lb.push(entry);
  lb.sort((a, b) => b.pct - a.pct || a.timeTaken - b.timeTaken);
  saveLeaderboard(lb.slice(0, 20)); // keep top 20
}
