import Question from "./Question";

class QuestionDAO {
    constructor() {
       // loads connection data from .env file
        if (process.env.NODE_ENV !== "production") {
            require('dotenv').config();
        };

        const { Client } = require('pg');
        this.client = new Client({
            host: process.env.PGHOST,
            port: process.env.PGPORT,
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            database: process.env.PGDATABASE,
        });
    }

    getQuestion(id, callback) {
        this.client.connect();
        this.client.query('SELECT quest_id, quest_text, correct_ans from question where quest_id = ?', [id], (error, results) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            
            callback(new Question(results.rows[0].quest_id, results.rows[0].quest_text), null, results.rows[0].correct_ans);
        })
    }

    getAllQuestions() {
        this.client.connect();
        this.client.query('SELECT quest_id, quest_text, correct_ans from question where quest_id = ?', [id], (error, results) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            for(i=0; i < results.rows.length; i++) {
                questions.push(new Question(results.rows[i].ans_id, results.rows[i].ans_text))
            }
            
            callback(new Question(results.rows[0].quest_id, results.rows[0].quest_text));
        })
    }

    addQuestion(text) {
        if(text != "" && text != undefined) {
            client.connect();
            client.query('INSERT into question(quest_text, correct_ans) values (?, null) returning quest_id', [text], (error, results) =>
            {
                if(error) {
                    this.client.end();
                    throw error;
                }
                this.client.end();
                return results.rows[0].quest_id
            })
        } else {
            console.log("invalid string");
            //raise exception
        }
    }

    updateQuestionText(question, text) {
        if(text != "" && text != undefined) {
            client.connect();
            client.query('UPDATE question set quest_text = ? where quest_id = ?', [text, id], (error) =>
            {
                if(error) {
                    this.client.end();
                    throw error;
                }
                this.client.end();
            })
        } else {
            console.log("Invalid string");
            //raise exception
        }
    }

    deleteQuestion(id) {
        client.connect();
        client.query('DELETE from question where quest_id = ?', [id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
        })
    }

    addAnswer(question_id, answer_id) {
        client.connect();
        client.query('INSERT into question_answer(quest_id, ans_id) values (?, ?)', [question_id, answer_id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
        })
    }

    removeAnswer(question_id, answer_id) {
        client.connect();
        client.query('DELETE from question_answer where quest_id = ? and ans_id = ?', [question_id, answer_id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
        })
    }

    changeCorrectAnswer(question_id, answer_id) {
        client.connect();
            client.query('UPDATE question set correct_ans = ? where quest_id = ?', [answer_id, question_id], (error) =>
            {
                if(error) {
                    this.client.end();
                    throw error;
                }
                this.client.end();
            })
    }
}

export default QuestionDAO;