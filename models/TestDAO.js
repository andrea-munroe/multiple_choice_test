class TestDAO {
    constructor() {
        // loads connection data from .env file
        if (process.env.NODE_ENV !== "production") {
            require('dotenv').config();
        };

        const { Client } = require('pg');
        const client = new Client();
    }

    getTestName(id) {
        this.client.connect();
        this.client.query('SELECT test_name from test where test_id = ?', [id], (error, results) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            return results.rows[0].test_name;
        })
    }

    addTestQuestion(test_id, question_id) {
        client.connect();
        client.query('INSERT into test_question(test_id, quest_id) values (?, ?)', [test_id, question_id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
        })
    }

    removeTestQuestion(test_id, question_id) {
        client.connect();
        client.query('DELETE from test_question where test_id = ? and quest_id = ?', [test_id, question_id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
        })
    }

    updateTestName(id, text) {
        if(text != "" && text != undefined) {
            client.connect();
            client.query('UPDATE test set test_name = ? where test_id = ?', [text, id], (error) =>
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

    deleteTest(id) {
        client.connect();
        client.query('DELETE from test where test_id = ?', [id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
        })
    }
}