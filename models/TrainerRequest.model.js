// trainerRequest.model.js
import mongoose from 'mongoose';

const trainerRequestSchema = new mongoose.Schema(
  {
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A trainer request must have a trainer'],
    },
    trainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A trainer request must have a trainee'],
    },
    trainerPackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TrainerPackage',
      required: [true, 'A trainer request must have a trainer package'],
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const TrainerRequest = mongoose.model('TrainerRequest', trainerRequestSchema);

export default TrainerRequest;
