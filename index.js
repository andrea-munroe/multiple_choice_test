// use .env environment variables
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

// test requires
const example = require('./example');
const db = require('./sql/index');

// express and ejs module imports
const express = require('express');
const app = express();
const path = require('path');

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

	const queryString1 =
		'SELECT * FROM test natural join test_question natural join question natural join question_answer natural join answer Where test_id = $1;';
	const { rows: test } = await db.query(queryString1, [testId]);

	const queryString2 =
		'SELECT quest_text, ans_text FROM	test NATURAL JOIN test_question NATURAL	JOIN question	JOIN answer ON question.correct_ans = answer.ans_id WHERE	test_id = $1;';
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
	});
});

// render test edit page
app.get('/edit_test/:testName', (req, res) => {
	const { testName } = req.params;
	res.render('edit', { example: example, testName: testName });
});

// render score display page
app.get('/score', (req, res) => {
	res.redirect('/');
});

// insert score into db from test page
app.post('/scoreSubmit', async (req, res) => {
	const { scoreDisplay, name } = req.body;
	let score = scoreDisplay.slice(0, -1);

	const queryString = 'INSERT INTO score VALUES(1, $1, $2)';
	const { rows } = await db.query(queryString, [name, score]);

	res.redirect('/');
});

// catch all render index
app.all('*', (req, res) => {
	res.redirect('/');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Test running on port ${port}`);
	console.log('http://localhost:3000');
	let url = 'http://localhost:3000';
});
