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
            quest.forEach((elm) => {
                    //console.log("elm", elm)
                    //console.log(elm.quest_id)
                    this.ansDAO.getAllAnswers(elm.quest_id, (answers) => {
                        //console.log(elm)
                        questions.push(new Question(elm.quest_id, elm.quest_text, answers, elm.correct_ans));
                        if(quest[quest.length-1] == elm && questions.length == quest.length) {
                            callback(questions)
                        }
                        
                })
                
            })
            
            //console.log(ans)
        }
        query()
    }

    addQuestion(text, callback) {
        if(text != "" && text != undefined) {
            this.client.connect();
            this.client.query('INSERT into question(quest_text, correct_ans) values (?, null) returning quest_id', [text], (error, results) =>
            {
                if(error) {
                    this.client.end();
                    throw error;
                }
                this.client.end();
                callback(new Question(results.rows[0].quest_id, text, null, null))
            })
        } else {
            console.log("invalid string");
            //raise exception
        }
    }

    updateQuestionText(question, text) {
        if(text != "" && text != undefined) {
            this.client.connect();
            this.client.query('UPDATE question set quest_text = ? where quest_id = ?', [text, id], (error) =>
            {
                if(error) {
                    this.client.end();
                    throw error;
                }
                this.client.end();
                question.quest_text = text;
            })
        } else {
            console.log("Invalid string");
            //raise exception
        }
    }

    deleteQuestion(question) {
        this.client.connect();
        this.client.query('DELETE from question where quest_id = ?', [question.id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
        })
    }

    //move to answerDAO
    addAnswer(question, answer) {
        this.client.connect();
        this.client.query('INSERT into question_answer(quest_id, ans_id) values (?, ?)', [question.id, answer.id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            question.answers.push(answer)
        })
    }

    //move to answerDAO
    removeAnswer(question, answer) {
        this.client.connect();
        this.client.query('DELETE from question_answer where quest_id = ? and ans_id = ?', [question.id, answer.id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            for(let i = 0; i < question.answers.length; i++) {
                if(question.answers[i].id == answer.id) {
                    question.answers.splice()
                }
            }
        })
    }

    setCorrectAnswer(question, answer) {
        this.client.connect();
        this.client.query('UPDATE question set correct_ans = ? where quest_id = ?', [answer.id, question.id], (error) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            question.correct_ans = answer.id;
        })
    }
}

module.exports = QuestionDAO;


const dao = new QuestionDAO()

// dao.getQuestion(1, (question) => {
//     console.log(question)
//     console.log(question.getCorrectAnswer())
// })

dao.getAllQuestions(1, (questions) => {
    console.log(questions[1].answers[1])
})