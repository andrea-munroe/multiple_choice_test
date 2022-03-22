DELETE from test;

INSERT INTO
    test (question, answers)
VALUES 
    ('how long is a yard in feet?', ARRAY ['3 feet','6 feet','20 feet']),
    ('how many quarts of oil can a race car hold?', ARRAY ['3 quarts','1 gallon','5 cups']),
    ('how tall is the hulk?', ARRAY ['8 feet','10 feet','6.5 feet']),
    ('what is inductance?', ARRAY ['magic','alternating current resistance','being honored by an organization']),
    ('how fast can a frog hop?', ARRAY ['4 hops a minute.', '6 hops a minute', '20 hops a minute']);
