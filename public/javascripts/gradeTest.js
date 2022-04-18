const answers = document.querySelectorAll('input[type="radio"]');
const submitBtn = document.getElementById('submit');
const scoreDisplay = document.getElementById('score-display');
const submitedAnswers = [];


const getAnswers = () => {
  submitedAnswers.length = 0;
  answers.forEach((answer) => {
    if (answer.checked === true) {
      submitedAnswers.push(answer.id);
    }
  });
  console.log(submitedAnswers)
};

const markAnswers = () => {
  answers.forEach((answer) => {
    if (answer.checked === true) {
      if (correctAnswers.includes(answer.id) === false) {
        answer.parentElement.classList.add('text-danger', 'fw-bold')
      } else {
        answer.parentElement.classList.add('text-success', 'fw-bold')
      }
    }
  });
};

const displayGrade = (submited, correct) => {
  let grade = [0, 0]
  grade[1] = submited.length
  submited.forEach((sub) => {
    if (correct.includes(sub)) {
      grade[0]++
    }
  })
  let score = Math.round(grade[0] / grade[1] * 100)
  scoreDisplay.textContent = `${score}%`;
  scoreDisplay.parentElement.classList.add('card', 'text-center', 'mb-5')
  if (score > 85) {
    scoreDisplay.classList.add('text-success');
  } else if (score > 66) {
    scoreDisplay.classList.add('text-warning');
  } else if (score <= 65) {
    scoreDisplay.classList.add('text-danger');
  }
  submitBtn.classList.add('d-none');
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getAnswers();
  markAnswers();
  displayGrade(submitedAnswers, correctAnswers);
  // console.log(submitedAnswers)
});

// console.log(correctAnswers)