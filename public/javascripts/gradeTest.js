const answers = document.querySelectorAll('input[type="radio"]');
const submitBtn = document.getElementById('submit');
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

const grade = (submited, correct) => {
  let grade = [0, 0]
  grade[1] = submited.length
  submited.forEach((sub) => {
    if (correct.includes(sub)) {
      grade[0]++
    }
  })
  let score = Math.round(grade[0] / grade[1] * 100)+'%'
  // console.log(grade[0], grade[1])
  // console.log(Math.round(grade[0] / grade[1] * 100)+'%')
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getAnswers();
  markAnswers();
  grade(submitedAnswers, correctAnswers);
  // console.log(submitedAnswers)
});

// console.log(correctAnswers)