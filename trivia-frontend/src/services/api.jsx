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

async function checkAnswer(questionId, selectedAnswer) {
  return request("POST", "checkanswers", {
    questionId,
    selectedAnswer
  });
}

export { getQuestions, checkAnswer };