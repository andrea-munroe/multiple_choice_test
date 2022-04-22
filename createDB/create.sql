DROP TABLE IF EXISTS question_answer;
DROP TABLE IF EXISTS test_question;
DROP TABLE IF EXISTS score;
DROP TABLE IF EXISTS test;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS answer;


-- sql functions
CREATE OR REPLACE FUNCTION update_correct_ans()
	RETURNS TRIGGER AS $$ 
	BEGIN
		IF NEW.correct_ans NOT IN (SELECT ans_id FROM question_answer 
		WHERE quest_id = NEW.quest_id)  THEN
			--INSERT INTO question_answer VALUES (NEW.quest_id, NEW.correct_ans);
			UPDATE question SET correct_ans = OLD.correct_ans WHERE quest_id = OLD.quest_id;
			RAISE NOTICE 'New correct_ans is not an answer for question. Add answer to question_answer and try again.';
		END IF;
		RETURN NEW;
	END;
	$$
	LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION get_timestamp()
	RETURNS trigger as $$
	BEGIN
		IF (SELECT NOW()) > (SELECT due_date FROM test WHERE NEW.test_id = test.test_id) THEN
			UPDATE score SET late=FALSE  WHERE score_id = NEW.score_id;
		END IF;
		RETURN NEW;
	END;
	$$
	LANGUAGE 'plpgsql';
	
CREATE OR REPLACE FUNCTION set_due()
	RETURNS timestamp as $$
	BEGIN
	RETURN NOW() + INTERVAL '7' DAY;
	END;
	$$
	LANGUAGE 'plpgsql';



-- sql create tables
CREATE TABLE
    answer (
        ans_id SERIAL PRIMARY KEY,
        ans_text text NOT NULL
    );

CREATE TABLE
    question (
        quest_id SERIAL PRIMARY KEY,
        quest_text text NOT NULL, 
        correct_ans INT,
        FOREIGN KEY (correct_ans) REFERENCES answer (ans_id) ON DELETE CASCADE
    );

CREATE TABLE 
    question_answer (
        quest_id INT,
        ans_id INT,
        PRIMARY KEY (quest_id, ans_id),
        FOREIGN KEY (quest_id) REFERENCES question (quest_id) ON DELETE CASCADE,
		FOREIGN KEY (ans_id) REFERENCES answer (ans_id) ON DELETE CASCADE
    );

CREATE TABLE
    test (
        test_id SERIAL PRIMARY KEY,
        test_name VARCHAR(255) NOT NULL,
		due_date timestamp DEFAULT set_due()
    );

CREATE TABLE 
    test_question (
        test_id INT,
        quest_id INT,
        PRIMARY KEY (test_id, quest_id),
        FOREIGN KEY (test_id) REFERENCES test (test_id),
        FOREIGN KEY (quest_id) REFERENCES question (quest_id)
     );

CREATE TABLE
    score (
        score_id SERIAL PRIMARY KEY,
        test_id INT,
        student_name VARCHAR(50) NOT NULL,
	late BOOL DEFAULT FALSE,
        score INT NOT NULL CHECK (score <= 100 AND score >= 0),
        FOREIGN KEY (test_id) REFERENCES test (test_id) ON DELETE CASCADE
    );


-- create triggers
CREATE TRIGGER correct_ans_trigger
	AFTER UPDATE ON question
	FOR EACH ROW
	EXECUTE PROCEDURE update_correct_ans();
--DROP TRIGGER correct_ans_trigger ON question;

CREATE TRIGGER check_due
	AFTER INSERT ON score
	FOR EACH ROW
	EXECUTE PROCEDURE get_timestamp();
--DROP TRIGGER check_due ON score
