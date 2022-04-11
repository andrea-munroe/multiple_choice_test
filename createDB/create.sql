DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS scores;


CREATE TABLE 
    question_answers (
        quest_id SERIAL FOREIGN KEY REFERENCES questions (quest_id),
        answer_text text,
    );
    
 

CREATE TABLE
    questions (
        quest_id SERIAL,
        quest_text text PRIMARY KEY NOT NULL,
    );

CREATE TABLE 
    test_questions (
        test_id SERIAL,
        quest_id SERIAL,
     );

CREATE TABLE
    answers (
        q_id text NOT NULL PRIMARY KEY,
        answers text NOT NULL,
        FOREIGN KEY (q_id) REFERENCES questions(question) ON DELETE CASCADE
    );

CREATE TABLE
    test (
        test_id SERIAL,
        test_name VARCHAR(255)
    )


CREATE TABLE
    scores (
        test_id SERIAL,
        student_name VARCHAR(50) NOT NULL,
        score INT NOT NULL CHECK (score <= 100 AND score >= 0)
    );
