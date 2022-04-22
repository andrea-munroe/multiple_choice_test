const AnswerDAO = require('./AnswerDAO');
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
        const query = async() => {
            const sql = 'SELECT test_name from test where test_id = $1'
            const { rows:test } = await this.pool.query(sql, [id])
            this.questDAO.getAllQuestions(id, (questions) => {
                callback(new Test(id, test[0].test_name, questions))
            })
        }
        query()
    }

    getAllTests(callback) {
        const query = async() => {
            const tests = []
            const sql = 'SELECT test_id, test_name from test'
            const { rows: test1 } = await this.pool.query(sql)
            if (test1.length != 0 ){
                    test1.forEach((elm) => {
                    this.getTest(elm.test_id, (test) => {
                        tests.push(test)
                        if(tests.length == test1.length) {
                            callback(tests)
                        }
                    }) 
                })
            } else {
                callback(tests)
            }
        }
        query()
    }

    addTest(test_name, callback) {
        const query = async() => {
            const sql = 'INSERT into test(test_name) values ($1) returning test_id'
            const { rows:test } = await this.pool.query(sql, [test_name])
            callback(new Test(test[0].test_id, test_name, []))
        }
        query()
    }
    
    updateTest(test) {
        const query = async() => {
            const sql = 'UPDATE test set test_name = $1 where test_id = $2'
            const sql2 = 'DELETE from test_question where test_id = $1'
            const sql3 = 'INSERT into test_question (test_id, quest_id) values ($1, $2)'
            const { rows:test1 } = await this.pool.query(sql, [test.test_name, test.id])
            const { rows:test2 } = await this.pool.query(sql2, [test.test_id])
            if(test.questions != null) {
                test.questions.forEach(async(elm) => {
                    const { rows:test3 } = await this.pool.query(sql3, [test.id, elm.id])
                })
            }
        }
        query()
    }

    deleteTest(test_id) {
        const query = async() => {
            const sql = 'DELETE from test where test_id = $1'
            const { rows:test } = await this.pool.query(sql, [test_id])
        }
        query()
    }
}

module.exports = TestDAO;


const tdao = new TestDAO()
const qdao = new QuestionDAO()
const adao = new AnswerDAO()

// tdao.getTest(14, (test) => {
//     console.log(test) // prints the entire test
//     //console.log(test.questions[1]) //prints out the question in position 1
//     //console.log(test.questions[1].answers[1].ans_text) //prints the answer in position 1 for the question in position 1
// })

tdao.addTest("Awesome Test now with correct answers", (test) => {
    console.log(test)
    qdao.addQuestion("new question", (question) => {
        adao.addAnswer(question.id, "Answer1", (answer) => {
            question.answers.push(answer)
            question.correct_ans = answer.id
            console.log(answer.id)
            adao.addAnswer(question.id, "Answer2", (answer2) => {
                question.answers.push(answer2)
                console.log(answer2.id)
                console.log(question.answers)
                qdao.updateQuestion(question)
                test.questions.push(question)
                tdao.updateTest(test)
            })
        })
    })
})

// tdao.getAllTests((tests) => {
//     console.log(tests)
// })

// tdao.getTest(5, (test) => {
//     console.log(test)
// })