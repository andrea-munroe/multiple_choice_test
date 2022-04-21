// require('dotenv').config({ path: '../.env' });


class DefaultDAO {
	constructor() {
		const { Pool } = require('pg');
		require('dotenv').config({ path: '../.env' });
		this.pool = new Pool();

		
		 
	}

	getAnswer(id, callback) {
		const query = async() => {
			const queryString1 = 'Select ans_text from answer where ans_id = $1'
			//const queryString1 = 'SELECT * FROM test natural join test_question natural join question natural join question_answer natural join answer Where test_id = $1;';
			const { rows: test } =  await this.pool.query(queryString1, [id]);
			callback(test)
		}
		query();
	}
}

const dao = new DefaultDAO();
dao.getAnswer(1, (answer) => console.log(answer));