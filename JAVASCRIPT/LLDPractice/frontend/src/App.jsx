import { useEffect, useState } from "react";
import ProblemDetails from "./ProblemDetails";
import SubmissionForm from "./SubmissionForm";
import History from "./History";

function App() {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [practiceProblem, setPracticeProblem] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/problems")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch problems");
        }

        return response.json();
      })
      .then((data) => {
        setProblems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load problems");
        setLoading(false);
      });
  }, []);

  if (practiceProblem) {
    return (
      <SubmissionForm
        problem={practiceProblem}
        onBack={() => setPracticeProblem(null)}
      />
    );
  }

  if (selectedProblem) {
    return (
      <ProblemDetails
        problem={selectedProblem}
        onBack={() => setSelectedProblem(null)}
        onStartPractice={() => setPracticeProblem(selectedProblem)}
      />
    );
  }

  if (showHistory) {
    return (
      <div>
        <button onClick={() => setShowHistory(false)}>
          ← Back to Problems
        </button>

        <History />
      </div>
    );
  }

  return (
    <div>
      <h1>LLD Practice Platform</h1>

      <p>Choose a problem and practice Low-Level Design.</p>

      <button onClick={() => setShowHistory(true)}>
        View Submission History
      </button>

      <br />
      <br />

      {loading && <p>Loading problems...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <div>
          {problems.map((problem) => (
            <div key={problem._id}>
              <h2>{problem.title}</h2>

              <p>{problem.description}</p>

              <button onClick={() => setSelectedProblem(problem)}>
                View Problem
              </button>

              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;