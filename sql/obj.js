const rows = [
  {
    quest_id: 1,
    quest_text: "Who is Spiderman?",
    correct_ans: 1,
    ans_id: 1,
    ans_text: "Peter Parker",
  },
  {
    quest_id: 1,
    quest_text: "Who is Spiderman?",
    correct_ans: 1,
    ans_id: 2,
    ans_text: "Kevin Smith",
  },
  {
    quest_id: 1,
    quest_text: "Who is Spiderman?",
    correct_ans: 1,
    ans_id: 3,
    ans_text: "Monty Python",
  },
];

const result = rows.reduce((acc, b) => {
  const index = acc.findIndex((el) => el.question === b.quest_text);

  if (index >= 0) {
    acc[index].answers.push({ ansId: b.ans_id, ansText: b.ans_text });
  } else {
    const obj = {
      question: b.quest_text,
      answers: [{ ansId: b.ans_id, ansText: b.ans_text }],
      correct: b.correct_ans,
    };
    acc.push(obj);
  }

  return acc;
}, []);

result.forEach((el) => console.log(el));