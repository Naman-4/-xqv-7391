# Design Note — LLD Practice Platform

## 1. Architecture Overview

The MVP uses a simple monolithic web application architecture.

The system contains three main parts:

1. React frontend
2. Node.js + Express backend
3. MongoDB database

The frontend communicates with the backend through REST APIs.

Architecture:

User
|
v
React Frontend
|
| HTTP / REST API
v
Node.js + Express Backend
|
+-------------------+
| |
v v
MongoDB Evaluation Service

This architecture was selected because the assignment focuses on demonstrating the complete product workflow rather than building large-scale infrastructure.

## 2. Frontend Design

The frontend is implemented using React and Vite.

Main frontend components:

### App

Responsible for:

- Loading available problems
- Selecting a problem
- Navigating between major screens
- Opening submission history

### ProblemDetails

Responsible for:

- Displaying the selected problem
- Showing requirements
- Showing focus areas
- Starting the practice flow

### SubmissionForm

Responsible for:

- Collecting the learner's design
- Validating required fields
- Sending the submission to the backend
- Displaying evaluation results
- Providing the Try Again flow

### History

Responsible for:

- Loading previous submissions
- Showing submission status
- Showing evaluation scores
- Showing overall feedback

## 3. Backend Design

The backend uses Node.js and Express.

The backend is divided into:

Routes
|
v
Models
|
v
Services

### Routes

Routes handle HTTP requests and responses.

Current routes include:

GET /api/problems
POST /api/problems

POST /api/submissions
GET /api/submissions

### Models

MongoDB data is represented using Mongoose models.

The main models are:

- Problem
- Submission
- Evaluation

### Services

The evaluation logic is separated into:

services/evaluator.js

This prevents evaluation logic from being tightly coupled to the HTTP route.

## 4. Domain Model

The main entities are:

Problem
|
| 1
|
| \*
v
Submission
|
| 1
|
| 1
v
Evaluation

### Problem

Represents an LLD practice problem.

Important fields:

- title
- description
- requirements
- focusAreas

### Submission

Represents one learner attempt.

Important fields:

- problemId
- classes
- responsibilities
- relationships
- approach
- status
- timestamps

### Evaluation

Represents the result of evaluating one submission.

Important fields:

- submissionId
- status
- criteria
- overallScore
- overallFeedback
- timestamps

## 5. Submission Flow

The complete submission flow is:

User selects problem
|
v
User designs solution
|
v
User submits solution
|
v
Validate required fields
|
v
Save submission
|
v
Set status = Evaluating
|
v
Find problem
|
v
Evaluate solution
|
v
Save evaluation
|
v
Set submission = Completed
|
v
Return feedback

If the problem cannot be found:

Submission
|
v
Problem lookup
|
X
Problem not found
|
v
Status = Failed

## 6. Evaluation Design

The MVP uses a rule-based evaluator.

The evaluator receives:

Submission + Problem

and returns:

Criteria
Overall Score
Overall Feedback

The five evaluation criteria are:

### 1. Classes & Responsibilities

Checks whether the learner has provided meaningful classes and responsibilities.

### 2. Relationships

Checks whether relationships between classes are explained.

### 3. Requirements Coverage

Checks whether important problem requirements are reflected in the solution.

### 4. Edge Cases

Checks whether the learner considers situations such as:

- conflicts
- unavailable resources
- duplicate operations
- invalid operations
- cancellation
- errors

### 5. Design Quality

Looks for concepts related to:

- separation of responsibilities
- abstraction
- interfaces
- extensibility
- maintainability
- SOLID principles

Each criterion receives a score from 0 to 5.

Maximum score:

5 criteria × 5 points = 25 points

## 7. Feedback Design

The evaluator does not return only a score.

Each criterion contains:

Name
Score
Evidence
Concern
Suggestion
Confidence

This makes the evaluation more explainable.

Example:

Design Quality: 4 / 5

Evidence:
The solution separates responsibilities between major classes.

Concern:
Some responsibilities could be further isolated.

Suggestion:
Consider introducing abstractions where future changes are expected.

Confidence:
Medium

## 8. State Machine

A submission follows this state machine:

Submitted
|
v
Evaluating
|
+---------> Completed
|
+---------> Failed

### Submitted

The learner's attempt has been saved.

### Evaluating

The system is processing the submission.

### Completed

Evaluation finished successfully.

### Failed

Evaluation could not be completed.

Saving the submission before evaluation ensures that the learner's attempt is not lost.

## 9. Evaluator Abstraction

The current implementation uses a rule-based evaluator.

The design allows future evaluator implementations.

Conceptually:

Evaluator
|
+-- RuleBasedEvaluator
|
+-- AIEvaluator
|
+-- HumanEvaluator

The current MVP uses:

RuleBasedEvaluator

A future AI evaluator could evaluate:

- design quality
- trade-offs
- SOLID principles
- abstraction
- maintainability
- extensibility
- explanation quality

This allows the evaluation mechanism to evolve without changing the main product workflow.

## 10. Multiple Valid Solutions

The system does not require one exact class structure.

This is important because LLD problems can have multiple valid designs.

For example, two learners solving the same barber appointment problem may choose different classes while still producing reasonable designs.

Therefore, the evaluator focuses on design characteristics rather than comparing the submission against one fixed class diagram.

## 11. Error Handling

The backend handles common failure cases.

Examples include:

### Invalid Problem

If the requested problem does not exist:

404 Problem not found

### Invalid Submission

If required submission data is missing, the request is rejected.

### Evaluation Failure

If evaluation cannot be completed, the submission state can be changed to:

Failed

The learner's saved submission is preserved.

## 12. Testing Strategy

The MVP was tested using both frontend interaction and API testing.

Test cases include:

1. Empty submission
2. Valid submission
3. Multiple submissions
4. Submission history
5. Try Again
6. Invalid problem ID

The tests cover both successful and failure scenarios.

## 13. Design Trade-offs

### Structured Text Instead of Code

The MVP uses structured text instead of accepting complete code submissions.

Reason:

- Easier to implement
- Faster feedback
- Focuses on LLD thinking
- Avoids code execution and security complexity

### Rule-Based Evaluation Instead of AI

The MVP uses deterministic evaluation.

Reason:

- Simple
- Explainable
- No external AI dependency
- Easier to test
- Predictable results

AI-based evaluation can be added later.

### Monolith Instead of Microservices

The application uses one backend service.

Reason:

- Small MVP
- Easier development
- Easier deployment
- Lower operational complexity

Microservices are unnecessary for the current scope.

## 14. Extensibility

The design supports future improvements such as:

- AI evaluator
- Human evaluator
- Additional LLD problems
- User authentication
- Code submissions
- UML diagrams
- Progress tracking
- Analytics
- More detailed evaluation rubrics

The evaluator is separated from the routes so that future evaluation strategies can be introduced independently.

## 15. Design Summary

The final design intentionally keeps the system simple while covering the complete learning workflow.

The core architecture is:

React
|
v
Express API
|
+----> MongoDB
|
+----> Evaluation Service

The main workflow is:

Choose Problem
↓
Design Solution
↓
Submit
↓
Evaluate
↓
Receive Feedback
↓
Review History
↓
Try Again

The design prioritizes:

- Simplicity
- Explainability
- Separation of responsibilities
- Testability
- Extensibility
- Complete end-to-end functionality
