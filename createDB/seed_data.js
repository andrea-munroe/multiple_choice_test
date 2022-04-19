// class Test {
//     /**
//     * @param {string} name The name of the test
//     */
//     constructor(name) {
//         this.dao = new TestDAO();
//         this.id = this.dao.addTest(name);
//         this.questions = [];
//     }

import AnswerDAO from "../models/AnswerDAO";

//     /**
//     * @param {string} name The name of the test
//     */
//     setName(name) {
//         this.dao.updateTestName(this.id, name);
//     }

//     /**
//     * @param {Question} question A Question object
//     */
//     addQuestion(question) {
//         if(question != undefined && question.getCorrectAnswer() != undefined) {
//             this.questions.push(question);
//             this.dao.addTestQuestion(this.id, question.getId())
//         }
//         else {
//             console.log("Invalid string");
//             //raise an exception
//         }
//     }

//     /**
//     * @param {number} position The location of the Question
//     */
//     deleteQuestion(position) {
//         if(this.questions.length > position && position >= 0) {
//             this.dao.removeTestQuestion(this.id, this.questions[position].getId())
//             this.questions.splice(position);
//         }
//         else {
//             console.log("position outside array");
//             //raise an exception
//         }
//     }

//     getName() {
//         return this.dao.getTestName(this.id);
//     }

//     /**
//     * @param {number} position The location of the Question
//     */
//     getQuestion(position) {
//         if(this.questions.length > position && position >= 0) {
//             return this.questions[position].getQuestion();
//         }
//         else {
//             console.log("position outside array");
//             //raise an exception
//         }
//     }

//     getId() {
//         return this.id;
//     }
// }

// class TestDAO {
//     constructor() {
//     }

//     addTest(test_name) {
//         if(test_name != "" && test_name != undefined) {
//             const { Client } = require('pg');
//             require('dotenv').config();
//             const client = new Client({
//                 host: process.env.PGHOST,
//                 port: process.env.PGPORT,
//                 user: process.env.PGUSER,
//                 password: process.env.PGPASSWORD,
//                 database: process.env.PGDATABASE,
//             });
//             client.connect();
//             client.query('INSERT into test(test_name) values (?) returning test_id', [test_name], (error, results) =>
//             {
//                 if(error) {
//                     client.end();
//                     throw error;
//                 }
//                 client.end();
//                 return results.rows[0].test_id
//             })
//         } else {
//             console.log("Invalid string");
//             //raise exception
//         }
//     }

//     getTestName(id) {
//         const { Client } = require('pg');
//         require('dotenv').config();
//         const client = new Client({
//             host: process.env.PGHOST,
//             port: process.env.PGPORT,
//             user: process.env.PGUSER,
//             password: process.env.PGPASSWORD,
//             database: process.env.PGDATABASE,
//         });
//         client.connect();
//         client.query('SELECT test_name from test where test_id = ?', [id], (error, results) =>
//         {
//             if(error) {
//                 client.end();
//                 throw error;
//             }
//             client.end();
//             return results.rows[0].test_name;
//         })
//     }

//     addTestQuestion(test_id, question_id) {
//         const { Client } = require('pg');
//         require('dotenv').config();
//         const client = new Client({
//             host: process.env.PGHOST,
//             port: process.env.PGPORT,
//             user: process.env.PGUSER,
//             password: process.env.PGPASSWORD,
//             database: process.env.PGDATABASE,
//         });
//         client.connect();
//         client.query('INSERT into test_question(test_id, quest_id) values (?, ?)', [test_id, question_id], (error) =>
//         {
//             if(error) {
//                 client.end();
//                 throw error;
//             }
//             client.end();
//         })
//     }

//     removeTestQuestion(test_id, question_id) {
//         const { Client } = require('pg');
//         require('dotenv').config();
//         const client = new Client({
//             host: process.env.PGHOST,
//             port: process.env.PGPORT,
//             user: process.env.PGUSER,
//             password: process.env.PGPASSWORD,
//             database: process.env.PGDATABASE,
//         });
//         client.connect();
//         client.query('DELETE from test_question where test_id = ? and quest_id = ?', [test_id, question_id], (error) =>
//         {
//             if(error) {
//                 client.end();
//                 throw error;
//             }
//             client.end();
//         })
//     }

//     updateTestName(id, text) {
//         if(text != "" && text != undefined) {
//             const { Client } = require('pg');
//             require('dotenv').config();
//             const client = new Client({
//                 host: process.env.PGHOST,
//                 port: process.env.PGPORT,
//                 user: process.env.PGUSER,
//                 password: process.env.PGPASSWORD,
//                 database: process.env.PGDATABASE,
//             });
//             client.connect();
//             client.query('UPDATE test set test_name = ? where test_id = ?', [text, id], (error) =>
//             {
//                 if(error) {
//                     client.end();
//                     throw error;
//                 }
//                 client.end();
//             })
//         } else {
//             console.log("Invalid string");
//             //raise exception
//         }
//     }

//     deleteTest(id) {
//         const { Client } = require('pg');
//         require('dotenv').config();
//         const client = new Client({
//             host: process.env.PGHOST,
//             port: process.env.PGPORT,
//             user: process.env.PGUSER,
//             password: process.env.PGPASSWORD,
//             database: process.env.PGDATABASE,
//         });
//         client.connect();
//         client.query('DELETE from test where test_id = ?', [id], (error) =>
//         {
//             if(error) {
//                 client.end();
//                 throw error;
//             }
//             client.end();
//         })
//     }
// }

// class Question {
//     /**
//     * @param {string} text The question string
//     */
//     constructor(text) {
//         this.dao = new QuestionDAO();
//         this.id = this.dao.addQuestion(text)
//         this.answers = []; //array holding Answer objects
//         this.correctPos = null;
//     }

//     /**
//     * @param {Answer} answer The Answer being added to the question
//     */
//     addAnswer(answer){
//         this.answers.push(answer);
//         this.dao.addAnswer(this.id, answer.getId())
//     }
    
//     // for ease of seeding database, not sure if it'll be of any help to get all of them in the GUI but I figure it won't hurt
//     /**
//     * @param {Answer[]} answers Array of Answer's being added to the question
//     */
//     addAnswers(answers){
//         if(answers.length > 0){
//             for(let answer = 0; answer < answers.length; answer++){
//                 this.addAnswer(answers[answer])
//             }
//         }
//         else{
//             console.log("Invalid answer array")
//         }
//     }

//     /**
//     * @param {number} position The location in the array of the answer being deleted
//     */
//     deleteAnswer(position) {
//         if(this.answers.length > position && position >= 0) {
//             this.dao.removeAnswer(this.id, this.answers[position].getId()) //This may not actually delete an answer from the answer table. Should it?
//             this.answers = this.answers.splice(position);
//         }
//         else {
//             console.log("position outside array");
//             //raise an exception
//         }
//     }

//     /**
//     * @param {number} position The location in the array of the correct answer
//     */
//     setCorrectAnswer(position) {
//         if(this.answers.length > position && position >= 0) {
//             this.correctPos = position;
//             this.dao.changeCorrectAnswer(this.id, this.answers[this.correctPos].getId());
//         }
//         else {
//             console.log("position outside array");
//             //raise an exception
//         }
//     }

//     /**
//     * @param {string} text The question string
//     */
//     setQuestion(text) {
//         this.dao.updateQuestion(this.id, text)
//     }

//     /**
//     * @param {number} position The location in the array of the answer
//     * @param {string} text The answer string
//     */
//     editAnswer(position, text) {
//         if(position < this.answers.length && position >= 0) {
//             this.answers[position].setAnswer(text)
//         } else {
//             console.log("position outside array")
//             //raise an exception
//         }
//     }
    
//     getCorrectPos() {
//         return this.correctPos;
//     }

//     getQuestion() {
//         return this.dao.getQuestion(this.id)
//     }

//     /**
//     * @param {string} position The location of the answer in the array
//     * @returns {string} A string of the answer
//     */
//     getAnswer(position) {
//         if(position < this.answers.length && position >= 0) {
//             return this.answers[position].getAnswer(this.answers[position].getId())
//         } else {
//             console.log("position outside array")
//             //raise an exception
//         }
//     }
//     //again, thought this might be useful for debugging, not sure if we'll need it for GUI but here it is
//     /**
//     * @returns {string[]} An array of answer strings
//     */
//     getAnswers() {
//         array = []
//         for(answer = 0; answer < this.answer.length; answer++) {
//             array.push(this.getAnswer(answer))
//         } 
//         return array;
//     }

//     //thought this might be useful, doesn't hurt anything
//     /**
//     * @returns {string} A string of the answer
//     */
//     getCorrectAnswer() {
//         return this.getAnswer(this.getCorrectPos());
//     }

//     getId() {
//         return this.id;
//     }
// }

// class QuestionDAO {
//     constructor() {}

//     getQuestion(id) {
//         const { Client } = require('pg');
//         require('dotenv').config();
//         const client = new Client({
//             host: process.env.PGHOST,
//             port: process.env.PGPORT,
//             user: process.env.PGUSER,
//             password: process.env.PGPASSWORD,
//             database: process.env.PGDATABASE,
//         });
//         client.connect();
//         client.query('SELECT quest_text from question where quest_id = ?', [id], (error, results) =>
//         {
//             if(error) {
//                 client.end();
//                 throw error;
//             }
//             client.end();
//             return results.rows[0].quest_text
//         })
//     }

//     addQuestion(text) {
//         if(text != "" && text != undefined) {
//             const { Client } = require('pg');
//             require('dotenv').config();
//             const client = new Client({
//                 host: process.env.PGHOST,
//                 port: process.env.PGPORT,
//                 user: process.env.PGUSER,
//                 password: process.env.PGPASSWORD,
//                 database: process.env.PGDATABASE,
//             });
//             client.connect();
//             client.query('INSERT into question(quest_text, correct_ans) values (?, null) returning quest_id', [text], (error, results) =>
//             {
//                 if(error) {
//                     client.end();
//                     throw error;
//                 }
//                 client.end();
//                 return results.rows[0].quest_id
//             })
//         } else {
//             console.log("invalid string");
//             //raise exception
//         }
//     }

//     updateQuestion(id, text) {
//         if(text != "" && text != undefined) {
//             const { Client } = require('pg');
//             require('dotenv').config();
//             const client = new Client({
//                 host: process.env.PGHOST,
//                 port: process.env.PGPORT,
//                 user: process.env.PGUSER,
//                 password: process.env.PGPASSWORD,
//                 database: process.env.PGDATABASE,
//             });
//             client.connect();
//             client.query('UPDATE question set quest_text = ? where quest_id = ?', [text, id], (error) =>
//             {
//                 if(error) {
//                     client.end();
//                     throw error;
//                 }
//                 client.end();
//             })
//         } else {
//             console.log("Invalid string");
//             //raise exception
//         }
//     }

//     deleteQuestion(id) {
//         const { Client } = require('pg');
//         require('dotenv').config();
//         const client = new Client({
//             host: process.env.PGHOST,
//             port: process.env.PGPORT,
//             user: process.env.PGUSER,
//             password: process.env.PGPASSWORD,
//             database: process.env.PGDATABASE,
//         });
//         client.connect();
//         client.query('DELETE from question where quest_id = ?', [id], (error) =>
//         {
//             if(error) {
//                 client.end();
//                 throw error;
//             }
//             client.end();
//         })
//     }

//     addAnswer(question_id, answer_id) {
//         const { Client } = require('pg');
//         require('dotenv').config();
//         const client = new Client({
//             host: process.env.PGHOST,
//             port: process.env.PGPORT,
//             user: process.env.PGUSER,
//             password: process.env.PGPASSWORD,
//             database: process.env.PGDATABASE,
//         });
//         client.connect();
//         client.query('INSERT into question_answer(quest_id, ans_id) values (?, ?)', [question_id, answer_id], (error) =>
//         {
//             if(error) {
//                 client.end();
//                 throw error;
//             }
//             client.end();
//         })
//     }

//     removeAnswer(question_id, answer_id) {
//         const { Client } = require('pg');
//         require('dotenv').config();
//         const client = new Client({
//             host: process.env.PGHOST,
//             port: process.env.PGPORT,
//             user: process.env.PGUSER,
//             password: process.env.PGPASSWORD,
//             database: process.env.PGDATABASE,
//         });
//         client.connect();
//         client.query('DELETE from question_answer where quest_id = ? and ans_id = ?', [question_id, answer_id], (error) =>
//         {
//             if(error) {
//                 client.end();
//                 throw error;
//             }
//             client.end();
//         })
//     }

//     changeCorrectAnswer(question_id, answer_id) {
//         const { Client } = require('pg');
//         require('dotenv').config();
//         const client = new Client({
//             host: process.env.PGHOST,
//             port: process.env.PGPORT,
//             user: process.env.PGUSER,
//             password: process.env.PGPASSWORD,
//             database: process.env.PGDATABASE,
//         });
//         client.connect();
//         client.query('UPDATE question set correct_ans = ? where quest_id = ?', [answer_id, question_id], (error) =>
//         {
//             if(error) {
//                 client.end();
//                 throw error;
//             }
//             client.end();
//         })
//     }
// }

// class Answer {
//     /**
//     * @param {string} text The answer string
//     */
//     constructor(text) {
//         this.dao = new AnswerDAO();
//         this.id = this.dao.addAnswer(text)
//     }

//     /**
//     * @param {string} text The answer string
//     */
//     setAnswer(text) {
//         this.dao.updateAnswer(this.id, text)
//     }

//     getAnswer() {
//         return this.dao.getAnswer(this.id);
//     }

//     getId() {
//         return this.id;
//     }
// }

// class AnswerDAO {
//     constructor() {
//     }

//     getAnswer(id) {
//         const { Client } = require('pg');
//         require('dotenv').config();
//         const client = new Client({
//             host: process.env.PGHOST,
//             port: process.env.PGPORT,
//             user: process.env.PGUSER,
//             password: process.env.PGPASSWORD,
//             database: process.env.PGDATABASE,
//         });
//         client.connect();
//         client.query('SELECT ans_text from answer where ans_id = ?', [id], (error, results) =>
//         {
//             if(error) {
//                 client.end();
//                 throw error;
//             }
//             client.end();
//             return results.rows[0].ans_text
//         })
//     }

//     addAnswer(text) {
//         if(text != "" && text != undefined) {
//             const { Client } = require('pg');
//             require('dotenv').config();
//             const client = new Client({
//                 host: process.env.PGHOST,
//                 port: process.env.PGPORT,
//                 user: process.env.PGUSER,
//                 password: process.env.PGPASSWORD,
//                 database: process.env.PGDATABASE,
//             });
//             client.connect();
//             client.query('INSERT into answer(ans_text) values (?) returning ans_id', [text], (error, results) =>
//             {
//                 if(error) {
//                     client.end();
//                     throw error;
//                 }
//                 client.end();
//                 return results.rows[0].ans_id;
//             })
//         } else {
//             console.log("Invalid string");
//             //raise exception
//         }
//     }

//     deleteAnswer(id) {
//         const { Client } = require('pg');
//         require('dotenv').config();
//         const client = new Client({
//             host: process.env.PGHOST,
//             port: process.env.PGPORT,
//             user: process.env.PGUSER,
//             password: process.env.PGPASSWORD,
//             database: process.env.PGDATABASE,
//         });
//         client.connect();
//         client.query('DELETE from answer where ans_id = ?', [id], (error) =>
//         {
//             if(error) {
//                 client.end();
//                 throw error;
//             }
//             client.end();
//         })
//     }

//     updateAnswer(id, text) {
//         if(text != "" && text != undefined) {
//             const { Client } = require('pg');
//             require('dotenv').config();
//             const client = new Client({
//                 host: process.env.PGHOST,
//                 port: process.env.PGPORT,
//                 user: process.env.PGUSER,
//                 password: process.env.PGPASSWORD,
//                 database: process.env.PGDATABASE,
//             });
//             client.connect();
//             client.query('UPDATE answer set ans_text = ? where ans_id = ?', [text, id], (error) =>
//             {
//                 if(error) {
//                     client.end();
//                     throw error;
//                 }
//                 client.end();
//             })
//         } else {
//             console.log("Invalid string");
//             //raise exception
//         }
//     }
// }

// //##########################
// let q1 = new Question("True or false: This program was created using Javascript.")
// let q2 = new Question("True or false: This program uses MySQL.")
// let q3 = new Question("On which of these days do we have class?")
// let q4 = new Question("Which of these numbers is not prime?")
// let q5 = new Question("Which of these numbers is the largest?")

// const ans1 = [new Answer("True"), new Answer("False"), new Answer("Ask Dr. Fonteles")]
// const ans2 = [new Answer("Sunday"), new Answer("Monday"), new Answer("Tuesday"), new Answer("Thursday"), new Answer("Saturday")]
// const ans3 = [new Answer("1"), new Answer("2"), new Answer("3")]
// q1.addAnswers(ans1)
// q1.setCorrectAnswer(0)
// q2.addAnswers(ans1)
// q2.setCorrectAnswer(1)
// q3.addAnswers(ans2)
// q3.setCorrectAnswer(1)
// q4.addAnswers(ans3)
// q4.setCorrectAnswer(0)
// q5.addAnswers(ans3)
// q5.setCorrectAnswer(2)


// let t1 = new Test("Databases");
// let t2 = new Test("Number Theory");
// t1.addQuestion(q1)
// t1.addQuestion(q2)
// t1.addQuestion(q3)
// t2.addQuestion(q4)
// t2.addQuestion(q5)

// console.log(t1.getQuestion(0));
// console.log(t1.getQuestion(1));
// console.log(t1.getQuestion(2));
// console.log(t2.getQuestion(0));
// console.log(t2.getQuestion(1));

// // let s1 = new Score("Dr. Fonteles", 100, 0)
// // let s2 = new Score("Dr. Royer", 89, 0)
// // let s3 = new Score("Dr. David Wright", 33, 0)
// // let s4 = new Score("Dr. Fonteles", 100, 1)
// // let s5 = new Score("Dr. Hoffert", 90, 1)
// // console.log(s1.getScore())

// console.log("database seeded")


let dao = new AnswerDAO()
dao.getAnswer(1, (answer) => {
    console.log(answer.ans_text)
})