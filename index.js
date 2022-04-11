// use .env environment variables
if (process.env.NODE_ENV !== "production") {
	require('dotenv').config();
};

const querySql = require('./sql/querySql');

// express and ejs module imports
const express = require('express');
const app = express();
const path = require('path');

// express logic
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/views')))

app.get('/', (req, res) => {
	res.render('index')
})

app.get('/test', (req, res) => {
	const combinedSQL = 'SELECT question, correct_answer, answers FROM questions JOIN answers ON answers.q_id = questions.question';
	const questions = [];

	querySql(combinedSQL, (query) => {
		let previous = '';
		let i = 0;
		query.forEach((elm) => {
			if (elm.question !== previous) {
				previous = elm.question
				questions.push({ question: elm.question, correct_answer: elm.correct_answer, answers: [] });
				i++
			}
			questions[i - 1].answers.push(elm.answers)
		})
		// console.log(questions)
		res.render('test', { questions: questions })
	})
})

app.get('/edit', (req, res) => {
	const combinedSQL = 'SELECT question, correct_answer, answers FROM questions JOIN answers ON answers.q_id = questions.question';
	const questions = [];

	querySql(combinedSQL, (query) => {
		let previous = '';
		let i = 0;
		query.forEach((elm) => {
			if (elm.question !== previous) {
				previous = elm.question
				questions.push({ question: elm.question, correct_answer: elm.correct_answer, answers: [] });
				i++
			}
			questions[i - 1].answers.push(elm.answers)
		})
		// console.log(questions)
		res.render('edit', { questions: questions })
	})
})


app.all('*', (req, res) => {
	res.render('index')
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Test running on port ${port}`);
	console.log('http://localhost:3000')
});