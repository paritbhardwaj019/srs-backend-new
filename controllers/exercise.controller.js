import catchAsync from "../lib/catchAsync.js";
import { Exercise } from "../models/workout_plan.model.js";
import AppError from "../utils/appError.js";

export const deleteExercise = catchAsync(async (req, res) => {
  const { id } = req.params;
  try {
    await Exercise.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

export const createExercise = catchAsync(async (req, res) => {
  try {
    const newExercise = await Exercise.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        exercise: newExercise,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

export const getExercisesByPackageID = catchAsync(async (req, res) => {
  try {
    const { packageID } = req.params;

    const exercises = await Exercise.find({ package: packageID });

    if (!exercises) {
      return AppError("No exercise found by this packageID", 404);
    }

    res.status(200).json({
      status: "success",
      data: {
        exercises,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

export const getAllExercises = catchAsync(async (req, res) => {
  try {
    const exercises = await Exercise.find().populate("package");

    res.status(200).json({
      status: "success",
      data: {
        exercises,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

export const getExerciseById = catchAsync(async (req, res) => {
  const { id } = req.params;
  try {
    const exercise = await Exercise.findById(id);

    res.status(200).json({
      status: "success",
      data: {
        exercise,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
});

const exerciseController = {
  createExercise,
  getExercisesByPackageID,
  getAllExercises,
  deleteExercise,
  getExerciseById,
};
export default exerciseController;
