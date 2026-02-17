function decode(str) {
  const text = document.createElement("textarea");
  text.innerHTML = str;
  return text.value;
}

function Question({ q, selected, result, onSelect }) {
    const questionText = decode(q.question);

    return (
    <div>
        <p>{questionText}</p>

        {q.answers.map((answer) => (
        <label key={answer}>
            <input
            type="radio"
            name={q.id}
            value={answer}
            checked={selected === answer}
            onChange={() => onSelect(q.id, answer)}
            />
            {decode(answer)}
        </label>
        ))}

    {result === true && <p>Correct</p>}
    {result === false && <p>Incorrect</p>}
    </div>
    );
}

export default Question;