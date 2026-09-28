import { useState } from "react";

function SubmissionForm({ problem, onBack }) {
  const [formData, setFormData] = useState({
    classes: "",
    responsibilities: "",
    relationships: "",
    approach: "",
  });

  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.classes.trim() ||
      !formData.responsibilities.trim() ||
      !formData.relationships.trim() ||
      !formData.approach.trim()
    ) {
      setMessage("Please complete all sections before submitting.");
      return;
    }

    try {
      setSubmitting(true);
      setMessage("");
      setEvaluation(null);

      const response = await fetch(
        "http://localhost:5000/api/submissions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            problemId: problem._id,
            classes: formData.classes,
            responsibilities: formData.responsibilities,
            relationships: formData.relationships,
            approach: formData.approach,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to submit solution"
        );
      }

      setMessage(
        "Solution submitted and evaluated successfully!"
      );

      setEvaluation(data.evaluation);

      setFormData({
        classes: "",
        responsibilities: "",
        relationships: "",
        approach: "",
      });
    } catch (error) {
      console.error(error);

      setMessage(
        "Failed to submit solution. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Evaluation Result Screen
  if (evaluation) {
    return (
      <div>
        <button onClick={onBack}>
          ← Back to Problem
        </button>

        <h1>Evaluation Result</h1>

        <h2>{problem.title}</h2>

        <h2>
          Overall Score: {evaluation.overallScore} / 25
        </h2>

        <h3>Overall Feedback</h3>

        <p>{evaluation.overallFeedback}</p>

        <h2>Detailed Feedback</h2>

        {evaluation.criteria.map((criterion, index) => (
          <div key={index}>
            <hr />

            <h3>
              {criterion.name}: {criterion.score} / 5
            </h3>

            <p>
              <strong>Evidence:</strong>{" "}
              {criterion.evidence}
            </p>

            {criterion.concern && (
              <p>
                <strong>Concern:</strong>{" "}
                {criterion.concern}
              </p>
            )}

            <p>
              <strong>Suggestion:</strong>{" "}
              {criterion.suggestion}
            </p>

            <p>
              <strong>Confidence:</strong>{" "}
              {criterion.confidence}
            </p>
          </div>
        ))}

        <hr />

        {/* Try Again Button */}
        <button
          onClick={() => {
            setEvaluation(null);

            setMessage("");

            setFormData({
              classes: "",
              responsibilities: "",
              relationships: "",
              approach: "",
            });
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Submission Form
  return (
    <div>
      <button onClick={onBack}>
        ← Back to Problem
      </button>

      <h1>{problem.title}</h1>

      <p>{problem.description}</p>

      <h2>Design Your Solution</h2>

      <form onSubmit={handleSubmit}>
        {/* Classes */}
        <div>
          <label>Classes</label>

          <br />

          <textarea
            name="classes"
            value={formData.classes}
            onChange={handleChange}
            placeholder="Example: Customer, Barber, Service, Appointment"
            rows="5"
          />
        </div>

        <br />

        {/* Responsibilities */}
        <div>
          <label>Responsibilities</label>

          <br />

          <textarea
            name="responsibilities"
            value={formData.responsibilities}
            onChange={handleChange}
            placeholder="Explain what each class should be responsible for."
            rows="5"
          />
        </div>

        <br />

        {/* Relationships */}
        <div>
          <label>Relationships</label>

          <br />

          <textarea
            name="relationships"
            value={formData.relationships}
            onChange={handleChange}
            placeholder="Explain how the classes are related."
            rows="5"
          />
        </div>

        <br />

        {/* Approach */}
        <div>
          <label>Approach / Explanation</label>

          <br />

          <textarea
            name="approach"
            value={formData.approach}
            onChange={handleChange}
            placeholder="Explain your overall design and important decisions."
            rows="7"
          />
        </div>

        <br />

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? "Evaluating..."
            : "Submit Solution"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default SubmissionForm;