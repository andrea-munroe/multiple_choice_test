const Answer = require('./Answer')

class AnswerDAO {
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

    getAnswer(id, callback) {
        this.client.connect();
        this.client.query('SELECT ans_text from answer where ans_id = ?', [id], (error, results) =>
        {
            if(error) {
                callback(null)
            }
            this.client.end();
            callback(new Answer(id, results.rows[0].ans_text))
        })
    }

    getAllAnswers(question) {
        this.client.connect();
        this.client.query('SELECT ans_id, ans_text from answer natural join question_answer where quest_id = ?', [question.id], (error, results) =>
        {
            if(error) {
                callback(null)
            }
            this.client.end();
            for(i=0; i < results.rows.length; i++) {
                question.answers.push(new Answer(results.rows[i].ans_id, results.rows[i].ans_text))
            }
        })
    }

    //Not sure if this works
    addAnswer(question, text, callback) {
        if(text != "" && text != undefined) {
            this.client.connect();
            this.client.query('INSERT into answer(ans_text) values (?) returning ans_id', [text], (error, results) =>
            {
                if(error) {
                    this.client.end();
                    throw error;
                }
                this.client.query('INSERT into question_answer(quest_id, ans_id) values (?, ?) returning ans_id', [question.id, results.rows[0].ans_id], (error, results) =>
                {
                    if(error) {
                        this.client.end();
                        throw error;
                    }
                    this.client.end();
                    callback(new Answer(results.rows[0].ans_id, text))
                })
            })
        } else {
            console.log("Invalid string");
            //raise exception
        }
    }

    deleteAnswer(id) {
        this.client.connect();
        this.client.query('DELETE from answer where ans_id = ?', [id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
        })
    }

    updateAnswer(answer) {
        this.client.connect();
        this.client.query('UPDATE answer set ans_text = ? where ans_id = ?', [answer.ans_text, answer.id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
        })
    }
}

module.exports =  AnswerDAO;