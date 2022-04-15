// loads connection data from .env file
if (process.env.NODE_ENV !== "production") {
	require('dotenv').config();
};
class AnswerDAO {
    constructor() {
        const { Client } = require('pg');
        const client = new Client();
    }

    getAnswer(id) {
        client.connect();
        //Check these queries because im not entirly sure what is needed
        client.query('SELECT ans_text from answer where ans_id = ?', [id], (error, results) =>
        {
            console.log(error ? error.stack : results.rows[0].message)
            client.end();
        })
    }

    addAnswer(text) {
        if(text != "" && text != undefined) {
            client.connect();
            //Check these queries because im not entirly sure what is needed
            client.query('INSERT into answer(ans_text) values (?)', [text], (error, results) =>
            {
                console.log(error ? error.stack : results.rows[0].message)
                client.end();
            })
        } else {
            console.log("Invalid string");
            //raise exception
        }
    }

    deleteAnswer(id) {
        client.connect();
        //Check these queries because im not entirly sure what is needed
        client.query('DELETE from answer where ans_id = ?', [id], (error, results) =>
        {
            console.log(error ? error.stack : results.rows[0].message)
            client.end();
        })
    }

    updateAnswer(id, text) {
        if(text != "" && text != undefined) {
            client.connect();
            //Check these queries because im not entirly sure what is needed
            //not sure about having both [id, text] in the array like that works.
            client.query('UPDATE answer set ans_text = ? where ans_id = ?', [text, id], (error, results) =>
            {
                console.log(error ? error.stack : results.rows[0].message)
                client.end();
            })
        } else {
            console.log("Invalid string");
            //raise exception
        }
    }
}