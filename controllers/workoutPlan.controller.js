import * as handler from '../utils/handlerFactory.js';
import WorkoutPlan from '../models/workout_plan.model.js';
import AppError from '../utils/appError.js';
import catchAsync from '../lib/catchAsync.js';


// In workoutPlan.controller.js
export const createWorkoutPlanWithStartDate = catchAsync(async (req, res, next) => {
    // First, create the workout plan using the handler function
    const doc = await handler.createOneWithoutResponse(WorkoutPlan)(req, res, next, async (createdWorkoutPlan) => {
      // If the creation was successful, update the user's startDate
      const userId = req.body.userId;
      const user = await User.findById(userId);
      if (!user) {
        throw new AppError('User not found', 404);
      }
      user.startDate = new Date();
      await user.save();
    });
  
    // Send the response with the created document
    res.status(201).json({
      status: 'success',
      data: {
        [WorkoutPlan.collection.collectionName.slice(0, -1)]: doc,
      },
    });
  });
  
  
  
export const getAllWorkoutPlans = handler.getAll(WorkoutPlan);
export const getWorkoutPlan = handler.getOne(WorkoutPlan);
export const updateWorkoutPlan = handler.updateOne(WorkoutPlan);
export const deleteWorkoutPlan = handler.deleteOne(WorkoutPlan);
