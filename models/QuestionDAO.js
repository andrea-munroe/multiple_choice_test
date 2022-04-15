// loads connection data from .env file
if (process.env.NODE_ENV !== "production") {
	require('dotenv').config();
};
class QuestionDAO {
    constructor() {
        const { Client } = require('pg');
        const client = new Client();
    }

    getQuestion(question) {
        client.connect();
        //Check these queries because im not entirly sure what is needed
        client.query('SELECT * from question where question_text = ?', [question], (error, results) =>
        {
            console.log(error ? error.stack : results.rows[0].message)
            client.end();
        })
    }

    //Would this be more useful if we grabbed all questions from a tests name?
    getAllQuestions() {

    }

    saveQuestion() {

    }

    updateQuestion() {

    }

    deleteQuestion(id) {

    }

    deleteQuestion(object) {

    }

}