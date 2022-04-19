SELECT
	*
FROM
	test
	natural join test_question
	natural join question
	natural join question_answer
	natural join answer 
Where test_id = 1