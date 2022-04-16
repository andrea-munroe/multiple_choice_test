class Test {
    constructor(name) {
        const dao = new TestDAO();
        dao.addTest(name);
        this.questions = [];
        this.id = 0; //This should match the id in the database. Im not sure how to set this up.
    }

    setName(name) {
        dao.updateTestName(this.id, name);
    }

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
