DELETE from test;

INSERT INTO
    test (question, answers)
VALUES 
    ('how long is a yard?', ARRAY ['3 feet','6 feet','20 feet']),
    ('how fast can a frog hop?', ARRAY ['4 hops a minute.', '6 hops a minute', '20 hops a minute']);
