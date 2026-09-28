import { useEffect, useState } from "react";

function History() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/submissions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        return response.json();
      })
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load submission history.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading submission history...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Submission History</h1>

      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        submissions.map((item) => (
          <div key={item.submission._id}>
            <hr />

            <h2>
              {item.submission.problemId?.title || "Unknown Problem"}
            </h2>

            <p>
              <strong>Status:</strong>{" "}
              {item.submission.status}
            </p>

            {item.evaluation && (
              <>
                <p>
                  <strong>Score:</strong>{" "}
                  {item.evaluation.overallScore} / 25
                </p>

                <p>
                  <strong>Feedback:</strong>{" "}
                  {item.evaluation.overallFeedback}
                </p>
              </>
            )}

            <p>
              <strong>Submitted:</strong>{" "}
              {new Date(item.submission.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default History;