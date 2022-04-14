class Score {
    constructor(name, score = 0, testName) {
        this.setName(name);
        this.setScore(score);
        this.setTestName(testName);
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

    setScore(score) {
        this.score = score;
    }

    setTestName(testName) {
        if(testName != "" && testName != undefined) {
            this.testName = testName;
        }
        else {
            console.log("Invalid string");
            //raise an exception
        }
    }

    getName() {
        return this.name;
    }

    getScore() {
        return this.score;
    }

    getTestName() {
        return this.testName;
    }
}