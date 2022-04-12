DROP TABLE IF EXISTS question_answers;
DROP TABLE IF EXISTS test_questions;
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS tests;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;

CREATE TABLE
    answers (
        ans_id SERIAL PRIMARY KEY,
        ans_text text NOT NULL
    );

CREATE TABLE
    questions (
        quest_id SERIAL PRIMARY KEY,
        quest_text text NOT NULL, 
        correct_ans SERIAL,
        FOREIGN KEY (correct_ans) REFERENCES answers (ans_id) ON DELETE CASCADE
    );

CREATE TABLE
    tests (
        test_id SERIAL PRIMARY KEY,
        test_name VARCHAR(255) NOT NULL
    );

CREATE TABLE 
    question_answers (
        quest_id SERIAL,
        ans_id SERIAL,
        PRIMARY KEY (quest_id, ans_id),
        FOREIGN KEY (quest_id) REFERENCES questions (quest_id) ON DELETE CASCADE
    ); 

CREATE TABLE 
    test_questions (
        test_id SERIAL,
        quest_id SERIAL,
        PRIMARY KEY (test_id, quest_id),
        FOREIGN KEY (test_id) REFERENCES tests (test_id),
        FOREIGN KEY (quest_id) REFERENCES questions (quest_id)
     );

CREATE TABLE
    scores (
        test_id SERIAL,
        student_name VARCHAR(50) NOT NULL,
        score INT NOT NULL CHECK (score <= 100 AND score >= 0),
        PRIMARY KEY (test_id, student_name, score),
        FOREIGN KEY (test_id) REFERENCES tests (test_id) ON DELETE CASCADE
    );
