// use .env environment variables
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
};

// test requires
const example = require('./example');
const db = require('./sql/index')

// express and ejs module imports
const express = require('express');
const app = express();
const path = require('path');

// express logic
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))


// render home page
app.get('/', async (req, res) => {
  const queryString = 'SELECT * FROM test'
  const { rows } = await db.query(queryString)

  res.render('index', { tests: rows })
})

// render test page
// app.get('/test/:testName', (req, res) => {
//   const { testName } = req.params;
//   const correctAnswers = [];

//   example[testName].questions.forEach(element => {
//     correctAnswers.push(element.correct_answer.split(' ').join('_').toLowerCase())
//   });

//   res.render('test', { example: example, testName: testName, correctAnswers: correctAnswers })
// })

app.get('/test/:testName', (req, res) => {
  const { testName } = req.params;
  const correctAnswers = [];

  example[testName].questions.forEach(element => {
    correctAnswers.push(element.correct_answer.split(' ').join('_').toLowerCase())
  });

  res.render('test', { example: example, testName: testName, correctAnswers: correctAnswers })
})




// render test edit page
app.get('/edit_test/:testName', (req, res) => {
  const { testName } = req.params;
  res.render('edit', { example: example, testName: testName })
})

// render score display page
app.get('/score', (req, res) => {
  res.render('index', { example: example })
})

// insert score into db from test page
app.post('/scoreSubmit', async (req, res) => {
  const { scoreDisplay, name } = req.body
  let score = scoreDisplay.slice(0, -1)
  
  const queryString = 'INSERT INTO score VALUES(1, $1, $2)'
  const { rows } = await db.query(queryString, [name, score])

  res.render('index', { example: example })
})

// catch all render index
app.all('*', (req, res) => {
  res.render('index', { example: example })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Test running on port ${port}`);
  console.log('http://localhost:3000');
  let url = 'http://localhost:3000';
});