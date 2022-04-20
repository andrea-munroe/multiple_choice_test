import AnswerDAO from "./AnswerDAO";
import Question from "./Question";

class QuestionDAO {
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
        this.ansDAO = new AnswerDAO();
    }

    getQuestionAnswers(id, callback) {
        this.client.connect();
        this.client.query('SELECT ans_id from question_answer where quest_id = ?', [id], (error, results) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            let answers = [];
            for(let i = 0; i < results.rows.length; i++) {
                this.ansDAO.getAnswer(results.rows[i].ans_id, (answer) => {
                    answers.push(answer);
                })
            }
            callback(answers)
        })
    }

    getQuestion(id, callback) {
        this.client.connect();
        this.client.query('SELECT quest_text, correct_ans from question where quest_id = ?', [id], (error, results) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            let question = new Question(id, results.rows[0].quest_text, null, results.rows[0].correct_ans)
            this.getQuestionAnswers(id, (answers) => {
                question.answers = answers;
            })
            callback(question);
        })
    }

    getAllQuestions(callback) {
        this.client.connect();
        this.client.query('SELECT quest_id from question', (error, results) =>
        {
            if(error) {
                this.client.end();
                throw error;
            }
            this.client.end();
            let questions = []
            for(let i=0; i < results.rows.length; i++) {
                this.getQuestion(results.rows[i].quest_id, (question) => {
                    questions.push(question);
                })
            }
            callback(questions);
        })
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

export default QuestionDAO;