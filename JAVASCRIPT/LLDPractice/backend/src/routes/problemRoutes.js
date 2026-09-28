const express = require("express");
const Problem = require("../models/Problem");

const router = express.Router();

// Get all problems
router.get("/", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch problems" });
  }
});

// Add a new problem
router.post("/", async (req, res) => {
  try {
    const problem = new Problem(req.body);
    const savedProblem = await problem.save();

    res.status(201).json(savedProblem);
  } catch (error) {
    res.status(400).json({ message: "Failed to create problem" });
  }
});

module.exports = router;