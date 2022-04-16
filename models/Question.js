class Question {
    constructor(question) {
        const dao = new QuestionDAO();
        dao.addQuestion(question)
        this.answers = []; //array holding Answer objects
        this.correctPos = null;
        this.id = 0; //This should match the id in the database. Im not sure how to set this up.
    }

    addAnswer(answer){
        this.answers.push(answer);
        dao.addAnswer(this.id, answer.getId())
    }
    
    // for ease of seeding database, not sure if it'll be of any help to get all of them in the GUI but I figure it won't hurt
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

    setQuestion(question) {
        dao.updateQuestion(this.id, question)
    }

    editAnswer(position, answer) {
        if(position < this.answers.length && position >= 0) {
            this.answers[position].setAnswer(answer)
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

    getAnswer(position) {
        if(position < this.answers.length && position >= 0) {
            return this.answers[position].getAnswer(this.answers[position].getId())
        } else {
            console.log("position outside array")
            //raise an exception
        }
    }
    //again, thought this might be useful for debugging, not sure if we'll need it for GUI but here it is
    getAnswers() {
        array = []
        for(answer = 0; answer < this.answer.length; answer++) {
            array.push(this.getAnswer(answer))
        } 
        return array;
    }

    //thought this might be useful, doesn't hurt anything
    getCorrectAnswer() {
        return this.getAnswer(this.getCorrectPos());
    }

    getId() {
        return this.id;
    }
}
