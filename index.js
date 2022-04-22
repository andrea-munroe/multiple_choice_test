// use .env environment variables
require('dotenv').config();

// test requires
const db = require('./sql/index');

//DAOs
const Answer = require('./models/AnswerDAO');
const Question = require('./models/QuestionDAO');
const Test = require('./models/TestDAO');
const Score = require('./models/ScoreDAO');

// express and ejs module imports
const express = require('express');
const app = express();
const path = require('path');
const TestDAO = require('./models/TestDAO');

// express logic
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ------------------------ //
// ------- Routes --------- //
// ------------------------ //

// Home Page
app.get('/', async (req, res) => {
	const queryString = 'SELECT * FROM test';
	const { rows } = await db.query(queryString);

	res.render('index', { tests: rows });
});

// Test Page
app.get('/test/:testId', async (req, res) => {
	const { testId } = req.params;

	const queryString1 = 'SELECT * FROM test natural join test_question natural join question natural join question_answer natural join answer Where test_id = $1;';
	const { rows: test } = await db.query(queryString1, [testId]);

	const queryString2 = 'SELECT quest_text, ans_text FROM test NATURAL JOIN test_question NATURAL JOIN question JOIN answer ON question.correct_ans = answer.ans_id WHERE test_id = $1;';
	const { rows: correctAnswers } = await db.query(queryString2, [testId]);

	// extracts question names from query and pushes them to questNames array
	const questNames = [];
	test.forEach((row) => {
		const tempArray = [];
		tempArray.push(row.quest_text);
		tempArray.forEach((element) => {
			if (!questNames.includes(element)) {
				questNames.push(element);
			}
		});
	});

	// creates an array of objects Question, Answer, Correct Answer
	const questWithAnswers = [];
	questNames.forEach((name) => {
		questWithAnswers[name] = { answers: [], correct: '' };
	});

	test.forEach((row) => {
		if (row.quest_text.includes(questWithAnswers)) {
			questWithAnswers[row.quest_text].answers.push(row.ans_text);
			questWithAnswers[row.quest_text].correct = row.correct_ans;
		}
	});

	// create correct answer array
	const correctAnswerArray = [];
	Object.keys(correctAnswers).forEach((key) => {
		correctAnswerArray.push(correctAnswers[key].ans_text);
	});

	res.render('test', {
		testContent: questWithAnswers,
		testName: test[0].test_name,
		correctAnswers: correctAnswerArray,
		testId: test[0].test_id,
	});
});

// Edit Test Page
app.get('/edit_test/:testId', (req, res) => {
	const { testId } = req.params;
	const test = new TestDAO();

	res.render('edit_test', { testId });
});

app.get('/create_test', async (req, res) => {
	const quest = new Question();
	let qlist;
	quest.getAllQuestions((questions) => {
		res.render('create_test', { questions: questions });
	});
});

app.post('/create_test_use', async (req, res) => {
	const tDao = new Test();
	const qdao = new Question();

	const qList = Object.keys(req.body).slice(0, -1);
	const { test_name: testName } = req.body;

	if (qList.length >= 1) {
		tDao.addTest(testName, (test) => {
			const { id } = test;
			const sql = 'Insert into test_question (test_id, quest_id) values($1, $2);';
			qList.forEach((question) => {
				const { rows } = db.query(sql, [id, question]);
			});
		});
	}

	res.redirect('/');
});

app.post('/delete_test', async (req, res) => {
	const tDao = new Test();
	const { test_id } = req.body;

	tDao.deleteTest(test_id, () => {
		res.redirect('/');
	});
});

app.get('/new_question', async (req, res) => {
	res.render('new_question')
})

app.get('/edit_question/:quest_id', async (req, res) => {
	const qDao = new Question();
	const { quest_id } = req.params;

	qDao.getQuestion(quest_id, (question) => {
		res.render('edit_question', { question: question });
	});
});

app.post('/updated_question', async (req, res) => {
	const aDao = new Answer();
	console.log(req.body);
	const { quest_id, question, add_answer } = req.body;
	delete req.body.quest_id;
	delete req.body.question;
	delete req.body.add_answer;

	if (add_answer !== '') {
		aDao.addAnswer(quest_id, add_answer, (answer) => {
			console.log(answer);
		});
	}

	aDao.deleteAnswer();

	const sql = 'UPDATE answer set ans_text = $1 where ans_id = $2';
	Object.keys(req.body).forEach((elm) => {
		const { rows } = db.query(sql, [req.body[elm], elm]);
	});

	res.redirect('/');
});

// Score Page
app.get('/scores', async (req, res) => {
	const queryString = 'SELECT test_name, student_name, score.score FROM score NATURAL JOIN test order by score_id;';
	const { rows: scores } = await db.query(queryString);

	res.render('scores', { scores: scores });
});

// insert score into db from test page
app.post('/scoreSubmit', async (req, res) => {
	const { scoreDisplay, name, test_id } = req.body;
	let score = scoreDisplay.slice(0, -1);

	const queryString = 'INSERT INTO score (test_id, student_name, score) VALUES($1, $2, $3)';
	const { rows } = await db.query(queryString, [test_id, name, score]);

	res.redirect('/scores');
});

// Catch All Redirect To Index
app.all('*', (req, res) => {
	res.redirect('/');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Test running on port ${port}`);
	console.log('http://localhost:3000');
});
