class Answer {
    constructor(answer) {
        const dao = new AnswerDAO();
        dao.addAnswer(answer)
        this.id = 0; //This should match the id in the database. Im not sure how to set this up.
    }

    setAnswer(answer) {
        dao.updateAnswer(this.id, answer)
    }

    getAnswer() {
        return dao.getAnswer(this.id);
    }

    getId() {
        return this.id;
    }
}