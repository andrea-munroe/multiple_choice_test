DELETE FROM questions;
DELETE FROM scores;
DELETE FROM answers;

INSERT INTO
    questions
VALUES
    ('how long is a yard in feet?','3 feet'),
    ('how many quarts of oil can a race car hold?','1 gallon'),
    ('how tall is the hulk?','10 feet'),
    ('what is inductance?','alternating current resistance'),
    ('how fast can a frog hop?','6 hops a minute');

INSERT INTO
    answers
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
    ('how fast can a frog hop?', '4 hops an hour'),
    ('how fast can a frog hop?', '6 hops a minute'),
    ('how fast can a frog hop?', '20 hops a minute');

INSERT INTO
    scores
VALUES
    ('Jar Jar Binks', 10),
    ('Tony Stark', 100),
    ('Agent Smith', 85);