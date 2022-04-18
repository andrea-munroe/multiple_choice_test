const Test = require("../models/Test").default
const Question = require("../models/Question").default
const Answer = require("../models/Answer").default

let q1 = new Question("True or false: This program was created using Javascript.")
let q2 = new Question("True or false: This program uses MySQL.")
let q3 = new Question("On which of these days do we have class?")
let q4 = new Question("Which of these numbers is not prime?")
let q5 = new Question("Which of these numbers is the largest?")

const ans1 = [new Answer("True"), new Answer("False"), new Answer("Ask Dr. Fonteles")]
const ans2 = [new Answer("Sunday"), new Answer("Monday"), new Answer("Tuesday"), new Answer("Thursday"), new Answer("Saturday")]
const ans3 = [new Answer("1"), new Answer("2"), new Answer("3")]
q1.addAnswers(ans1)
q1.setCorrectAnswer(0)
q2.addAnswers(ans1)
q2.setCorrectAnswer(1)
q3.addAnswers(ans2)
q3.setCorrectAnswer(1)
q4.addAnswers(ans3)
q4.setCorrectAnswer(0)
q5.addAnswers(ans3)
q5.setCorrectAnswer(2)


let t1 = new Test("Databases");
let t2 = new Test("Number Theory");
t1.addQuestion(q1)
t1.addQuestion(q2)
t1.addQuestion(q3)
t2.addQuestion(q4)
t2.addQuestion(q5)

console.log(t1.getQuestion(0));
console.log(t1.getQuestion(1));
console.log(t1.getQuestion(2));
console.log(t2.getQuestion(0));
console.log(t2.getQuestion(1));

let s1 = new Score("Dr. Fonteles", 100, 0)
let s2 = new Score("Dr. Royer", 89, 0)
let s3 = new Score("Dr. David Wright", 33, 0)
let s4 = new Score("Dr. Fonteles", 100, 1)
let s5 = new Score("Dr. Hoffert", 90, 1)
// console.log(s1.getScore())

console.log("database seeded")
