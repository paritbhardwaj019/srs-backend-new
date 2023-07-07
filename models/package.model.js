// Import required modules
import mongoose, { Mongoose, mongo } from "mongoose";

// Define the Package schema
const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A package must have a name"],
      unique: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "A package must have a price"],
    },
    maxTrainees: {
      type: Number,
      required: [
        true,
        "A package must have a maximum number of trainees allowed per trainer",
      ],
    },
    duration: {
      type: Number,
      required: [true, "A package must have a duration in days"],
    },
    trainer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// Create the Package model
const Package = mongoose.model("Package", packageSchema);

// Export the Package model
export default Package;
