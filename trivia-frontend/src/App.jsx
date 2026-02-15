import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getQuestions, checkAnswer } from "./services/api";
// import Button from "./components/Button";

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

  return (
    <>
      <h1>Trivia</h1>
      <button onClick={loadQuestions}>Load Questions</button>
    </>
  )
}

export default App
