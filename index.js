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

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, '/views')))

app.get('/', (req, res) => {
  res.render('index', { example: example })
})

app.all('*', (req, res) => {
  res.render('index')
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Test running on port ${port}`);
  console.log('http://localhost:3000')
});