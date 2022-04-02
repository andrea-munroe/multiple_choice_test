Drop table questions

CREATE TABLE
    questions (
        question text PRIMARY KEY NOT NULL,
        answer text NOT NULL
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
    )