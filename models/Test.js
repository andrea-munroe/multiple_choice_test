class Test {
    /**
    * @param {string} name The name of the test
    */
    constructor(name) {
        const dao = new TestDAO();
        this.id = dao.addTest(name);
        this.questions = [];
    }

    /**
    * @param {string} name The name of the test
    */
    setName(name) {
        dao.updateTestName(this.id, name);
    }

    /**
    * @param {Question} question A Question object
    */
    addQuestion(question) {
        if(question != undefined && question.getCorrectAnswer() != undefined) {
            this.questions.push(question);
            dao.addTestQuestion(this.id, question.getId())
        }
        else {
            console.log("Invalid string");
            //raise an exception
        }
    }

    /**
    * @param {number} position The location of the Question
    */
    deleteQuestion(position) {
        if(this.questions.length > position && position >= 0) {
            dao.removeTestQuestion(this.id, this.questions[position].getId())
            this.questions.splice(position);
        }
        else {
            console.log("position outside array");
            //raise an exception
        }
    }

    getName() {
        return dao.getTestName(this.id);
    }

    /**
    * @param {number} position The location of the Question
    */
    getQuestion(position) {
        if(this.questions.length > position && position >= 0) {
            return this.questions[position].getQuestion();
        }
        else {
            console.log("position outside array");
            //raise an exception
        }
    }

    getId() {
        return this.id;
    }
}
