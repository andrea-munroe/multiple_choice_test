class Question {
    /**
    * @param {string} text The question string
    */
    constructor(text) {
        const QuestionDAO = require("../models/QuestionDAO").default
        const dao = new QuestionDAO();
        this.id = dao.addQuestion(text)
        this.answers = []; //array holding Answer objects
        this.correctPos = null;
    }

    /**
    * @param {Answer} answer The Answer being added to the question
    */
    addAnswer(answer){
        this.answers.push(answer);
        dao.addAnswer(this.id, answer.getId())
    }
    
    // for ease of seeding database, not sure if it'll be of any help to get all of them in the GUI but I figure it won't hurt
    /**
    * @param {Answer[]} answers Array of Answer's being added to the question
    */
    addAnswers(answers){
        if(answers.length > 0){
            for(let answer = 0; answer < answers.length; answer++){
                this.addAnswer(answers[answer])
            }
        }
        else{
            console.log("Invalid answer array")
        }
    }

    /**
    * @param {number} position The location in the array of the answer being deleted
    */
    deleteAnswer(position) {
        if(this.answers.length > position && position >= 0) {
            dao.removeAnswer(this.id, this.answers[position].getId()) //This may not actually delete an answer from the answer table. Should it?
            this.answers = this.answers.splice(position);
        }
        else {
            console.log("position outside array");
            //raise an exception
        }
    }

    /**
    * @param {number} position The location in the array of the correct answer
    */
    setCorrectAnswer(position) {
        if(this.answers.length > position && position >= 0) {
            this.correctPos = position;
            dao.changeCorrectAnswer(this.id, this.answers[this.correctPos].getId());
        }
        else {
            console.log("position outside array");
            //raise an exception
        }
    }

    /**
    * @param {string} text The question string
    */
    setQuestion(text) {
        dao.updateQuestion(this.id, text)
    }

    /**
    * @param {number} position The location in the array of the answer
    * @param {string} text The answer string
    */
    editAnswer(position, text) {
        if(position < this.answers.length && position >= 0) {
            this.answers[position].setAnswer(text)
        } else {
            console.log("position outside array")
            //raise an exception
        }
    }
    
    getCorrectPos() {
        return this.correctPos;
    }

    getQuestion() {
        return dao.getQuestion(this.id)
    }

    /**
    * @param {string} position The location of the answer in the array
    * @returns {string} A string of the answer
    */
    getAnswer(position) {
        if(position < this.answers.length && position >= 0) {
            return this.answers[position].getAnswer(this.answers[position].getId())
        } else {
            console.log("position outside array")
            //raise an exception
        }
    }
    //again, thought this might be useful for debugging, not sure if we'll need it for GUI but here it is
    /**
    * @returns {string[]} An array of answer strings
    */
    getAnswers() {
        array = []
        for(answer = 0; answer < this.answer.length; answer++) {
            array.push(this.getAnswer(answer))
        } 
        return array;
    }

    //thought this might be useful, doesn't hurt anything
    /**
    * @returns {string} A string of the answer
    */
    getCorrectAnswer() {
        return this.getAnswer(this.getCorrectPos());
    }

    getId() {
        return this.id;
    }
}

module.exports = Question;