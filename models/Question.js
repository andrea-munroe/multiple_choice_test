class Question {
    constructor(question) {
        this.setQuestion(question);
        this.answers = [];
        this.id = 0; //This should match the id in the database. Im not sure how to set this up.
    }

    addAnswer(answer){
        if(answer != "" && answer != undefined) {
            this.answers.push(answer);
        }
        else {
            console.log("Invalid string");
        }
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
        }
        else {
            console.log("position outside array");
            //raise an exception
        }
    }

    setQuestion(question) {
        if(question != "" && question != undefined) {
            this.question = question;
        }
        else {
            console.log("Invalid string");
            //raise an exception
        }
    }

    editAnswer(position, answer) {
        if(position < this.answers.length && position >= 0) {
            this.answers[position] = answer
        } else {
            console.log("position outside array")
            //raise an exception
        }
    }
    
    getCorrectPos() {
        return this.correctPos;
    }

    getQuestion() {
        return this.question;
    }

    getAnswer(position) {
        if(position < this.answers.length && position >= 0) {
            return this.answers[position]
        } else {
            console.log("position outside array")
            //raise an exception
        }
    }
    //again, thought this might be useful for debugging, not sure if we'll need it for GUI but here it is
    getAnswers() {
        return this.answers;
    }

    //thought this might be useful, doesn't hurt anything
    getCorrectAnswer() {
        return this.getAnswer(this.getCorrectPos());
    }

    getId() {
        return this.id;
    }
}
