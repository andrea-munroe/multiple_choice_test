class Test {
    constructor(name) {
        this.setName(name)
        this.questions = [];
    }

    setName(name) {
        if(name != "" && name != undefined) {
            this.name = name;
        }
        else {
            console.log("Invalid string");
            //raise an exception
        }
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