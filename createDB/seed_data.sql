DELETE FROM questions;

INSERT INTO
    questions (question, answer)
VALUES
    ('how long is a yard in feet?','3 feet'),
    ('how many quarts of oil can a race car hold?','1 gallon'),
    ('how tall is the hulk?','10 feet'),
    ('what is inductance?','alternating current resistance'),
    ('how fast can a frog hop?','alternating current resistance');

DELETE FROM answers

INSERT INTO
    answers (q_id, answers)
VALUES
    ('how long is a yard in feet?', '3 feet'),
    ('how long is a yard in feet?', '6 feet'),
    ('how long is a yard in feet?', '20 feet'),
    ('how many quarts of oil can a race car hold?', '3 quarts'),
    ('how many quarts of oil can a race car hold?', '1 gallon'),
    ('how many quarts of oil can a race car hold?', '5 cups'),
    ('how tall is the hulk?', '8 feet'),
    ('how tall is the hulk?', '10 feet'),
    ('how tall is the hulk?', '6.5 feet'),
    ('what is inductance?', 'magic'),
    ('what is inductance?', 'alternating current resistance'),
    ('what is inductance?', 'being honored by an organization'),
    ('how fast can a frog hop?', 'alternating current resistance'),
    ('how fast can a frog hop?', '6 hops a minute'),
    ('how fast can a frog hop?', '20 hops a minute');


DELETE FROM scores

INSERT INTO
    scores (student_name, score)
VALUES
    ('Jar Jar Binks', 10),
    ('Tony Stark', 100),
    ('Agent Smith', 85)