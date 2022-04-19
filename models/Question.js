class Question {
    /**
    * @param {string} text The question string
    */
    constructor(id, quest_text, answers, correct_ans) {
        this.id = id
        this.quest_text = quest_text;
        this.answers = answers;
        this.correct_ans = correct_ans;
    }

    getCorrectAnswer() {
        for(i = 0; i < this.answers.length; i++) {
            if( this.answers[i].getId() == this.correct_ans) {
                return this.answers[i]
            }
        }
    }

    addAnswer(answer) {
        this.answers.push(answer);
    }
}

export default Question;