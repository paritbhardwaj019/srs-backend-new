// Import required modules
import mongoose from "mongoose";

// Define the TrainerPackage schema
const trainerPackageSchema = new mongoose.Schema(
  {
    package: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Package",
        required: [true, "A trainer package must have a package ID"],
      },
    ],
    trainer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A trainer package must have a trainer ID"],
    },
    trainees: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    duration: {
      type: Number,
      required: [true, "A trainer package must have a duration in days"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// Create the TrainerPackage model
const TrainerPackage = mongoose.model("TrainerPackage", trainerPackageSchema);

// Export the TrainerPackage model
export default TrainerPackage;
