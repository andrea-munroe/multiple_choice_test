DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS scores;

CREATE TABLE
    questions (
        question text PRIMARY KEY NOT NULL,
        correct_answer text NOT NULL
    );

CREATE TABLE
    answers (
        q_id text NOT NULL,
        answers text NOT NULL,
        FOREIGN KEY (q_id) REFERENCES questions(question) ON DELETE CASCADE
    );

CREATE TABLE
    scores (
        student_name VARCHAR(50) NOT NULL,
        score INT NOT NULL CHECK (score <= 100 AND score >= 0)
    );