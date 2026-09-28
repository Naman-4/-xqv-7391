const express = require("express");
const Submission = require("../models/Submission");
const Evaluation = require("../models/Evaluation");
const evaluateSubmission = require("../services/evaluator");
const Problem = require("../models/Problem");

const router = express.Router();

// Create and evaluate a submission
router.post("/", async (req, res) => {
  try {
    const submission = new Submission(req.body);

    const savedSubmission = await submission.save();

    // Mark submission as evaluating
    savedSubmission.status = "Evaluating";
    await savedSubmission.save();

    const problem = await Problem.findById(savedSubmission.problemId);

    if (!problem) {
      savedSubmission.status = "Failed";
      await savedSubmission.save();

      return res.status(404).json({
        message: "Problem not found",
      });
    }

    const result = evaluateSubmission(savedSubmission, problem);

    const evaluation = new Evaluation({
      submissionId: savedSubmission._id,
      status: "Completed",
      criteria: result.criteria,
      overallScore: result.overallScore,
      overallFeedback: result.overallFeedback,
    });

    const savedEvaluation = await evaluation.save();

    savedSubmission.status = "Completed";
    await savedSubmission.save();

    res.status(201).json({
      message: "Submission evaluated successfully",
      submission: savedSubmission,
      evaluation: savedEvaluation,
    });
  } catch (error) {
    console.error("Submission evaluation error:", error.message);

    res.status(400).json({
      message: "Failed to submit and evaluate solution",
    });
  }
});

// Get all submissions with evaluations
router.get("/", async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("problemId", "title")
      .sort({ createdAt: -1 });

    const results = await Promise.all(
      submissions.map(async (submission) => {
        const evaluation = await Evaluation.findOne({
          submissionId: submission._id,
        });

        return {
          submission,
          evaluation,
        };
      })
    );

    res.json(results);
  } catch (error) {
    console.error("Fetch submissions error:", error.message);

    res.status(500).json({
      message: "Failed to fetch submissions",
    });
  }
});

module.exports = router;