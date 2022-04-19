import Answer from './Answer';

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
                this.client.end();
                throw error;
            }
            this.client.end();
            callback(new Answer(id, results.rows[0].ans_text))
        })
    }

    getAllAnswers(callback) {
        this.client.connect();
        this.client.query('SELECT ans_id, ans_text from answer', (error, results) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            let answers = []
            for(i=0; i < results.rows.length; i++) {
                answers.push(new Answer(results.rows[i].ans_id, results.rows[i].ans_text))
            }
            callback(answers);
        })
    }

    addAnswer(text, callback) {
        if(text != "" && text != undefined) {
            this.client.connect();
            this.client.query('INSERT into answer(ans_text) values (?) returning ans_id', [text], (error, results) =>
            {
                if(error) {
                    this.client.end();
                    throw error;
                }
                this.client.end();
                callback(new Answer(results.rows[0].ans_id, text))
            })
        } else {
            console.log("Invalid string");
            //raise exception
        }
    }

    deleteAnswer(answer) {
        this.client.connect();
        this.client.query('DELETE from answer where ans_id = ?', [answer.id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
        })
    }

    updateAnswer(answer, text, callback) {
        if(text != "" && text != undefined) {
            this.client.connect();
            this.client.query('UPDATE answer set ans_text = ? where ans_id = ?', [text, answer.id], (error) =>
            {
                if(error) {
                    this.client.end();
                    throw error;
                }
                this.client.end();
                callback(new Answer(answer.id, text));
            })
        } else {
            console.log("Invalid string");
            //raise exception
        }
    }
}

export default AnswerDAO;