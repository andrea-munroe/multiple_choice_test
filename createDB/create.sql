drop table test;

CREATE TABLE test (
	question text PRIMARY KEY NOT NULL,
	answers text[] NOT NULL
);