class Answer {
    /**
    * @param {string} text The answer string
    */
    constructor(text) {
        const AnswerDAO = require("../models/AnswerDAO").default
        const dao = new AnswerDAO();
        this.id = dao.addAnswer(text)
    }

    /**
    * @param {string} text The answer string
    */
    setAnswer(text) {
        dao.updateAnswer(this.id, text)
    }

    getAnswer() {
        return dao.getAnswer(this.id);
    }

    getId() {
        return this.id;
    }
}

module.exports = Answer;