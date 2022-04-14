class Test {
    constructor(name) {
        this.name = name;
        this.questions = [];
    }

    setName(name) {
        this.name = name;
    }

    addQuestion(question) {
        this.question.push(question);
    }

    deleteQuestion(position) {
        if(this.questions.length < position && position >= 0) {
            this.question.splice(position);
        }
        else {
            console.log("position outside array");
            //raise an exception
        }
    }

    getName() {
        return this.name;
    }

    getQuestion(position) {
        if(this.questions.length < position && position >= 0) {
            return this.questions[position];
        }
        else {
            console.log("position outside array");
            //raise an exception
        }
    }
}