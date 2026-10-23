import { questions } from "./lib/questions.js";
import { isCorrect, shuffle } from "./lib/quiz.js";
import { renderQuestion, showScreen } from "./lib/ui.js";

/* TODO importa úr hinum skránum */

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
  
  /* TODO velja spurningar, endursetja stöðu, sýna fyrsta skjá */
    const shuffled = shuffle(questions);
    state.questions = shuffled.slice(0,NUMBER_OF_QUESTIONS - 1);
    state.current = 1;
    state.answers = [];
  
  const startButton = document.querySelector(".start-button");

  if (startButton) {
    startButton.addEventListener("click", (e) => {
      showScreen("question");

      renderQuestion(
        state.questions[state.current-1],
        state.current -1,
        NUMBER_OF_QUESTIONS,
      );

      });
  } else {
    console.error("fann ekki start button");
  }
}

/**
 * Klárar leik, uppfærir tölfræði og sýnir niðurstöður.
 * @returns {void}
 */
function finish() {
    showScreen(`results`);
}

/**
 * Vistar svar við núverandi spurningu og sýnir næstu, eða niðurstöður ef
 * öllum spurningum hefur verið svarað.
 * @returns {void}
 */
function submitAnswer(answer) {
  /* TODO skrá stöðu svars, klára ef seinasta spurning, annars sýna næstu */
    console.log(
      "Svar notanda er", 
      answer, 
      "rétt svar er", 
      state.questions[state.current - 1].answer,
    );
    const correctAnswer = isCorrect(answer, state.questions[state.current - 1].answer)

    if (correctAnswer){
      alert('Rétt!')
    }else{
      alert('Ekki rétt')
    }
    //finish();
  }

/**
 * Fer aftur á upphafsskjá með uppfærðri tölfræði.
 * @returns {void}
 */
function restart() {
  /* TODO sýna upphafsskjá og stöðu */
}

function initialize(a) {
  /* TODO finna öll element, tengja form, sýna upphafsstöðu og upphafsskjá */

  start();

  const form = document.querySelector("form.answer-form");
  form.addEventListener("submit", (e) => {
     e.preventDefault(e, text);
    console.log("form submitted");

    const data = new FormData(form);
    const answer = data.get("answer");

    submitAnswer(answer);
  });

  const restartButton = document.querySelector(`button.restart-button`)
  
  if(restartButton) {
    restartButton.addEventListener('click', () => {
        showScreen('start')
    })
  }
}

initialize("test");
