# AI Usage — LLD Practice Platform

## 1. Overview

AI tools were used during the development of this project as a development and brainstorming assistant.

AI assistance was mainly used for:

- Understanding the assignment requirements
- Breaking the project into implementation steps
- Discussing architecture and domain models
- Reviewing implementation decisions
- Debugging development issues
- Improving documentation
- Generating initial implementation suggestions

The final implementation decisions were reviewed and tested during development.

## 2. AI-Assisted Decision 1 — Structured Text Submission

### Problem

The platform could accept complete source code, UML diagrams, or structured text.

Implementing all three options would increase the scope significantly for an MVP.

### AI Suggestion

Use a structured text submission containing:

- Classes
- Responsibilities
- Relationships
- Overall approach

### Decision

Accepted.

### Reason

Structured text:

- Is simple to implement
- Allows learners to explain their design
- Keeps the focus on LLD thinking
- Avoids code execution complexity
- Avoids building a complex UML editor

This decision helped keep the MVP within the assignment scope.

## 3. AI-Assisted Decision 2 — Rule-Based Evaluation

### Problem

The assignment allows AI-based evaluation, but integrating an external AI API would add additional complexity.

### AI Suggestion

Start with a deterministic rule-based evaluator for the MVP and keep the architecture open for future AI evaluation.

### Decision

Accepted.

### Reason

The rule-based evaluator provides:

- Predictable results
- Explainable feedback
- Easy testing
- No external API dependency
- Simple implementation

An AI evaluator can be added in a future version.

## 4. AI-Assisted Decision 3 — Fixed Evaluation Rubric

### Problem

Returning only one overall score would provide limited learning value.

### AI Suggestion

Use multiple evaluation criteria with criterion-level feedback.

### Decision

Accepted.

### Rubric

The MVP uses five criteria:

1. Classes & Responsibilities
2. Relationships
3. Requirements Coverage
4. Edge Cases
5. Design Quality

Each criterion has:

- Score
- Evidence
- Concern
- Suggestion
- Confidence

### Reason

This makes the evaluation more explainable and helps learners understand what they should improve.

## 5. AI-Assisted Decision 4 — Simple Monolithic Architecture

### Problem

The assignment could be implemented using many services and infrastructure components.

### AI Suggestion

Use a simple monolithic architecture consisting of:

- React frontend
- Node.js/Express backend
- MongoDB
- Evaluation service

### Decision

Accepted.

### Reason

The assignment focuses on product thinking, LLD, evaluation, and a working prototype.

Microservices, Kubernetes, and other infrastructure would add complexity without improving the core MVP.

## 6. AI-Assisted Decision 5 — Evaluator Abstraction

### Problem

The MVP uses a rule-based evaluator, but future versions may use AI or human evaluation.

### AI Suggestion

Keep evaluation logic separated from the submission route and model it conceptually as an evaluator abstraction.

Example:

Evaluator
|
+-- RuleBasedEvaluator
+-- AIEvaluator
+-- HumanEvaluator

### Decision

Accepted.

### Reason

This keeps the current implementation simple while allowing future evaluation strategies to be introduced without redesigning the complete product flow.

## 7. AI-Assisted Debugging

AI assistance was also used during implementation to help diagnose development issues such as:

- Backend route problems
- Frontend API connection issues
- MongoDB data handling
- React component flow
- Submission validation
- Testing scenarios

The suggested fixes were manually applied and tested in the local development environment.

## 8. AI Suggestions That Were Not Implemented

Some possible features were intentionally not included in the MVP.

Examples:

- Microservices
- Kubernetes
- Complex UML editor
- Real-time collaboration
- Payment system
- Large analytics system
- Full authentication system
- External AI API integration

### Reason

These features were considered outside the minimum scope required to demonstrate the core learning workflow.

The project prioritizes:

Problem
↓
Design
↓
Submission
↓
Evaluation
↓
Feedback
↓
History
↓
Try Again

## 9. Human Review and Validation

AI-generated suggestions were not treated as automatically correct.

Implementation decisions were reviewed against:

- Assignment requirements
- Project scope
- Existing implementation
- Test results
- Practical MVP constraints

The working prototype was tested manually using frontend interactions and API requests.

## 10. Summary

AI was used as a development assistant rather than as a replacement for engineering decisions.

The main accepted AI-assisted decisions were:

1. Structured text submission
2. Rule-based evaluation for the MVP
3. Fixed criterion-level rubric
4. Simple monolithic architecture
5. Extensible evaluator design

The final project was implemented, tested, and adjusted based on the actual behavior of the application.
