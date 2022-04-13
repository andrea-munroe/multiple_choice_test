class Question {
    constructor(question, correctPos, answer1, answer2, answer3 = "", answer4 = "") {
        this.question = question;
        //raise an exception if answer1 || answer2 is undefiend
        if(answer3 == "" && answer4 == "") {
            this.answers = [answer1, answer2];
        }
        else if(answer3 != "" && answer4 == "") {
            this.answers = [answer1, answer2, answer3];
        }
        else if(answer3 == "" && answer4 != "") {
            this.answers = [answer1, answer2, answer4];
        }
        else {
            this.answers = [answer1, answer2, answer3, answer4];
        }
        this.correctPos = correctPos;
    }

    addAnswer(answer){
        if(answer != "" || answer != undefined) {
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

    getAnswers(position) {
        if(position == undefined) {
            return this.answers;
        }
        return this.answers[position]
    }
}