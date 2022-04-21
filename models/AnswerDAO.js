const Answer = require('./Answer')

class AnswerDAO {
    constructor() {
        const { Pool } = require('pg')
        require('dotenv').config({ path: '../.env' });
        this.pool = new Pool();
    }

    getAnswer(id, callback) {
        const query = async() => {
            const sql = 'SELECT ans_text from answer where ans_id = $1'
            const { rows:ans_text } = await this.pool.query(sql, [id])
            callback(new Answer(id, ans_text[0].ans_text))
        }
        query()
    }

    getAllAnswers(quest_id, callback) {

        const query = async() => {
            const answers = []
            const sql = 'SELECT ans_id, ans_text from answer natural join question_answer where quest_id = $1'
            const { rows: ans } = await this.pool.query(sql, [quest_id])
            ans.forEach((elm) => {
                //callback(elm)
                answers.push(new Answer(elm.ans_id, elm.ans_text))
            })
            callback(answers)
            //console.log(ans)
        }
        query()
    }

    //May need to pass a question and then instead of returning an answer push it into the question
    addAnswer(quest_id, text, callback) {
        const query = async() => {
            const sql = 'INSERT into answer(ans_text) values ($1) returning ans_id'
            const sql2 = 'INSERT into question_answer(quest_id, ans_id) values ($1, $2) returning ans_id'
            const { rows:ans_id } = await this.pool.query(sql, [text])
            const { rows:ans } = await this.pool.query(sql2, [quest_id, ans_id[0].ans_id])
            callback(new Answer(ans_id[0].ans_id, text))
            //callback(new Answer(id, ans_id[0]))
        }
        query()      
    }
        
    
    deleteAnswer(id) {
        const query = async() => {
            const sql = 'DELETE from answer where ans_id = $1'
            const { rows:ans } = await this.pool.query(sql, [id])
        }
        query() 
    }

    updateAnswer(answer) {
        const query = async() => {
            const sql = 'UPDATE answer set ans_text = $1 where ans_id = $2'
            const { rows:ans } = await this.pool.query(sql, [answer.ans_text, answer.id])
        }
        query()
    }
}

module.exports =  AnswerDAO;




const dao = new AnswerDAO();
// dao.getAllAnswers(2, (answer) => {
//     console.log(answer)
// })
// dao.getAnswer(1, (answer) => {
//     console.log(answer)
// })
// dao.addAnswer(1, "me", (answer) => {
//     answer.ans_text = "new me"
//     dao.updateAnswer(answer)
// })
// dao.addAnswer(1, "Dr. Fonteles does not Rock", (answer) => {
//     console.log(answer)
//     dao.deleteAnswer(answer.id)
// })

//dao.deleteAnswer(16)