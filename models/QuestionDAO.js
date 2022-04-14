class QuestionDAO {
    constructor() {
        //I don't know what I'm doing here mostly just copying from the link David gave
        const { Client } = require('pg');
        const client = new Client();
        //should the client connect here? or inside each method?
        //client.connect();
    }

    getQuestion(question) {
        client.connect();
        //Check these queries because im not entirly sure what is needed
        client.query('SELECT * from question where question_text = ?', [question], (error, results) =>
        {
            console.log(error ? error.stack : results.rows[0].message)
        })
        client.end();
    }

    //Would this be more useful if we grabbed all questions from a tests name?
    getAllQuestions() {
        client.connect();
        client.query('SELECT * from question', (error, results) =>
        {
            console.log(error ? error.stack : results.rows[0].message)
        })
        client.end();
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