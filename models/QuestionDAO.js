class QuestionDAO {
    constructor() {
        // loads connection data from .env file
        if (process.env.NODE_ENV !== "production") {
            require('dotenv').config();
        };

        const { Client } = require('pg');
        const client = new Client();
    }

    getQuestion(id) {
        client.connect();
        //Check these queries because im not entirly sure what is needed
        client.query('SELECT * from question where quest_id = ?', [id], (error, results) =>
        {
            console.log(error ? error.stack : results.rows[0].message)
            client.end();
        })
    }

    addQuestion(question) {
        if(question != "" && question != undefined) {
            client.connect();
            //Check these queries because im not entirly sure what is needed
            client.query('INSERT into question(quest_text, correct_ans) values (?, null)', [question], (error, results) =>
            {
                console.log(error ? error.stack : results.rows[0].message)
                client.end();
            })
        } else {
            console.log("invalid string");
            //raise exception
        }
    }

    updateQuestion(id, text) {
        if(text != "" && text != undefined) {
            client.connect();
            //Check these queries because im not entirly sure what is needed
            //not sure about having both [id, text] in the array like that works.
            client.query('UPDATE question set quest_text = ? where quest_id = ?', [text, id], (error, results) =>
            {
                console.log(error ? error.stack : results.rows[0].message)
                client.end();
            })
        } else {
            console.log("Invalid string");
            //raise exception
        }
    }

    deleteQuestion(id) {
        client.connect();
        //Check these queries because im not entirly sure what is needed
        client.query('DELETE from question where quest_id = ?', [id], (error, results) =>
        {
            console.log(error ? error.stack : results.rows[0].message)
            client.end();
        })
    }

    addAnswer(question_id, answer_id) {
        client.connect();
        //Check these queries because im not entirly sure what is needed
        client.query('INSERT into question_answer(quest_id, ans_id) values (?, ?)', [question_id, answer_id], (error, results) =>
        {
            console.log(error ? error.stack : results.rows[0].message)
            client.end();
        })
    }

    removeAnswer(question_id, answer_id) {
        client.connect();
        //Check these queries because im not entirly sure what is needed
        client.query('DELETE from question_answer where quest_id = ? and ans_id = ?', [question_id, answer_id], (error, results) =>
        {
            console.log(error ? error.stack : results.rows[0].message)
            client.end();
        })
    }

    changeCorrectAnswer(question_id, answer_id) {
        client.connect();
            //Check these queries because im not entirly sure what is needed
            //This may create issues if the id given isn't in the question_answer table.
            client.query('UPDATE question set correct_ans = ? where quest_id = ?', [answer_id, question_id], (error, results) =>
            {
                console.log(error ? error.stack : results.rows[0].message)
                client.end();
            })
    }
}