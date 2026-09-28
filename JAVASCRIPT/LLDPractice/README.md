# LLD Practice Platform

A simple Low-Level Design (LLD) practice platform where learners can choose an LLD problem, submit their design, receive structured feedback, review previous attempts, and try again.

## 1. Product Flow

The platform follows this learning flow:

Choose Problem → Think/Design → Submit → Evaluate → Get Feedback → Review → Try Again

## 2. Features

- Choose from multiple LLD problems
- View problem description and requirements
- Submit an LLD solution using structured text
- Automatic evaluation
- Criterion-level feedback
- Overall score out of 25
- Submission history
- Try Again functionality
- Validation for required submission fields
- Failed/invalid problem handling

## 3. LLD Problems

The MVP contains three practice problems:

1. Library Management System
2. Barber Shop Appointment System
3. Restaurant Ordering System

Each problem contains:

- Problem description
- Requirements
- Focus areas

## 4. Submission Model

For the MVP, learners submit their design using four structured sections:

- Classes
- Responsibilities
- Relationships
- Overall Approach

This keeps the MVP simple while allowing learners to explain their design clearly.

## 5. Evaluation System

The solution is evaluated using five criteria:

1. Classes & Responsibilities
2. Relationships
3. Requirements Coverage
4. Edge Cases
5. Design Quality

Each criterion receives a score from 0 to 5.

Maximum score:

**25 points**

The evaluation also provides:

- Evidence
- Concern
- Suggestion
- Confidence

The MVP uses a deterministic rule-based evaluator so that the feedback is simple and explainable.

## 6. Submission State

A submission follows this state flow:

Submitted
↓
Evaluating
↓
Completed

If evaluation fails:

Evaluating
↓
Failed

The submission is saved before evaluation so that the learner's attempt is not lost.

## 7. Domain Model

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

Represents the evaluation result.

Contains:

- Submission reference
- Evaluation status
- Criteria
- Overall score
- Overall feedback

### Evaluation Criterion

Represents one evaluation dimension.

Contains:

- Name
- Score
- Evidence
- Concern
- Suggestion
- Confidence

## 8. Technology Stack

### Frontend

- React
- Vite
- JavaScript
- HTML/CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### API Testing

- Postman

## 9. Project Structure

```text
LLDPractice/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── ProblemDetails.jsx
│   │   ├── SubmissionForm.jsx
│   │   └── History.jsx
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── Problem.js
│   │   │   ├── Submission.js
│   │   │   └── Evaluation.js
│   │   │
│   │   ├── routes/
│   │   │   ├── problemRoutes.js
│   │   │   └── submissionRoutes.js
│   │   │
│   │   ├── services/
│   │   │   └── evaluator.js
│   │   │
│   │   └── server.js
│   │
│   └── .env
│
├── README.md

├── RESEARCH.md
├── DESIGN.md
└── AI_USAGE.md
## 10. API Endpoints

### Get Problems

GET /api/problems

Returns all available LLD practice problems.

### Create Problem

POST /api/problems

Creates a new practice problem.

### Submit Solution

POST /api/submissions

Creates and evaluates a learner submission.

### Get Submission History

GET /api/submissions

Returns previous submissions with their evaluation results.

## 11. Example Evaluation

Example result:

Overall Score: 22 / 25

Classes & Responsibilities: 5 / 5
Relationships: 5 / 5
Requirements Coverage: 5 / 5
Edge Cases: 3 / 5
Design Quality: 4 / 5

The platform also provides written feedback for each criterion.

## 12. Testing

The following cases were tested:

### Test 1 — Empty Submission

Submitting without completing all fields shows a validation message.

Result: PASS

### Test 2 — Valid Submission

A valid solution is saved and evaluated successfully.

Result: PASS

### Test 3 — Submission History

Multiple submissions are displayed in the history page.

Result: PASS

### Test 4 — Try Again

After evaluation, the learner can return to a fresh submission form.

Result: PASS

### Test 5 — Invalid Problem

Submitting with an invalid problem ID returns:

{
  "message": "Problem not found"
}

Result: PASS

## 13. Design Principles

The MVP follows these principles:

- Keep the architecture simple
- Avoid unnecessary infrastructure
- Separate models, routes, and evaluation logic
- Save submissions before evaluation
- Use a fixed evaluation rubric
- Provide explainable feedback
- Allow multiple valid LLD approaches
- Keep the evaluator extensible

## 14. Future Improvements

Possible future improvements include:

- AI-based evaluation
- Human evaluation
- User authentication
- Code submission
- UML/diagram submission
- More LLD problems
- Progress tracking
- Improved analytics
- Evaluator abstraction with multiple evaluator implementations

## 15. MVP Goal

The primary goal of this project is to demonstrate an end-to-end LLD learning workflow:

Problem → Design → Submission → Evaluation → Feedback → History → Retry

The MVP intentionally avoids unnecessary complexity such as microservices, Kubernetes, complex UML editors, and large-scale infrastructure.
```
