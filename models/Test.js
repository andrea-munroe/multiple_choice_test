class Test {
    /**
    * @param {string} name The name of the test
    */
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.questions = [];
    }
}

module.exports = Test;