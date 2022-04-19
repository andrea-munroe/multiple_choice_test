const db = require('./index');

const tests = {}

const getTestList = async () => {
  const { rows } = await db.query('SELECT * FROM test')
  rows.forEach((row) => {
    // console.log(row.test_id)
		let testName = row.test_id;
		tests[testName] = {}
  })
	console.log(tests)
}

getTestList();