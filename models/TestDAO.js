const QuestionDAO = require('./QuestionDAO');
const Test = require('./Test');

class TestDAO {
    constructor() {
        const { Pool } = require('pg')
        require('dotenv').config({ path: '../.env' });
        this.pool = new Pool();

        this.questDAO = new QuestionDAO();
    }

        getTest(id, callback) {
        this.client.connect();
        this.client.query('SELECT test_name from test where test_id = ?', [id], (error, results) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            let test = new Test(id, results.rows[0].test_name)
            this.getTestQuestions(id, (questions) => {
                test.questions = questions;
            })

            callback(test);
        })
    }

    getAllTests(callback) {
        this.client.connect();
        this.client.query('SELECT test_name from test', (error, results) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            let tests = [];
            for(let i=0; i < results.rows.length; i++) {
                this.getTest(results.rows[i].test_id, (test) => {
                    tests.push(test);
                })
            }
            callback(tests);
        })
    }

    addTest(test_name, callback) {
        if(test_name != "" && test_name != undefined) {
            this.client.connect();
            this.client.query('INSERT into test(test_name) values (?) returning test_id', [test_name], (error, results) =>
            {
                if(error) {
                    this.client.end();
                    throw error;
                }
                this.client.end();
                callback(new Test(results.rows[0].test_id, test_name));
            })
        } else {
            console.log("Invalid string");
            //raise exception
        }
    }
    
    updateTestName(test, text) {
        if(text != "" && text != undefined) {
            this.client.connect();
            this.client.query('UPDATE test set test_name = ? where test_id = ?', [text, test.id], (error) =>
            {
                if(error) {
                    this.client.end();
                    throw error;
                }
                this.client.end();
                test.test_name = text;
            })
        } else {
            console.log("Invalid string");
            //raise exception
        }
    }

    deleteTest(test) {
        this.client.connect();
        this.client.query('DELETE from test where test_id = ?', [test.id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
        })
    }

    addQuestion(test, question) {
        this.client.connect();
        this.client.query('INSERT into test_question(test_id, quest_id) values (?, ?)', [test.id, question.id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            test.questions.push(question);
        })
    }

    removeQuestion(test, question) {
        this.client.connect();
        this.client.query('DELETE from test_question where test_id = ? and quest_id = ?', [test.id, question.id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            for(let i = 0; i < test.questions.length; i++) {
                if(test.questions[i].id == question.id) {
                    test.questions.splice()
                }
            }
        })
    }
}

module.exports = TestDAO;