import { questions } from "./lib/questions.js";
import {
  countCorrect,
  createResults,
  isCorrect,
  shuffle,
  updateStats,
} from "./lib/quiz.js";
import {
  renderQuestion,
  renderResults,
  renderStats,
  showScreen,
} from "./lib/ui.js";

/** Fasti sem segir til um hversu margar spurningar við sýnum. */
const NUMBER_OF_QUESTIONS = 4;

/**
 * Staða leiks, heldur utanum tölfræði, spurningar í núverandi leik,
 * svör notanda í núverandi leik og á hvaða spurningu við erum.
 * @type {{
 *   stats: import("./lib/quiz.js").Stats,
 *   questions: import("./lib/quiz.js").Question[],
 *   answers: string[],
 *   current: number,
 * }}
 */
const state = {
  stats: { played: 0, correct: 0, incorrect: 0 },
  questions: [],
  answers: [],
  current: 0,
};

/**
 * Byrjar nýjan leik og sýnir fyrstu spurningu.
 * @returns {void}
 */
function start() {
  const shuffled = shuffle(questions);
  state.questions = shuffled.slice(0, NUMBER_OF_QUESTIONS);
  state.current = 0;
  state.answers = [];

  showScreen("question");

  renderQuestion(
    state.questions[state.current],
    state.current + 1,
    NUMBER_OF_QUESTIONS,
  );
}

/**
 * Klárar leik, uppfærir tölfræði og sýnir niðurstöður.
 * @returns {void}
 */
function finish() {
  const results = createResults(state.questions, state.answers);
  state.stats = updateStats(state.stats, results);

  renderResults(results, countCorrect(results));
  showScreen("results");
}

/**
 * Vistar svar við núverandi spurningu og sýnir næstu, eða niðurstöður ef
 * öllum spurningum hefur verið svarað.
 * @param answer {string}
 * @returns {void}
 */
function submitAnswer(answer) {
  const correctAnswer = isCorrect(
    answer,
    state.questions[state.current].answer,
  );

  if (correctAnswer) {
    alert("Rétt!");
  } else {
    alert("Ekki rétt");
  }

  state.answers.push(answer);

  const nextQuestionNum = state.current + 1;

  if (nextQuestionNum >= NUMBER_OF_QUESTIONS) {
    finish();
  } else {
    state.current = nextQuestionNum;
    renderQuestion(
      state.questions[state.current],
      state.current + 1,
      NUMBER_OF_QUESTIONS,
    );
  }
}

/**
 * Fer aftur á upphafsskjá með uppfærðri tölfræði.
 * @returns {void}
 */
function restart() {
  renderStats(state.stats);
  showScreen("start");
}

function initialize() {
  const startButton = document.querySelector(".start-button");

  if (startButton) {
    startButton.addEventListener("click", start);
  } else {
    console.error("fann ekki start button");
  }

  const form = document.querySelector("form");

  if (!form) {
    console.error("form not found");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const answer = data.get("answer");

    if (typeof answer !== "string") {
      console.warn("answer is not a string");
      return;
    }

    submitAnswer(answer);
    const input = form.querySelector("input");
    form.reset();

    if (input) {
      input.focus();
    }
  });

  const restartButton = document.querySelector("button.restart-button");

  if (restartButton) {
    restartButton.addEventListener("click", restart);
  }

  renderStats(state.stats);
  showScreen("start");
}

initialize();
