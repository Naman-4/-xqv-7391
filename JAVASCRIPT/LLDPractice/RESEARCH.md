# Research Note — LLD Practice Platform

## 1. Problem Understanding

The goal is to build a simple Low-Level Design (LLD) practice platform that allows learners to practice designing software systems and receive structured feedback.

The expected learning flow is:

Choose Problem → Think/Design → Submit → Evaluate → Get Feedback → Review → Try Again

The platform should focus on the learning experience instead of unnecessary infrastructure.

## 2. Key Product Requirements

The main requirements identified for the platform are:

### Problem Selection

The learner should be able to choose from multiple LLD problems.

Each problem should provide:

- Problem context
- Requirements
- Focus areas

### Solution Submission

The learner should be able to submit their design.

For the MVP, the submission uses structured text containing:

- Classes
- Responsibilities
- Relationships
- Overall approach

### Evaluation

The submitted solution should be evaluated using a fixed rubric.

The evaluation should provide useful feedback instead of only returning a single score.

### Feedback

Feedback should explain:

- What was done well
- What could be improved
- Evidence from the solution
- Suggestions for improvement
- Confidence in the evaluation

### History

Learners should be able to review previous attempts.

### Retry

Learners should be able to attempt the same problem again after receiving feedback.

## 3. Evaluation Research

A useful LLD evaluator should not depend only on exact expected classes because multiple valid LLD solutions can exist.

For example, a barber appointment system can be designed using different class structures while still following good design principles.

Therefore, the evaluation should focus on design qualities rather than requiring one exact implementation.

The MVP uses five evaluation criteria:

1. Classes & Responsibilities
2. Relationships
3. Requirements Coverage
4. Edge Cases
5. Design Quality

Each criterion receives a score from 0 to 5.

The maximum overall score is 25.

## 4. Deterministic vs AI Evaluation

The research suggests separating deterministic system rules from subjective design evaluation.

### Deterministic Responsibilities

These can be handled reliably by application logic:

- Required submission fields
- Problem existence
- Submission state transitions
- Saving submissions
- Database persistence
- Error handling

### AI-Assisted Responsibilities

AI can later help with more subjective evaluation areas such as:

- Design quality
- Responsibility assignment
- SOLID principles
- Abstraction
- Trade-offs
- Maintainability
- Extensibility
- Explanation quality

For the MVP, a deterministic rule-based evaluator was selected because it keeps the system simple, explainable, and reliable.

## 5. Multiple Valid LLD Solutions

LLD problems generally do not have one universally correct class diagram.

Two learners may choose different classes or relationships and both designs can be valid.

Therefore, the evaluation should focus on:

- Whether responsibilities are clear
- Whether requirements are covered
- Whether relationships make sense
- Whether edge cases are considered
- Whether the design can evolve
- Whether the explanation is understandable

This avoids treating one predefined solution as the only correct answer.

## 6. Feedback Design

A single score is not sufficient for learning.

The platform therefore provides criterion-level feedback.

Each criterion contains:

- Score
- Evidence
- Concern
- Suggestion
- Confidence

This gives the learner a clearer understanding of why they received a particular result.

For example:

Edge Cases: 3 / 5

Evidence:
The solution mentions conflict handling.

Concern:
More edge cases should be considered.

Suggestion:
Consider unavailable resources, invalid operations, duplicate actions, and cancellation scenarios.

Confidence:
Medium

## 7. Submission State Model

The platform uses clear submission states.

The MVP uses:

Submitted
↓
Evaluating
↓
Completed

If evaluation cannot be completed:

Evaluating
↓
Failed

The submission is saved before evaluation so that a failed evaluation does not result in losing the learner's attempt.

## 8. Domain Model

The main domain entities identified are:

### Problem

Represents an LLD practice problem.

Contains:

- Title
- Description
- Requirements
- Focus areas

### Submission

Represents a learner's attempt.

Contains:

- Problem reference
- Classes
- Responsibilities
- Relationships
- Approach
- Status
- Timestamp

### Evaluation

Represents the result of evaluating a submission.

Contains:

- Submission reference
- Evaluation status
- Criteria
- Overall score
- Overall feedback

### Evaluation Criterion

Represents one rubric dimension.

Contains:

- Name
- Score
- Evidence
- Concern
- Suggestion
- Confidence

## 9. MVP Scope Decisions

The following features were intentionally kept outside the MVP:

- User authentication
- Microservices
- Kubernetes
- Complex UML editor
- Real-time collaboration
- Payment system
- Large analytics system
- External AI API integration

These features could increase implementation complexity without being necessary for demonstrating the core learning workflow.

## 10. Future Evaluation Architecture

The evaluation system should remain extensible.

A future version can introduce an evaluator abstraction such as:

Evaluator
|
├── RuleBasedEvaluator
├── AIEvaluator
└── HumanEvaluator

The current MVP uses the rule-based approach.

Later, an AI or human evaluator could be introduced without changing the overall product flow.

## 11. Key Research Conclusions

The research led to the following design decisions:

1. Use a simple monolithic architecture for the MVP.
2. Store every submission before evaluation.
3. Use a fixed rubric for consistent feedback.
4. Avoid requiring one exact LLD solution.
5. Separate deterministic application rules from subjective evaluation.
6. Provide criterion-level feedback instead of only an overall score.
7. Preserve previous attempts so learners can compare progress.
8. Keep the evaluator extensible for future AI or human evaluation.

These decisions provide a balance between simplicity, explainability, and future extensibility.
