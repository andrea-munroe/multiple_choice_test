class Question {
    constructor(question) {
        this.question = question;
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

    editQuestion(question) {
        if(question != "" && question != undefined) {
            this.question = question;
        }
        else {
            console.log("Invalid string");
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