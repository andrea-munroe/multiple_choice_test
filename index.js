// use .env environment variables
if (process.env.NODE_ENV !== "production") {
	require('dotenv').config();
};

const querySql = require('./sql/querySql');

// express and ejs module imports
const express = require('express');
const app = express();
const path = require('path');

// sql logic
const questionsSql = 'SELECT * FROM questions';
const answersSql = 'SELECT * FROM answers';
const scoresSql = 'SELECT * FROM scores';
let questions = []
let answers = []
let scores = []

// gets questions and correct answer
querySql(questionsSql, (returnedQuestions) => {
	questions = returnedQuestions
	console.log(questions)
});

// gets answers
querySql(answersSql, (returnedAnswers) => {
	answers = returnedAnswers
	console.log(answers)
});

// gets scores
querySql(scoresSql, (returnedScores) => {
	scores = returnedScores
	console.log(scores)
});

// express logic
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/views')))

app.get('/', (req, res) => {
	res.render('index')
})

app.get('/test', (req, res) => {
	pool.query('SELECT * FROM questions', (error, result) => {
		if (error) throw error
		console.log(result.rows[0].question)
		// res.render('test', { questions: result.rows })
	})
})

app.all('*', (req, res) => {
	res.render('index')
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Test running on port ${port}`);
});