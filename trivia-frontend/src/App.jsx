import { useState } from 'react'
import './App.css'
import { getQuestions, checkAnswer } from "./services/api";
import Question from "./components/Question";

function App() {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState({})

  async function loadQuestions() {
    const data = await getQuestions();
    setQuestions(data);
    setAnswers({});
    setResults({});
  }

  function selectAnswer(questionId, selectedAnswer) {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedAnswer }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newResults = {};
    for (const q of questions) {
      const selected = answers[q.id];
      if (!selected) continue;

      const correct = await checkAnswer(q.id, selected);
      newResults[q.id] = correct;
    }
    setResults(newResults);
  }

  return (
    <>
      <h1>Trivia</h1>
      <button type="button" onClick={loadQuestions}>Load Questions</button>

      <form onSubmit={onSubmit}>
        {questions.map((q) => (
          <Question
            key={q.id}
            q={q}
            selected={answers[q.id]}
            result={results[q.id]}
            onSelect={selectAnswer}
          />
        ))}
        <button type="submit">
          Check Answers
        </button>
      </form>
    </>
  )
}

export default App
