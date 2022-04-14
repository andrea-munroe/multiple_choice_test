class Answer {
    constructor(answer) {
        this.setAnswer(answer);
        this.id = 0; //This should match the id in the database. Im not sure how to set this up.
    }

    setAnswer(answer) {
        if(answer != "" && answer != null) {
            this.answer = answer
        } else {
            console.log("invalid string")
            //raise exception
        }
    }

    getAnswer() {
        return this.answer;
    }

    getId() {
        return this.id;
    }
}