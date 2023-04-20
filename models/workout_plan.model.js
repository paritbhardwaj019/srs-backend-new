import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
    name: String,
    sets: Number,
    reps: Number,
    weight: Number,
    photo: String, // Add this field to store the photo URL
    video: String, // Add this field to store the video URL
    notes: String,
    completed: {
      type: Boolean,
      default: false,
    },
  });
  

const workoutPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A workout plan must belong to a user'],
    },
    week: {
      type: Number,
      required: [true, 'A workout plan must have a week number'],
      min: 1,
    },
    day: {
      type: Number,
      required: [true, 'A workout plan must have a day number'],
      min: 1,
    },
    exercises: [exerciseSchema],
   
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);
export default WorkoutPlan;
