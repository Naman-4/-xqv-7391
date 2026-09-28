function ProblemDetails({ problem, onBack, onStartPractice }) {
  if (!problem) {
    return (
      <div>
        <h2>Problem not found</h2>

        <button onClick={onBack}>Back to Problems</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={onBack}>← Back to Problems</button>

      <h1>{problem.title}</h1>

      <p>{problem.description}</p>

      <h2>Requirements</h2>

      <ul>
        {problem.requirements.map((requirement, index) => (
          <li key={index}>{requirement}</li>
        ))}
      </ul>

      <h2>Focus Areas</h2>

      <ul>
        {problem.focusAreas.map((area, index) => (
          <li key={index}>{area}</li>
        ))}
      </ul>

      <button onClick={onStartPractice}>Start Practice</button>
    </div>
  );
}

export default ProblemDetails;