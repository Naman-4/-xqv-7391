const mongoose = require("mongoose");

const criterionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },

    evidence: {
      type: String,
      required: true,
    },

    concern: {
      type: String,
      default: "",
    },

    suggestion: {
      type: String,
      default: "",
    },

    confidence: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
  },
  { _id: false }
);

const evaluationSchema = new mongoose.Schema(
  {
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Submission",
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["Evaluating", "Completed", "Failed"],
      default: "Evaluating",
    },

    criteria: {
      type: [criterionSchema],
      required: true,
    },

    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 25,
    },

    overallFeedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Evaluation", evaluationSchema);