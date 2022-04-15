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
        //Check these queries because im not entirly sure what is needed
        this.client.query('SELECT ans_text from answer where ans_id = ?', [id], (error, results) =>
        {
            console.log(error ? error.stack : results.rows[0].message)
            this.client.end();
        })
    }

    addAnswer(text) {
        if(text != "" && text != undefined) {
            this.client.connect();
            //Check these queries because im not entirly sure what is needed
            this.client.query('INSERT into answer(ans_text) values (?)', [text], (error, results) =>
            {
                console.log(error ? error.stack : results.rows[0].message)
                this.client.end();
            })
        } else {
            console.log("Invalid string");
            //raise exception
        }
    }

    deleteAnswer(id) {
        this.client.connect();
        //Check these queries because im not entirly sure what is needed
        this.client.query('DELETE from answer where ans_id = ?', [id], (error, results) =>
        {
            console.log(error ? error.stack : results.rows[0].message)
            this.client.end();
        })
    }

    updateAnswer(id, text) {
        if(text != "" && text != undefined) {
            this.client.connect();
            //Check these queries because im not entirly sure what is needed
            //not sure about having both [id, text] in the array like that works.
            this.client.query('UPDATE answer set ans_text = ? where ans_id = ?', [text, id], (error, results) =>
            {
                console.log(error ? error.stack : results.rows[0].message)
                this.client.end();
            })
        } else {
            console.log("Invalid string");
            //raise exception
        }
    }
}