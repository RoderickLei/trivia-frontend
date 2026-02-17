const API_URL = "http://localhost:8080";

async function request(method, endpoint, data) {
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (method !== "GET") {
    opts.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || response.statusText);
  }

  return response.json();
}

async function getQuestions() {
  return request("GET", "questions");
}

async function checkAnswer(id, selectedAnswer) {
  const res = await fetch("http://localhost:8080/checkanswers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, selectedAnswer })
  });

  const data = await res.json();

  if (typeof data === "boolean") return data;
  return Boolean(data.checkAnswer);
}

export { getQuestions, checkAnswer };