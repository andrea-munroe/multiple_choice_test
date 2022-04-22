const { connectionString } = require('pg/lib/defaults');
const AnswerDAO = require('./AnswerDAO');
const Question = require('./Question');

class QuestionDAO {
    constructor() {
        const { Pool } = require('pg')
        require('dotenv').config({ path: '../.env' });
        this.pool = new Pool();

        this.ansDAO = new AnswerDAO();
    }

    getQuestion(id, callback) {
        const query = async() => {
            const sql = 'SELECT quest_text, correct_ans from question where quest_id = $1'
            const { rows:quest } = await this.pool.query(sql, [id])
            this.ansDAO.getAllAnswers(id, (answers) => {
                callback(new Question(id, quest[0].quest_text, answers, quest[0].correct_ans))
            })
        }
        query()
    }

    getAllQuestions(test_id, callback) {
        const query = async() => {
            const questions = []
            const sql = 'SELECT quest_id, quest_text, correct_ans from question natural join test_question where test_id = $1'
            const { rows: quest } = await this.pool.query(sql, [test_id])
            //console.log(quest)
            if (quest.length != 0) {
                quest.forEach((elm) => {
                    this.getQuestion(elm.quest_id, (question) => {
                        questions.push(question)
                        if(questions.length == quest.length) {
                            callback(questions)
                        }
                    }) 
                })
            } else {
                callback(questions)
            }
        }
        query()
    }

    addQuestion(text, callback) {
        const query = async() => {
            const sql = 'INSERT into question(quest_text, correct_ans) values ($1, null) returning quest_id'
            const { rows:quest } = await this.pool.query(sql, [text])
            callback(new Question(quest[0].quest_id, text, [], null))
        }
        query()
    }

    updateQuestion(question) {
        const query = async() => {
            const sql = 'UPDATE question set quest_text = $1, correct_ans = $2 where quest_id = $3'
            const sql2 = 'DELETE from question_answer where quest_id = $1'
            const sql3 = 'INSERT into question_answer(quest_id, ans_id) values ($1, $2)'
            const { rows:quest } = await this.pool.query(sql, [question.quest_text, question.correct_ans, question.quest_id])
            const { rows:quest2 } = await this.pool.query(sql2, [question.quest_id])
            if(question.answers != null) {
                question.answers.forEach(async(elm) => {
                    const { rows:quest3 } = await this.pool.query(sql3, [question.id, elm.id])
                })
            }
        }
        query()
    }

    deleteQuestion(quest_id) {
        const query = async() => {
            const sql = 'DELETE from question where quest_id = $1'
            const { rows:quest } = await this.pool.query(sql, [quest_id])
        }
        query()
    }
}

module.exports = QuestionDAO;


//const qdao = new QuestionDAO()
//const adao = new AnswerDAO()

// qdao.getQuestion(1, (question) => {
//     console.log(question)
//     console.log(question.getCorrectAnswer())
// })

// qdao.getAllQuestions(1, (questions) => {
//     console.log(questions)
// })

// qdao.addQuestion("This is a new question. Did it work?", (question) => {
//     console.log(question)
//     adao.addAnswer(question.id, "This is an answer to the new question.", (answer) => {
//         console.log(question)
//         adao.addAnswer(question.id, "This is the second answer to the new question.", (answer) => {
//             console.log(question)
//             qdao.updateQuestion(question)
//         })
//     })
// })

// qdao.getQuestion(9, (question) => {
//     console.log(question)
// })