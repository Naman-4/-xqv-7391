function evaluateSubmission(submission, problem) {
  const fullText = `
    ${submission.classes}
    ${submission.responsibilities}
    ${submission.relationships}
    ${submission.approach}
  `.toLowerCase();

  const criteria = [];

  // 1. Classes & Responsibilities
  const hasClasses =
    submission.classes.trim().length >= 20 &&
    submission.responsibilities.trim().length >= 30;

  criteria.push({
    name: "Classes & Responsibilities",
    score: hasClasses ? 5 : 3,
    evidence: hasClasses
      ? "Classes and their responsibilities are clearly described."
      : "Some classes or responsibilities are described, but more detail is needed.",
    concern: hasClasses
      ? ""
      : "Responsibilities are not detailed enough.",
    suggestion: hasClasses
      ? "Keep responsibilities focused on single, clear responsibilities."
      : "Explain what each class is responsible for.",
    confidence: "High",
  });

  // 2. Relationships
  const hasRelationships =
    submission.relationships.trim().length >= 30;

  criteria.push({
    name: "Relationships",
    score: hasRelationships ? 5 : 3,
    evidence: hasRelationships
      ? "Relationships between the main classes are explained."
      : "Relationships are only partially explained.",
    concern: hasRelationships
      ? ""
      : "The connections between classes need more explanation.",
    suggestion: hasRelationships
      ? "Also mention important associations or dependencies."
      : "Explain which class interacts with which other class and why.",
    confidence: "High",
  });

  // 3. Requirements Coverage
  const requirementKeywords = problem.requirements.map((requirement) => {
    const words = requirement
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 4);

    return words.some((word) => fullText.includes(word));
  });

  const coveredRequirements = requirementKeywords.filter(Boolean).length;
  const totalRequirements = problem.requirements.length;

  let requirementScore = 2;

  if (coveredRequirements >= totalRequirements) {
    requirementScore = 5;
  } else if (coveredRequirements >= Math.ceil(totalRequirements * 0.6)) {
    requirementScore = 4;
  } else if (coveredRequirements >= 1) {
    requirementScore = 3;
  }

  criteria.push({
    name: "Requirements Coverage",
    score: requirementScore,
    evidence: `The solution appears to address ${coveredRequirements} of ${totalRequirements} main requirements.`,
    concern:
      requirementScore < 5
        ? "Some problem requirements may not be explicitly addressed."
        : "",
    suggestion:
      requirementScore < 5
        ? "Review every requirement and explain how the design handles it."
        : "Continue validating the design against every requirement.",
    confidence: "Medium",
  });

  // 4. Edge Cases
  const edgeCaseWords = [
    "conflict",
    "unavailable",
    "already",
    "invalid",
    "duplicate",
    "cancel",
    "error",
    "not available",
  ];

  const foundEdgeCases = edgeCaseWords.filter((word) =>
    fullText.includes(word)
  );

  const edgeScore =
    foundEdgeCases.length >= 3
      ? 5
      : foundEdgeCases.length >= 2
      ? 4
      : foundEdgeCases.length >= 1
      ? 3
      : 2;

  criteria.push({
    name: "Edge Cases",
    score: edgeScore,
    evidence:
      foundEdgeCases.length > 0
        ? `The solution mentions edge-case handling such as ${foundEdgeCases
            .slice(0, 3)
            .join(", ")}.`
        : "No clear edge-case handling was identified.",
    concern:
      edgeScore < 5
        ? "More edge cases should be considered."
        : "",
    suggestion:
      edgeScore < 5
        ? "Consider conflicts, unavailable resources, invalid operations, and duplicate actions."
        : "Keep documenting important failure and boundary cases.",
    confidence: "Medium",
  });

  // 5. Design Quality
  const designWords = [
    "responsibility",
    "separate",
    "extend",
    "interface",
    "abstraction",
    "solid",
    "maintain",
    "single responsibility",
  ];

  const designMatches = designWords.filter((word) =>
    fullText.includes(word)
  );

  const designScore =
    designMatches.length >= 4
      ? 5
      : designMatches.length >= 2
      ? 4
      : designMatches.length >= 1
      ? 3
      : 2;

  criteria.push({
    name: "Design Quality",
    score: designScore,
    evidence:
      designMatches.length > 0
        ? "The explanation contains design-quality considerations."
        : "Limited evidence of design-quality considerations was found.",
    concern:
      designScore < 5
        ? "The design explanation could discuss maintainability and extensibility more clearly."
        : "",
    suggestion:
      designScore < 5
        ? "Explain why responsibilities are separated and how the design can evolve."
        : "Continue explaining important design trade-offs.",
    confidence: "Medium",
  });

  const overallScore = criteria.reduce(
    (total, criterion) => total + criterion.score,
    0
  );

  const overallFeedback =
    overallScore >= 21
      ? "Strong solution. The design covers the main requirements and provides clear responsibilities and relationships."
      : overallScore >= 16
      ? "Good solution. The main design is present, but some requirements or edge cases could be explained in more detail."
      : "The solution has a basic structure, but several areas need more explanation and stronger handling of requirements and edge cases.";

  return {
    criteria,
    overallScore,
    overallFeedback,
  };
}

module.exports = evaluateSubmission;