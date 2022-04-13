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
        if(question != "" || question != undefined) {
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

let question = new Question("This is a question.", 1, "Answer one", "Correct Answer", "Answer three", "Answer four")
let trueFalse = new Question("Is this statment true?", 0, "True", "False")

console.log(question)
console.log(question.getCorrectPos() + " is the correct position")
console.log(question.getQuestion() + " is the question")
console.log(question.getAnswers() + " Is all the answers")
console.log(question.getAnswers(1) + " is answer in position 1")
question.addAnswer("This is a new answer!");
console.log(question.getAnswers() + " Is all the answers. I just added a new one to the end!")
question.deleteAnswer(2);
console.log(question.getAnswers() + " Is all the answers. I just deleted the question in position 2!")
question.deleteAnswer(4);
console.log(question.getAnswers() + " Is all the answers. Nothing should have changed. Deleted out of bounds.")
question.editQuestion("This is the new question description.")
console.log(question.getQuestion() + " is the new question is it diffrent than before?")
question.editQuestion()
console.log(question.getQuestion() + " is the question. Nothing should have changed.")
question.setCorrectAnswer(3);
console.log(question.getCorrectPos() + " is the new correct position. Should be 3")
question.editAnswer(1, "This is the new and improved answer 1.")
console.log(question.getAnswers() + " Is all the answers. Answer 1 should be improved!")
console.log(trueFalse.getAnswers() + " Should be a true and false question with only 2 places.")
