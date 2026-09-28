const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    classes: {
      type: String,
      required: true,
    },

    responsibilities: {
      type: String,
      required: true,
    },

    relationships: {
      type: String,
      required: true,
    },

    approach: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Submitted", "Evaluating", "Completed", "Failed"],
      default: "Submitted",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Submission", submissionSchema);