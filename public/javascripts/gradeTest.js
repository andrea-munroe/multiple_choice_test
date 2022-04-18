const answers = document.querySelectorAll('input[type="radio"]');
const submitBtn = document.getElementById('submit');


const getAnswers = () => {
  const submitedAnswers = [];
  answers.forEach((answer) => {
    if (answer.checked === true) {
      submitedAnswers.push(answer.id);
    }
  });
};

const markAnswers = () => {
  answers.forEach((answer) => {
    if (answer.checked === true) {
      if (correctAnswers.includes(answer.id) === false) {
        answer.parentElement.classList.add('text-danger','fw-bold')
      } else {
				answer.parentElement.classList.add('text-success','fw-bold')
			}
    }
  });
};

const grade = (submited, correct) => {
  submited.forEach((sub) => {
    if (correct.includes(sub)) {
      console.log(sub)
    } else {
      console.log(sub.parentElement)
    }
  })

}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  getAnswers();
	markAnswers();
  // grade(submitedAnswers, correctAnswers);
  // console.log(submitedAnswers)
});

// console.log(correctAnswers)