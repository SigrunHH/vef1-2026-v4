import { el, empty, setText } from "./elements.js";
import { questions } from "./questions.js";

/**
 * @typedef {"start" | "question" | "results"} Screen
 */

/**
 * Allir mögulegir skjáir.
 * @type {Screen[]}
 */
const SCREENS = ["start", "question", "results"];

/**
 * Sýnir skjá `name` og felur aðra.
 * @param {Screen} name Skjár sem á að sýna
 * @returns {void}
 */
export function showScreen(name) {
  for (const screen of SCREENS) {
    const section = document.querySelector(`section.${screen}`);

    if (!section) {
      console.warn("section is null");
      continue;
    }

    section.classList.add("hidden");
  }

  const targetScreen = document.querySelector(`section.${name}`);

  if (targetScreen) {
    targetScreen.classList.remove("hidden");
  }
}

/**
 * Birtir tölfræði á upphafsskjá.
 * @param {import("./quiz.js").Stats} stats Tölfræði
 * @returns {void}
 */

function getOrCreate(screen, className, tag) {
  const section = document.querySelector(`section.${screen}`);

  let element = section.querySelector(`.${className}`);

  if (!element) {
    element = el(tag, { class: className });
    section.appendChild(element);
  }
  return element;
}

export function renderStats(stats) {
  const container = getOrCreate("start", "stats", "div");

  empty(container);
  container.append(
    el("p", {}, `Fjöldi spilaðra leikja: ${stats.played}`),
    el("p", {}, `Fjöldi réttra svara: ${stats.correct}`),
    el("p", {}, `Fjöldi rangra svara: ${stats.incorrect}`),
  );
}

/**
 * Birtir spurningu, tæmir svarreit og setur fókus á hann.
 * @param {import("./quiz.js").Question} question Spurning
 * @param {number} num Númer spurningar, byrjar á 1
 * @param {number} total Heildarfjöldi spurninga
 * @returns {void}
 */

export function renderQuestion(question, num, total) {
  setText(".progress .current", String(num));
  setText(".progress .total", String(total));

  const categoryElement = document.querySelector(".title .category");

  if (!categoryElement) {
    console.warn("category element not found");
    return;
  }

  categoryElement.textContent = question.category;

  const questionElement = document.querySelector(".title .question-text");

  if (questionElement) {
    questionElement.textContent = question.question;
  } else {
    console.error("fann ekki question element");
  }

  const input = document.querySelector("form input");

  if (input) {
    input.focus;
  }
}

/**
 * Birtir niðurstöður leiks.
 * @param {import("./quiz.js").Result[]} results Niðurstöður
 * @param {number} correctCount Fjöldi réttra svara
 * @returns {void}
 */
export function renderResults(results, correctCount) {
  const score = getOrCreate("results", "score", "p");
  const list = getOrCreate("results", "results-list", "ul");

  score.textContent = `Rétt svör: ${correctCount} af ${results.length}`;

  empty(list);

  results.forEach((result, i) => {
    const answer = result.answer.trim() === "" ? "Ekkert svar" : result.answer;

    list.appendChild(
      el(
        "li",
        { class: result.correct ? "result correct" : "result incorrect" },

        el("h3", {}, `${i + 1}, ${result.category}`),
        el("p", {}, result.question),
        el("p", {}, `Þitt svar: ${answer}`),
        el("p", {}, `Rétt svar: ${result.correctAnswer}`),
        el("p", {}, result.correct ? "Rétt" : "Rangt"),
      ),
    );
  });
}
