class Question {
    constructor(question) {
        this.setQuestion(question);
        this.answers = [];
    }

    addAnswer(answer){
        if(answer != "" && answer != undefined) {
            this.answers.push(answer);
        }
        else {
            console.log("Invalid string");
        }
    }

    deleteAnswer(position) {
        if(this.answers.length < position && position >= 0) {
            this.answers = this.answers.splice(position);
        }
        else {
            console.log("position outside array");
            //raise an exception
        }
    }

    setCorrectAnswer(position) {
        if(this.answers.length < position && position >= 0) {
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
}