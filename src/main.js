import { questions } from './lib/questions.js';

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
  const startButton = document.querySelector('.start-button');

  if(startButton){
  console.log('startButton', startButton.textContent)

  startButton.addEventListener('click', () => {
    /* console.log('click') */
    const startSection = document.querySelector('section.start');
       const startsSectionClass = startSection.getAttribute('class')
       startSection.setAttribute('class', startsSectionClass + ' hidden')
    
    const questionSection = document.querySelector('section.question');
    questionSection.classList.remove('hidden')
       console.log('start section', startSection, startsSectionClass);
    
  })
  }else{
    console.error('fann ekki start button')
  }
}

/**
 * Klárar leik, uppfærir tölfræði og sýnir niðurstöður.
 * @returns {void}
 */
function finish() {
  /* TODO uppfæra stöðu, birta stöðu og sýna seinasta skjá */
}

/**
 * Vistar svar við núverandi spurningu og sýnir næstu, eða niðurstöður ef
 * öllum spurningum hefur verið svarað.
 * @param {string} text Svar notanda
 * @returns {void}
 */
function submitAnswer(text) {
  /* TODO skrá stöðu svars, klára ef seinasta spurning, annars sýna næstu */
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
  const result = isCorrect('test', 'Test');

  console.log('result er', result);

  const shuffled = shuffle(questions);

  console.log('stokkaðar spurningar', shuffled);

  start();

  const form = document.querySelector('form.answer-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('form submitted')

    const data = new FormData(form);
    const answer = data.get('answer');
    console.log('Svarið er', answer)

  })

}

initialize('test');
