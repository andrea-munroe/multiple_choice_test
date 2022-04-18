class AnswerDAO {
    constructor() {
        // loads connection data from .env file
        if (process.env.NODE_ENV !== "production") {
            require('dotenv').config();
        };

        const { Client } = require('pg');
        const client = new Client();
    }

    getAnswer(id) {
        this.client.connect();
        this.client.query('SELECT ans_text from answer where ans_id = ?', [id], (error, results) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            return results.rows[0].ans_text
        })
    }

    addAnswer(text) {
        if(text != "" && text != undefined) {
            this.client.connect();
            this.client.query('INSERT into answer(ans_text) values (?) returning ans_id', [text], (error, results) =>
            {
                if(error) {
                    this.client.end();
                    throw error;
                }
                this.client.end();
                return results.rows[0].ans_id;
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

    updateAnswer(id, text) {
        if(text != "" && text != undefined) {
            this.client.connect();
            this.client.query('UPDATE answer set ans_text = ? where ans_id = ?', [text, id], (error) =>
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
}

export default AnswerDAO;