// use .env environment variables
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
};

const example = require('./example');

// express and ejs module imports
const express = require('express');
const app = express();
const path = require('path');

// express logic
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index', { example: example })
})

app.get('/score', (req, res) => {
  res.render('index', { example: example })
})

app.post('/scoreSubmit', (req, res) => {
  const {scoreDisplay, name} = req.body
  console.log(scoreDisplay, name)
  // res.send(req.body);
  res.render('index', { example: example })
})

app.get('/test/:testName', (req, res) => {
  const { testName } = req.params;
  const correctAnswers = [];

  example[testName].questions.forEach(element => {
    correctAnswers.push(element.correct_answer.split(' ').join('_').toLowerCase())
  });
  
  res.render('test', { example: example, testName: testName, correctAnswers: correctAnswers })
})

app.get('/edit_test/:testName', (req, res) => {
  const { testName } = req.params;
  res.render('edit', { example: example, testName: testName })
})

app.all('*', (req, res) => {
  res.render('index', { example: example })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Test running on port ${port}`);
  console.log('http://localhost:3000');
  let url = 'http://localhost:3000';
});